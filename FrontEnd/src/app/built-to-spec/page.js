"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import HeroSection from "../../components/HeroSection";
import Button from "../../components/Button";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

// ─── Data ────────────────────────────────────────────────────────────────────

const whoFor = [
  "Companies implementing AI into existing operations",
  "Businesses replacing multiple legacy systems with one centralized platform",
  "Teams needing custom internal tools, dashboards, or intelligent portals",
  "Founders launching platforms that require custom logic or AI-enabled functionality",
  "Organizations where AI, automation, and operations need a high-value technical foundation",
];

const builtToSpecCategories = [
  {
    title: "Custom AI Automation Systems",
    description: "Tailored AI engines designed to handle complex business logic and operational workflows.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Internal Tools",
    description: "Custom dashboards and portals that put intelligent data and automation in your team's hands.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7a2 2 0 012-2h6a2 2 0 012 2v10m-11 0h11" />
      </svg>
    ),
  },
  {
    title: "Advanced Workflow Systems",
    description: "End to end operational platforms that automate manual work and bridge system gaps.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2zM9 5v4m6-4v4" />
      </svg>
    ),
  },
  {
    title: "Complex Integrations & Platforms",
    description: "High-scale applications built for reliability, deep API connectivity, and future AI growth.",
    icon: (
      <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    phase: "Discovery & System Planning",
    title: "Mapping goals, workflows, and AI opportunities",
    description:
      "We begin with a deep audit of your current processes. We don't just ask what you want to build we map the exact business logic required to automate your operations.",
    detail: "System Requirements → Workflow Audit → AI Strategy Mapping",
  },
  {
    number: "02",
    phase: "Architecture & Design",
    title: "Defining the logic, data flow, and infrastructure",
    description:
      "We design the internal architecture and secure data environments required to support your custom AI or automation features long term.",
    detail: "Technical Architecture → Database Design → Integration Mapping",
  },
  {
    number: "03",
    phase: "Build & Implementation",
    title: "Engineering the core systems and automation logic",
    description:
      "Our team develops your system with scalability and performance as the primary focus. You receive regular milestone updates as we implement the production-ready logic.",
    detail: "Milestone Sprints → AI Training/Integration → Reliability Testing",
  },
  {
    number: "04",
    phase: "Launch & Optimization",
    title: "Deploying and scaling your new business engine",
    description:
      "We handle the deployment and ensure the system integrates perfectly. Most engagements continue into ongoing development to keep expanding your automation capacity.",
    detail: "System Deployment → Post-Launch Refinement → Ongoing Support",
  },
];

const why = [
  "Software built around how your business actually works",
  "Infrastructure designed to support AI and automation",
  "Production-ready applications built for reliability and scale",
  "Systems that solve operational problems, not just add features",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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
              delay: delay + wi * 0.12,
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

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-[1px] w-10 bg-brand-gold" />
      <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
        {children}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BuiltToSpecPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  // ── Section refs ──
  const whatRef  = useRef(null);
  const whoRef   = useRef(null);
  const priceRef = useRef(null);
  const whyRef   = useRef(null);
  const ctaRef   = useRef(null);

  const whatIn  = useInView(whatRef,  { once: true, margin: "-100px" });
  const whoIn   = useInView(whoRef,   { once: true, margin: "-100px" });
  const priceIn = useInView(priceRef, { once: true, margin: "-100px" });
  const whyIn   = useInView(whyRef,   { once: true, margin: "-100px" });
  const ctaIn   = useInView(ctaRef,   { once: true, margin: "-100px" });

  return (
    <div className="relative bg-brand-dark min-h-screen">
      <BackgroundCanvasClient />
      
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <HeroSection
        label="Engineering Layer"
        headline="Custom AI Systems &"
        accent="Advanced System Builds."
        subheading="For businesses that need tailored AI automation, complex workflows, intelligent internal tools, or platforms built specifically for how they operate."
      >
        <Button
          as="link"
          href="/contact"
          variant="brand"
          className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
        >
          Start a Custom Project
        </Button>
      </HeroSection>

      {/* ── WHAT THIS IS ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whatRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={whatIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>What This Actually Is</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={whatIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
                Software is the infrastructure for{" "}
                <em className="not-italic text-brand-gold">better operations.</em>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-times mb-6">
                Not every business problem is solved with off-the-shelf tools.
                When you need custom workflows, AI-enabled features, internal systems, 
                or a platform built around how your business actually operates, 
                custom software becomes the right solution.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm font-times">
                We design and develop production-ready software, internal tools, 
                and scalable platforms especially where AI, automation, and 
                business operations need a strong technical foundation.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {builtToSpecCategories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={whatIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                    hover:border-brand-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/[0.03] group-hover:bg-brand-gold/10 transition-colors">
                      {cat.icon}
                    </div>
                    <h3 className="text-slate-200 font-bold font-serif text-lg">{cat.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed pl-12">{cat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whoRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={whoIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Who This Is For</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={whoIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Built for{" "}
              <em className="not-italic text-brand-gold">serious teams.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={whoIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              WHO
            </motion.span>
          </div>

          <div className="grid gap-0">
            {whoFor.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={whoIn ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-8 py-7 border-b border-white/[0.06] last:border-0
                  hover:border-brand-gold/20 transition-colors duration-300"
              >
                <span className="text-[11px] font-bold tracking-[0.3em] text-slate-700 w-8 flex-shrink-0">
                  0{i + 1}
                </span>
                <p className="text-xl font-serif text-slate-300 group-hover:text-white transition-colors duration-300">
                  {item}
                </p>
                <div className="ml-auto w-6 h-[1px] bg-brand-gold/0 group-hover:bg-brand-gold/60 transition-all duration-500 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div className="relative z-10 w-full px-36">
          <HowItWorksHead />

          <div className="mt-16 space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid lg:grid-cols-12 gap-0 lg:gap-8 py-12
                  border-b border-white/[0.06] last:border-0"
              >
                {/* Icon col */}
                <div className="lg:col-span-1 flex items-start mb-6 lg:mb-0">
                  <div className="relative z-10 w-14 h-14 rounded-2xl border border-white/10 bg-brand-dark flex items-center justify-center text-brand-gold
                    group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10 transition-colors duration-300 flex-shrink-0">
                    <span className="text-sm font-bold font-mono">{step.number}</span>
                  </div>
                </div>

                {/* Phase */}
                <div className="lg:col-span-3 lg:pt-3">
                  <div className="text-sm font-bold text-brand-gold tracking-wide">{step.phase}</div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 lg:pt-1">
                  <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Detail */}
                <div className="lg:col-span-3 lg:pt-2 mt-4 lg:mt-0">
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ANCHOR ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={priceRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={priceIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-brand-gold/20 bg-white/[0.03] overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left */}
              <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-center">
                <SectionLabel>Investment</SectionLabel>
                <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3.5rem)] leading-[1.05] tracking-tight mb-4">
                  Priced for the{" "}
                  <em className="not-italic text-brand-gold">complexity of the system.</em>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times max-w-sm mb-6">
                  Not every project fits into a predefined scope. We build complex, 
                  high-value AI systems and advanced business solutions 
                  tailored to your operations.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-times max-w-sm">
                  Most custom engagements include discovery, architecture, 
                  implementation, and continue into ongoing optimization after launch.
                </p>
              </div>

              {/* Right */}
              <div className="p-12 lg:p-16 flex flex-col justify-center gap-8 bg-brand-gold/[0.03]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-2">
                    Custom Builds Start At
                  </p>
                  <div className="text-5xl font-bold font-serif text-white leading-[1.05] mb-1">
                    $25,000+
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    Typical Range: $30,000 $80,000+
                  </p>
                </motion.div>

                <div className="h-[1px] bg-white/[0.06]" />

                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={priceIn ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="space-y-3"
                >
                  {[
                    "Discovery & System Planning",
                    "Architecture & Workflow Design",
                    "Build & Implementation",
                    "Launch & Ongoing Optimization",
                  ].map((step) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button as="link" href="/contact" variant="brand">
                    Start a Custom Project
                  </Button>
                  <Button as="link" href="/contact" variant="outline-dark">
                    Book a Call
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY THIS APPROACH ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whyRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={whyIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Why This Approach</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={whyIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Structured work{" "}
              <em className="not-italic text-brand-gold">reduces risk.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={whyIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              WHY
            </motion.span>
          </div>

          <div className="grid gap-0">
            {why.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={whyIn ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-8 py-7 border-b border-white/[0.06] last:border-0
                  hover:border-brand-gold/20 transition-colors duration-300"
              >
                <span className="text-[11px] font-bold tracking-[0.3em] text-slate-700 w-8 flex-shrink-0">
                  0{i + 1}
                </span>
                <p className="text-xl font-serif text-slate-300 group-hover:text-white transition-colors duration-300">
                  {item}
                </p>
                <div className="ml-auto w-6 h-[1px] bg-brand-gold/0 group-hover:bg-brand-gold/60 transition-all duration-500 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTINUITY ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-12 lg:p-16"
          >
            <div className="max-w-2xl">
              <SectionLabel>After Launch</SectionLabel>
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] tracking-tight mb-4">
                Most built-to-spec projects become{" "}
                <em className="not-italic text-brand-gold">ongoing partnerships.</em>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-times">
                After launch, we offer ongoing support engagements to keep your
                system performing and evolving with your business.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Feature expansion and new capabilities",
                  "System optimization and performance tuning",
                  "Reliability monitoring and incident response",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wider">
                Ongoing engagements from $4,000 $10,000/month
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.9) 40%, rgba(5,5,5,0.9) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(198,166,104,0.06) 0%, transparent 70%)",
          }}
        />

        <div ref={ctaRef} className="relative z-10 w-full px-36 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-10 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Ready to Start
            </span>
            <div className="h-[1px] w-10 bg-brand-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(2rem,4vw,4.5rem)] leading-[1] tracking-tight mb-6 max-w-4xl"
          >
            Let&apos;s Build It{" "}
            <em className="not-italic text-brand-gold">Right the First Time.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md font-times"
          >
            Tell us what you&apos;re building. We&apos;ll come back with a clear
            scope and custom proposal tailored to your exact requirements before any work begins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              as="link"
              href="/contact"
              variant="brand"
              className="px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold"
            >
              Start a Custom Project
            </Button>
            <Button
              as="link"
              href="/contact"
              variant="outline-dark"
              className="px-8 py-4 text-sm font-bold"
            >
              Book a Strategy Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Extracted to avoid hook-order issues with useInView inside the main component
function HowItWorksHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="h-[1px] w-10 bg-brand-gold" />
        <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
          How It Works
        </span>
      </motion.div>

      <div className="flex items-center justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
        >
          A process built to{" "}
          <em className="not-italic text-brand-gold">eliminate risk.</em>
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
    </div>
  );
}
