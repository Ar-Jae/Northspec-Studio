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
      className="relative -mt-12 mb-4 flex flex-col items-center gap-2 z-20 pointer-events-none"
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
        <span key={wi} className="inline-block overflow-hidden pb-[0.2em] mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block -mb-[0.2em]"
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
      className="relative min-h-[40vh] w-full flex flex-col justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,166,104,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule top removed for a cleaner, floating feel */}

      <motion.div
        style={{ y: yContent, opacity: opacityOut, scale: scaleOut }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-0 md:px-24 lg:px-36 pt-[1in] pb-24"
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
        <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6
          text-[clamp(2.25rem,7.2vw,6.75rem)]"
        >
          <SplitReveal text="Build, Launch, and Scale" delay={0.7} className="block" />
          <SplitReveal
            text="Software That Works for You."
            delay={1.3}
            className="block text-brand-gold"
          />
        </h1>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 font-times"
        >
          We design and develop production ready applications, automation
          systems, and scalable platforms that help startups and growing
          businesses operate more efficiently and scale with confidence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            as="link"
            href="/contact"
            variant="brand"
            className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
          >
            Start a Project
          </Button>
          <Button
            as="link"
            href="/contact"
            variant="outline"
            className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
          >
            Book a Call
          </Button>
        </motion.div>
      </motion.div>

      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
    </section>
  );
}
