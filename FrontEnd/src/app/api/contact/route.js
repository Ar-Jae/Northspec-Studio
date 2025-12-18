import { NextResponse } from "next/server";

// n8n Webhook URL - Set this in your environment variables
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

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

  // Forward the form data to n8n webhook
  if (N8N_WEBHOOK_URL) {
    try {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const n8nData = await n8nResponse.json().catch(() => ({}));

      if (!n8nResponse.ok) {
        console.error("n8n webhook error:", n8nData);
        return NextResponse.json(
          { ok: false, error: "Failed to process submission." },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true, ...n8nData });
    } catch (error) {
      console.error("n8n webhook failed:", error);
      // Fallback: still return success to not block the user
      // but log the error for debugging
      return NextResponse.json({ ok: true });
    }
  }

  // Fallback if n8n is not configured
  return NextResponse.json({ ok: true });
}
