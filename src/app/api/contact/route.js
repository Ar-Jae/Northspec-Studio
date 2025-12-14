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
  const company = String(payload?.company || "").trim();
  const message = String(payload?.message || "").trim();
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

  if (!message || message.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Message must be at least 20 characters." },
      { status: 400 }
    );
  }

  // Placeholder: wire this to your provider.
  // Examples:
  // - Resend / SendGrid email send
  // - HubSpot form submit / Salesforce lead
  // - Slack webhook (internal notifications)
  console.log("[contact] new message", { name, email, company, messageLength: message.length });

  return NextResponse.json({ ok: true });
}
