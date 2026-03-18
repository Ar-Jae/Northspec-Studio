"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    phase: "Strategy & Scope",
    title: "Define what needs to be built",
    description:
      "We map your business goals, constraints, and requirements before writing a single line of code. Every project starts with a clear plan.",
    detail: "Discovery call → Problem statement → Scope document",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    phase: "Build & Iterate",
    title: "Develop with performance and scale in mind",
    description:
      "We build your system with milestone-based delivery and regular check-ins. No black-box development—you see progress every step of the way.",
    detail: "Milestone-based delivery → Weekly updates → Code review",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    phase: "Launch & Support",
    title: "Deploy, monitor, and keep improving",
    description:
      "We deploy your product, monitor performance, and continue improving it over time. You own everything—code, infrastructure, and documentation.",
    detail: "Deployment → Monitoring → Ongoing improvements",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const inView     = useInView(headRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-10 py-32 sm:py-40 scroll-mt-16"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 30%, rgba(5,5,5,0.88) 70%, rgba(5,5,5,0.4) 100%)",
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
              The Method
            </span>
          </motion.div>

          <div className="flex items-center justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(2.5rem,5vw,5rem)] leading-[1] tracking-tight"
            >
              A Structured Approach{" "}
              <br />
              <em className="not-italic text-brand-gold">That Delivers.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              HOW
            </motion.span>
          </div>

          {/* Gradient line removed for a smoother transition to the steps */}
        </div>

        {/* Steps with animated connecting line */}
        <div className="relative">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative grid lg:grid-cols-12 gap-0 lg:gap-8 py-12 last:border-0"
              >
                {/* Number column */}
                <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 mb-6 lg:mb-0">
                  {/* Circle with icon (sits on the vertical line) */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl border border-white/10 bg-brand-dark flex items-center justify-center text-brand-gold
                    group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10 transition-colors duration-400 flex-shrink-0">
                    {step.icon}
                  </div>
                </div>

                {/* Phase + content */}
                <div className="lg:col-span-3 lg:pt-3">
                  <div className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-1">
                    {step.number}
                  </div>
                  <div className="text-sm font-bold text-brand-gold tracking-wide">
                    {step.phase}
                  </div>
                </div>

                <div className="lg:col-span-5 lg:pt-2">
                  <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="lg:col-span-3 lg:pt-2 mt-4 lg:mt-0">
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
            href="/built-to-spec"
            className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-7 py-3"
          >
            Read the full method
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
