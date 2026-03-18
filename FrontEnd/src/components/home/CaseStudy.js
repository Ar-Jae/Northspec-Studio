"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "60%", label: "Reduction in manual work" },
  { value: "6 wks", label: "Delivered on schedule" },
  { value: "4+", label: "APIs integrated" },
];

export default function CaseStudy() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-24 sm:py-32 scroll-mt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-6 md:px-24 lg:px-36">
        <div ref={headRef} className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-10 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Recent Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
          >
            Built and{" "}
            <em className="not-italic text-brand-gold">Shipped.</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: project info */}
            <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-4">
                  Operations Automation
                </p>
                <h3 className="text-2xl font-bold font-serif text-white leading-[1.05] mb-4">
                  Automation System for Operations Team
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Replaced a fragmented manual process with a unified automation
                  system that connected their CRM, billing, and fulfillment workflows
                  into a single reliable pipeline.
                </p>

                <ul className="space-y-3">
                  {[
                    "Reduced manual work by 60%",
                    "Integrated multiple APIs into one workflow",
                    "Delivered in 6 weeks",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: stats */}
            <div className="p-12 lg:p-16 flex flex-col justify-center gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex items-center gap-6"
                >
                  <div className="text-4xl font-bold font-serif text-brand-gold leading-none w-28 flex-shrink-0">
                    {s.value}
                  </div>
                  <div className="h-[1px] w-8 bg-white/10 flex-shrink-0" />
                  <p className="text-slate-400 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
