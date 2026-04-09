"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const problems = [
  "Manual data entry that wastes hours and introduces errors",
  "Disconnected systems that slow down teams and workflows",
  "Duplicated effort across tools that don't talk to each other",
  "Data that is fragmented and unusable for AI and automation",
];

const whoFor = [
  "Businesses using multiple disconnected tools and platforms",
  "Teams relying on manual data transfer between systems",
  "Companies implementing AI into existing business operations",
  "Organizations that need CRMs, billing, and tools to work together",
];

const whatWeBuild = [
  {
    number: "01",
    title: "Business System Integrations",
    short: "Connect CRMs, billing tools, forms, dashboards, and internal platforms.",
    bullets: [
      "HubSpot, Salesforce, Stripe, and more",
      "Unified operational dashboards",
      "Bi-directional sync across tools",
    ],
    accent: "from-brand-gold/20 to-transparent",
  },
  {
    number: "02",
    title: "Automation Infrastructure",
    short: "The connection layer that supports workflows and operational automation.",
    bullets: [
      "Multi-system process automation",
      "Custom middleware and adapters",
      "Event-driven workflow triggers",
    ],
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "AI-Ready Data Flows",
    short: "Structure and route the data AI systems need to function properly.",
    bullets: [
      "Intelligent data transformation",
      "Real-time AI input pipelines",
      "Centralized system monitoring",
    ],
    accent: "from-purple-500/10 to-transparent",
  },
  {
    number: "04",
    title: "Custom API Integrations",
    short: "Reliable connections where off-the-shelf tools fall short.",
    bullets: [
      "Custom REST and GraphQL design",
      "Security and permission mapping",
      "Webhook and event handlers",
    ],
    accent: "from-emerald-500/10 to-transparent",
  },
];

const steps = [
  {
    number: "01",
    phase: "System Review",
    title: "We identify the tools, workflows, and bottlenecks",
    description:
      "We map your current tool stack and find exactly where data breaks down, ensuring every connection supports a business outcome.",
    detail: "Tool Audit → Data Mapping → Integration Strategy",
  },
  {
    number: "02",
    phase: "Integration Design",
    title: "Plan the connections, logic, and data flows",
    description:
      "We define how systems should connect, what data should move, and where automation fits before building anything technical.",
    detail: "Architecture Plan → Data Schema → Logic Design",
  },
  {
    number: "03",
    phase: "Implementation",
    title: "Build and test secure, reliable connection layers",
    description:
      "We build every integration with professional-grade error handling, retry logic, and security built in from the start.",
    detail: "Production Build → Security Audit → System Integration",
  },
  {
    number: "04",
    phase: "Optimization & Expansion",
    title: "Ensure your systems work as your business grows",
    description:
      "Integrations need to stay robust. We monitor for issues and refine the system as your operations and technology evolve.",
    detail: "Live Monitoring → System Refinement → Scaling",
  },
];

const why = [
  "Connected tools that stop fighting each other",
  "Systems that support fast, automated operations",
  "Infrastructure designed to be AI-ready from day one",
  "Reliable data flow that reduces errors and overhead",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

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

function TiltCard({ children, index }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX. rect.left. rect.width / 2) / 18;
    const y = (e.clientY. rect.top. rect.height / 2) / 18;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02,1.02,1.02)`;
    cardRef.current.style.transition = "transform 0.05s linear";
  };

  const onLeave = () => {
    cardRef.current.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-8
        hover:border-brand-gold/30 transition-colors duration-500 cursor-default"
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function IntegrationsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const problemRef = useRef(null);
  const whoRef     = useRef(null);
  const buildRef   = useRef(null);
  const priceRef   = useRef(null);
  const whyRef     = useRef(null);
  const retainRef  = useRef(null);
  const ctaRef     = useRef(null);

  const problemIn = useInView(problemRef, { once: true, margin: "-100px" });
  const whoIn     = useInView(whoRef,     { once: true, margin: "-100px" });
  const buildIn   = useInView(buildRef,   { once: true, margin: "-100px" });
  const priceIn   = useInView(priceRef,   { once: true, margin: "-100px" });
  const whyIn     = useInView(whyRef,     { once: true, margin: "-100px" });
  const retainIn  = useInView(retainRef,  { once: true, margin: "-100px" });
  const ctaIn     = useInView(ctaRef,     { once: true, margin: "-100px" });

  return (
    <div className="relative bg-brand-dark min-h-[40vh]">
      <BackgroundCanvasClient />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] w-full flex flex-col justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,166,104,0.07) 0%, transparent 70%)",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-36 pt-24 pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Connection Layer
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6 text-[clamp(2.5rem,6.3vw,5.85rem)]">
            <SplitReveal text="Connected Systems for AI and" delay={0.6} className="block" />
            <SplitReveal
              text="Operational Efficiency."
              delay={1.0}
              className="block text-brand-gold uppercase text-[clamp(1.5rem,4vw,3.5rem)]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 font-times font-medium italic"
          >
            We integrate the platforms your business relies on so data flows 
            properly, workflows improve, and AI can be implemented effectively.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              as="link"
              href="/contact"
              variant="brand"
              className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
            >
              Start an Integration Project
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

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── THE REAL PROBLEM ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={problemRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={problemIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>The Real Problem</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={problemIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
                Disconnected systems create{" "}
                <em className="not-italic text-brand-gold">slow work and bad data.</em>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-times mb-6">
                Disconnected systems create slow work, duplicate effort, and bad data.
                We connect the tools your business already uses so information flows 
                properly, workflows run smoothly, and automation can actually deliver value.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm font-times italic">
                We make your systems work together so automation and AI can drive 
                real operational value.
              </p>
            </motion.div>

            <div className="space-y-4">
              {problems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={problemIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                    hover:border-brand-gold/20 transition-colors duration-300"
                >
                  <span className="text-brand-gold font-bold mt-0.5 flex-shrink-0">→</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
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
              Teams whose systems{" "}
              <em className="not-italic text-brand-gold">work against them.</em>
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
                className="group flex items-center gap-4 py-7 border-b border-white/[0.06] last:border-0
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

      {/* ── WHAT WE BUILD ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div className="relative z-10 w-full px-36">
          <WhatWeBuildHead buildRef={buildRef} buildIn={buildIn} />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeBuild.map((item, i) => (
              <TiltCard key={item.number} index={i}>
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.accent} rounded-t-3xl`}
                />
                <div className="text-[11px] font-bold tracking-[0.3em] text-slate-700 mb-6">
                  {item.number}
                </div>
                <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {item.short}
                </p>
                <ul className="space-y-2">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-xs text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ANCHOR ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
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
                  Priced for business{" "}
                  <em className="not-italic text-brand-gold">system value.</em>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times max-w-sm">
                  Most integration engagements range from $4,000 to $15,000+ 
                  depending on system complexity, workflow requirements, and AI components.
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
                    Engagement Range
                  </p>
                  <div className="text-5xl font-bold font-serif text-white leading-[1.05] mb-1">
                    $4,000. $15,000+
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    Depending on complexity and AI logic
                  </p>
                </motion.div>

                <div className="h-[1px] bg-white/[0.06]" />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={priceIn ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-slate-400 text-sm leading-relaxed"
                >
                  Every project is custom-scoped to your requirements. You receive a
                  tailored proposal before any work begins.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-wrap gap-3"
                >
                  <a
                    href="/pricing"
                    className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                  >
                    View Pricing
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-6 py-4"
                  >
                    Get a Quote
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
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
                <div className="lg:col-span-1 flex items-start mb-6 lg:mb-0">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-brand-dark flex items-center justify-center text-brand-gold
                    group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10 transition-colors duration-300 flex-shrink-0">
                    <span className="text-sm font-bold font-mono">{step.number}</span>
                  </div>
                </div>
                <div className="lg:col-span-3 lg:pt-3">
                  <div className="text-sm font-bold text-brand-gold tracking-wide">{step.phase}</div>
                </div>
                <div className="lg:col-span-5 lg:pt-1">
                  <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="lg:col-span-3 lg:pt-2 mt-4 lg:mt-0">
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whyRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={whyIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Why It Matters</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={whyIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Make your business{" "}
              <em className="not-italic text-brand-gold">run efficiently.</em>
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
                className="group flex items-center gap-4 py-7 border-b border-white/[0.06] last:border-0
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

      {/* ── RETAINER TRANSITION ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={retainRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={retainIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-12 lg:p-16"
          >
            <div className="max-w-2xl">
              <SectionLabel>After Launch</SectionLabel>
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] tracking-tight mb-4">
                Integration work evolves{" "}
                <em className="not-italic text-brand-gold">as your systems grow.</em>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-times">
                Systems update. APIs change. New tools get added. We offer ongoing
                support to keep your integrations running reliably as your business
                and tech stack evolve.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "New integrations as your tool stack expands",
                  "Maintenance and updates when APIs change",
                  "Performance monitoring and reliability improvements",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wider">
                Ongoing engagements from $1,500. $4,000/month
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
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
              Get Started
            </span>
            <div className="h-[1px] w-10 bg-brand-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(2rem,4vw,4.5rem)] leading-[1] tracking-tight mb-6 max-w-4xl"
          >
            Stop Letting Your Systems{" "}
            <em className="not-italic text-brand-gold">Work Against You.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md font-times"
          >
            Let&apos;s map your tool stack, identify what&apos;s breaking down, and build integrations that fix it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="/contact"
              className="bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:bg-white transition-all active:scale-[0.98]"
            >
              Start Your Integration Project
            </a>
            <a
              href="/contact"
              className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-8 py-4"
            >
              Book a Call
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Extracted heads (avoid hook order issues) ────────────────────────────────

function WhatWeBuildHead({ buildRef, buildIn }) {
  return (
    <div ref={buildRef}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={buildIn ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="h-[1px] w-10 bg-brand-gold" />
        <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
          What We Build
        </span>
      </motion.div>

      <div className="flex items-center justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={buildIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
        >
          Infrastructure that makes your{" "}
          <em className="not-italic text-brand-gold">systems work together.</em>
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={buildIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
        >
          BUILD
        </motion.span>
      </div>
    </div>
  );
}

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
          A structured process for{" "}
          <em className="not-italic text-brand-gold">reliable integration.</em>
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
