"use client";

import { useMemo, useState } from "react";
import Button from "../Button";

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

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });

  const [status, setStatus] = useState("idle");
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => {
    const next = {};

    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(values.email)) next.email = "Please enter a valid email.";
    if (!values.message.trim() || values.message.trim().length < 20)
      next.message = "Please include at least 20 characters.";

    return next;
  }, [values]);

  const canSubmit = status !== "loading" && Object.keys(errors).length === 0;

  async function onSubmit(e) {
    e.preventDefault();
    setServerError("");

    const nextTouched = { name: true, email: true, company: true, message: true };
    setTouched(nextTouched);

    if (Object.keys(errors).length > 0) return;

    try {
      setStatus("loading");
      const res = await submitContactRequest(values);
      if (!res?.ok) throw new Error(res?.error || "Request failed");

      setStatus("success");
      setValues({ name: "", email: "", company: "", message: "", website: "" });
      setTouched({});
    } catch (err) {
      setStatus("error");
      setServerError(
        "Something went wrong. Please try again, or email us directly."
      );
    }
  }

  function onBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function onChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            onBlur={() => onBlur("name")}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            autoComplete="name"
            required
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
          />
          {touched.name && errors.name ? (
            <p id="name-error" className="text-sm text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => onBlur("email")}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            autoComplete="email"
            required
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
          />
          {touched.email && errors.email ? (
            <p id="email-error" className="text-sm text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-slate-900">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          value={values.company}
          onChange={(e) => onChange("company", e.target.value)}
          onBlur={() => onBlur("company")}
          className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          autoComplete="organization"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-900">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          onBlur={() => onBlur("message")}
          rows={6}
          className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          placeholder="What are you building, what’s the timeline, and what would success look like?"
          required
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
        />
        {touched.message && errors.message ? (
          <p id="message-error" className="text-sm text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      {serverError ? <p className="text-sm text-red-700">{serverError}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          We usually respond within 1 business day.
        </p>
        <Button type="submit" disabled={!canSubmit}>
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
      </div>

      {status === "success" ? (
        <div
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
          role="status"
        >
          Thanks. We received your message. We’ll reach out soon.
        </div>
      ) : null}
    </form>
  );
}
