"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const whatThisIs = [
  "Custom workflows and business logic that off-the-shelf tools can't handle",
  "Complex integrations across multiple systems, platforms, and data sources",
  "Unique system architecture built around how your business actually operates",
  "Business-specific platforms that need to scale reliably long-term",
];

const whoFor = [
  "Companies with complex operational needs that don't fit a standard build",
  "Teams replacing multiple disconnected systems with one cohesive platform",
  "Founders building unique SaaS products with specialized requirements",
  "Businesses requiring deep integrations and custom data architecture",
];

const steps = [
  {
    number: "01",
    phase: "Discovery & Planning",
    title: "Analyze your requirements, workflows, and constraints",
    description:
      "We spend time understanding your business, not just what to build, but why. Requirements, constraints, and success criteria are defined before architecture begins.",
    detail: "Stakeholder interviews → Requirements doc → Scope definition",
  },
  {
    number: "02",
    phase: "System Architecture",
    title: "Design how everything connects and scales",
    description:
      "We architect the full system, data models, integration points, API contracts, and infrastructure, before writing a single line of code.",
    detail: "Technical spec → Architecture plan → Scalability review",
  },
  {
    number: "03",
    phase: "Development",
    title: "Build with performance and long-term reliability in mind",
    description:
      "Milestone-based delivery with real visibility. You see the system working at every stage, no black-box development, no surprises at the end.",
    detail: "Milestone delivery → Staging access → Code review",
  },
  {
    number: "04",
    phase: "Launch & Ongoing Support",
    title: "Deploy, monitor, and continue improving",
    description:
      "We handle deployment, monitor post-launch performance, and offer ongoing development support to evolve the system as your business grows.",
    detail: "Production deploy → Monitoring → Ongoing improvements",
  },
];

const whyCustom = [
  "Built specifically for your business, not forced into someone else's template",
  "Eliminates inefficiencies across systems by designing exactly what you need",
  "Scalable architecture from day one, built to grow with your operations",
  "Long-term flexibility and control over your own system and roadmap",
];

const riskReduction = [
  { label: "Structured Process", desc: "Defined milestones prevent scope from expanding without visibility or agreement." },
  { label: "Clear Communication", desc: "You see the project at every stage. No updates dropped into a void." },
  { label: "Scalable from Day One", desc: "Architecture decisions are made for your growth, not just your launch." },
  { label: "Fixed-Price Quotes", desc: "You know the full cost before work begins. No hourly billing, no runaway budgets." },
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CustomPlansPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const whatRef    = useRef(null);
  const whoRef     = useRef(null);
  const priceRef   = useRef(null);
  const whyRef     = useRef(null);
  const riskRef    = useRef(null);
  const retainRef  = useRef(null);
  const ctaRef     = useRef(null);

  const whatIn    = useInView(whatRef,    { once: true, margin: "-100px" });
  const whoIn     = useInView(whoRef,     { once: true, margin: "-100px" });
  const priceIn   = useInView(priceRef,   { once: true, margin: "-100px" });
  const whyIn     = useInView(whyRef,     { once: true, margin: "-100px" });
  const riskIn    = useInView(riskRef,    { once: true, margin: "-100px" });
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
              Custom Projects
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6">
            <SplitReveal text="Custom Software & Systems" delay={0.6} className="block text-[clamp(2.5rem,6.3vw,5.85rem)]" />
            <SplitReveal
              text="Built Around Your Business."
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
            For projects that require tailored architecture, complex integrations,
            and systems designed specifically around how your business operates.
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
              Start a Custom Project
            </Button>
            <Button
              as="link"
              href="/contact"
              variant="outline"
              className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
            >
              Book a Strategy Call
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── WHAT THIS IS ──────────────────────────────────────────────────────── */}
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
            <SectionLabel>What This Is</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={whatIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
                Not every project fits{" "}
                <em className="not-italic text-brand-gold">a predefined package.</em>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-times">
                Some systems are too complex, too specialized, or too deeply tied
                to your specific workflows to be scoped into a standard tier. Custom
                projects are how we handle the work that requires real architectural
                thinking, not templated solutions.
              </p>
            </motion.div>

            <div className="space-y-4">
              {whatThisIs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={whatIn ? { opacity: 1, x: 0 } : {}}
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
              Complex needs.{" "}
              <em className="not-italic text-brand-gold">Proper solutions.</em>
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

      {/* ── HOW CUSTOM PROJECTS WORK ──────────────────────────────────────────── */}
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
              <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-center">
                <SectionLabel>Investment</SectionLabel>
                <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3.5rem)] leading-[1.05] tracking-tight mb-4">
                  Priced for{" "}
                  <em className="not-italic text-brand-gold">the complexity it takes.</em>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times max-w-sm">
                  Custom projects are scoped individually based on what your system
                  actually requires. Every quote is custom to your needs no hourly billing,
                  no surprises, no budget overruns.
                </p>
              </div>

              <div className="p-12 lg:p-16 flex flex-col justify-center gap-8 bg-brand-gold/[0.03]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-2">
                    Projects start at
                  </p>
                  <div className="text-5xl font-bold font-serif text-white leading-[1.05] mb-1">
                    $25,000+
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    Most engagements: $30,000 $80,000+
                  </p>
                </motion.div>

                <div className="h-[1px] bg-white/[0.06]" />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={priceIn ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-slate-400 text-sm leading-relaxed"
                >
                  Scope, architecture, and pricing are defined together during
                  discovery. You receive a full custom proposal tailored to your requirements before any
                  development begins.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-wrap gap-3"
                >
                  <a
                    href="/contact"
                    className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                  >
                    Start a Custom Project
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-6 py-4"
                  >
                    Book a Strategy Call
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY GO CUSTOM ─────────────────────────────────────────────────────── */}
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
            <SectionLabel>Why Go Custom</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={whyIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Built for your business.{" "}
              <em className="not-italic text-brand-gold">Not someone else&apos;s.</em>
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
            {whyCustom.map((item, i) => (
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

      {/* ── RISK REDUCTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={riskRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={riskIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>How We Reduce Risk</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={riskIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-12 max-w-2xl"
          >
            Custom doesn&apos;t mean{" "}
            <em className="not-italic text-brand-gold">unpredictable.</em>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskReduction.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={riskIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8
                  hover:border-brand-gold/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="text-[10px] font-bold tracking-[0.3em] text-slate-700 mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold font-serif text-white mb-3">
                  {item.label}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
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
                Most custom projects transition into{" "}
                <em className="not-italic text-brand-gold">ongoing support.</em>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-times">
                Complex systems don&apos;t stop needing engineering after they launch.
                We offer ongoing development and support to keep your system
                growing and evolving as your business demands change.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Feature expansion and new system capabilities",
                  "Performance optimization and scalability improvements",
                  "Architecture evolution as your product and team grow",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/retainers"
                  className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                >
                  View Retainer Plans
                </a>
                <p className="text-xs text-slate-600 font-medium uppercase tracking-wider self-center">
                  Ongoing from $5,000 $12,000/month
                </p>
              </div>
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
            Let&apos;s Build the Right System, {" "}
            <em className="not-italic text-brand-gold">Not Just Any System.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md font-times"
          >
            Tell us what you&apos;re building and we&apos;ll scope it properly architecture, timeline, and a custom proposal included, all tailored to your requirements.
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
              Start a Custom Project
            </a>
            <a
              href="/contact"
              className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-8 py-4"
            >
              Book a Strategy Call
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

// ─── Extracted head (avoid hook order issues) ─────────────────────────────────

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
          <em className="not-italic text-brand-gold">complex systems.</em>
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
