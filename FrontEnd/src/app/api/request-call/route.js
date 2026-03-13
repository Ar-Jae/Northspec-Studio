import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://n8n-qhlu.srv1059778.hstgr.cloud/webhook/0cb1a204-1900-4e84-8114-0215c50f3104";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone } = await req.json();
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "firstName, lastName, email, and phone are required" }, { status: 400 });
    }

    const name = `${firstName} ${lastName}`.trim();

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "northspecstudio.com",
        event: "request_call_submitted",
        firstName,
        lastName,
        name,
        email,
        phone,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const raw = await res.text().catch(() => "");
      return NextResponse.json({ error: raw || "Failed to send request to automation workflow" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Unexpected server error" }, { status: 500 });
  }
}
