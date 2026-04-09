"use client";

import { motion } from "framer-motion";
import Button from "../Button";

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-24 sm:py-32 scroll-mt-16">
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

      <div className="relative z-10 w-full px-0 md:px-24 lg:px-36 flex flex-col items-center text-center">
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
          className="font-serif font-bold text-white text-[clamp(2rem,4vw,4.5rem)] leading-[1] tracking-tight mb-6 max-w-4xl italic"
        >
          Ready to Implement Your{" "}
          <em className="not-italic text-brand-gold">AI Strategy?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-slate-400 text-lg leading-relaxed mb-12 max-w-lg font-times"
        >
          Tell us what you&apos;re building and we&apos;ll outline a clear AI implementation plan.
          Replace manual overhead with systems that deliver actual ROI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button as="link" href="/contact" variant="brand">
            Start Automating
          </Button>
          <Button as="link" href="/ai-systems" variant="outline-dark">
            See AI Solutions
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
