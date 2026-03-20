"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";
import Button from "../../components/Button";
import { faqs } from "../../lib/data";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projectTiers = [
  {
    name: "MVP & Early Products",
    range: "$12,000 – $30,000",
    delivery: "6–8 weeks",
    for: "Validating ideas and launching quickly with a production-ready product.",
    includes: [
      "Up to 6 screens / core views",
      "Auth, CRUD, and database",
      "Secure API foundation",
      "Launch-ready architecture",
      "Documentation & handoff",
    ],
    accent: "border-white/[0.08]",
    glow: "from-slate-400/10 to-transparent",
    badge: null,
  },
  {
    name: "Business Systems & Automation",
    range: "$20,000 – $50,000",
    delivery: "8–12 weeks",
    for: "Replacing manual workflows and building operational systems that improve efficiency.",
    includes: [
      "8–10 screens / views",
      "Role-based backend systems",
      "API + webhook integrations",
      "CRM / billing integrations",
      "Reliability + performance testing",
      "Documentation & training",
    ],
    accent: "border-blue-500/20",
    glow: "from-blue-500/10 to-transparent",
    badge: null,
  },
  {
    name: "Scalable Platforms & SaaS",
    range: "$40,000 – $90,000+",
    delivery: "10–16 weeks",
    for: "Revenue-generating platforms engineered for growth, performance, and long-term scale.",
    includes: [
      "12+ screens / views",
      "Platform-level backend",
      "Advanced roles & permissions",
      "Complex integrations",
      "Monitoring + system stability",
      "Full QA + documentation",
    ],
    accent: "border-brand-gold/30",
    glow: "from-brand-gold/15 to-transparent",
    badge: "Most Common",
  },
  {
    name: "Enterprise Systems",
    range: "$60,000+",
    delivery: "16–24+ weeks",
    for: "High-performance, secure systems built for long-term operational demand at scale.",
    includes: [
      "Multi-system architecture",
      "Enterprise-grade backend",
      "Multi-tenant systems",
      "Security & compliance",
      "Observability + alerting",
      "CI/CD pipelines",
    ],
    accent: "border-purple-500/20",
    glow: "from-purple-500/10 to-transparent",
    badge: "Custom Quote",
  },
];

const retainerTiers = [
  {
    name: "Essential",
    price: "$3,000",
    period: "/month",
    for: "Maintenance, bug fixes, and system stability for live applications.",
    includes: [
      "Bug fixes and incident response",
      "Dependency and security updates",
      "Monthly system health review",
      "Async engineering support",
    ],
    badge: null,
  },
  {
    name: "Growth",
    price: "$5,000 – $7,000",
    period: "/month",
    for: "Ongoing development plus maintenance, for products that need to keep improving.",
    includes: [
      "Everything in Essential",
      "Feature development (defined scope)",
      "Performance optimization",
      "Priority response times",
    ],
    badge: "Most Popular",
  },
  {
    name: "Product Partner",
    price: "$8,000 – $12,000",
    period: "/month",
    for: "Dedicated engineering capacity for serious products with continuous development needs.",
    includes: [
      "Everything in Growth",
      "Dedicated monthly sprint capacity",
      "Architecture and roadmap reviews",
      "Direct engineering access",
    ],
    badge: null,
  },
];

const engagementSteps = [
  {
    number: "01",
    phase: "Initial Build",
    title: "6–16 weeks",
    desc: "Scoped, fixed-price project. You know the cost before work begins.",
  },
  {
    number: "02",
    phase: "Launch & Stabilization",
    title: "2–4 weeks",
    desc: "Deploy, monitor, and resolve any post-launch issues.",
  },
  {
    number: "03",
    phase: "Ongoing Support",
    title: "Monthly retainer",
    desc: "Continuous development, maintenance, and system evolution.",
  },
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

export default function PricingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const tiersRef   = useRef(null);
  const tiersIn    = useInView(tiersRef, { once: true, margin: "-100px" });
  const customRef  = useRef(null);
  const customIn   = useInView(customRef, { once: true, margin: "-100px" });
  const retainRef  = useRef(null);
  const retainIn   = useInView(retainRef, { once: true, margin: "-100px" });
  const infraRef   = useRef(null);
  const infraIn    = useInView(infraRef, { once: true, margin: "-100px" });
  const addonsRef  = useRef(null);
  const addonsIn   = useInView(addonsRef, { once: true, margin: "-100px" });
  const flowRef    = useRef(null);
  const flowIn     = useInView(flowRef, { once: true, margin: "-100px" });
  const priorityRef= useRef(null);
  const priorityIn = useInView(priorityRef, { once: true, margin: "-100px" });
  const faqRef     = useRef(null);
  const faqIn      = useInView(faqRef, { once: true, margin: "-100px" });
  const ctaRef     = useRef(null);
  const ctaIn      = useInView(ctaRef, { once: true, margin: "-100px" });

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
              "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(198,166,104,0.07) 0%, transparent 70%)",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-36 pt-24 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Pricing
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6 text-[clamp(2.1rem,5.4vw,5rem)]">
            <SplitReveal text="Clear Pricing for" delay={0.6} className="block" />
            <SplitReveal
              text="Serious Projects."
              delay={1.0}
              className="block text-brand-gold"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className="max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-6 font-times"
          >
            Most clients invest between{" "}
            <span className="text-white font-semibold">$12,000 and $50,000+</span>{" "}
            depending on scope and complexity.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="text-slate-500 text-sm font-times"
          >
            Fixed-price quotes. No hourly billing. No surprises.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── PROJECT BUILDS ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={tiersRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={tiersIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Project-Based Builds</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={tiersIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Choose your{" "}
              <em className="not-italic text-brand-gold">starting point.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={tiersIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              BUILD
            </motion.span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projectTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                animate={tiersIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-3xl border ${tier.accent} bg-white/[0.03] backdrop-blur-md p-8
                  hover:bg-white/[0.05] transition-all duration-500`}
              >
                {/* Top gradient line */}
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tier.glow} rounded-t-3xl`}
                />

                {/* Badge */}
                {tier.badge && (
                  <span className={`absolute -top-3 left-7 rounded-full px-4 py-1 text-[10px] uppercase tracking-widest font-bold z-20 ${
                    tier.badge === "Most Common"
                      ? "bg-brand-gold text-brand-dark"
                      : "bg-white/10 border border-white/20 text-slate-300"
                  }`}>
                    {tier.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.25em] mb-4">
                    {tier.name}
                  </h3>
                  <div className="text-3xl font-bold font-serif text-white leading-[1.05] mb-1">
                    {tier.range}
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">
                    {tier.delivery} delivery
                  </p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-times">
                  {tier.for}
                </p>

                <ul className="space-y-3">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={tiersIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-center text-xs text-slate-600 font-medium"
          >
            All pricing is tailored to scope, complexity, integrations, and infrastructure requirements. You receive a fixed quote before any work begins.
          </motion.p>
        </div>
      </section>

      {/* ── CUSTOM / BUILT-TO-SPEC ────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={customRef} className="relative z-10 w-full px-6 md:px-24 lg:px-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={customIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-brand-gold/20 bg-white/[0.03] overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-center">
                <SectionLabel>Custom Builds</SectionLabel>
                <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3.5rem)] leading-[1.05] tracking-tight mb-4">
                  Projects that need a{" "}
                  <em className="not-italic text-brand-gold">tailored approach.</em>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times max-w-sm">
                  Some projects don&apos;t fit neatly into a tier. Complex architectures,
                  multi-system integrations, or highly specialized builds are scoped
                  individually through our Built-to-Spec process.
                </p>
                <div className="mt-8">
                  <a
                    href="/built-to-spec"
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-white transition-colors"
                  >
                    Learn about Built-to-Spec
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-12 lg:p-16 flex flex-col justify-center gap-6 bg-brand-gold/[0.03]">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-2">
                    Typical investment
                  </p>
                  <div className="text-5xl font-bold font-serif text-white leading-[1.05] mb-1">
                    $30,000 – $80,000+
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    Scoped individually to your requirements
                  </p>
                </div>

                <div className="h-[1px] bg-white/[0.06]" />

                <ul className="space-y-3">
                  {[
                    "Complex multi-system architecture",
                    "Specialized domain requirements",
                    "Custom infrastructure and deployment",
                    "Long-term platform thinking built in",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-2">
                  <a
                    href="/contact"
                    className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                  >
                    Discuss Your Project
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ONGOING SUPPORT ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={retainRef} className="relative z-10 w-full px-6 md:px-24 lg:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={retainIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Ongoing Support & Development</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={retainIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Most clients continue{" "}
              <em className="not-italic text-brand-gold">after launch.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={retainIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-sm font-times mb-12 max-w-xl"
          >
            Software isn&apos;t finished at launch. Ongoing retainers ensure your system stays reliable,
            secure, and continuously improving as your business grows.
          </motion.p>

          <div className="grid gap-6 lg:grid-cols-3">
            {retainerTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                animate={retainIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-3xl border bg-white/[0.03] backdrop-blur-md p-8
                  transition-all duration-500 hover:bg-white/[0.05] ${
                    tier.badge
                      ? "border-brand-gold/30 hover:border-brand-gold/50"
                      : "border-white/[0.08] hover:border-white/20"
                  }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-gold px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-brand-dark z-20">
                    {tier.badge}
                  </span>
                )}

                <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.25em] mb-4">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold font-serif text-white">{tier.price}</span>
                  <span className="text-slate-500 text-sm font-medium">{tier.period}</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-times mt-3">
                  {tier.for}
                </p>

                <ul className="space-y-3">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={retainIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 text-center text-xs text-slate-600 font-medium"
          >
            Retainer plans are available to clients whose systems are hosted on Northspec infrastructure.
          </motion.p>
        </div>
      </section>

      {/* ── MANAGED INFRASTRUCTURE ────────────────────────────────────────────── */}
      <section className="relative z-10 py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={infraRef} className="relative z-10 w-full px-6 md:px-24 lg:px-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={infraIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-10 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <SectionLabel>Managed Infrastructure</SectionLabel>
                <h2 className="font-serif font-bold text-white text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05] tracking-tight mb-3">
                  The environment your system lives in.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times">
                  Dedicated deployment, AI workload scaling, performance optimization,
                  monitoring, security, and automated backups.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-start lg:items-end">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-2">
                    Monthly range
                  </p>
                  <div className="text-4xl font-bold font-serif text-white leading-[1.05]">
                    $750 – $2,500
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mt-1">
                    Per month + usage
                  </p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-6 py-3 flex-shrink-0"
                >
                  Get Details
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW ENGAGEMENTS WORK ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={flowRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={flowIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>How Engagements Typically Work</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={flowIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-12 max-w-2xl"
          >
            Most projects follow a{" "}
            <em className="not-italic text-brand-gold">simple structure.</em>
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-0">
            {engagementSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={flowIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative group p-10 border border-white/[0.06] first:rounded-l-3xl last:rounded-r-3xl
                  bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300
                  border-r-0 last:border-r"
              >
                <div className="text-[10px] font-bold tracking-[0.3em] text-slate-700 mb-4">
                  {step.number}
                </div>
                <div className="text-sm font-bold text-brand-gold tracking-wide mb-2">
                  {step.phase}
                </div>
                <div className="text-2xl font-bold font-serif text-white mb-3">
                  {step.title}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-times">
                  {step.desc}
                </p>
                {i < engagementSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full border border-brand-gold/30 bg-brand-dark flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOMATION ADD-ONS ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={addonsRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={addonsIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Automation Add-Ons</SectionLabel>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={addonsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-slate-400 text-sm font-times mb-8 max-w-xl"
          >
            Standalone automation work available as project add-ons or independent engagements.
          </motion.p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "n8n Workflow Setup", range: "$3,000 – $8,000" },
              { title: "Core Automation Systems", range: "$1,000 – $2,500" },
              { title: "Advanced Workflow Systems", range: "$3,000 – $10,000" },
              { title: "AI-Driven Automation", range: "$5,000 – $15,000+" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={addonsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8
                  hover:border-brand-gold/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                  {item.title}
                </h4>
                <p className="text-2xl font-bold font-serif text-white">{item.range}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIORITY DELIVERY ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={priorityRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={priorityIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-2 gap-6"
          >
            <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/[0.03] p-10">
              <SectionLabel>Priority Delivery</SectionLabel>
              <p className="text-slate-400 text-sm leading-relaxed font-times mb-8">
                For teams with critical deadlines. Guaranteed earlier delivery windows,
                dedicated capacity, and accelerated execution at a premium.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Accelerated (~25% faster)", value: "+30%" },
                  { label: "Priority (~40% faster)", value: "+50%" },
                  { label: "Emergency (Mission Critical)", value: "+100%" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/[0.06] last:border-0">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">{item.label}</span>
                    <span className="text-white font-bold font-serif text-lg">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10">
              <SectionLabel>Why Our Pricing Works</SectionLabel>
              <div className="space-y-7">
                {[
                  { title: "Fixed-Price, Not Hourly", desc: "You know the full cost before work begins. No surprises, no runaway bills." },
                  { title: "Scoped to Your Stage", desc: "A startup needs momentum. An enterprise needs governance. We price accordingly." },
                  { title: "Built for the Long Run", desc: "Every project is designed with post-launch continuity in mind, not just delivery." },
                ].map((item, i) => (
                  <div key={i}>
                    <h4 className="text-white font-bold font-serif text-sm mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-times">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={faqRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={faqIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>FAQ</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={faqIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-12 max-w-2xl"
          >
            Common questions,{" "}
            <em className="not-italic text-brand-gold">straight answers.</em>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={faqIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6
                  [&_summary::-webkit-details-marker]:hidden hover:border-white/15 transition-colors duration-300 h-fit"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-white">
                  <h3 className="text-base font-semibold font-serif leading-snug">{faq.question}</h3>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 font-times">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
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

        <div ref={ctaRef} className="relative z-10 w-full px-6 md:px-36 flex flex-col items-center text-center">
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
            Let&apos;s Scope{" "}
            <em className="not-italic text-brand-gold">Your Project.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md font-times"
          >
            Tell us what you&apos;re building and we&apos;ll give you a clear, fixed-price quote before any commitment.
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
              Start a Project
            </a>
            <a
              href="/request-call"
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
