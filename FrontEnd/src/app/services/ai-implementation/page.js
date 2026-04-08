"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const outcomes = [
  "Replace hours of manual work with intelligent automated workflows",
  "Connect AI to your existing CRM, email, databases, and tools",
  "Implement LLM-powered routing, classification, and processing",
  "Scale your operations without scaling your headcount",
];

const whoFor = [
  "Businesses with repetitive manual processes eating team capacity",
  "Operations teams managing data across disconnected tools",
  "Companies ready to implement AI but lacking the technical expertise",
  "Founders building AI-native workflows into their product",
];

const whatWeBuild = [
  {
    number: "01",
    title: "n8n Workflow Automation",
    short: "Multi-step automation systems that handle repetitive work end-to-end.",
    bullets: [
      "Trigger-based and scheduled workflows",
      "Internal routing and approval logic",
      "CRM and ops automation pipelines",
    ],
    accent: "from-brand-gold/20 to-transparent",
  },
  {
    number: "02",
    title: "LLM-Powered Processing",
    short: "AI that reads, classifies, and acts on your business data intelligently.",
    bullets: [
      "OpenAI and Claude integrations",
      "Document and email classification",
      "Intelligent routing and decision logic",
    ],
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "CRM & Ops Integrations",
    short: "Connect your tools into one seamless, automated operational layer.",
    bullets: [
      "CRM data sync and enrichment",
      "Webhook and event pipelines",
      "Third-party API connectors",
    ],
    accent: "from-purple-500/10 to-transparent",
  },
  {
    number: "04",
    title: "AI-Assisted Data Pipelines",
    short: "Automated data processing that keeps your business intelligence up to date.",
    bullets: [
      "Real-time cross-platform data sync",
      "AI-powered data transformation",
      "Automated reporting and alerting",
    ],
    accent: "from-emerald-500/10 to-transparent",
  },
];

const steps = [
  {
    number: "01",
    phase: "Map Existing Workflows",
    title: "Understand exactly what your team does manually today",
    description:
      "We document your current workflows, identify manual steps, find bottlenecks, and map every integration point that AI can touch.",
    detail: "Workflow mapping → Manual step audit → Integration inventory",
  },
  {
    number: "02",
    phase: "Design Automation Architecture",
    title: "Architect the AI automation system before building",
    description:
      "We design the trigger logic, AI decision points, integration flows, and data handling — with your approval before a single workflow is built.",
    detail: "Architecture diagram → Logic design → Integration spec",
  },
  {
    number: "03",
    phase: "Build and Test",
    title: "Build, test, and validate every automation end-to-end",
    description:
      "We build each workflow with real data, test edge cases, and document everything so your team understands what runs and why.",
    detail: "Workflow builds → Edge case testing → Documentation",
  },
  {
    number: "04",
    phase: "Deploy and Train",
    title: "Go live with team training and a 30-day support window",
    description:
      "We deploy to production, train your team on monitoring and managing workflows, and stay hands-on through the first 30 days.",
    detail: "Production deploy → Team training → 30-day support",
  },
  {
    number: "05",
    phase: "Monitor and Expand",
    title: "Expand automation coverage as your operations evolve",
    description:
      "Most automation systems grow. We monitor performance, fix edge cases, and build new workflows as retainer partners.",
    detail: "Performance monitoring → Refinements → New workflow builds",
  },
];

const why = [
  "We run our own AI workflows — our prospect enrichment and operations pipelines are built on n8n and OpenAI",
  "No generic templates — every workflow is built around your actual processes",
  "You own and can modify everything we build, no vendor lock-in",
  "Full documentation and team training so you understand what runs and why",
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
    const x = (e.clientX - rect.left - rect.width / 2) / 18;
    const y = (e.clientY - rect.top - rect.height / 2) / 18;
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

export default function AIImplementationPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const whatRef   = useRef(null);
  const whoRef    = useRef(null);
  const buildRef  = useRef(null);
  const priceRef  = useRef(null);
  const whyRef    = useRef(null);
  const retainRef = useRef(null);
  const ctaRef    = useRef(null);

  const whatIn   = useInView(whatRef,   { once: true, margin: "-100px" });
  const whoIn    = useInView(whoRef,    { once: true, margin: "-100px" });
  const buildIn  = useInView(buildRef,  { once: true, margin: "-100px" });
  const priceIn  = useInView(priceRef,  { once: true, margin: "-100px" });
  const whyIn    = useInView(whyRef,    { once: true, margin: "-100px" });
  const retainIn = useInView(retainRef, { once: true, margin: "-100px" });
  const ctaIn    = useInView(ctaRef,    { once: true, margin: "-100px" });

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
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-36 pt-24 pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              AI Implementation & Workflows
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6 text-[clamp(2.1rem,5.4vw,5.4rem)]">
            <SplitReveal text="We Build the AI Systems" delay={0.6} className="block" />
            <SplitReveal text="That Replace Your" delay={1.0} className="block" />
            <SplitReveal
              text="Manual Work."
              delay={1.3}
              className="block text-brand-gold"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            className="max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 font-times"
          >
            We implement AI workflows using n8n, OpenAI, and your existing stack — turning
            repetitive manual work into intelligent automated processes that run without your team touching them.
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
              Start an AI Implementation
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

      {/* ── OUTCOMES ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(198,166,104,0.04) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            ref={whatRef}
            initial={{ opacity: 0, y: 40 }}
            animate={whatIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <SectionLabel>What You Get</SectionLabel>
            <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.1] tracking-tight max-w-2xl">
              Your manual work, replaced by AI systems that run around the clock.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {outcomes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={whatIn ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                <p className="text-slate-300 text-sm font-medium leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            ref={whoRef}
            initial={{ opacity: 0, y: 40 }}
            animate={whoIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            <div>
              <SectionLabel>Who This Is For</SectionLabel>
              <h2 className="font-serif font-bold text-white text-[clamp(1.6rem,2.8vw,2.8rem)] leading-[1.15] tracking-tight">
                Teams with manual processes that cost time and money every week.
              </h2>
            </div>
            <ul className="space-y-4 mt-2">
              {whoFor.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={whoIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 text-slate-400 text-sm font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/70 mt-1.5 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            ref={buildRef}
            initial={{ opacity: 0, y: 40 }}
            animate={buildIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <SectionLabel>What We Build</SectionLabel>
            <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.1] tracking-tight max-w-2xl">
              Four categories of AI automation we implement.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatWeBuild.map((card, i) => (
              <TiltCard key={card.number} index={i}>
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.accent} opacity-60 pointer-events-none`} />
                <p className="text-[11px] font-bold text-brand-gold tracking-[0.3em] mb-4">{card.number}</p>
                <h3 className="text-lg font-bold text-white font-times uppercase tracking-wide mb-3 group-hover:text-brand-gold transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 italic leading-relaxed mb-5">{card.short}</p>
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                      <div className="w-1 h-1 rounded-full bg-brand-gold/50 mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ANCHOR ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            ref={priceRef}
            initial={{ opacity: 0, y: 30 }}
            animate={priceIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-xl">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">Investment</p>
              <p className="text-2xl font-bold text-white font-times leading-snug">
                AI Implementation from <span className="text-brand-gold">$8,000 to $40,000</span>
              </p>
              <p className="mt-3 text-sm text-slate-400 font-medium">
                Fixed-price, scoped before commitment. AI retainers from $1,500/month for ongoing workflow expansion.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button as="link" href="/contact" variant="brand">Start an Implementation</Button>
              <Button as="link" href="/pricing" variant="outline">View Full Pricing</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.1] tracking-tight max-w-2xl">
              From your current manual processes to running AI workflows.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-brand-gold/20 transition-colors"
              >
                <p className="text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase mb-1">{step.number} — {step.phase}</p>
                <h3 className="text-base font-bold text-white font-times uppercase tracking-wide mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 italic leading-relaxed mb-4">{step.description}</p>
                <p className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            ref={whyRef}
            initial={{ opacity: 0, y: 40 }}
            animate={whyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            <div>
              <SectionLabel>Why Northspec</SectionLabel>
              <h2 className="font-serif font-bold text-white text-[clamp(1.6rem,2.8vw,2.8rem)] leading-[1.15] tracking-tight">
                We implement the same AI systems we sell.
              </h2>
            </div>
            <ul className="space-y-4 mt-2">
              {why.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={whyIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 text-slate-400 text-sm font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/70 mt-1.5 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── RETAINER BRIDGE ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24">
          <motion.div
            ref={retainRef}
            initial={{ opacity: 0, y: 30 }}
            animate={retainIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-xl">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">After Launch</p>
              <p className="text-lg text-white font-times italic leading-relaxed">
                Most AI automation systems expand over time. We offer AI retainer plans that add new workflows monthly and keep your operations growing.
              </p>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                AI retainers from $1,500/month. Expand, monitor, and improve your AI systems continuously.
              </p>
            </div>
            <Button as="link" href="/retainers" variant="brand">
              View AI Retainers
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-40 border-t border-white/[0.04]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-24 text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 40 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="font-serif font-bold text-white text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tight mb-8">
              Replace your manual work with{" "}
              <span className="text-brand-gold">AI that runs itself.</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium italic max-w-xl mx-auto mb-12">
              AI implementation projects from $8,000 to $40,000. Fixed-price, scoped before any commitment is made.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                as="link"
                href="/contact"
                variant="brand"
                className="rounded-full px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold"
              >
                Start an Implementation
              </Button>
              <Button
                as="link"
                href="/services/ai-agents"
                variant="outline"
                className="rounded-full px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold"
              >
                See AI Apps & Agents
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
