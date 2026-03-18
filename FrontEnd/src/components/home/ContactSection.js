"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import site from "../../content/site";

function ContactForm() {
  const [form, setForm]     = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError]   = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Email us directly at " + site.contact.email);
    }
  }

  const input =
    "w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 p-4 text-sm focus:outline-none focus:border-brand-gold/50 focus:bg-white/8 transition-colors";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold font-serif text-white mb-3">Message sent</h3>
        <p className="text-slate-400">We'll follow up within 1 business day.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">Name</label>
          <input value={form.name} onChange={set("name")} placeholder="Your name" className={input} required />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">Email</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" className={input} required />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">Company / Project</label>
        <input value={form.company} onChange={set("company")} placeholder="Company or project name" className={input} />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">What are you building?</label>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={5}
          placeholder="Describe the problem you're solving and what success looks like…"
          className={input + " resize-none"}
          required
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-gold text-brand-dark font-bold text-sm uppercase tracking-[0.2em] py-4 rounded-xl
          hover:bg-brand-gold/90 active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-slate-600 text-center">
        Or submit a full project application at{" "}
        <a href="/request-call" className="text-brand-gold hover:underline">/request-call</a>
      </p>
    </form>
  );
}

export default function ContactSection() {
  const headRef = useRef(null);
  const inView  = useInView(headRef, { once: true, margin: "-100px" });

  const channels = [
    {
      label: "Email",
      value: site.contact.email,
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      href: `mailto:${site.contact.email}`,
    },
    {
      label: "Phone",
      value: site.contact.phone,
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      href: `tel:${site.contact.phone}`,
    },
    {
      label: "Location",
      value: site.contact.location,
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 py-32 sm:py-40 scroll-mt-16"
    >
      {/* Backdrop — slightly warmer at the bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,5,2,0.95) 30%, rgba(8,5,2,0.98) 100%)",
        }}
      />

      {/* Gold glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(198,166,104,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Decorative letter */}
      <div className="absolute left-0 top-24 text-[18vw] font-serif font-bold text-white/[0.015] leading-none select-none pointer-events-none pl-4">
        HI
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-10 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Start Building
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(2.5rem,5vw,5rem)] leading-[1] tracking-tight max-w-3xl"
          >
            Let's build something{" "}
            <em className="not-italic text-brand-gold">durable.</em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-[1px] bg-gradient-to-r from-brand-gold/60 via-brand-gold/20 to-transparent origin-left"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-12"
          >
            <p className="text-slate-400 leading-relaxed">
              Tell us what you're building. We'll follow up with a clear plan
              and timeline — no obligation, no sales pitch.
            </p>

            {/* Channels */}
            <div className="space-y-6">
              {channels.map((ch, i) => (
                <motion.div
                  key={ch.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-gold
                    group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30 transition-colors duration-300 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ch.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{ch.label}</p>
                    {ch.href ? (
                      <a href={ch.href} className="text-white text-sm hover:text-brand-gold transition-colors mt-1 block">
                        {ch.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm mt-1">{ch.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Follow</p>
              <div className="flex gap-3">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                      text-[10px] font-bold text-slate-500 hover:border-brand-gold/40 hover:text-brand-gold transition-colors"
                  >
                    {s.shortLabel}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 sm:p-12 overflow-hidden">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/4 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold font-serif text-white mb-2">
                  Send a message
                </h3>
                <p className="text-sm text-slate-500 mb-8">
                  We respond within 1 business day.
                </p>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
