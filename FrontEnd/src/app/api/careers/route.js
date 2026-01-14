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
  const website = String(payload?.website || "").trim(); // Honeypot

  // Honeypot: normal users never see or fill this.
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

  // Save to Backend Database
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/api/job-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Backend failed to save application");
    }
  } catch (error) {
    console.error("Failed to save to backend:", error);
    // We still return ok: true to the user so they don't see a technical error,
    // but in a real app you might want to handle this differently.
  }

  return NextResponse.json({ ok: true });
}
