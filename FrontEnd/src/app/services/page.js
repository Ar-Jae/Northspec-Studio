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

// Mount-based SplitReveal for hero (animates immediately on load)
function HeroSplitReveal({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.2em] mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block -mb-[0.2em]"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Scroll-triggered SplitReveal for section headings
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
      <SectionLabel>Software & Mobile</SectionLabel>
      <SplitReveal
        text="What We Build."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
        From MVPs to full-scale platforms software and mobile products built for real users.
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
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1],   ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div className="bg-brand-dark text-white">
      <BackgroundCanvasClient />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
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
              Services
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6">
            <HeroSplitReveal
              text="Custom Software & Mobile Apps"
              delay={0.6}
              className="block text-[clamp(2.5rem,6.3vw,5.85rem)]"
            />
            <HeroSplitReveal
              text="Built to Launch."
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
            We design and build software platforms, SaaS products, and mobile apps
            that are production-ready, scalable, and built around real business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button as="link" href="/contact" variant="brand" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">Start a Project</Button>
            <Button as="link" href="/work" variant="outline" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">See Our Work</Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── 2. GROUPED SERVICES ───────────────────────────────────────────── */}
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

function AllServicesSection() {
  const groups = [
    {
      label: "Product Development",
      tag: "Best for launching products",
      services: [
        {
          title: "Software Development",
          desc: "Web apps, SaaS platforms, and internal tools built for real users and real usage.",
          bullets: ["Custom web applications", "SaaS & dashboard builds", "Internal tools & admin systems", "API-first architecture"],
          href: "/services/software-development",
        },
        {
          title: "Mobile App Development",
          desc: "Lean, production-ready mobile apps without the $100K+ agency price tag.",
          bullets: ["Cross platform iOS & Android", "MVP builds for fast launch", "Scalable mobile platforms", "Backend & API integration"],
          href: "/services/mobile-app-development",
          badge: "Popular",
        },
      ],
    },
    {
      label: "Custom Solutions",
      tag: "Best for complex builds",
      services: [
        {
          title: "Built to Spec",
          desc: "For complex systems that require tailored architecture and structured delivery.",
          bullets: ["Full system design", "Enterprise grade builds", "Custom integrations", "Starts at $30,000"],
          href: "/built-to-spec",
        },
        {
          title: "Custom Plans",
          desc: "Scoped entirely around your needs. Designed for non-standard or multi-phase projects.",
          bullets: ["Tailored architecture", "Multi-phase delivery", "Custom pricing structure", "From $25,000+"],
          href: "/pricing/custom",
          badge: "High-Value",
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
            Most clients invest between <span className="text-brand-gold">$12,000 and $50,000+</span> for a project build.
          </p>
          <p className="mt-3 text-sm text-slate-400 font-medium">
            Ongoing retainers run $3,000–$20,000+/month. We scope every engagement before any commitment is made.
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
    { num: "01", title: "Initial Build", sub: "6–12 weeks", desc: "We scope, design, and build the system to agreed specification. milestone based delivery." },
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
    { title: "Built for Real-World Usage", desc: "Not demos or prototypes. Systems designed to handle real users and real load." },
    { title: "Structured Delivery Process", desc: "Scope defined first. Milestone payments. No surprises mid-build." },
    { title: "Scalable Architecture", desc: "Designed for where you're going, not just where you are today." },
    { title: "Long-Term Support Available", desc: "Retainer partnerships for teams that need continued development after launch." },
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
            Most clients continue working with us after launch to maintain and grow their systems.
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Retainer plans from $3,000/month give you ongoing development capacity, monitoring, and support.
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
        <SectionLabel>Ready to Build</SectionLabel>
        <SplitReveal
          text="Let's Build Your Product."
          className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-8 text-lg text-slate-400 font-medium italic leading-relaxed max-w-xl mx-auto">
          We scope every engagement before any commitment is made. Projects start at $10,000.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button as="link" href="/contact" variant="brand">Start a Project</Button>
          <Button as="link" href="/pricing" variant="outline">View Pricing</Button>
        </div>
      </motion.div>
    </section>
  );
}
