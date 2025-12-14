import { NextResponse } from "next/server";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const website = String(payload?.website || "").trim();

  // Honeypot: normal users never see or fill this.
  // If it has content, silently accept but do nothing.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Name is required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  // In a real app, you would send an email here using Resend, SendGrid, etc.
  // For now, we just return success.

  return NextResponse.json({ ok: true });
}
