"use client";

import { useMemo, useState } from "react";
import Button from "../Button";
import { cn } from "../../lib/utils";

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
    whyUs: "",
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
    if (!values.whyUs.trim()) next.whyUs = "Required";

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

    // Auto-reject logic
    const isRejected =
      values.projectType === "Just a basic website" ||
      values.budget === "Under $2,500" ||
      values.timeline === "Just exploring" ||
      values.decisionMaker === "No";

    if (isRejected) {
      // Fake a delay then show rejection
      setStatus("loading");
      setTimeout(() => {
        setStatus("rejected");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
      return;
    }

    try {
      setStatus("loading");
      const res = await submitContactRequest(values);
      if (!res?.ok) throw new Error(res?.error || "Request failed");

      setStatus("success");
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
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-green-900">Thanks for the details.</h3>
        <p className="mt-2 text-green-800">
          If your project is a good fit, you’ll receive a booking link within 24 hours.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-900">Thanks for your interest.</h3>
        <p className="mt-2 text-slate-600">
          Based on your responses, this project isn’t a fit at the moment.
        </p>
        <p className="mt-1 text-slate-600">We wish you the best with your build.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate>
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
        <h3 className="text-lg font-semibold text-slate-900">Section 1: Basics</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={cn(
                "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                touched.name && errors.name && "border-red-300 focus:border-red-500 focus:ring-red-500"
              )}
              aria-invalid={touched.name && !!errors.name}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={cn(
                "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                touched.email && errors.email && "border-red-300 focus:border-red-500 focus:ring-red-500"
              )}
              aria-invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium text-slate-700">
              Company / Project Name
            </label>
            <input
              id="company"
              type="text"
              value={values.company}
              onChange={(e) => onChange("company", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, company: true }))}
              className={cn(
                "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                touched.company && errors.company && "border-red-300 focus:border-red-500 focus:ring-red-500"
              )}
              aria-invalid={touched.company && !!errors.company}
            />
            {touched.company && errors.company && (
              <p className="text-xs text-red-600">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="projectUrl" className="block text-sm font-medium text-slate-700">
              Website (if any)
            </label>
            <input
              id="projectUrl"
              type="text"
              value={values.projectUrl}
              onChange={(e) => onChange("projectUrl", e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Project Fit */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">Section 2: Project Fit</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            What best describes your project?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROJECT_TYPES.map((type) => (
              <label
                key={type}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  values.projectType === type
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={values.projectType === type}
                  onChange={(e) => onChange("projectType", e.target.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {type}
              </label>
            ))}
          </div>
          {touched.projectType && errors.projectType && (
            <p className="text-xs text-red-600">{errors.projectType}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-700">
            What are you looking to build?
          </label>
          <p className="text-xs text-slate-500">
            Describe the problem you’re solving and what success looks like.
          </p>
          <textarea
            id="projectDescription"
            rows={4}
            value={values.projectDescription}
            onChange={(e) => onChange("projectDescription", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, projectDescription: true }))}
            className={cn(
              "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              touched.projectDescription && errors.projectDescription && "border-red-300 focus:border-red-500 focus:ring-red-500"
            )}
            aria-invalid={touched.projectDescription && !!errors.projectDescription}
          />
          {touched.projectDescription && errors.projectDescription && (
            <p className="text-xs text-red-600">{errors.projectDescription}</p>
          )}
        </div>
      </div>

      {/* Section 3: Budget Reality Check */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">Section 3: Budget Reality Check</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            What budget range are you prepared to invest?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {BUDGET_RANGES.map((range) => (
              <label
                key={range}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  values.budget === range
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                <input
                  type="radio"
                  name="budget"
                  value={range}
                  checked={values.budget === range}
                  onChange={(e) => onChange("budget", e.target.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {range}
              </label>
            ))}
          </div>
          {touched.budget && errors.budget && (
            <p className="text-xs text-red-600">{errors.budget}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Is this budget already approved?
          </label>
          <div className="flex flex-wrap gap-4">
            {BUDGET_STATUSES.map((status) => (
              <label key={status} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="budgetApproved"
                  value={status}
                  checked={values.budgetApproved === status}
                  onChange={(e) => onChange("budgetApproved", e.target.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {status}
              </label>
            ))}
          </div>
          {touched.budgetApproved && errors.budgetApproved && (
            <p className="text-xs text-red-600">{errors.budgetApproved}</p>
          )}
        </div>
      </div>

      {/* Section 4: Automation Awareness */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">Section 4: Automation Awareness</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Are you interested in automation (n8n)?
          </label>
          <div className="space-y-2">
            {AUTOMATION_INTERESTS.map((interest) => (
              <label key={interest} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="automationInterest"
                  value={interest}
                  checked={values.automationInterest === interest}
                  onChange={(e) => onChange("automationInterest", e.target.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {interest}
              </label>
            ))}
          </div>
          {touched.automationInterest && errors.automationInterest && (
            <p className="text-xs text-red-600">{errors.automationInterest}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Please confirm you understand the following:
          </label>
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={values.automationUnderstanding.scoped}
                onChange={() => onCheckboxChange("scoped")}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Automation is scoped and priced separately</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={values.automationUnderstanding.setup}
                onChange={() => onCheckboxChange("setup")}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>n8n setup starts at $1,500</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={values.automationUnderstanding.quoted}
                onChange={() => onCheckboxChange("quoted")}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Each workflow is quoted individually</span>
            </label>
          </div>
          {touched.automationUnderstanding && errors.automationUnderstanding && (
            <p className="text-xs text-red-600">{errors.automationUnderstanding}</p>
          )}
        </div>
      </div>

      {/* Section 5: Timeline & Urgency */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">Section 5: Timeline & Urgency</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            When are you looking to start?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {TIMELINES.map((time) => (
              <label
                key={time}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  values.timeline === time
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={time}
                  checked={values.timeline === time}
                  onChange={(e) => onChange("timeline", e.target.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {time}
              </label>
            ))}
          </div>
          {touched.timeline && errors.timeline && (
            <p className="text-xs text-red-600">{errors.timeline}</p>
          )}
        </div>
      </div>

      {/* Section 6: Authority Check */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">Section 6: Authority Check</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Are you the decision-maker for this project?
          </label>
          <div className="space-y-2">
            {DECISION_MAKERS.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="decisionMaker"
                  value={option}
                  checked={values.decisionMaker === option}
                  onChange={(e) => onChange("decisionMaker", e.target.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
          {touched.decisionMaker && errors.decisionMaker && (
            <p className="text-xs text-red-600">{errors.decisionMaker}</p>
          )}
        </div>
      </div>

      {/* Section 7: Final Qualification */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900">Section 7: Final Qualification</h3>
        
        <div className="space-y-2">
          <label htmlFor="whyUs" className="block text-sm font-medium text-slate-700">
            Why do you want to work with us specifically?
          </label>
          <p className="text-xs text-slate-500">
            What stood out to you about our approach or pricing?
          </p>
          <textarea
            id="whyUs"
            rows={3}
            value={values.whyUs}
            onChange={(e) => onChange("whyUs", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, whyUs: true }))}
            className={cn(
              "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              touched.whyUs && errors.whyUs && "border-red-300 focus:border-red-500 focus:ring-red-500"
            )}
            aria-invalid={touched.whyUs && !!errors.whyUs}
          />
          {touched.whyUs && errors.whyUs && (
            <p className="text-xs text-red-600">{errors.whyUs}</p>
          )}
        </div>
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
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
