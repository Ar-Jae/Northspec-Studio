"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    number: "01",
    text: "Systems-first engineering: We build for operational ROI, not experimental features",
  },
  {
    number: "02",
    text: "Enterprise reliability using Vercel, AWS, and n8n orchestration",
  },
  {
    number: "03",
    text: "Strategic RAG & AI implementation with high-fidelity, secure data sovereignty",
  },
  {
    number: "04",
    text: "Production-ready systems with professional maintenance & high-ticket support",
  },
];

export default function Differentiator() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-24 sm:py-32 scroll-mt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-0 md:px-24 lg:px-36">
        <div ref={headRef} className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-10 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Why Northspec
            </span>
          </motion.div>

          <div className="flex items-center justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Why Teams{" "}
              <em className="not-italic text-brand-gold">Choose Us.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              WHY
            </motion.span>
          </div>
        </div>

        <div className="grid gap-0">
          {reasons.map((r, i) => (
            <motion.div
              key={r.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-8 py-7 border-b border-white/[0.06] last:border-0
                hover:border-brand-gold/20 transition-colors duration-300"
            >
              <span className="text-[11px] font-bold tracking-[0.3em] text-slate-700 w-8 flex-shrink-0">
                {r.number}
              </span>
              <p className="text-xl font-serif text-slate-300 group-hover:text-white transition-colors duration-300 leading-snug">
                {r.text}
              </p>
              <div className="ml-auto w-6 h-[1px] bg-brand-gold/0 group-hover:bg-brand-gold/60 transition-all duration-500 flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
