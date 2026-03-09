import crypto from "node:crypto";

function getEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

function getPrivateKey() {
  return getEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function b64url(input) {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return b
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function createServiceJwt(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = b64url(JSON.stringify(header));
  const encodedPayload = b64url(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  signer.end();
  const signature = signer.sign(privateKey);

  return `${data}.${b64url(signature)}`;
}

let tokenCache = { accessToken: "", expiresAt: 0 };

async function getAccessToken() {
  const clientEmail = getEnv("GOOGLE_CLIENT_EMAIL");
  const privateKey = getPrivateKey();
  if (!clientEmail || !privateKey) throw new Error("Missing Google service account credentials");

  if (tokenCache.accessToken && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken;
  }

  const assertion = createServiceJwt(clientEmail, privateKey);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.error || "Failed to auth with Google");

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
  };

  return tokenCache.accessToken;
}

export async function googleApi(path, { method = "GET", body } = {}) {
  const token = await getAccessToken();
  const res = await fetch(`https://www.googleapis.com${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error?.message || data.error_description || "Google API error");
  return data;
}

export function getBookingConfig() {
  const tz = getEnv("BOOKING_TIMEZONE", "America/New_York");
  const startHour = Number(getEnv("BOOKING_START_HOUR", "9"));
  const endHour = Number(getEnv("BOOKING_END_HOUR", "17"));
  const slotMinutes = Number(getEnv("BOOKING_SLOT_MINUTES", "30"));
  const calendarId = getEnv("GOOGLE_CALENDAR_ID", "build@northspecstudio.com");

  return { tz, startHour, endHour, slotMinutes, calendarId };
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
      if (end.getHours() > endHour || (end.getHours() === endHour && end.getMinutes() > 0)) continue;
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
