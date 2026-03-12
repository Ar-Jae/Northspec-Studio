import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone } = await req.json();
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "firstName, lastName, email, and phone are required" }, { status: 400 });
    }

    const name = `${firstName} ${lastName}`.trim();

    const apiKey = process.env.VAPI_API_KEY;
    const assistantId = "5ef2e8d2-0c64-4a38-9963-2d8a848594ac";
    const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

    if (!apiKey || !phoneNumberId) {
      return NextResponse.json({ error: "Missing Vapi configuration" }, { status: 500 });
    }

    const res = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId,
        phoneNumberId,
        customer: {
          number: phone,
          name,
          email,
        },
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to create Vapi call" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, callId: data?.id || null });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Unexpected server error" }, { status: 500 });
  }
}
