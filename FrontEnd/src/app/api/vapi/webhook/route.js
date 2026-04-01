import { NextResponse } from "next/server";

/**
 * Vapi Server Webhook
 * Configure this URL in your Vapi assistant dashboard under "Server URL":
 *   https://www.northspecstudio.com/api/vapi/webhook
 *
 * Handles tool/function calls the assistant makes during a conversation.
 */

async function createContact({ name, email, phone, company, message }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://northspec-studio-production.up.railway.app";
  const res = await fetch(`${baseUrl}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, company, message, source: "vapi-chatbot" }),
  });
  if (!res.ok) throw new Error(`Failed to create contact: ${await res.text()}`);
  return { success: true, message: "Contact saved successfully." };
}

async function bookCall({ name, email, date, time, notes }) {
  // Build ISO start/end from date + time (assume 30 min slots)
  const start = new Date(`${date}T${time}`);
  const end   = new Date(start.getTime() + 30 * 60 * 1000);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.northspecstudio.com"}/api/booking/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      start: start.toISOString(),
      end:   end.toISOString(),
      notes: notes || "",
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to book call");
  return { success: true, message: `Call booked successfully. Confirmation: ${data.eventId}` };
}

async function submitProjectSpecs(payload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.northspecstudio.com"}/api/request-call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to submit project specs");
  return { success: true, message: "Project specs submitted. We'll follow up within 24 hours." };
}

const toolHandlers = {
  createContact,
  bookCall,
  submitProjectSpecs,
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    // Vapi sends different message types — we only care about tool-calls
    if (message?.type !== "tool-calls") {
      return NextResponse.json({ result: "" });
    }

    const toolCallList = message.toolCallList || [];
    const results = [];

    for (const toolCall of toolCallList) {
      const { id, function: fn } = toolCall;
      const handler = toolHandlers[fn?.name];

      if (!handler) {
        results.push({ toolCallId: id, result: `Unknown tool: ${fn?.name}` });
        continue;
      }

      try {
        const args = typeof fn.arguments === "string" ? JSON.parse(fn.arguments) : fn.arguments;
        const result = await handler(args);
        results.push({ toolCallId: id, result: JSON.stringify(result) });
      } catch (err) {
        console.error(`[vapi/webhook] Tool ${fn?.name} failed:`, err.message);
        results.push({ toolCallId: id, result: JSON.stringify({ success: false, error: err.message }) });
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[vapi/webhook] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
