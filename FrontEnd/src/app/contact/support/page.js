"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

const SUPPORT_EMAIL = "build@northspecstudio.com";

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-brand-gold" />
      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">
        {children}
      </span>
    </div>
  );
}

function SplitReveal({ text, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

// ─── Support Form ─────────────────────────────────────────────────────────────

const ISSUE_TYPES = [
  "Bug report or system error",
  "Performance issue",
  "Feature request or update",
  "General support question",
  "Other",
];

const PRIORITY_OPTIONS = [
  { value: "critical", label: "🚨 Critical — system down or blocking work", color: "border-red-500/30 bg-red-500/5 text-red-300" },
  { value: "moderate", label: "⚠️ Moderate — issue affecting workflow", color: "border-yellow-500/30 bg-yellow-500/5 text-yellow-300" },
  { value: "general", label: "💡 General — request or low-priority question", color: "border-white/10 bg-white/[0.02] text-slate-400" },
];

function SupportForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    projectName: "",
    issueType: "",
    priority: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function isValid() {
    return form.fullName && form.email && form.issueType && form.message;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!isValid()) {
      setError("Please fill in your name, email, issue type, and message.");
      return;
    }
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/request-call", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, formType: "support" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setForm({ fullName: "", email: "", projectName: "", issueType: "", priority: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-gold/20">
          <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white font-times uppercase tracking-widest mb-3">Request Received</h3>
        <p className="text-slate-400 font-medium italic">We&apos;ll respond within 24 hours on business days. Critical issues are prioritized.</p>
      </motion.div>
    );
  }

  const inputBase = "w-full rounded-xl bg-white/[0.03] border border-white/10 text-white p-4 focus:border-brand-gold/50 transition-colors outline-none font-medium placeholder:text-slate-600";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
            Full Name <span className="text-brand-gold">*</span>
          </label>
          <input
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={`${inputBase} ${error && !form.fullName ? "border-red-500/50" : ""}`}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
            Email <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={`${inputBase} ${error && !form.email ? "border-red-500/50" : ""}`}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      {/* Project name */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
          System / Project Name <span className="text-slate-600">(optional)</span>
        </label>
        <input
          value={form.projectName}
          onChange={(e) => update("projectName", e.target.value)}
          className={inputBase}
          placeholder="e.g. Acme Dashboard, Booking System"
        />
      </div>

      {/* Issue type */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
          Issue Type <span className="text-brand-gold">*</span>
        </label>
        <select
          value={form.issueType}
          onChange={(e) => update("issueType", e.target.value)}
          className={`${inputBase} appearance-none ${error && !form.issueType ? "border-red-500/50" : ""}`}
        >
          <option value="" className="bg-brand-dark text-slate-400">Select one</option>
          {ISSUE_TYPES.map((t) => (
            <option key={t} value={t} className="bg-brand-dark">{t}</option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
          Priority <span className="text-slate-600">(optional)</span>
        </label>
        <div className="space-y-3">
          {PRIORITY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-4 rounded-xl border px-5 py-4 cursor-pointer transition-colors ${
                form.priority === opt.value ? opt.color : "border-white/5 bg-white/[0.02] text-slate-500"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={opt.value}
                checked={form.priority === opt.value}
                onChange={(e) => update("priority", e.target.value)}
                className="accent-brand-gold"
              />
              <span className="text-sm font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-times">
          Describe the Issue <span className="text-brand-gold">*</span>
        </label>
        <p className="text-[10px] text-slate-600 italic mb-3">Include what you expected to happen and what's actually happening.</p>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputBase} min-h-[140px] ${error && !form.message ? "border-red-500/50" : ""}`}
          placeholder="When I click the submit button on the intake form, it throws a 500 error..."
        />
      </div>

      {error && (
        <p className="text-red-400 text-[10px] font-medium italic uppercase tracking-widest">{error}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        className="w-full font-times uppercase tracking-widest text-xs py-4"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Submit Support Request"}
      </Button>

      {/* Direct email fallback */}
      <p className="text-center text-[10px] text-slate-600 font-medium pt-2">
        Prefer email?{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-slate-400 hover:text-brand-gold transition-colors underline underline-offset-4">
          {SUPPORT_EMAIL}
        </a>
      </p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-brand-dark text-white">
      <BackgroundCanvasClient />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[55vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(212,175,55,0.05),transparent_60%)]" />
        </motion.div>

        <div className="relative z-10 px-6 md:px-36 pt-40 pb-20 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Client Support</SectionLabel>
          </motion.div>

          <SplitReveal
            text="Ongoing Support for Your System."
            className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05] max-w-3xl mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-xl"
          >
            If you&apos;re an existing client, use this page to report issues, request updates, or ask questions about your system.
          </motion.p>

          {/* Response expectations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-5 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span className="text-xs font-bold text-brand-gold font-times uppercase tracking-widest">Responds within 24 hours</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="text-xs font-medium text-slate-400 font-times uppercase tracking-widest">Urgent issues prioritized</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT THIS PAGE IS FOR ─────────────────────────────────────────── */}
      <UseCasesSection />

      {/* ── FORM + HOW WE HANDLE ──────────────────────────────────────────── */}
      <FormSection />

      {/* ── RETAINER BRIDGE ───────────────────────────────────────────────── */}
      <BridgeSection />
    </div>
  );
}

function UseCasesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const uses = [
    { icon: "🐛", label: "Bug Reports", desc: "Something in your system is broken or not behaving as expected." },
    { icon: "⚡", label: "Performance Issues", desc: "Pages loading slowly, APIs timing out, or system degradation." },
    { icon: "✏️", label: "Feature Requests", desc: "A small update, change, or addition to existing functionality." },
    { icon: "💬", label: "General Questions", desc: "How something works, what's possible, or what comes next." },
  ];

  return (
    <section className="py-20 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <SectionLabel>Use This Form For</SectionLabel>
        <SplitReveal
          text="What Kind of Issue Are You Facing?"
          className="text-3xl md:text-4xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] max-w-xl"
        />
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {uses.map((u, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-brand-gold/20 transition-colors"
          >
            <div className="text-2xl mb-4">{u.icon}</div>
            <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-2">{u.label}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium italic">{u.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FormSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const howWeHandle = [
    { title: "Clear Communication", desc: "You get an acknowledgement and updates as we resolve the issue — no silence." },
    { title: "Structured Issue Tracking", desc: "Every request is logged and tracked through to resolution." },
    { title: "Fast Response for Critical Issues", desc: "System-down and blocking issues are treated as top priority." },
    { title: "Ongoing Monitoring", desc: "Retained clients have proactive monitoring included in their plan." },
  ];

  return (
    <section className="py-20 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid gap-16 lg:grid-cols-2 items-start">

        {/* Form */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>Submit a Request</SectionLabel>
          <h2 className="text-3xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] mb-8">
            Tell Us What&apos;s Going On.
          </h2>
          <SupportForm />
        </motion.div>

        {/* How we handle it */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div>
            <SectionLabel>How We Handle Support</SectionLabel>
            <h2 className="text-3xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] mb-8">
              A System, Not Just a Ticket Queue.
            </h2>
          </div>

          {howWeHandle.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5 hover:border-brand-gold/20 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium italic">{item.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Support hours */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 mt-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-4">Support Hours</p>
            <div className="space-y-3">
              {[
                { day: "Monday – Friday", hours: "9am – 6pm EST" },
                { day: "Saturday", hours: "Emergency only" },
                { day: "Sunday", hours: "Closed" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-white/[0.04] last:border-0 pb-3 last:pb-0">
                  <span className="text-slate-500 font-medium">{row.day}</span>
                  <span className="text-slate-300 font-bold font-times uppercase tracking-wide text-xs">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BridgeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">Active Support Plans</p>
          <p className="text-lg text-white font-times italic leading-relaxed">
            Priority response times and ongoing improvements are included in active support plans.
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Retainer clients receive proactive monitoring, faster response SLAs, and included maintenance hours.
          </p>
        </div>
        <a
          href="/retainers"
          className="shrink-0 text-xs font-bold text-brand-gold font-times uppercase tracking-widest border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 transition-all rounded-xl px-6 py-4 whitespace-nowrap"
        >
          View Support Plans →
        </a>
      </motion.div>
    </section>
  );
}
