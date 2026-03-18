"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../Button";
import site from "../../content/site";

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">
        Scroll
      </span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-brand-gold"
      />
    </motion.div>
  );
}

// Letter-by-letter reveal for the large title
function SplitReveal({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + wi * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function ImmersiveHero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yContent    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityOut  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleOut    = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,166,104,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent origin-left"
      />

      <motion.div
        style={{ y: yContent, opacity: opacityOut, scale: scaleOut }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-brand-gold" />
          <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
            Northspec Studio
          </span>
          <div className="h-[1px] w-12 bg-brand-gold" />
        </motion.div>

        {/* Main headline */}
        <h1 className="font-serif font-bold leading-[0.9] tracking-tight text-white mb-6
          text-[clamp(3rem,10vw,9rem)]"
        >
          <SplitReveal text="Built to Spec." delay={0.7} className="block" />
          <SplitReveal
            text="Built to Last."
            delay={1.1}
            className="block text-brand-gold"
          />
        </h1>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-12"
        >
          Automation, software engineering, and mobile systems that deliver
          measurable outcomes for established companies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.95, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            as="link"
            href="/request-call"
            variant="brand"
            className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
          >
            Request a Call
          </Button>
          <a
            href="#services"
            className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            See our services
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="mt-16 flex items-center gap-6"
        >
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold tracking-widest text-slate-600 hover:text-brand-gold transition-colors"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
    </section>
  );
}
