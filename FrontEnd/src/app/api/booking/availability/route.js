import { NextResponse } from "next/server";
import {
  buildDayRange,
  buildSlotsForDate,
  getBookingConfig,
  googleApi,
  isSlotFree,
} from "../../../../lib/googleCalendar";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    if (!date) return NextResponse.json({ error: "date is required" }, { status: 400 });

    const { tz, startHour, endHour, slotMinutes, calendarId } = getBookingConfig();
    const { timeMin, timeMax, timezone } = buildDayRange(date, tz);

    const freebusy = await googleApi("/calendar/v3/freeBusy", {
      method: "POST",
      body: {
        timeMin,
        timeMax,
        timeZone: timezone,
        items: [{ id: calendarId }],
      },
    });

    const busy = freebusy.calendars?.[calendarId]?.busy || [];
    const slots = buildSlotsForDate(date, startHour, endHour, slotMinutes)
      .filter((slot) => isSlotFree(slot, busy))
      .filter((slot) => new Date(slot.start).getTime() > Date.now());

    return NextResponse.json({ date, timezone: tz, slotMinutes, slots });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to fetch availability" }, { status: 500 });
  }
}
