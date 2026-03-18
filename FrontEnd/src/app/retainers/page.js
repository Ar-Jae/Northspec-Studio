"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";
import Button from "../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const retainerRisks = [
  "Systems degrade quietly as usage and dependencies change",
  "Performance drops and bugs accumulate without active engineering",
  "New business needs require constant updates to stay competitive",
  "Security vulnerabilities appear in libraries and infrastructure over time",
];

const retainerPlans = [
  {
    name: "Essential Support",
    price: "$3,000",
    period: "/month",
    commitment: "3-month minimum",
    for: "Stable live systems that need ongoing maintenance, bug fixes, and minor improvements.",
    includes: [
      "Bug fixes and minor updates",
      "Dependency and security patching",
      "Basic monitoring and alerting",
      "Email / Slack support",
      "72-hour response SLA",
    ],
    accent: "border-white/[0.08]",
    glow: "from-slate-400/10 to-transparent",
    badge: null,
  },
  {
    name: "Growth Development",
    price: "$5,000 – $7,000",
    period: "/month",
    commitment: "3-month minimum",
    for: "Products that need continuous development alongside maintenance—features, integrations, and performance work.",
    includes: [
      "Everything in Essential",
      "Ongoing feature development",
      "Integrations and automation work",
      "Performance improvements",
      "Priority support — 48-hour SLA",
    ],
    accent: "border-brand-gold/30",
    glow: "from-brand-gold/15 to-transparent",
    badge: "Most Popular",
  },
  {
    name: "Product Partner",
    price: "$8,000 – $12,000",
    period: "/month",
    commitment: "3-month minimum",
    for: "Active product teams with fast iteration cycles that need dedicated engineering capacity and strategic input.",
    includes: [
      "Everything in Growth",
      "Dedicated monthly sprint capacity",
      "Roadmap and architecture reviews",
      "Fast turnaround and priority queue",
      "24-hour response SLA",
    ],
    accent: "border-blue-500/20",
    glow: "from-blue-500/10 to-transparent",
    badge: null,
  },
  {
    name: "Dedicated Team",
    price: "$12,000 – $20,000+",
    period: "/month",
    commitment: "6-month minimum",
    for: "High-growth organizations scaling complex platforms that need near full-time engineering team access.",
    includes: [
      "Dev + QA coverage",
      "Scaling infrastructure management",
      "Compliance and security support",
      "Disaster recovery planning",
      "12–24 hour SLA",
    ],
    accent: "border-purple-500/20",
    glow: "from-purple-500/10 to-transparent",
    badge: null,
  },
];

const hostingPlans = [
  {
    name: "Starter",
    price: "$750",
    period: "/mo + usage",
    description: "A dedicated deployment environment for early-stage products that need a solid, secure foundation.",
    includes: [
      "Dedicated deployment environment",
      "Performance optimization baseline",
      "Uptime monitoring",
      "Security hardening",
      "Weekly backups",
    ],
    accent: "border-white/[0.08]",
    badge: null,
  },
  {
    name: "Growth",
    price: "$1,200",
    period: "/mo + usage",
    description: "Production-grade infrastructure for apps under real load with growing operational demands.",
    includes: [
      "Dedicated deployment environment",
      "Performance optimization",
      "Uptime monitoring + alerting",
      "Security & automated backups",
      "Scaling support",
    ],
    accent: "border-blue-500/20",
    badge: null,
  },
  {
    name: "Scale",
    price: "$2,000",
    period: "/mo + usage",
    description: "Built for platforms running AI workloads, high traffic, and complex infrastructure at scale.",
    includes: [
      "Dedicated deployment environment",
      "AI workload scaling",
      "Advanced performance optimization",
      "Real-time monitoring & uptime",
      "Security, backups & recovery",
    ],
    accent: "border-brand-gold/30",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Mission-critical infrastructure for organizations requiring compliance, multi-region, and dedicated capacity.",
    includes: [
      "Multi-region deployment",
      "AI workload scaling",
      "Advanced performance optimization",
      "Real-time monitoring & on-call",
      "Security, compliance & disaster recovery",
    ],
    accent: "border-purple-500/20",
    badge: null,
  },
];

const included = [
  "Dedicated engineering capacity every month",
  "Priority support with defined response SLAs",
  "Ongoing feature development and improvements",
  "System monitoring and reliability management",
  "Long-term product evolution as your business grows",
];

const whyTwo = [
  { title: "Clear Cost Ownership", desc: "Know exactly what's engineering and what's infrastructure." },
  { title: "Independent Scaling", desc: "Scale compute without changing your development support tier." },
  { title: "Faster Incident Response", desc: "We own the infrastructure, so fixes happen without coordination delays." },
  { title: "Predictable Monthly Total", desc: "Fixed pricing across both layers—no billing surprises or hourly guesswork." },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

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

export default function RetainersPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const whyRef      = useRef(null);
  const plansRef    = useRef(null);
  const includedRef = useRef(null);
  const infraRef    = useRef(null);
  const twoRef      = useRef(null);
  const policyRef   = useRef(null);
  const ctaRef      = useRef(null);

  const whyIn      = useInView(whyRef,      { once: true, margin: "-100px" });
  const plansIn    = useInView(plansRef,    { once: true, margin: "-80px" });
  const includedIn = useInView(includedRef, { once: true, margin: "-100px" });
  const infraIn    = useInView(infraRef,    { once: true, margin: "-80px" });
  const twoIn      = useInView(twoRef,      { once: true, margin: "-100px" });
  const policyIn   = useInView(policyRef,   { once: true, margin: "-100px" });
  const ctaIn      = useInView(ctaRef,      { once: true, margin: "-100px" });

  return (
    <div className="relative bg-brand-dark min-h-[40vh]">
      <BackgroundCanvasClient />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] w-full flex flex-col justify-center overflow-hidden"
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
          className="relative z-10 flex flex-col items-center justify-center text-center px-36 pt-24 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Ongoing Support
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6 text-[clamp(2.3rem,6vw,5.5rem)]">
            <SplitReveal text="Ongoing Development" delay={0.6} className="block" />
            <SplitReveal text="& Support for" delay={1.0} className="block" />
            <SplitReveal
              text="Growing Systems."
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
            We don&apos;t just build software—we stay involved to ensure it remains
            stable, scalable, and continuously improving.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.7 }}
            className="text-slate-500 text-sm font-times mb-10"
          >
            Most clients continue working with us after launch to maintain and grow their systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="/contact"
              className="bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:bg-white transition-all active:scale-[0.98]"
            >
              Start Ongoing Support
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
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── WHY RETAINERS EXIST ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whyRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={whyIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Why This Exists</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={whyIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
                Software isn&apos;t{" "}
                <em className="not-italic text-brand-gold">static.</em>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-times">
                Without ongoing engineering support, systems degrade quietly—until
                they break loudly. We provide continuous support that keeps your
                system stable, secure, and evolving with your business.
              </p>
            </motion.div>

            <div className="space-y-4">
              {retainerRisks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={whyIn ? { opacity: 1, x: 0 } : {}}
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

      {/* ── ELIGIBILITY ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-8">
        <div className="relative z-10 w-full px-36">
          <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.04] p-6 flex items-start gap-5">
            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-brand-gold uppercase tracking-widest mb-1">Northspec-Hosted Clients Only</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Retainer and managed infrastructure plans are available exclusively to clients whose systems run on Northspec infrastructure.
                Direct environment access is what makes proactive monitoring and rapid fixes possible.
                Clients who opted for self-hosting at delivery are not eligible—future support requires a new engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RETAINER PLANS ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={plansRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={plansIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Layer 01 — Retainer Plans</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={plansIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Choose your{" "}
              <em className="not-italic text-brand-gold">level of involvement.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={plansIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-sm font-times mb-12 max-w-xl"
          >
            Instead of paying per task, you get dedicated engineering capacity, predictable progress,
            and faster execution—every month.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {retainerPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={plansIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-3xl border ${plan.accent} bg-white/[0.03] backdrop-blur-md p-8
                  hover:bg-white/[0.05] transition-all duration-500`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${plan.glow} rounded-t-3xl`}
                />

                {plan.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-gold px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-brand-dark z-20">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.25em] mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-2xl font-bold font-serif text-white">{plan.price}</span>
                    <span className="text-slate-500 text-xs">{plan.period}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                    {plan.commitment}
                  </p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-times">
                  {plan.for}
                </p>

                <ul className="space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={includedRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={includedIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-12 lg:p-16"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel>What You Get</SectionLabel>
                <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] tracking-tight mb-4">
                  Ongoing engineering,{" "}
                  <em className="not-italic text-brand-gold">not just reactive fixes.</em>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times">
                  Every retainer plan includes a defined level of monthly engineering capacity.
                  You know what you&apos;re getting, what&apos;s covered, and what to expect—before the month begins.
                </p>
              </div>
              <div className="space-y-4">
                {included.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={includedIn ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                      hover:border-brand-gold/20 transition-colors duration-300"
                  >
                    <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-2" />
                    <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MANAGED INFRASTRUCTURE ────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={infraRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={infraIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Layer 02 — Managed Infrastructure</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={infraIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              The environment your{" "}
              <em className="not-italic text-brand-gold">system lives in.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={infraIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-sm font-times mb-12 max-w-xl"
          >
            Dedicated deployment, AI workload scaling, performance optimization, monitoring,
            security, and backups—so you never have to think about infrastructure.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hostingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={infraIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-3xl border ${plan.accent} bg-white/[0.03] backdrop-blur-md p-8
                  hover:bg-white/[0.05] transition-all duration-500`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-gold px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-brand-dark z-20">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.25em] mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-2xl font-bold font-serif text-white">{plan.price}</span>
                    <span className="text-slate-500 text-xs">{plan.period}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-times">
                  {plan.description}
                </p>

                <ul className="space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TWO LAYERS ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={twoRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={twoIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Why Two Layers</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={twoIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6"
              >
                Clarity on exactly{" "}
                <em className="not-italic text-brand-gold">what you&apos;re paying for.</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={twoIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-slate-400 text-sm leading-relaxed font-times"
              >
                Separating service and infrastructure gives you the flexibility to right-size
                each independently as your business scales. One client at $6,000/month is
                $72,000/year—a real, predictable engagement.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {whyTwo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={twoIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6
                    hover:border-brand-gold/20 transition-colors duration-300"
                >
                  <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Custom partnerships */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={twoIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-10 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <SectionLabel>Custom Partnerships</SectionLabel>
                <h3 className="font-serif font-bold text-white text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05] tracking-tight mb-3">
                  Need something more specialized?
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-times">
                  We design custom engineering partnerships for organizations with unique
                  requirements that don&apos;t fit a standard tier.
                </p>
              </div>
              <div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Dedicated Engineering Teams",
                    "Technical Consulting & Strategy",
                    "Legacy System Migrations",
                    "R&D and Prototyping",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                >
                  Inquire About Custom Plans
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POLICIES ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={policyRef} className="relative z-10 w-full px-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={policyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <h4 className="text-white font-bold font-serif text-xs uppercase tracking-widest mb-3">Non-Payment Policy</h4>
              <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
                <li><span className="text-white font-semibold">30 days past due:</span> All hosted services are suspended. No data is deleted. Services restore upon full payment.</li>
                <li><span className="text-white font-semibold">90 days past due:</span> All client data is permanently removed from Northspec infrastructure. This is irreversible.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <h4 className="text-white font-bold font-serif text-xs uppercase tracking-widest mb-3">Cancellation</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Both retainer and hosting agreements require 30 days written notice to cancel.
                Fees for the current billing period are non-refundable.
                Unused hours do not carry over or convert to credit.
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
            Build Once.{" "}
            <em className="not-italic text-brand-gold">Improve Continuously.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md font-times"
          >
            Let&apos;s talk about your system and build an ongoing support plan that keeps it stable, growing, and reliable.
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
              Start Ongoing Support
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
