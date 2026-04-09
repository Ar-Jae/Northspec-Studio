"use client";

import { useState } from "react";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";

const initialForm = {
  fullName: "",
  workEmail: "",
  phoneNumber: "",
  companyOrProjectName: "",
  projectType: "",
  buildGoal: "",
  budgetRange: "",
  budgetApproved: "",
  automationInterest: "",
  confirmAutomationScopedPricedSeparately: false,
  confirmAutomationStartsAt1500: false,
  confirmEachWorkflowQuotedIndividually: false,
  startTimeline: "",
  decisionAuthority: "",
};

export default function RequestCallPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/request-call", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit application");

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="bg-brand-dark min-h-[40vh]">
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Request a Call"
              title="Project Application"
              description="Complete this form and we’ll review fit, then follow up quickly."
              align="center"
            />

            <form onSubmit={onSubmit} className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8">
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section 1: Basics</h3>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Full Name</label>
                  <input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Work Email</label>
                  <input type="email" value={form.workEmail} onChange={(e) => updateField("workEmail", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Phone Number</label>
                  <input value={form.phoneNumber} onChange={(e) => updateField("phoneNumber", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" placeholder="+1..." required />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Company / Project Name</label>
                  <input value={form.companyOrProjectName} onChange={(e) => updateField("companyOrProjectName", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section 2: Project Fit</h3>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">What best describes your project?</label>
                  <select value={form.projectType} onChange={(e) => updateField("projectType", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required>
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="SaaS / Web App" className="bg-brand-dark">SaaS / Web App</option>
                    <option value="Business Website with Backend" className="bg-brand-dark">Business Website with Backend</option>
                    <option value="Internal Tool / Dashboard" className="bg-brand-dark">Internal Tool / Dashboard</option>
                    <option value="Automation-first system" className="bg-brand-dark">Automation-first system</option>
                    <option value="Not sure yet" className="bg-brand-dark">Not sure yet</option>
                    <option value="Just a basic website" className="bg-brand-dark">Just a basic website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">What are you looking to build?</label>
                  <p className="text-xs text-slate-400 mb-2">Describe the problem you’re solving and what success looks like.</p>
                  <textarea value={form.buildGoal} onChange={(e) => updateField("buildGoal", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" rows={4} required />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section 3: Budget Reality Check</h3>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">What budget range are you prepared to invest?</label>
                  <select value={form.budgetRange} onChange={(e) => updateField("budgetRange", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required>
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Under $8,000" className="bg-brand-dark">Under $8,000</option>
                    <option value="$8,000. $15,000" className="bg-brand-dark">$8,000. $15,000</option>
                    <option value="$15,000. $30,000" className="bg-brand-dark">$15,000. $30,000</option>
                    <option value="$30,000. $60,000" className="bg-brand-dark">$30,000. $60,000</option>
                    <option value="$60,000. $100,000" className="bg-brand-dark">$60,000. $100,000</option>
                    <option value="$100,000+" className="bg-brand-dark">$100,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Is this budget already approved?</label>
                  <select value={form.budgetApproved} onChange={(e) => updateField("budgetApproved", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required>
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Yes" className="bg-brand-dark">Yes</option>
                    <option value="Needs internal approval" className="bg-brand-dark">Needs internal approval</option>
                    <option value="Not yet" className="bg-brand-dark">Not yet</option>
                  </select>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section 4: Automation Awareness</h3>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Are you interested in automation?</label>
                  <select value={form.automationInterest} onChange={(e) => updateField("automationInterest", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required>
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Yes, I already know what workflows I need" className="bg-brand-dark">Yes, I already know what workflows I need</option>
                    <option value="Yes, but I need guidance" className="bg-brand-dark">Yes, but I need guidance</option>
                    <option value="Maybe later" className="bg-brand-dark">Maybe later</option>
                    <option value="No" className="bg-brand-dark">No</option>
                  </select>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-sm text-slate-300">Please confirm you understand the following:</p>
                  <label className="flex items-start gap-3 text-sm text-slate-300">
                    <input type="checkbox" checked={form.confirmAutomationScopedPricedSeparately} onChange={(e) => updateField("confirmAutomationScopedPricedSeparately", e.target.checked)} className="mt-1" required />
                    <span>Automation is scoped and priced separately</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-slate-300">
                    <input type="checkbox" checked={form.confirmAutomationStartsAt1500} onChange={(e) => updateField("confirmAutomationStartsAt1500", e.target.checked)} className="mt-1" required />
                    <span>Automation setup starts at $3,000 (retainer) or as a custom-scoped project</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-slate-300">
                    <input type="checkbox" checked={form.confirmEachWorkflowQuotedIndividually} onChange={(e) => updateField("confirmEachWorkflowQuotedIndividually", e.target.checked)} className="mt-1" required />
                    <span>Each workflow is quoted individually</span>
                  </label>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section 5: Timeline & Urgency</h3>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">When are you looking to start?</label>
                  <select value={form.startTimeline} onChange={(e) => updateField("startTimeline", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required>
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Immediately" className="bg-brand-dark">Immediately</option>
                    <option value="Within 30 days" className="bg-brand-dark">Within 30 days</option>
                    <option value="1–3 months" className="bg-brand-dark">1–3 months</option>
                    <option value="Just exploring" className="bg-brand-dark">Just exploring</option>
                  </select>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section 6: Authority Check</h3>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Are you the decision-maker for this project?</label>
                  <select value={form.decisionAuthority} onChange={(e) => updateField("decisionAuthority", e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 text-white p-3" required>
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Yes" className="bg-brand-dark">Yes</option>
                    <option value="No, but I influence the decision" className="bg-brand-dark">No, but I influence the decision</option>
                    <option value="No" className="bg-brand-dark">No</option>
                  </select>
                </div>
              </section>

              {status === "success" ? <p className="text-green-400 text-sm">Application submitted successfully.</p> : null}
              {status === "error" ? <p className="text-red-400 text-sm">{error}</p> : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg px-5 py-3 bg-gradient-to-r from-brand-gold to-[#B8860B] text-brand-dark font-semibold disabled:opacity-60"
              >
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
