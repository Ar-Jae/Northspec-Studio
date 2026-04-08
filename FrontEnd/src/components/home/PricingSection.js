"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const plans = [
  {
    name: "Smaller AI Projects",
    range: "$5,000 – $15,000",
    delivery: "3–5 weeks typical",
    description: "A focused automation — replacing one or a handful of manual processes with intelligent workflows.",
    typical: [
      "Process audit and opportunity mapping",
      "2–4 automated AI workflows",
      "AI integration (OpenAI/Claude)",
      "CRM or tool integration",
      "Documentation and monitoring",
    ],
    color: "border-slate-800/60",
    glow: "",
    accentColor: "text-slate-300",
  },
  {
    name: "Mid-Scale AI Implementation",
    range: "$15,000 – $40,000",
    delivery: "6–10 weeks typical",
    description: "Replacing significant manual workload with a broader AI automation system across your operations.",
    typical: [
      "Full process analysis",
      "5–12 automated AI workflows",
      "LLM-powered routing and classification",
      "CRM and ops integrations",
      "Team training and support",
    ],
    color: "border-brand-gold/40",
    glow: "shadow-[0_0_60px_rgba(198,166,104,0.08)]",
    accentColor: "text-brand-gold",
  },
  {
    name: "Large AI Infrastructure",
    range: "$40,000 – $90,000+",
    delivery: "10–16 weeks typical",
    description: "Making AI a core operational backbone — full strategy through implementation with custom agents and systems.",
    typical: [
      "Full AI strategy and implementation",
      "Custom AI agents and voice systems",
      "Multi-system integrations",
      "AI-powered internal tools",
      "Ongoing ops retainer setup",
    ],
    color: "border-purple-900/30",
    glow: "",
    accentColor: "text-purple-400",
  },
];

function PricingCard({ plan, index }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.015,1.015,1.015)`;
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
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative h-full rounded-3xl border bg-white/[0.03] backdrop-blur-md p-8
        transition-colors duration-500 cursor-default ${plan.color} ${plan.glow}`}
      style={{ willChange: "transform" }}
    >
      {/* Glow top line for gold tier */}
      {plan.color === "border-brand-gold/40" && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent rounded-t-3xl" />
      )}

      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-3">
          {plan.name}
        </p>
        <div className={`text-3xl font-bold font-serif ${plan.accentColor} leading-[1.05]`}>
          {plan.range}
        </div>
        <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mt-1">
          {plan.delivery}
        </p>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-8">
        {plan.description}
      </p>

      <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-3">Typical scope</p>
      <ul className="space-y-3 mb-10">
        {plan.typical.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
            <svg
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.accentColor}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

    </motion.div>
  );
}

export default function PricingSection() {
  const headRef = useRef(null);
  const inView  = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      className="relative z-10 py-32 sm:py-40 scroll-mt-16"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-0 lg:px-36">
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
              Investment
            </span>
          </motion.div>

          <div className="flex items-center justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              AI automation and{" "}
              <em className="not-italic text-brand-gold">transparent pricing.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              $$$
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 max-w-xs text-slate-400 leading-relaxed text-sm font-times"
          >
            AI automation projects from $5,000. Software and mobile app development from $12,000. All fixed-price, scoped before any commitment.
          </motion.p>

          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-[1px] bg-gradient-to-r from-brand-gold/60 via-brand-gold/20 to-transparent"
          />
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600 font-medium">
          These are example ranges based on typical projects. Every engagement is custom-scoped — you receive a fixed quote before any work begins.
        </p>

        {/* Merged CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 rounded-[2.5rem] border border-brand-gold/20 bg-white/[0.03] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left side: Automation context */}
            <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-4">
                Traditional Development
              </p>
              <h3 className="text-2xl font-bold font-serif text-white leading-[1.05] mb-3">
                Software and mobile app builds also available
              </h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                MVPs from $12,000 · Business Systems from $20,000 · SaaS Platforms from $40,000
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group"
              >
                Full pricing breakdown
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right side: High-intent CTA */}
            <div className="p-10 lg:p-14 flex flex-col justify-center bg-brand-gold/5 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-brand-gold/[0.02] pointer-events-none" />

              <h3 className="text-3xl font-bold font-serif text-white mb-4 relative z-10">
                Ready to automate <br className="hidden sm:block" /> your operations?
              </h3>
              <p className="text-slate-400 text-sm mb-10 max-w-xs leading-relaxed relative z-10">
                Free discovery call — we'll identify the highest-ROI AI automation for your business.
              </p>
              <div className="relative z-10">
                <a
                  href="#contact"
                  className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                >
                  Start Automating
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
