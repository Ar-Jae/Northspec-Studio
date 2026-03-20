"use client";

import { useState, useMemo } from "react";
import Button from "../Button";
import { cn } from "../../lib/utils";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

const ROLES = [
  "Senior Full-Stack Engineer",
  "Automation Specialist",
  "Frontend Engineer",
  "Backend Engineer",
  "Product Designer",
  "Other"
];

const EXPERIENCE_LEVELS = [
  "1-3 years",
  "3-5 years",
  "5-8 years",
  "8+ years"
];

export default function JobApplicationForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    portfolio: "",
    resume: "",
    message: "",
    // Honeypot
    website: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => {
    const next = {};
    if (!values.name.trim()) next.name = "Required";
    if (!isValidEmail(values.email)) next.email = "Valid email required";
    if (!values.role) next.role = "Required";
    if (!values.experience) next.experience = "Required";
    if (values.portfolio && !isValidUrl(values.portfolio)) next.portfolio = "Invalid URL";
    if (!values.resume.trim()) next.resume = "Required (Link to Resume/LinkedIn)";
    if (values.resume && !isValidUrl(values.resume)) next.resume = "Invalid URL";
    return next;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "loading";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) {
      setTouched({
        name: true,
        email: true,
        role: true,
        experience: true,
        resume: true
      });
      return;
    }

    // Honeypot check
    if (values.website) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      setServerError("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-gold/10 border border-brand-gold/20 p-8 text-center">
        <h3 className="text-2xl font-bold text-white font-serif">Application Received</h3>
        <p className="mt-4 text-slate-300">
          Thanks for reaching out. We'll review your profile and get back to you if there's a potential fit.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-brand-gold hover:underline text-sm font-bold uppercase tracking-widest"
        >
          Send another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(e) => setValues({ ...values, website: e.target.value })}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name *</label>
          <input
            type="text"
            required
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors",
              touched.name && errors.name && "border-red-500/50"
            )}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            onBlur={() => setTouched({ ...touched, name: true })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address *</label>
          <input
            type="email"
            required
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors",
              touched.email && errors.email && "border-red-500/50"
            )}
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            onBlur={() => setTouched({ ...touched, email: true })}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Role *</label>
          <select
            required
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none",
              touched.role && errors.role && "border-red-500/50"
            )}
            value={values.role}
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            onBlur={() => setTouched({ ...touched, role: true })}
          >
            <option value="" disabled className="bg-brand-dark">Select a role</option>
            {ROLES.map(role => (
              <option key={role} value={role} className="bg-brand-dark">{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Experience *</label>
          <select
            required
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none",
              touched.experience && errors.experience && "border-red-500/50"
            )}
            value={values.experience}
            onChange={(e) => setValues({ ...values, experience: e.target.value })}
            onBlur={() => setTouched({ ...touched, experience: true })}
          >
            <option value="" disabled className="bg-brand-dark">Years of experience</option>
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level} value={level} className="bg-brand-dark">{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Resume / LinkedIn URL *</label>
        <input
          type="url"
          required
          placeholder="https://linkedin.com/in/..."
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors",
            touched.resume && errors.resume && "border-red-500/50"
          )}
          value={values.resume}
          onChange={(e) => setValues({ ...values, resume: e.target.value })}
          onBlur={() => setTouched({ ...touched, resume: true })}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Portfolio / GitHub URL (Optional)</label>
        <input
          type="url"
          placeholder="https://github.com/..."
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors",
            touched.portfolio && errors.portfolio && "border-red-500/50"
          )}
          value={values.portfolio}
          onChange={(e) => setValues({ ...values, portfolio: e.target.value })}
          onBlur={() => setTouched({ ...touched, portfolio: true })}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message / Cover Letter (Optional)</label>
        <textarea
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
      </div>

      {serverError && (
        <p className="text-red-400 text-sm">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        className="w-full py-4"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Submit Application"}
      </Button>
    </form>
  );
}
