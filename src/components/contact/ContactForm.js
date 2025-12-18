"use client";

import { useMemo, useState } from "react";
import Button from "../Button";
import { cn } from "../../lib/utils";
import site from "../../content/site";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

async function submitContactRequest(payload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: data?.error || "Request failed" };
  }
  return { ok: true };
}

const PROJECT_TYPES = [
  "SaaS / Web App",
  "Business Website with Backend",
  "Internal Tool / Dashboard",
  "Automation-first system",
  "Not sure yet",
  "Just a basic website",
];

const BUDGET_RANGES = [
  "Under $2,500",
  "$2,500 – $4,000",
  "$4,000 – $7,500",
  "$7,500 – $12,000",
  "$12,000+",
];

const BUDGET_STATUSES = ["Yes", "Needs internal approval", "Not yet"];

const AUTOMATION_INTERESTS = [
  "Yes, I already know what workflows I need",
  "Yes, but I need guidance",
  "Maybe later",
  "No",
];

const TIMELINES = ["Immediately", "Within 30 days", "1–3 months", "Just exploring"];

const DECISION_MAKERS = ["Yes", "No, but I influence the decision", "No"];

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    projectUrl: "",
    projectType: "",
    projectDescription: "",
    budget: "",
    budgetApproved: "",
    automationInterest: "",
    automationUnderstanding: {
      scoped: false,
      setup: false,
      quoted: false,
    },
    timeline: "",
    decisionMaker: "",
    // Honeypot
    website: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, rejected, error
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => {
    const next = {};

    if (!values.name.trim()) next.name = "Required";
    if (!isValidEmail(values.email)) next.email = "Valid email required";
    if (!values.company.trim()) next.company = "Required";
    if (!values.projectType) next.projectType = "Required";
    if (!values.projectDescription.trim()) next.projectDescription = "Required";
    if (!values.budget) next.budget = "Required";
    if (!values.budgetApproved) next.budgetApproved = "Required";
    if (!values.automationInterest) next.automationInterest = "Required";
    
    if (
      !values.automationUnderstanding.scoped ||
      !values.automationUnderstanding.setup ||
      !values.automationUnderstanding.quoted
    ) {
      next.automationUnderstanding = "Please confirm all points";
    }

    if (!values.timeline) next.timeline = "Required";
    if (!values.decisionMaker) next.decisionMaker = "Required";

    return next;
  }, [values]);

  async function onSubmit(e) {
    e.preventDefault();
    setServerError("");

    // Mark all as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      const firstError = document.querySelector("[aria-invalid='true']");
      firstError?.focus();
      return;
    }

    // Auto-reject logic - still submit to backend for logging
    const isRejected =
      values.projectType === "Just a basic website" ||
      values.budget === "Under $2,500" ||
      values.timeline === "Just exploring" ||
      values.decisionMaker === "No";

    try {
      setStatus("loading");
      // Always submit to backend (n8n webhook) for logging
      const res = await submitContactRequest({ ...values, _rejected: isRejected });
      
      if (!res?.ok) throw new Error(res?.error || "Request failed");

      // Show appropriate UI based on qualification
      if (isRejected) {
        setStatus("rejected");
      } else {
        setStatus("success");
      }
      
      window.scrollTo({ top: 0, behavior: "smooth" });
      setValues({
        name: "",
        email: "",
        company: "",
        projectUrl: "",
        projectType: "",
        projectDescription: "",
        budget: "",
        budgetApproved: "",
        automationInterest: "",
        automationUnderstanding: { scoped: false, setup: false, quoted: false },
        timeline: "",
        decisionMaker: "",
        whyUs: "",
        website: "",
      });
      setTouched({});
    } catch (err) {
      setStatus("error");
      setServerError(
        "Something went wrong. Please try again, or email us directly."
      );
    }
  }

  function onChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function onCheckboxChange(key) {
    setValues((v) => ({
      ...v,
      automationUnderstanding: {
        ...v.automationUnderstanding,
        [key]: !v.automationUnderstanding[key],
      },
    }));
  }

  if (status === "success") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">You're a great fit!</h3>
          <p className="mt-2 text-green-200">
            Let's schedule a quick discovery call to discuss your project.
          </p>
        </div>
        
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-white flex items-center gap-2">
                <svg className="h-5 w-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Pick a time that works for you
              </h4>
              <p className="text-sm text-slate-400 mt-1">30-minute discovery call</p>
            </div>
            <a 
              href={site.calendarUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-gold hover:text-white hover:underline"
            >
              Open in new tab &rarr;
            </a>
          </div>
          <div className="calendar-embed" style={{ minHeight: '650px' }}>
            <iframe
              src={`${site.calendarUrl}?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=c6a668`}
              width="100%"
              height="650"
              frameBorder="0"
              title="Schedule a discovery call"
              className="w-full"
            />
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-500">
          Can't find a time that works?{" "}
          <a href="mailto:hello@northspecstudio.com" className="text-brand-gold hover:underline">
            Email us directly
          </a>
        </p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">Thanks for your interest.</h3>
        <p className="mt-2 text-slate-400">
          Based on your responses, this project isn’t a fit at the moment.
        </p>
        <p className="mt-1 text-slate-400">We wish you the best with your build.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border border-brand-gold/30 p-6 sm:p-8" noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={values.website}
          onChange={(e) => onChange("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Section 1: Basics */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white font-serif">Section 1: Basics</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={cn(
                "block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm placeholder:text-slate-500",
                touched.name && errors.name && "border-red-500/50 focus:border-red-500 focus:ring-red-500"
              )}
              aria-invalid={touched.name && !!errors.name}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={cn(
                "block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm placeholder:text-slate-500",
                touched.email && errors.email && "border-red-500/50 focus:border-red-500 focus:ring-red-500"
              )}
              aria-invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium text-slate-300">
              Company / Project Name
            </label>
            <input
              id="company"
              type="text"
              value={values.company}
              onChange={(e) => onChange("company", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, company: true }))}
              className={cn(
                "block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm placeholder:text-slate-500",
                touched.company && errors.company && "border-red-500/50 focus:border-red-500 focus:ring-red-500"
              )}
              aria-invalid={touched.company && !!errors.company}
            />
            {touched.company && errors.company && (
              <p className="text-xs text-red-400">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="projectUrl" className="block text-sm font-medium text-slate-300">
              Website (if any)
            </label>
            <input
              id="projectUrl"
              type="text"
              value={values.projectUrl}
              onChange={(e) => onChange("projectUrl", e.target.value)}
              className="block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Project Fit */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white font-serif">Section 2: Project Fit</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            What best describes your project?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROJECT_TYPES.map((type) => (
              <label
                key={type}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  values.projectType === type
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-white/10 hover:bg-white/5 text-slate-300"
                )}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={values.projectType === type}
                  onChange={(e) => onChange("projectType", e.target.value)}
                  className="h-4 w-4 border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                />
                {type}
              </label>
            ))}
          </div>
          {touched.projectType && errors.projectType && (
            <p className="text-xs text-red-400">{errors.projectType}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-300">
            What are you looking to build?
          </label>
          <p className="text-xs text-slate-400">
            Describe the problem you’re solving and what success looks like.
          </p>
          <textarea
            id="projectDescription"
            rows={4}
            value={values.projectDescription}
            onChange={(e) => onChange("projectDescription", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, projectDescription: true }))}
            className={cn(
              "block w-full rounded-lg border-white/10 bg-white/5 text-white shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm placeholder:text-slate-500",
              touched.projectDescription && errors.projectDescription && "border-red-500/50 focus:border-red-500 focus:ring-red-500"
            )}
            aria-invalid={touched.projectDescription && !!errors.projectDescription}
          />
          {touched.projectDescription && errors.projectDescription && (
            <p className="text-xs text-red-400">{errors.projectDescription}</p>
          )}
        </div>
      </div>

      {/* Section 3: Budget Reality Check */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Section 3: Budget Reality Check</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            What budget range are you prepared to invest?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {BUDGET_RANGES.map((range) => (
              <label
                key={range}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  values.budget === range
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-white/10 hover:bg-white/5 text-slate-300"
                )}
              >
                <input
                  type="radio"
                  name="budget"
                  value={range}
                  checked={values.budget === range}
                  onChange={(e) => onChange("budget", e.target.value)}
                  className="h-4 w-4 border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                />
                {range}
              </label>
            ))}
          </div>
          {touched.budget && errors.budget && (
            <p className="text-xs text-red-400">{errors.budget}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Is this budget already approved?
          </label>
          <div className="flex flex-wrap gap-4">
            {BUDGET_STATUSES.map((status) => (
              <label key={status} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="budgetApproved"
                  value={status}
                  checked={values.budgetApproved === status}
                  onChange={(e) => onChange("budgetApproved", e.target.value)}
                  className="h-4 w-4 border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                />
                {status}
              </label>
            ))}
          </div>
          {touched.budgetApproved && errors.budgetApproved && (
            <p className="text-xs text-red-400">{errors.budgetApproved}</p>
          )}
        </div>
      </div>

      {/* Section 4: Automation Awareness */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Section 4: Automation Awareness</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Are you interested in automation (n8n)?
          </label>
          <div className="space-y-2">
            {AUTOMATION_INTERESTS.map((interest) => (
              <label key={interest} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="automationInterest"
                  value={interest}
                  checked={values.automationInterest === interest}
                  onChange={(e) => onChange("automationInterest", e.target.value)}
                  className="h-4 w-4 border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                />
                {interest}
              </label>
            ))}
          </div>
          {touched.automationInterest && errors.automationInterest && (
            <p className="text-xs text-red-400">{errors.automationInterest}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Please confirm you understand the following:
          </label>
          <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={values.automationUnderstanding.scoped}
                onChange={() => onCheckboxChange("scoped")}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
              />
              <span>Automation is scoped and priced separately</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={values.automationUnderstanding.setup}
                onChange={() => onCheckboxChange("setup")}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
              />
              <span>n8n setup starts at $1,500</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={values.automationUnderstanding.quoted}
                onChange={() => onCheckboxChange("quoted")}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
              />
              <span>Each workflow is quoted individually</span>
            </label>
          </div>
          {touched.automationUnderstanding && errors.automationUnderstanding && (
            <p className="text-xs text-red-400">{errors.automationUnderstanding}</p>
          )}
        </div>
      </div>

      {/* Section 5: Timeline & Urgency */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Section 5: Timeline & Urgency</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            When are you looking to start?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {TIMELINES.map((time) => (
              <label
                key={time}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  values.timeline === time
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-white/10 hover:bg-white/5 text-slate-300"
                )}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={time}
                  checked={values.timeline === time}
                  onChange={(e) => onChange("timeline", e.target.value)}
                  className="h-4 w-4 border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                />
                {time}
              </label>
            ))}
          </div>
          {touched.timeline && errors.timeline && (
            <p className="text-xs text-red-400">{errors.timeline}</p>
          )}
        </div>
      </div>

      {/* Section 6: Authority Check */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Section 6: Authority Check</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Are you the decision-maker for this project?
          </label>
          <div className="space-y-2">
            {DECISION_MAKERS.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="decisionMaker"
                  value={option}
                  checked={values.decisionMaker === option}
                  onChange={(e) => onChange("decisionMaker", e.target.value)}
                  className="h-4 w-4 border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                />
                {option}
              </label>
            ))}
          </div>
          {touched.decisionMaker && errors.decisionMaker && (
            <p className="text-xs text-red-400">{errors.decisionMaker}</p>
          )}
        </div>
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
          {serverError}
        </div>
      )}

      <div className="pt-4">
        <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
