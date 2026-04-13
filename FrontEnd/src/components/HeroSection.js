"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionLabel - Consistent label with dual gold bars (exported for reuse)
 */
export function SectionLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className="w-12 h-px bg-brand-gold/60 shrink-0" />
      <span className="text-[11px] font-extrabold text-brand-gold uppercase tracking-[0.4em] font-serif whitespace-nowrap">
        {children}
      </span>
      <div className="w-12 h-px bg-brand-gold/60 shrink-0" />
    </div>
  );
}

/**
 * SplitReveal - Word-by-word reveal animation
 */
export function SplitReveal({ text, className, as: Tag = "h2", delay = 0 }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * HeroSection - Universal hero standard matching the workflow-automation style.
 * Big line 1 (white), smaller line 2 (gold, uppercase), italic description, two CTA slots.
 */
export default function HeroSection({
  label,
  headline,
  accent,
  subheading,
  children,
  minHeight = "min-h-[40vh]",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 1],   ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className={`relative ${minHeight} w-full flex flex-col justify-center overflow-hidden`}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,166,104,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-36 pt-24 pb-20"
      >
        {/* Label with dual gold bars */}
        {label && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              {label}
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>
        )}

        {/* Headline: big line 1, smaller gold line 2 */}
        <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6">
          <SplitReveal
            as="span"
            text={headline}
            delay={0.6}
            className="block text-[clamp(2.5rem,6.3vw,5.85rem)]"
          />
          {accent && (
            <SplitReveal
              as="span"
              text={accent}
              delay={1.0}
              className="block text-brand-gold uppercase text-[clamp(1.5rem,4vw,3.5rem)]"
            />
          )}
        </h1>

        {/* Subheading */}
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 font-times font-medium italic"
          >
            {subheading}
          </motion.p>
        )}

        {/* CTA slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
    </section>
  );
}
