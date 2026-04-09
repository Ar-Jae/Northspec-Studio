"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import HeroSection from "../../components/HeroSection";
import Button from "../../components/Button";
import Link from "next/link";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

// ─── Reusable primitives ──────────────────────────────────────────────────────

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

function SplitReveal({ text, className, as: Tag = "h2" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
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
    </Tag>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }
  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-brand-gold/30 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// ─── Extracted section heads (avoids hook-order issues) ───────────────────────

function ApproachHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      <SectionLabel>Our Approach</SectionLabel>
      <SplitReveal
        text="A Systems-First Engineering Standard."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05] max-w-2xl"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed max-w-xl">
        This is what separates a system builder from a standard developer. We focus on structured planning, AI workflow integration, and long term scalability from day one.
      </p>
    </motion.div>
  );
}

function ProcessHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto">
      <SectionLabel>How We Work</SectionLabel>
      <SplitReveal
        text="A Process Built Around Predictability."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
        Buyers need to feel: this won&apos;t be chaotic. Here&apos;s how we keep it structured from day one.
      </p>
    </motion.div>
  );
}

function WhyHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      <SectionLabel>Why Northspec</SectionLabel>
      <SplitReveal
        text="Built Because Most Projects Fail."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05] max-w-2xl"
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-brand-dark text-white relative min-h-screen">
      <BackgroundCanvasClient />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <HeroSection
        label="About Northspec"
        headline="Built for Real Business"
        accent="Systems, Not Just Code."
        subheading="Northspec helps businesses implement AI, automation, and custom systems that improve operations, reduce manual work, and support long term growth."
      >
        <Button as="link" href="/contact" variant="brand" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">
          Start a Project
        </Button>
        <a
          href="https://calendar.app.google/XMN48TcybVjmij4C7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-white transition-all rounded-full px-8 py-3 text-sm font-medium font-times uppercase tracking-widest bg-white/[0.03] backdrop-blur-md"
        >
          Book a Call
        </a>
      </HeroSection>

      {/* ── 2. WHAT WE BUILD FOR ───────────────────────────────────────────── */}
      <WhatWeDoSection />

      {/* ── 3. A PRODUCT-FOCUSED APPROACH ─────────────────────────────────── */}
      <ApproachSection />

      {/* ── 4. WHO WE WORK WITH ───────────────────────────────────────────── */}
      <WhoSection />

      {/* ── 5. RESULTS / IMPACT ───────────────────────────────────────────── */}
      <ImpactSection />

      {/* ── 6. HOW WE WORK ────────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── 7. WHY NORTHSPEC ──────────────────────────────────────────────── */}
      <WhySection />

      {/* ── 8. POSITIONING + RETAINER BRIDGE ──────────────────────────────── */}
      <BridgeSection />

      {/* ── 9. FINAL CTA ──────────────────────────────────────────────────── */}
      <CtaSection />
    </div>
  );
}

// ─── Section components ────────────────────────────────────────────────────────

function WhatWeDoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const areas = [
    { label: "AI Implementation", desc: "Custom AI systems built into your daily operations and workflows." },
    { label: "Workflow Automation", desc: "Intelligent systems that automate complex, manual business processes." },
    { label: "Connected Systems", desc: "API integrations that bridge data silos and unify your entire operation." },
    { label: "System Evolution", desc: "Retainer partnerships that expand your automation and AI capacity over time." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mb-16"
      >
        <SectionLabel>What We Do</SectionLabel>
        <SplitReveal
          text="We Don't Just Build Apps. We Build Systems."
          className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
          We don&apos;t just build software we design and implement the autonomous systems that businesses rely on to scale.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {areas.map((area, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltCard>
              <div className="w-8 h-px bg-brand-gold mb-6" />
              <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-3">{area.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{area.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ApproachSection() {
  const attributes = [
    { title: "Structured Planning", desc: "Rigorous scoping and architecture before any development begins." },
    { title: "AI Workflow Integration", desc: "AI agents integrated into your real-world business operations." },
    { title: "Scalable Architecture", desc: "Systems built for production-grade reliability from day one." },
    { title: "Systems Performance", desc: "Focused on speed, accuracy, and operational efficiency." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid gap-16 lg:grid-cols-2 items-start">
        <ApproachHead />
        <div className="grid gap-5 sm:grid-cols-2">
          {attributes.map((attr, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard>
                <h3 className="text-xs font-bold text-brand-gold font-times uppercase tracking-widest mb-3">{attr.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium italic">{attr.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const clients = [
    "Startups launching MVPs who need engineering they can trust",
    "Businesses improving internal systems and eliminating manual work",
    "Teams scaling products and platforms that are outgrowing their current stack",
    "Companies replacing manual workflows with reliable automation",
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>Who We Work With</SectionLabel>
          <SplitReveal
            text="Teams Who Need a System Partner."
            className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
          />
          <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
            We work best with businesses that need a reliable technical partner, not just a contractor to ship features and disappear.
          </p>
        </motion.div>

        <div className="space-y-4">
          {clients.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <p className="text-slate-300 font-medium text-sm leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const results = [
    { stat: "Reduced", label: "Manual Processes", desc: "Through custom automation and workflow systems that replaced hours of daily manual work." },
    { stat: "Built", label: "Scalable Systems", desc: "Production-grade platforms for growing teams that needed infrastructure to match their pace." },
    { stat: "Delivered", label: "Production-Ready Apps", desc: "Launch-ready SaaS and internal tools shipped on time and maintained post-launch." },
    { stat: "Long-Term", label: "Client Partnerships", desc: "Most clients continue working with us after their first project, on retainer, not one-off." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <SectionLabel>Results & Impact</SectionLabel>
        <SplitReveal
          text="Specific Results Build Real Trust."
          className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
          Every engagement is measured against one standard: did it make your business more reliable, more efficient, or more scalable?
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltCard className="h-full">
              <p className="text-brand-gold text-xs font-bold font-times uppercase tracking-widest mb-1">{r.stat}</p>
              <h3 className="text-lg font-bold text-white font-times uppercase tracking-wide mb-4">{r.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{r.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Clear Scoping & Planning", desc: "Every project starts with a defined scope document. You know exactly what we're building and what it costs before anything begins." },
    { num: "02", title: "Structured Development", desc: "milestone based delivery with regular check-ins. No disappearing for 6 weeks. You're involved throughout." },
    { num: "03", title: "Reliable Delivery", desc: "We don't ship code that isn't production-ready. Every release is tested and documented before handoff." },
    { num: "04", title: "Ongoing Support After Launch", desc: "We offer retainer partnerships for teams that want continued improvement and maintenance after the initial build." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="mb-16">
        <ProcessHead />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltCard className="h-full relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] font-times select-none">
                {s.num}
              </div>
              <p className="text-[10px] font-bold text-brand-gold font-times uppercase tracking-[0.3em] mb-4">{s.num}</p>
              <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-3">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{s.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  const failReasons = [
    "Lack of structured planning before development",
    "Prototypes built without real usage in mind",
    "Generic AI implementations with no ROI",
    "Poor scalability and system maintenance",
  ];

  const howWeBuild = [
    "Systems built for real business ROI",
    "Scalable architecture from day one",
    "AI integrated into existing workflows",
    "Predictable delivery and long term support",
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid gap-16 lg:grid-cols-2 items-start">
        <div>
          <WhyHead />
          <p className="mt-6 text-slate-400 font-medium italic leading-relaxed max-w-lg">
            Most systems fail because they are built too quickly, without structure, or are disconnected from the actual business workflows they are meant to solve.
          </p>

          <div className="mt-10 space-y-3">
            <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest font-times mb-4">Why choosing wrong is risky</p>
            {failReasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-red-500/40 mt-2 shrink-0" />
                <p className="text-sm text-slate-500 font-medium">{r}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-10">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-6">The Northspec Standard</p>
            <div className="space-y-4">
              {howWeBuild.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech stack teaser */}
          <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-times mb-4">Core stack</p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Node.js", "React", "PostgreSQL", "Python", "AWS", "Docker", "n8n"].map((tech) => (
                <span key={tech} className="text-[10px] font-bold text-slate-400 font-times uppercase tracking-wider border border-white/10 rounded-lg px-3 py-1.5 hover:border-brand-gold/30 hover:text-brand-gold transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BridgeSection() {
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
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">Long-Term Systems Evolution</p>
          <p className="text-lg text-white font-times italic leading-relaxed">
            AI isn't a "one-and-done" project. Most clients continue working with us to scale their systems as their business evolves.
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Our retainer partnerships ensure your automated workflows stay optimized and competitive.
          </p>
        </div>
        <Link
          href="/retainers"
          className="shrink-0 text-xs font-bold text-brand-gold font-times uppercase tracking-widest border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 transition-all rounded-xl px-4 py-4 whitespace-nowrap"
        >
          Explore Retainers →
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
        <SectionLabel>Authority + Execution</SectionLabel>
        <SplitReveal
          text="Build Systems That Actually Work."
          className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-8 text-lg text-slate-400 font-medium italic leading-relaxed max-w-xl mx-auto">
          AI Transformation projects begin at $25,000. We start with a rigorous discovery phase to ensure your system delivers actual ROI.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button as="link" href="/contact" variant="brand">
            Request Strategy Call
          </Button>
          <a
            href="https://calendar.app.google/XMN48TcybVjmij4C7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-white transition-all rounded-xl px-6 py-3 text-sm font-medium font-times uppercase tracking-widest"
          >
            Book via Calendar
          </a>
        </div>
      </motion.div>
    </section>
  );
}
