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

  const totalSteps = 6;

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const nextStep = (e) => {
    e.preventDefault();
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

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
        <h3 className="text-2xl font-bold text-white font-times uppercase tracking-widest mb-4">Inquiry Received</h3>
        <p className="text-slate-400 font-medium italic">Our engineering team will review your specs and respond within 1 business day.</p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute -top-12 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand-gold"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="absolute -top-16 right-0 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] font-times">
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
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">01 / Identity</h3>
                <p className="text-xs text-slate-500 font-medium italic">Let's start with the basics.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Full Name</label>
                  <input 
                    value={form.fullName} 
                    onChange={(e) => updateField("fullName", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium" 
                    placeholder="John Doe"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Work Email</label>
                  <input 
                    type="email" 
                    value={form.workEmail} 
                    onChange={(e) => updateField("workEmail", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium" 
                    placeholder="john@company.com"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Phone Number</label>
                  <input 
                    value={form.phoneNumber} 
                    onChange={(e) => updateField("phoneNumber", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium" 
                    placeholder="+1 (555) 000-0000" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Company / Project Name</label>
                  <input 
                    value={form.companyOrProjectName} 
                    onChange={(e) => updateField("companyOrProjectName", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium" 
                    placeholder="Acme Corp"
                    required 
                  />
                </div>
              </div>
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
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">02 / Project Fit</h3>
                <p className="text-xs text-slate-500 font-medium italic">Define the scope of engineering.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Project Category</label>
                  <select 
                    value={form.projectType} 
                    onChange={(e) => updateField("projectType", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                    required
                  >
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="SaaS / Web App" className="bg-brand-dark">SaaS / Web App</option>
                    <option value="Business Website with Backend" className="bg-brand-dark">Business Website with Backend</option>
                    <option value="Internal Tool / Dashboard" className="bg-brand-dark">Internal Tool / Dashboard</option>
                    <option value="Automation-first system" className="bg-brand-dark">Automation-first system</option>
                    <option value="Not sure yet" className="bg-brand-dark">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Build Goals</label>
                  <p className="text-[10px] text-slate-500 mb-3 italic tracking-tight">Describe the problem you’re solving and what success looks like.</p>
                  <textarea 
                    value={form.buildGoal} 
                    onChange={(e) => updateField("buildGoal", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium min-h-[150px]" 
                    placeholder="We need to automate our internal billing lifecycle..."
                    required 
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
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">03 / Budget Reality</h3>
                <p className="text-xs text-slate-500 font-medium italic">Alignment on investment range.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Investment Range</label>
                  <select 
                    value={form.budgetRange} 
                    onChange={(e) => updateField("budgetRange", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                    required
                  >
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Under $2,500" className="bg-brand-dark">Under $2,500</option>
                    <option value="$2,500 – $4,000" className="bg-brand-dark">$2,500 – $4,000</option>
                    <option value="$4,000 – $7,500" className="bg-brand-dark">$4,000 – $7,500</option>
                    <option value="$7,500 – $12,000" className="bg-brand-dark">$7,500 – $12,000</option>
                    <option value="$12,000+" className="bg-brand-dark">$12,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Approval Status</label>
                  <select 
                    value={form.budgetApproved} 
                    onChange={(e) => updateField("budgetApproved", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                    required
                  >
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Yes" className="bg-brand-dark">Yes</option>
                    <option value="Needs internal approval" className="bg-brand-dark">Needs internal approval</option>
                    <option value="Not yet" className="bg-brand-dark">Not yet</option>
                  </select>
                </div>
              </div>
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
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">04 / Automation</h3>
                <p className="text-xs text-slate-500 font-medium italic">Efficiency and workflow intelligence.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Automation Interest</label>
                  <select 
                    value={form.automationInterest} 
                    onChange={(e) => updateField("automationInterest", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                    required
                  >
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Yes, I already know what workflows I need" className="bg-brand-dark">Yes, I already know what workflows I need</option>
                    <option value="Yes, but I need guidance" className="bg-brand-dark">Yes, but I need guidance</option>
                    <option value="Maybe later" className="bg-brand-dark">Maybe later</option>
                    <option value="No" className="bg-brand-dark">No</option>
                  </select>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-2">Technical Acknowledgement</p>
                  {[
                    { key: "confirmAutomationScopedPricedSeparately", label: "Automation is scoped/priced separately" },
                    { key: "confirmAutomationStartsAt1500", label: "Automation setup starts at $1,500" },
                    { key: "confirmEachWorkflowQuotedIndividually", label: "Each workflow is quoted individually" }
                  ].map((item) => (
                    <label key={item.key} className="flex items-start gap-4 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={form[item.key]} 
                        onChange={(e) => updateField(item.key, e.target.checked)} 
                        className="mt-1 accent-brand-gold bg-brand-dark border-white/10" 
                        required 
                      />
                      <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">{item.label}</span>
                    </label>
                  ))}
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
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">05 / Timeline</h3>
                <p className="text-xs text-slate-500 font-medium italic">Project urgency and scheduling.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Deployment Target</label>
                  <select 
                    value={form.startTimeline} 
                    onChange={(e) => updateField("startTimeline", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                    required
                  >
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Immediately" className="bg-brand-dark">Immediately</option>
                    <option value="Within 30 days" className="bg-brand-dark">Within 30 days</option>
                    <option value="1–3 months" className="bg-brand-dark">1–3 months</option>
                    <option value="Just exploring" className="bg-brand-dark">Just exploring</option>
                  </select>
                </div>
              </div>
            </motion.section>
          )}

          {step === 6 && (
            <motion.section 
              key="step6"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">06 / Authority</h3>
                <p className="text-xs text-slate-500 font-medium italic">Final confirmation of stakeholder status.</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">Decision Maker Status</label>
                  <select 
                    value={form.decisionAuthority} 
                    onChange={(e) => updateField("decisionAuthority", e.target.value)} 
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium appearance-none"
                    required
                  >
                    <option value="" className="bg-brand-dark">Select one</option>
                    <option value="Yes" className="bg-brand-dark">Yes</option>
                    <option value="No, but I influence the decision" className="bg-brand-dark">No, but I influence the decision</option>
                    <option value="No" className="bg-brand-dark">No</option>
                  </select>
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-medium italic mt-4">{error}</p>}
            </motion.section>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
          {step > 1 && (
            <Button 
              onClick={prevStep} 
              variant="outline" 
              className="w-full sm:w-1/3 font-times uppercase tracking-widest text-xs py-4"
            >
              Previous
            </Button>
          )}
          <Button 
            type="submit" 
            variant="brand" 
            className={`${step === 1 ? 'w-full' : 'flex-grow'} font-times uppercase tracking-widest text-xs py-4`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Processing..." : step === totalSteps ? "Submit Specs" : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
