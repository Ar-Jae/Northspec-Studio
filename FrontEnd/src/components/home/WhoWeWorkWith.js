"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  {
    icon: "→",
    text: "Companies with manual processes that cost time and money every week",
  },
  {
    icon: "→",
    text: "Businesses looking to implement AI into their operations without disruption",
  },
  {
    icon: "→",
    text: "Teams building AI workflows, agents, or automation into their products",
  },
  {
    icon: "→",
    text: "Startups launching AI-native or AI-augmented platforms",
  },
];

export default function WhoWeWorkWith() {
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: heading */}
          <div ref={headRef}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-10 bg-brand-gold" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
                Who This Is For
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6"
            >
              We partner with teams that are ready to{" "}
              <em className="not-italic text-brand-gold">put AI to work.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-slate-400 leading-relaxed text-sm font-times max-w-sm"
            >
              We implement AI automation into companies that are ready to eliminate manual work and operate smarter.
            </motion.p>
          </div>

          {/* Right: client list */}
          <div className="space-y-4">
            {clients.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                  hover:border-brand-gold/20 transition-colors duration-300"
              >
                <span className="text-brand-gold font-bold text-lg leading-none mt-0.5 flex-shrink-0">
                  {item.icon}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
