"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Product Development",
    short: "Launch fast with a solid foundation built for real growth.",
    bullets: [
      "MVPs and early-stage products",
      "Full-stack web applications",
      "Scalable architecture built for growth",
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
    title: "Automation & AI Systems",
    short: "Reduce manual work and increase efficiency across your operations.",
    bullets: [
      "Workflow automation (n8n, APIs)",
      "AI-powered processes and integrations",
      "Data pipelines and system connections",
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
    number: "03",
    title: "Platforms & Internal Tools",
    short: "Build systems your business can rely on at any scale.",
    bullets: [
      "SaaS platforms",
      "Internal dashboards and tools",
      "Role-based systems and integrations",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    accent: "from-blue-500/10 to-transparent",
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

      <div className="relative z-10 w-full px-36">
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

          <div className="flex items-center justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              What We{" "}
              <em className="not-italic text-brand-gold">Build.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              BUILD
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 max-w-sm text-slate-400 leading-relaxed text-sm font-times"
          >
            We partner with teams that need more than just code—we build
            systems that support real business growth.
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-[1px] bg-gradient-to-r from-brand-gold/60 via-brand-gold/20 to-transparent"
          />
        </div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
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
