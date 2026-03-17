import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://n8n-qhlu.srv1059778.hstgr.cloud/webhook/0cb1a204-1900-4e84-8114-0215c50f3104";

export async function POST(req) {
  try {
    const payload = await req.json();

    const required = [
      "fullName",
      "workEmail",
      "phoneNumber",
      "companyOrProjectName",
      "projectType",
      "buildGoal",
      "budgetRange",
      "budgetApproved",
      "automationInterest",
      "startTimeline",
      "decisionAuthority",
    ];

    for (const key of required) {
      if (!payload[key]) {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    }

    if (
      !payload.confirmAutomationScopedPricedSeparately ||
      !payload.confirmAutomationStartsAt1500 ||
      !payload.confirmEachWorkflowQuotedIndividually
    ) {
      return NextResponse.json({ error: "All automation confirmations must be accepted" }, { status: 400 });
    }

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "northspecstudio.com",
        event: "request_call_application_submitted",
        submittedAt: new Date().toISOString(),
        ...payload,
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
