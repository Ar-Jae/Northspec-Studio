"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Web Development",
    short: "Production marketing sites and landing pages built with Next.js/React.",
    bullets: [
      "Next.js / React (App Router)",
      "Marketing sites + landing pages",
      "Accessible, responsive components",
      "Core Web Vitals & performance",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    accent: "from-brand-gold/20 to-transparent",
  },
  {
    number: "02",
    title: "Software Engineering",
    short: "APIs, integrations, and internal tools built with clear specs and stable interfaces.",
    bullets: [
      "APIs + third-party integrations",
      "Internal dashboards + tools",
      "Background jobs & workflows",
      "Auth + permissions systems",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "Workflow Automation",
    short: "Eliminate manual work with intelligent automation that scales with your business.",
    bullets: [
      "n8n workflow automation",
      "CRM + billing integrations",
      "AI-powered workflows",
      "Custom automation pipelines",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accent: "from-purple-500/10 to-transparent",
  },
  {
    number: "04",
    title: "Mobile App Development",
    short: "iOS and Android apps tied to your operational workflows.",
    bullets: [
      "iOS + Android delivery",
      "React Native builds",
      "Tied to backend systems",
      "App Store deployment",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    accent: "from-cyan-500/10 to-transparent",
  },
  {
    number: "05",
    title: "Integrations",
    short: "Connect your systems — CRM, billing, communications — into one coherent stack.",
    bullets: [
      "CRM + billing connectors",
      "Webhook & event pipelines",
      "Third-party API bridges",
      "Data sync & transforms",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    accent: "from-emerald-500/10 to-transparent",
  },
  {
    number: "06",
    title: "Product Support",
    short: "Maintenance, debugging, audits, and performance work to keep systems stable.",
    bullets: [
      "Ongoing maintenance retainers",
      "Performance + Core Web Vitals",
      "Debugging + incident response",
      "Audits + code refactors",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: "from-rose-500/10 to-transparent",
  },
];

function TiltCard({ children, index }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 18;
    const y = (e.clientY - rect.top - rect.height / 2) / 18;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02,1.02,1.02)`;
    cardRef.current.style.transition = "transform 0.05s linear";
  };

  const onLeave = () => {
    cardRef.current.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-md p-8
        hover:border-brand-gold/30 transition-colors duration-500 cursor-default"
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative z-10 py-32 sm:py-40 scroll-mt-16"
    >
      {/* Section gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-10 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              What We Build
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(2.5rem,5vw,5rem)] leading-[1] tracking-tight max-w-2xl"
            >
              Engineering that{" "}
              <em className="not-italic text-brand-gold">delivers.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="max-w-sm text-slate-400 leading-relaxed text-sm"
            >
              Every engagement is scope-defined up front. No hourly billing,
              no scope creep, no surprises. You own the code from day one.
            </motion.p>
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-[1px] bg-gradient-to-r from-brand-gold/60 via-brand-gold/20 to-transparent origin-left"
          />
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <TiltCard key={svc.number} index={i}>
              {/* Gradient glow top */}
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${svc.accent} rounded-t-3xl`}
              />

              {/* Number */}
              <div className="text-[11px] font-bold tracking-[0.3em] text-slate-700 mb-6">
                {svc.number}
              </div>

              {/* Icon */}
              <div className="mb-5 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30 transition-colors duration-300">
                {svc.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                {svc.title}
              </h3>

              {/* Short desc */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {svc.short}
              </p>

              {/* Bullets */}
              <ul className="space-y-2">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="/services"
            className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-7 py-3"
          >
            Explore all services
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
