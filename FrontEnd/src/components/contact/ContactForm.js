"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";

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

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const totalSteps = 5;

  // Only Name, Email (step 1) and Budget (step 3) are required
  function isStepValid() {
    switch (step) {
      case 1:
        return form.fullName && form.workEmail;
      case 3:
        return form.budgetRange && form.budgetApproved && form.automationInterest;
      case 5:
        return form.confirmAutomationScopedPricedSeparately && form.confirmAutomationStartsAt1500 && form.confirmEachWorkflowQuotedIndividually;
      default:
        return true;
    }
  }

  function isStepRequired() {
    return step === 1 || step === 3 || step === 5;
  }

  function updateField(key, value) {
    if (key === "phoneNumber") {
      // Remove all non-digits
      const digits = value.replace(/\D/g, "");
      
      // Limit to 10 digits
      const limited = digits.slice(0, 10);
      
      // Apply mask: (123) 456-7890
      let formatted = "";
      if (limited.length > 0) {
        if (limited.length <= 3) {
          formatted = `(${limited}`;
        } else if (limited.length <= 6) {
          formatted = `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
        } else {
          formatted = `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
        }
      }
      
      setForm((prev) => ({ ...prev, [key]: formatted }));
      return;
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const nextStep = (e) => {
    e.preventDefault();
    if (isStepValid()) {
      if (step < totalSteps) setStep(step + 1);
      setError("");
    } else {
      setError("Please fill out the required fields to continue.");
    }
  };

  const skipStep = (e) => {
    e.preventDefault();
    if (step < totalSteps) setStep(step + 1);
    setError("");
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.workEmail ||
      !form.budgetRange ||
      !form.budgetApproved ||
      !form.automationInterest ||
      !form.confirmAutomationScopedPricedSeparately ||
      !form.confirmAutomationStartsAt1500 ||
      !form.confirmEachWorkflowQuotedIndividually
    ) {
      setError("Please complete all required fields and terms.");
      return;
    }
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/request-call", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold/20">
          <svg className="w-10 h-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white font-times uppercase tracking-widest mb-4">Request Received</h3>
        <p className="text-slate-400 font-medium italic">We&apos;ll review your project and follow up within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Timing + filter copy */}
      <div className="mb-8 space-y-1">
        <p className="text-xs text-slate-500 font-medium italic">This takes about 1–2 minutes. We&apos;ll review your project and follow up within 24 hours.</p>
        <p className="text-[10px] text-brand-gold/60 font-medium uppercase tracking-widest font-times">We typically work on projects starting at $10,000+</p>
      </div>

      {/* Progress Bar */}
      <div className="absolute -top-4 left-0 w-full h-px bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-brand-gold"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="absolute -top-8 right-0 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] font-times">
        Step {step} / {totalSteps}
      </div>

      <form onSubmit={step === totalSteps ? onSubmit : nextStep} className="space-y-8" noValidate>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">01 / Contact</h3>
                <p className="text-xs text-slate-500 font-medium italic">Name and email are required. Everything else is optional.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className={`w-full rounded-xl bg-white/[0.03] border ${error && !form.fullName ? "border-red-500/50" : "border-white/10"} text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
                    Email <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.workEmail}
                    onChange={(e) => updateField("workEmail", e.target.value)}
                    className={`w-full rounded-xl bg-white/[0.03] border ${error && !form.workEmail ? "border-red-500/50" : "border-white/10"} text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium`}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Phone <span className="text-slate-600">(optional)</span></label>
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium text-xs sm:text-sm lg:text-base leading-relaxed tracking-wider"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Company <span className="text-slate-600">(optional)</span></label>
                  <input
                    value={form.companyOrProjectName}
                    onChange={(e) => updateField("companyOrProjectName", e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              {error && step === 1 && <p className="text-red-400 text-[10px] font-medium italic uppercase tracking-widest">{error}</p>}
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">02 / Project</h3>
                <p className="text-xs text-slate-500 font-medium italic">Tell us about the problem you&apos;re solving. You can skip this if you prefer.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Project Category <span className="text-slate-600">(optional)</span></label>
                  <select
                    value={form.projectType}
                    onChange={(e) => updateField("projectType", e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                  >
                    <option value="" className="bg-brand-dark text-slate-400">Select one</option>
                    <option value="SaaS / Web App" className="bg-brand-dark">SaaS / Web App</option>
                    <option value="Business Website with Backend" className="bg-brand-dark">Business Website with Backend</option>
                    <option value="Internal Tool / Dashboard" className="bg-brand-dark">Internal Tool / Dashboard</option>
                    <option value="Workflow Automation" className="bg-brand-dark">Workflow Automation</option>
                    <option value="Mobile App" className="bg-brand-dark">Mobile App</option>
                    <option value="System Integrations" className="bg-brand-dark">System Integrations</option>
                    <option value="Not sure yet" className="bg-brand-dark">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">What are you trying to build or fix? <span className="text-slate-600">(optional)</span></label>
                  <p className="text-[10px] text-slate-500 mb-3 italic tracking-tight">Describe the problem and what success looks like.</p>
                  <textarea
                    value={form.buildGoal}
                    onChange={(e) => updateField("buildGoal", e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium min-h-[130px]"
                    placeholder="We need to automate our billing workflow and reduce manual entry..."
                  />
                </div>
              </div>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">03 / Budget</h3>
                <p className="text-xs text-slate-500 font-medium italic">Helps us scope the right engagement for you.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
                    Investment Range <span className="text-brand-gold">*</span>
                  </label>
                  <select
                    value={form.budgetRange}
                    onChange={(e) => updateField("budgetRange", e.target.value)}
                    className={`w-full rounded-xl bg-white/[0.03] border ${error && !form.budgetRange ? "border-red-500/50" : "border-white/10"} text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none`}
                  >
                    <option value="" className="bg-brand-dark text-slate-400">Select investment range</option>
                    <option value="$10,000 – $20,000" className="bg-brand-dark">$10,000 – $20,000</option>
                    <option value="$20,000 – $50,000" className="bg-brand-dark">$20,000 – $50,000</option>
                    <option value="$50,000+" className="bg-brand-dark">$50,000+</option>
                    <option value="Not sure yet" className="bg-brand-dark">Not sure yet / Exploring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
                    Has this budget been approved? <span className="text-brand-gold">*</span>
                  </label>
                  <select
                    value={form.budgetApproved}
                    onChange={(e) => updateField("budgetApproved", e.target.value)}
                    className={`w-full rounded-xl bg-white/[0.03] border ${error && !form.budgetApproved ? "border-red-500/50" : "border-white/10"} text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none`}
                  >
                    <option value="" className="bg-brand-dark text-slate-400">Select one</option>
                    <option value="Yes" className="bg-brand-dark">Yes</option>
                    <option value="Pending Approval" className="bg-brand-dark">Pending Approval</option>
                    <option value="No / Just exploring" className="bg-brand-dark">No / Just exploring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
                    Are you interested in workflow automation? <span className="text-brand-gold">*</span>
                  </label>
                  <select
                    value={form.automationInterest}
                    onChange={(e) => updateField("automationInterest", e.target.value)}
                    className={`w-full rounded-xl bg-white/[0.03] border ${error && !form.automationInterest ? "border-red-500/50" : "border-white/10"} text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none`}
                  >
                    <option value="" className="bg-brand-dark text-slate-400">Select one</option>
                    <option value="Yes, highly interested" className="bg-brand-dark">Yes, highly interested</option>
                    <option value="Just for this project" className="bg-brand-dark">Just for this project</option>
                    <option value="Not at this time" className="bg-brand-dark">Not at this time</option>
                  </select>
                </div>
              </div>
              {error && step === 3 && <p className="text-red-400 text-[10px] font-medium italic uppercase tracking-widest">{error}</p>}
            </motion.section>
          )}

          {step === 4 && (
            <motion.section
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">04 / Timeline</h3>
                <p className="text-xs text-slate-500 font-medium italic">Optional, skip if you&apos;re not sure yet.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">When are you looking to start? <span className="text-slate-600">(optional)</span></label>
                  <select
                    value={form.startTimeline}
                    onChange={(e) => updateField("startTimeline", e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                  >
                    <option value="" className="bg-brand-dark text-slate-400">Select one</option>
                    <option value="As soon as possible" className="bg-brand-dark">As soon as possible</option>
                    <option value="Within 30 days" className="bg-brand-dark">Within 30 days</option>
                    <option value="1–3 months" className="bg-brand-dark">1–3 months</option>
                    <option value="Just exploring" className="bg-brand-dark">Just exploring</option>
                  </select>
                </div>
              </div>
            </motion.section>
          )}

          {step === 5 && (
            <motion.section
              key="step5"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">05 / Authority</h3>
                <p className="text-xs text-slate-500 font-medium italic">Optional, helps us prepare the right conversation.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Are you the decision maker? <span className="text-slate-600">(optional)</span></label>
                  <select
                    value={form.decisionAuthority}
                    onChange={(e) => updateField("decisionAuthority", e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold/50 transition-colors uppercase tracking-widest font-times"
                  >
                    <option value="" className="bg-brand-dark text-slate-400">Select one</option>
                    <option value="Yes" className="bg-brand-dark">Yes, I am the decision maker</option>
                    <option value="No" className="bg-brand-dark">No, I am representing someone else</option>
                    <option value="Other" className="bg-brand-dark">Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 space-y-4 border-t border-white/5">
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] font-times mb-4">Automation Engineering Terms</p>
                
                <div className="flex items-start gap-3 group cursor-pointer" onClick={() => updateField("confirmAutomationScopedPricedSeparately", !form.confirmAutomationScopedPricedSeparately)}>
                  <div className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-colors ${form.confirmAutomationScopedPricedSeparately ? 'bg-brand-gold border-brand-gold' : 'border-white/20 bg-white/[0.03]'}`}>
                    {form.confirmAutomationScopedPricedSeparately && <svg className="w-3 h-3 text-brand-dark" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium italic leading-tight select-none">I understand that automation engineering is scoped and priced separately from other development work. <span className="text-brand-gold font-bold">*</span></p>
                </div>

                <div className="flex items-start gap-3 group cursor-pointer" onClick={() => updateField("confirmAutomationStartsAt1500", !form.confirmAutomationStartsAt1500)}>
                  <div className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-colors ${form.confirmAutomationStartsAt1500 ? 'bg-brand-gold border-brand-gold' : 'border-white/20 bg-white/[0.03]'}`}>
                    {form.confirmAutomationStartsAt1500 && <svg className="w-3 h-3 text-brand-dark" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                  </div>
                  <p className={`text-[11px] text-slate-400 font-medium italic leading-tight select-none ${form.confirmAutomationStartsAt1500 ? 'text-brand-gold' : ''}`}>I understand automation setups start at $3,000/mo or as custom-scoped projects. <span className="text-brand-gold font-bold">*</span></p>
                </div>

                <div className="flex items-start gap-3 group cursor-pointer" onClick={() => updateField("confirmEachWorkflowQuotedIndividually", !form.confirmEachWorkflowQuotedIndividually)}>
                  <div className={`mt-0.5 w-4 h-4 rounded border flex-none flex items-center justify-center transition-colors ${form.confirmEachWorkflowQuotedIndividually ? 'bg-brand-gold border-brand-gold' : 'border-white/20 bg-white/[0.03]'}`}>
                    {form.confirmEachWorkflowQuotedIndividually && <svg className="w-3 h-3 text-brand-dark" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                  </div>
                  <p className={`text-[11px] text-slate-400 font-medium italic leading-tight select-none ${form.confirmEachWorkflowQuotedIndividually ? 'text-brand-gold' : ''}`}>I understand each specific workflow automation is quoted and delivered individually. <span className="text-brand-gold font-bold">*</span></p>
                </div>
              </div>

              {error && step === 5 && <p className="text-red-400 text-[10px] font-medium italic uppercase tracking-widest mt-4">{error}</p>}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 pt-8">
          {step > 1 && (
            <Button
              onClick={prevStep}
              variant="outline-dark"
              className="w-full sm:w-auto sm:px-8 font-times uppercase tracking-widest text-xs py-4"
              type="button"
            >
              Back
            </Button>
          )}
          <div className="flex flex-1 gap-3">
            {!isStepRequired() && step < totalSteps && (
              <Button
                onClick={skipStep}
                variant="outline-dark"
                className="flex-1 font-times uppercase tracking-widest text-xs py-4 text-slate-500 border-white/5 hover:border-white/10"
                type="button"
              >
                Skip
              </Button>
            )}
            <Button
              type="submit"
              variant="brand"
              className={`flex-1 font-times uppercase tracking-widest text-xs py-4 ${status === "error" ? "bg-red-500/20 text-red-300 border-red-500/50" : ""}`}
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Sending..."
                : step === totalSteps
                ? "Request a Project Review"
                : "Continue"}
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}
