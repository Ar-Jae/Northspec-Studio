import { NextResponse } from "next/server";

const siteContext = `You are the Northspec Studio AI assistant on the company website. Answer only from the facts below. Be friendly and concise. Never invent information. If unsure, direct to build@northspecstudio.com. Do not use em dashes.

COMPANY
Name: Northspec Studio | Site: northspecstudio.com
Description: Software studio helping established companies with workflow automation, software engineering, mobile apps, and reliability support.
Email: build@northspecstudio.com | Phone: +1 (413) 390-3673 | Location: North America
Social: X @NorthspecStudio | IG @northspec_studio | LinkedIn /in/northspec-studio

SERVICES
1. Web Development - Next.js/React marketing sites and web apps
2. Software Engineering - APIs, integrations, internal dashboards, auth, background jobs
3. Mobile App Development - iOS and Android (cross-platform), MVPs to full platforms
4. Workflow Automation - n8n and AI-driven automation, trigger-based pipelines, CRM automation
5. Integrations - API integrations, data sync, webhooks, third-party connectors
6. Maintenance and Support - bug fixes, security updates, performance, incident response
7. Built to Spec - tailored architecture for complex systems, starts at $30,000
8. Custom Plans - multi-phase or non-standard projects, from $25,000+

PROJECT PRICING (fixed-price, not hourly)
MVP and Early Products: $12,000-$30,000 | 6-8 weeks
Business Systems and Automation: $20,000-$50,000 | 8-12 weeks
Scalable Platforms and SaaS: $40,000-$90,000+ | 10-16 weeks
Enterprise Systems: $60,000+ | 16-24+ weeks
Minimum project: $2,500. Most projects: $12,000-$50,000+.

RETAINER PLANS (3-month minimum)
Essential: $3,000/mo | Growth: $5,000-$7,000/mo | Product Partner: $8,000-$12,000/mo | Dedicated Team: $12,000-$20,000+/mo

AUTOMATION ADD-ONS
n8n Workflow Setup: $3,000-$8,000 | Automation retainer: $750-$2,500/mo

PAYMENT TERMS
50% upfront / 50% before deployment. Large builds: 40/30/30 milestone option. Client owns 100% of code once paid in full.

KEY FAQS
- Fixed-price by scope. Always.
- Client owns all code once paid.
- Payment plans available.
- Mobile apps: Yes, iOS and Android.
- Minimum budget: $2,500. Most projects start at $12,000.
- Automation is optional and always priced separately.

HOW TO GET STARTED
Email build@northspecstudio.com, call +1 (413) 390-3673, or fill out the form at northspecstudio.com/contact.`;

// ── Tool handlers ─────────────────────────────────────────────────────────────

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "https://northspec-studio-production.up.railway.app";
const SITE    = process.env.NEXT_PUBLIC_SITE_URL  || "https://www.northspecstudio.com";

async function createContact(args) {
  const res = await fetch(`${BACKEND}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...args, source: "vapi-chatbot" }),
  });
  if (!res.ok) throw new Error(`createContact failed: ${await res.text()}`);
  return { success: true, message: "Contact saved." };
}

async function bookCall({ name, email, date, time, notes }) {
  const start = new Date(`${date}T${time}`);
  const end   = new Date(start.getTime() + 30 * 60 * 1000);
  const res = await fetch(`${SITE}/api/booking/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, start: start.toISOString(), end: end.toISOString(), notes: notes || "" }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "bookCall failed");
  return { success: true, message: `Call booked. Event ID: ${data.eventId}` };
}

async function submitProjectSpecs(args) {
  const res = await fetch(`${SITE}/api/request-call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "submitProjectSpecs failed");
  return { success: true, message: "Project specs submitted. We'll follow up within 24 hours." };
}

const toolHandlers = { createContact, bookCall, submitProjectSpecs };

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractReply(output) {
  if (!Array.isArray(output)) return null;
  const assistantMsg = [...output].reverse().find((m) => m.role === "assistant");
  if (!assistantMsg) return null;
  return Array.isArray(assistantMsg.content)
    ? assistantMsg.content.map((b) => b.text ?? b.content ?? "").join("")
    : assistantMsg.content ?? null;
}

function extractToolCalls(output) {
  if (!Array.isArray(output)) return [];
  return output
    .filter((m) => m.role === "tool_calls" || m.role === "assistant")
    .flatMap((m) => {
      if (Array.isArray(m.content)) {
        return m.content.filter((b) => b.type === "tool_call" || b.tool_call);
      }
      return [];
    });
}

async function callVapi(input, sessionId) {
  const res = await fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    },
    body: JSON.stringify({
      assistantId: process.env.VAPI_ASSISTANT_ID,
      input,
      ...(sessionId && { sessionId }),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`[vapi/chat] Vapi ${res.status}:`, err);
    throw new Error(`Vapi error (${res.status}): ${err}`);
  }

  return res.json();
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    if (!process.env.VAPI_API_KEY || !process.env.VAPI_ASSISTANT_ID) {
      return NextResponse.json({ error: "Vapi is not configured on the server." }, { status: 503 });
    }

    const { message, history = [], sessionId: incomingSessionId } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    let input = [
      { role: "system", content: siteContext },
      ...history.map(({ role, content }) => ({ role, content })),
      { role: "user", content: message },
    ];

    let currentSessionId = incomingSessionId;
    let reply = "";

    // Allow up to 5 tool-call rounds before giving up
    for (let round = 0; round < 5; round++) {
      const data = await callVapi(input, currentSessionId);
      currentSessionId = data.sessionId ?? currentSessionId;

      const output = data.output ?? [];

      // Check for a direct reply first
      const directReply = extractReply(output)
        ?? (typeof data.output === "string" ? data.output : null)
        ?? data.message
        ?? data.reply;

      // Find any tool calls in this response
      const toolCallItems = output.filter(
        (m) => m.role === "tool_calls" ||
               (m.role === "assistant" && Array.isArray(m.content) && m.content.some((b) => b.type === "tool_call"))
      );

      if (toolCallItems.length === 0) {
        // No tool calls — we have our final reply
        reply = directReply || "";
        break;
      }

      // Execute each tool call and collect results
      const toolResults = [];
      for (const item of toolCallItems) {
        const calls = Array.isArray(item.content)
          ? item.content.filter((b) => b.type === "tool_call")
          : [];

        for (const call of calls) {
          const toolName = call.tool_call?.function?.name ?? call.function?.name;
          const toolArgs = (() => {
            try {
              const raw = call.tool_call?.function?.arguments ?? call.function?.arguments ?? "{}";
              return typeof raw === "string" ? JSON.parse(raw) : raw;
            } catch { return {}; }
          })();
          const toolCallId = call.tool_call?.id ?? call.id;

          console.log(`[vapi/chat] calling tool: ${toolName}`, toolArgs);

          let result;
          const handler = toolHandlers[toolName];
          if (!handler) {
            result = { success: false, error: `Unknown tool: ${toolName}` };
          } else {
            try {
              result = await handler(toolArgs);
            } catch (err) {
              console.error(`[vapi/chat] tool ${toolName} error:`, err.message);
              result = { success: false, error: err.message };
            }
          }

          toolResults.push({
            role: "tool",
            content: [{ type: "tool_result", tool_call_id: toolCallId, content: JSON.stringify(result) }],
          });
        }
      }

      // Append the assistant's tool-call turn + our tool results, then loop
      input = [...input, ...toolCallItems, ...toolResults];
    }

    if (!reply) {
      return NextResponse.json({ error: "Empty response from assistant. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ reply, sessionId: currentSessionId ?? null });
  } catch (err) {
    console.error("[vapi/chat] error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
