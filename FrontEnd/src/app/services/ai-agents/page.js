"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const outcomes = [
  "Deploy AI agents that handle tasks autonomously, without manual intervention",
  "Replace human-hours with voice agents for sales, support, or operations",
  "Build AI-powered internal tools that surface insights automatically",
  "Create autonomous systems that make decisions within defined rules",
];

const whoFor = [
  "Companies wanting to deploy AI voice agents for sales or customer support",
  "Teams building AI-native internal tools and intelligent dashboards",
  "Founders creating AI-powered SaaS products with agent capabilities",
  "Businesses wanting autonomous AI systems integrated into daily operations",
];

const whatWeBuild = [
  {
    number: "01",
    title: "Voice Agent Development",
    short: "AI voice agents that handle conversations, answer questions, and take action.",
    bullets: [
      "Vapi-powered voice and chat agents",
      "Tool call integration (booking, CRM, forms)",
      "Custom knowledge base and context training",
    ],
    accent: "from-brand-gold/20 to-transparent",
  },
  {
    number: "02",
    title: "AI-Powered Internal Tools",
    short: "Intelligent dashboards and tools that surface insights and automate decisions.",
    bullets: [
      "AI-enhanced admin and operations dashboards",
      "Intelligent data surfacing and alerting",
      "Natural language interfaces for internal data",
    ],
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "Autonomous Task Agents",
    short: "AI agents that run multi-step tasks independently within defined business rules.",
    bullets: [
      "Multi-step agentic workflows",
      "Human-in-the-loop escalation logic",
      "Decision trees with LLM reasoning",
    ],
    accent: "from-purple-500/10 to-transparent",
  },
  {
    number: "04",
    title: "AI-Native Product Builds",
    short: "Purpose-built AI applications designed from the ground up around agent capabilities.",
    bullets: [
      "AI-first SaaS product architecture",
      "Embedded agent interfaces in web apps",
      "Multi-agent system orchestration",
    ],
    accent: "from-emerald-500/10 to-transparent",
  },
];

const steps = [
  {
    number: "01",
    phase: "Use Case Definition",
    title: "Define exactly what the agent does and what it decides",
    description:
      "We define the agent's scope, decision boundaries, knowledge base, escalation rules, and integration points before building anything.",
    detail: "Use case scope → Decision rules → Escalation logic",
  },
  {
    number: "02",
    phase: "Agent Architecture Design",
    title: "Design the agent system, integrations, and tooling",
    description:
      "We architect the full agent system — what tools it calls, what data it reads, how it responds, and how it hands off to humans when needed.",
    detail: "Architecture diagram → Tool spec → Integration design",
  },
  {
    number: "03",
    phase: "Build and Train",
    title: "Build the agent and train it on your business context",
    description:
      "We build the agent, configure its knowledge base, integrate its tools, and train it on real scenarios from your business.",
    detail: "Agent build → Knowledge base → Tool integration",
  },
  {
    number: "04",
    phase: "Test with Real Scenarios",
    title: "Run the agent through real business scenarios before launch",
    description:
      "We test with real edge cases, adversarial inputs, and actual business scenarios to ensure the agent behaves correctly before going live.",
    detail: "Scenario testing → Edge case testing → Approval",
  },
  {
    number: "05",
    phase: "Deploy and Monitor",
    title: "Go live with monitoring, logging, and continuous improvement",
    description:
      "We deploy with full observability — every conversation logged, every decision tracked — so we can improve the agent over time.",
    detail: "Production deploy → Logging setup → Improvement cycle",
  },
];

const why = [
  "We run our own Vapi voice agent — the AI assistant on this site is a live demo of what we build for clients",
  "Agents built around your actual use cases, not generic templates",
  "Full observability — every agent decision logged and reviewable",
  "Human-in-the-loop design — agents that know when to escalate",
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

export default function AIAgentsPage() {
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
              AI Apps & Agents
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6 text-[clamp(2.1rem,5.4vw,5.4rem)]">
            <SplitReveal text="Purpose-Built AI" delay={0.6} className="block" />
            <SplitReveal text="Agents That Become" delay={1.0} className="block" />
            <SplitReveal
              text="Part of How You Operate."
              delay={1.3}
              className="block text-brand-gold"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            className="max-w-xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-6 font-times"
          >
            We build AI-native applications — voice agents, intelligent portals, and autonomous
            task systems that become operational infrastructure for your business.
          </motion.p>

          {/* Live demo callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="mb-10 inline-flex items-center gap-3 rounded-full border border-brand-gold/30 bg-brand-gold/5 px-5 py-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs font-bold text-brand-gold tracking-[0.2em] uppercase">
              Live demo — the chat widget on this site is a Vapi agent we built
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              as="link"
              href="/contact"
              variant="brand"
              className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
            >
              Build an AI Agent
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
              AI agents that work for your business around the clock.
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
                Teams ready to put AI agents to work.
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
              Four types of AI agents we build for clients.
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
                AI Apps & Agents from <span className="text-brand-gold">$15,000 to $60,000+</span>
              </p>
              <p className="mt-3 text-sm text-slate-400 font-medium">
                Fixed-price, scoped before commitment. AI retainers available for ongoing agent improvement and expansion.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button as="link" href="/contact" variant="brand">Build an AI Agent</Button>
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
              From use case to deployed AI agent.
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
                We built and run our own AI agents. You can talk to one right now.
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
                AI agents improve with use. We offer AI retainer plans that refine agent responses, add new capabilities, and integrate new tools monthly.
              </p>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                AI retainers from $1,500/month. Continuously improve your agents after launch.
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
              Deploy AI agents that work for{" "}
              <span className="text-brand-gold">your business around the clock.</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium italic max-w-xl mx-auto mb-12">
              AI Apps & Agents from $15,000 to $60,000+. Fixed-price, scoped before any commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                as="link"
                href="/contact"
                variant="brand"
                className="rounded-full px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold"
              >
                Build an AI Agent
              </Button>
              <Button
                as="link"
                href="/services/ai-implementation"
                variant="outline"
                className="rounded-full px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold"
              >
                See AI Implementation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
