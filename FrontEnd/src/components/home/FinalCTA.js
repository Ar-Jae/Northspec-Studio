"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-32 scroll-mt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.9) 40%, rgba(5,5,5,0.9) 60%, rgba(5,5,5,0.4) 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,166,104,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full px-36 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-10 bg-brand-gold" />
          <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
            Get Started
          </span>
          <div className="h-[1px] w-10 bg-brand-gold" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white text-[clamp(2.5rem,5vw,5.5rem)] leading-[1] tracking-tight mb-6 max-w-4xl"
        >
          Ready to Build Something{" "}
          <em className="not-italic text-brand-gold">That Scales?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md font-times"
        >
          Let&apos;s talk about your project and how we can help.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/contact"
            className="bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:bg-white transition-all active:scale-[0.98]"
          >
            Start a Project
          </a>
          <a
            href="/request-call"
            className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-8 py-4"
          >
            Book a Call
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
