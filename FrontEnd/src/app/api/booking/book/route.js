import { NextResponse } from "next/server";
import {
  getBookingConfig,
  googleApi,
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

    const freebusy = await googleApi("/calendar/v3/freeBusy", {
      method: "POST",
      body: {
        timeMin: new Date(start).toISOString(),
        timeMax: new Date(end).toISOString(),
        timeZone: tz,
        items: [{ id: calendarId }],
      },
    });

    const busy = freebusy.calendars?.[calendarId]?.busy || [];
    if (!isSlotFree({ start, end }, busy)) {
      return NextResponse.json({ error: "That time is no longer available" }, { status: 409 });
    }

    const event = await googleApi(`/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`, {
      method: "POST",
      body: {
        summary: `Discovery Call - ${name}`,
        description: notes ? `Notes: ${notes}` : "Booked from website inline scheduler",
        start: { dateTime: new Date(start).toISOString(), timeZone: tz },
        end: { dateTime: new Date(end).toISOString(), timeZone: tz },
        attendees: [{ email, displayName: name }],
      },
    });

    return NextResponse.json({ ok: true, eventId: event.id, htmlLink: event.htmlLink });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to book" }, { status: 500 });
  }
}
