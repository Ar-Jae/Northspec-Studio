import { NextResponse } from "next/server";
import {
  getBookingConfig,
  getCalendarClient,
  isSlotFree,
} from "../../../../lib/googleCalendar";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, start, end, notes } = body || {};

    if (!name || !email || !start || !end) {
      return NextResponse.json({ error: "name, email, start, and end are required" }, { status: 400 });
    }

    const { tz, calendarId } = getBookingConfig();
    const calendar = await getCalendarClient();

    // Re-check slot before creating event
    const freebusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: new Date(start).toISOString(),
        timeMax: new Date(end).toISOString(),
        timeZone: tz,
        items: [{ id: calendarId }],
      },
    });

    const busy = freebusy.data.calendars?.[calendarId]?.busy || [];
    if (!isSlotFree({ start, end }, busy)) {
      return NextResponse.json({ error: "That time is no longer available" }, { status: 409 });
    }

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Discovery Call — ${name}`,
        description: notes ? `Notes: ${notes}` : "Booked from website inline scheduler",
        start: { dateTime: new Date(start).toISOString(), timeZone: tz },
        end: { dateTime: new Date(end).toISOString(), timeZone: tz },
        attendees: [{ email, displayName: name }],
      },
      sendUpdates: "all",
    });

    return NextResponse.json({ ok: true, eventId: event.data.id, htmlLink: event.data.htmlLink });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to book" }, { status: 500 });
  }
}
