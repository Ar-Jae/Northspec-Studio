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

export async function POST(req) {
  try {
    if (!process.env.VAPI_API_KEY || !process.env.VAPI_ASSISTANT_ID) {
      return NextResponse.json({ error: "Vapi is not configured on the server." }, { status: 503 });
    }

    const { message, history = [], sessionId } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const input = [
      { role: "system", content: siteContext },
      ...history.map(({ role, content }) => ({ role, content })),
      { role: "user", content: message },
    ];

    const body = {
      assistantId: process.env.VAPI_ASSISTANT_ID,
      input,
      ...(sessionId && { sessionId }),
    };

    const vapiRes = await fetch("https://api.vapi.ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!vapiRes.ok) {
      const err = await vapiRes.text();
      console.error(`[vapi/chat] Vapi ${vapiRes.status}:`, err);
      return NextResponse.json({ error: `Vapi error (${vapiRes.status}): ${err}` }, { status: vapiRes.status });
    }

    const data = await vapiRes.json();

    let reply = "";
    if (Array.isArray(data.output)) {
      const assistantMsg = [...data.output].reverse().find((m) => m.role === "assistant");
      if (assistantMsg) {
        reply = Array.isArray(assistantMsg.content)
          ? assistantMsg.content.map((b) => b.text ?? b.content ?? "").join("")
          : assistantMsg.content ?? "";
      }
    } else if (typeof data.output === "string") {
      reply = data.output;
    } else if (data.message) {
      reply = data.message;
    } else if (data.reply) {
      reply = data.reply;
    }

    if (!reply) {
      return NextResponse.json({ error: "Empty response from assistant. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ reply, sessionId: data.sessionId ?? sessionId ?? null });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
