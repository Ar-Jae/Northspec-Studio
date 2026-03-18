"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import caseStudies from "../../content/caseStudies";

// Animated counter
function Counter({ value, suffix = "", duration = 1.8 }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const isPercent = value.includes("%");
    const isTime    = value.includes("hr");
    const isSprint  = value.includes("sprint");

    if (isSprint || isTime) {
      setDisplay(value);
      return;
    }

    const sign   = value.startsWith("+") ? "+" : value.startsWith("-") ? "-" : "";
    const num    = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const unit   = isPercent ? "%" : suffix;
    const start  = Date.now();

    const tick = () => {
      const elapsed  = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(ease * num * 10) / 10;
      setDisplay(`${sign}${current % 1 === 0 ? current : current.toFixed(0)}${unit}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, duration, suffix]);

  return <span ref={ref}>{inView ? display : "0"}</span>;
}

const industryColors = {
  "E-commerce": "border-amber-500/30 text-amber-400",
  "B2B SaaS":   "border-blue-500/30 text-blue-400",
  Healthcare:   "border-emerald-500/30 text-emerald-400",
};

export default function WorkSection() {
  const headRef = useRef(null);
  const inView  = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      className="relative z-10 py-32 sm:py-40 scroll-mt-16"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(10,8,5,0.92) 30%, rgba(10,8,5,0.92) 70%, rgba(5,5,5,0.4) 100%)",
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
              Our Work
            </span>
          </motion.div>

          <div className="flex items-center justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Outcomes, not{" "}
              <em className="not-italic text-brand-gold">deliverables.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              WORK
            </motion.span>
          </div>

          <motion.div
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-[1px] bg-gradient-to-r from-brand-gold/60 via-brand-gold/20 to-transparent"
          />
        </div>

        {/* Case studies */}
        <div className="space-y-12">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-md
                overflow-hidden hover:border-brand-gold/25 transition-colors duration-500"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-brand-gold/50 via-transparent to-transparent" />

              <div className="grid lg:grid-cols-12 gap-0">
                {/* Left: Info */}
                <div className="lg:col-span-7 p-10 lg:p-14">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span
                      className={`text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full border bg-transparent ${
                        industryColors[cs.industry] ?? "border-white/20 text-slate-400"
                      }`}
                    >
                      {cs.industry}
                    </span>
                    {cs.featured && (
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-brand-gold/30 text-brand-gold">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-6 group-hover:text-brand-gold transition-colors duration-400">
                    {cs.client}
                  </h3>

                  <div className="space-y-5 mb-8">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase mb-2">
                        The Challenge
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed">{cs.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase mb-2">
                        Our Solution
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {cs.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium text-slate-500 border border-white/8 rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Metrics */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/8 p-10 lg:p-14 flex flex-col justify-center gap-8">
                  {cs.impact.map((item) => (
                    <div key={item.label}>
                      <div className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold font-serif text-brand-gold leading-none mb-2 tabular-nums">
                        <Counter value={item.value} />
                      </div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="/work"
            className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-7 py-3"
          >
            View all case studies
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
