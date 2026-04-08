"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";
import Button from "../../components/Button";

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-brand-gold" />
      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">
        {children}
      </span>
    </div>
  );
}

function SplitReveal({ text, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.2em] mr-[0.3em]">
          <motion.span
            className="inline-block -mb-[0.2em]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ title, desc, bullets, href, badge, i }) {
  const ref = useRef(null);
  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }
  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 hover:border-brand-gold/30 transition-all duration-300 h-full flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        {badge && (
          <span className="inline-block text-[9px] font-bold text-brand-gold font-times uppercase tracking-[0.3em] border border-brand-gold/30 rounded-full px-3 py-1 mb-5 w-fit">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-bold text-white font-times uppercase tracking-widest mb-3 group-hover:text-brand-gold transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed font-medium italic mb-6">{desc}</p>
        <ul className="space-y-2 mt-auto mb-8">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-slate-400 font-medium">
              <div className="w-1 h-1 rounded-full bg-brand-gold/60 mt-1.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="text-[10px] font-bold text-brand-gold font-times uppercase tracking-[0.2em] flex items-center gap-2 group/link"
        >
          Learn More
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Extracted section heads ───────────────────────────────────────────────────

function ServicesHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto mb-16">
      <SectionLabel>All Services</SectionLabel>
      <SplitReveal
        text="Everything We Automate and Build."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
        AI automation is our primary offering. Software and mobile app development supports teams that need the foundation first.
      </p>
    </motion.div>
  );
}

function EngagementHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto mb-16">
      <SectionLabel>How It Works</SectionLabel>
      <SplitReveal
        text="How Engagements Typically Work."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-brand-dark text-white">
      <BackgroundCanvasClient />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(212,175,55,0.06),transparent_60%)]" />
        </motion.div>

        <div className="relative z-10 px-6 md:px-36 pt-40 pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Services</SectionLabel>
          </motion.div>

          <SplitReveal
            text="AI Automation. Built for Your Operations."
            className="text-[2.7rem] md:text-[4.05rem] font-bold text-white font-times uppercase tracking-tight leading-[1.05] max-w-4xl mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 text-xl text-slate-400 font-medium italic leading-relaxed max-w-2xl"
          >
            We implement AI into your operations — workflows, agents, voice systems, and integrations. Software and mobile app development for teams that need the foundation first. AI automation projects start at{" "}
            <span className="text-white font-bold not-italic">$8,000</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Button as="link" href="/contact" variant="brand">Start Automating</Button>
            <a
              href="https://calendar.app.google/XMN48TcybVjmij4C7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-white transition-all rounded-xl px-6 py-3 text-sm font-medium font-times uppercase tracking-widest"
            >
              Book a Call
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SELF-IDENTIFICATION ─────────────────────────────────────────── */}
      <StartHereSection />

      {/* ── 3. GROUPED SERVICES ───────────────────────────────────────────── */}
      <AllServicesSection />

      {/* ── 4. PRICE ANCHOR ───────────────────────────────────────────────── */}
      <PriceSection />

      {/* ── 5. HOW ENGAGEMENTS WORK ───────────────────────────────────────── */}
      <EngagementSection />

      {/* ── 6. WHY CHOOSE US ──────────────────────────────────────────────── */}
      <WhySection />

      {/* ── 7. RETAINER BRIDGE ────────────────────────────────────────────── */}
      <BridgeSection />

      {/* ── 8. FINAL CTA ──────────────────────────────────────────────────── */}
      <CtaSection />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function StartHereSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const paths = [
    { label: "I want to automate manual processes", action: "AI Automation & Workflows", href: "/services/ai-implementation", tag: "AI" },
    { label: "I want to build an AI agent or app", action: "AI Apps & Agents", href: "/services/ai-agents", tag: "AI" },
    { label: "I need an AI strategy before I build", action: "AI Strategy & Consulting", href: "/services/ai-strategy", tag: "Strategy" },
    { label: "I need a software or mobile app", action: "Software & Mobile App Development", href: "/services/software-development", tag: "Dev" },
    { label: "I need a mobile app", action: "Mobile App Development", href: "/services/mobile-app-development", tag: "Mobile" },
  ];

  return (
    <section className="py-20 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <SectionLabel>Not Sure Where to Start?</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] max-w-xl">
          Find Where You Fit.
        </h2>
        <p className="mt-4 text-slate-400 font-medium italic text-sm max-w-lg">
          Tell us what you&apos;re trying to accomplish and we&apos;ll point you to the right service.
        </p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={p.href}
              className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 hover:border-brand-gold/30 hover:bg-brand-gold/[0.03] transition-all"
            >
              <div>
                <p className="text-xs text-slate-500 font-medium italic mb-0.5">{p.label}</p>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wider group-hover:text-brand-gold transition-colors">{p.action}</p>
              </div>
              <span className="text-[10px] font-bold text-brand-gold/60 font-times uppercase tracking-widest border border-brand-gold/20 rounded-full px-2 py-0.5 shrink-0 ml-4 group-hover:border-brand-gold/40 transition-colors">
                {p.tag}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AllServicesSection() {
  const groups = [
    {
      label: "AI Services — Primary Offering",
      tag: "Best for replacing manual work with AI",
      services: [
        {
          title: "AI Strategy & Consulting",
          desc: "Find where AI creates real value in your operations before spending a dollar on implementation.",
          bullets: ["AI readiness assessment", "Process audit and opportunity mapping", "Prioritized AI implementation roadmap", "Technology stack recommendation"],
          href: "/services/ai-strategy",
          badge: "Start Here",
        },
        {
          title: "AI Implementation & Workflows",
          desc: "We build the AI automation systems that replace your manual work — end to end.",
          bullets: ["n8n workflow automation", "LLM-powered routing and classification", "CRM and ops automation", "AI-assisted data pipelines"],
          href: "/services/ai-implementation",
          badge: "Most Popular",
        },
        {
          title: "AI Apps & Agents",
          desc: "Purpose-built AI applications — voice agents, intelligent portals, and autonomous systems.",
          bullets: ["Voice agent development (Vapi)", "AI-powered internal tools", "Autonomous task agents", "AI-native product builds"],
          href: "/services/ai-agents",
        },
      ],
    },
    {
      label: "Traditional Development — Supporting Services",
      tag: "Best for teams that need the foundation first",
      services: [
        {
          title: "Software & Mobile App Development",
          desc: "AI-compatible software, web apps, and mobile apps — every system we build is designed to accept AI layers.",
          bullets: ["Custom web applications", "SaaS and dashboard builds", "Internal tools and admin systems", "API-first architecture"],
          href: "/services/software-development",
        },
        {
          title: "Mobile App Development",
          desc: "Lean, production-ready mobile apps built for real users and designed to scale.",
          bullets: ["Cross-platform iOS and Android", "MVP builds for fast launch", "Scalable mobile platforms", "Backend and API integration"],
          href: "/services/mobile-app-development",
        },
      ],
    },
    {
      label: "Ongoing Support",
      tag: "Best for keeping systems running and expanding",
      services: [
        {
          title: "Maintenance & Support",
          desc: "Keep your AI and software systems running, secure, and continuously improving.",
          bullets: ["Bug fixes and performance work", "Security updates and monitoring", "Feature additions", "System reliability"],
          href: "/services/maintenance-support",
        },
        {
          title: "Ongoing Retainers",
          desc: "Dedicated monthly capacity for teams that need a long-term partner for AI and software.",
          bullets: ["AI retainers from $1,500/month", "Dev retainers from $3,000/month", "3-month minimum", "Expand AI workflows monthly"],
          href: "/retainers",
          badge: "Recurring",
        },
      ],
    },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <ServicesHead />

      <div className="space-y-20">
        {groups.map((group, gi) => (
          <div key={group.label}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <h3 className="text-sm font-bold text-white font-times uppercase tracking-[0.2em]">{group.label}</h3>
              <div className="h-px flex-grow bg-white/[0.04]" />
              <span className="text-[10px] font-medium text-slate-500 italic shrink-0">{group.tag}</span>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {group.services.map((s, si) => (
                <ServiceCard key={s.title} {...s} i={si + gi * 0.2} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PriceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">Investment Range</p>
          <p className="text-2xl font-bold text-white font-times leading-snug">
            AI automation projects start at <span className="text-brand-gold">$8,000</span>. Software and mobile app projects from <span className="text-brand-gold">$12,000</span>.
          </p>
          <p className="mt-3 text-sm text-slate-400 font-medium">
            All fixed-price, all scoped before commitment. AI retainers from $1,500/month.
          </p>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <Button as="link" href="/pricing" variant="brand">
            View Full Pricing
          </Button>
          <Button as="link" href="/pricing/custom" variant="outline">
            Custom Projects
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function EngagementSection() {
  const steps = [
    { num: "01", title: "Initial Build", sub: "6–12 weeks", desc: "We scope, design, and build the system to agreed specification. Milestone-based delivery." },
    { num: "02", title: "Launch & Stabilize", sub: "2–4 weeks", desc: "Deploy, monitor, and address any post-launch issues within the 30-day warranty window." },
    { num: "03", title: "Ongoing Development", sub: "Monthly retainer", desc: "Most clients continue with a retainer to maintain, improve, and scale their system over time." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <EngagementHead />

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 h-full relative overflow-hidden hover:border-brand-gold/20 transition-colors">
              <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] font-times select-none">{s.num}</div>
              <p className="text-[10px] font-bold text-brand-gold font-times tracking-[0.3em] mb-1">{s.num}</p>
              <h3 className="text-base font-bold text-white font-times uppercase tracking-widest mb-1">{s.title}</h3>
              <p className="text-[10px] text-brand-gold/60 font-medium uppercase tracking-widest mb-4">{s.sub}</p>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{s.desc}</p>
            </div>
            {i < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-3 text-brand-gold/20 text-lg font-bold z-10">→</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    { title: "AI Built for Real Operations", desc: "Not demos or prototypes. AI systems designed around your actual workflows and integrated into your existing stack." },
    { title: "Proven AI Stack", desc: "We run our own AI operations — Vapi voice agents, n8n enrichment pipelines, and LLM-powered workflows built in-house." },
    { title: "Structured Delivery Process", desc: "Scope defined first. Milestone payments. No surprises mid-build." },
    { title: "Long-Term AI Operations", desc: "Retainer partnerships that expand your AI workflows, train on new data, and keep your automation growing." },
  ];

  return (
    <section className="py-20 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <SectionLabel>Why Northspec</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] max-w-xl">
          What You Get With Every Engagement.
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-brand-gold/20 transition-colors"
          >
            <div className="w-8 h-px bg-brand-gold mb-5" />
            <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-2">{r.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium italic">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BridgeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">After Launch</p>
          <p className="text-lg text-white font-times italic leading-relaxed">
            Most AI automation systems expand over time. We offer monthly retainer partnerships that add new workflows, integrate new tools, and keep your AI operations growing.
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            AI retainers from $1,500/month. Dev retainers from $3,000/month.
          </p>
        </div>
        <Link
          href="/retainers"
          className="shrink-0 text-xs font-bold text-brand-gold font-times uppercase tracking-widest border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 transition-all rounded-xl px-6 py-4 whitespace-nowrap"
        >
          View Retainer Plans →
        </Link>
      </motion.div>
    </section>
  );
}

function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <SectionLabel>Ready to Automate</SectionLabel>
        <SplitReveal
          text="Let's Implement AI Into Your Operations."
          className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-8 text-lg text-slate-400 font-medium italic leading-relaxed max-w-xl mx-auto">
          We scope every engagement before any commitment is made. AI automation projects start at $8,000.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button as="link" href="/contact" variant="brand">Start Automating</Button>
          <Button as="link" href="/pricing" variant="outline">View Pricing</Button>
        </div>
      </motion.div>
    </section>
  );
}
