"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  "Continuous feature development",
  "System reliability and monitoring",
  "Performance improvements",
  "Dedicated engineering support",
];

export default function OngoingSupport() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 scroll-mt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 30%, rgba(5,5,5,0.88) 70%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: copy */}
            <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-center">
              <div ref={headRef}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="h-[1px] w-10 bg-brand-gold" />
                  <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
                    Ongoing Support
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3rem)] leading-[1.1] tracking-tight mb-4"
                >
                  Ongoing Product Support{" "}
                  <em className="not-italic text-brand-gold">& Growth</em>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm font-times"
                >
                  We don&apos;t just build—we stay involved to ensure your system
                  continues to perform and evolve.
                </motion.p>

                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: pricing anchor */}
            <div className="p-12 lg:p-16 flex flex-col justify-center bg-brand-gold/[0.03] relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold/[0.015] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-4">
                  Retainer Pricing
                </p>
                <div className="text-4xl font-bold font-serif text-white leading-tight mb-3">
                  $4,000 – $10,000
                  <span className="text-xl text-slate-400 font-normal">/month</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
                  Ongoing engagements for teams that need continuous
                  engineering support and product growth.
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group"
                >
                  View retainer plans
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
