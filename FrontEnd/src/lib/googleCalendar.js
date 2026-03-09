import { google } from "googleapis";

function getEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

function getPrivateKey() {
  return getEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

export function getBookingConfig() {
  const tz = getEnv("BOOKING_TIMEZONE", "America/New_York");
  const startHour = Number(getEnv("BOOKING_START_HOUR", "9"));
  const endHour = Number(getEnv("BOOKING_END_HOUR", "17"));
  const slotMinutes = Number(getEnv("BOOKING_SLOT_MINUTES", "30"));
  const calendarId = getEnv("GOOGLE_CALENDAR_ID", "build@northspecstudio.com");

  return { tz, startHour, endHour, slotMinutes, calendarId };
}

export async function getCalendarClient() {
  const clientEmail = getEnv("GOOGLE_CLIENT_EMAIL");
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google service account credentials");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  await auth.authorize();
  return google.calendar({ version: "v3", auth });
}

export function buildDayRange(dateStr, timezone) {
  const start = new Date(`${dateStr}T00:00:00`);
  const end = new Date(`${dateStr}T23:59:59`);
  return {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    timezone,
  };
}

export function buildSlotsForDate(dateStr, startHour, endHour, slotMinutes) {
  const slots = [];
  const dayStart = new Date(`${dateStr}T00:00:00`);

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotMinutes) {
      const start = new Date(dayStart);
      start.setHours(hour, minute, 0, 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + slotMinutes);
      if (end.getHours() > endHour || (end.getHours() === endHour && end.getMinutes() > 0)) {
        continue;
      }
      slots.push({ start: start.toISOString(), end: end.toISOString() });
    }
  }

  return slots;
}

export function isSlotFree(slot, busy = []) {
  const slotStart = new Date(slot.start).getTime();
  const slotEnd = new Date(slot.end).getTime();

  return !busy.some((b) => {
    const busyStart = new Date(b.start).getTime();
    const busyEnd = new Date(b.end).getTime();
    return slotStart < busyEnd && slotEnd > busyStart;
  });
}
