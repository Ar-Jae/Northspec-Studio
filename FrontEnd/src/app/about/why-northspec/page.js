"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

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

// Mount-based SplitReveal for hero
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

// ─── Extracted section heads ───────────────────────────────────────────────────

function ApproachHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      <SectionLabel>Our Approach</SectionLabel>
      <SplitReveal
        text="A Different Way to Build Software."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05] max-w-2xl"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed max-w-lg">
        This is what separates a structured partner from a freelancer or typical agency.
      </p>
    </motion.div>
  );
}

function RiskHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto mb-16">
      <SectionLabel>Risk Reduction</SectionLabel>
      <SplitReveal
        text="Built to Reduce the Risk of Getting This Wrong."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
        B2B buyers are making high-risk decisions. Here&apos;s how we address those fears directly.
      </p>
    </motion.div>
  );
}

function CompareHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto mb-16">
      <SectionLabel>The Northspec Difference</SectionLabel>
      <SplitReveal
        text="What Most Development Experiences Look Like."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
        This is the contrast that makes the decision clear.
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhyNorthspecPage() {
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
              Why Northspec
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6">
            <HeroSplitReveal
              text="Built for Systems That Work."
              delay={0.6}
              className="block text-[clamp(2.5rem,6.3vw,5.85rem)]"
            />
            <HeroSplitReveal
              text="At Every Scale."
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
            We focus on building reliable, scalable software that supports real business operations, not just prototypes or quick builds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button as="link" href="/contact" variant="brand" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">
              Start a Project
            </Button>
            <Button as="link" href="/contact" variant="outline-dark" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">
              Book a Call
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── 2. WHY PROJECTS FAIL ───────────────────────────────────────────── */}
      <WhyFailSection />

      {/* ── 3. OUR APPROACH ───────────────────────────────────────────────── */}
      <ApproachSection />

      {/* ── 4. WHAT THIS MEANS FOR YOU ────────────────────────────────────── */}
      <OutcomesSection />

      {/* ── 5. BUILT TO REDUCE RISK ───────────────────────────────────────── */}
      <RiskSection />

      {/* ── 6. COMPARISON ─────────────────────────────────────────────────── */}
      <ComparisonSection />

      {/* ── 7. RETAINER BRIDGE ────────────────────────────────────────────── */}
      <BridgeSection />

      {/* ── 8. FINAL CTA ──────────────────────────────────────────────────── */}
      <CtaSection />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function WhyFailSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    { label: "Poor Planning", desc: "No defined scope. Requirements shift mid-build. Budget blows out." },
    { label: "Weak Architecture", desc: "Built to ship fast, not to scale. Systems that break under real usage." },
    { label: "No Long-Term Thinking", desc: "Code that can't be maintained, extended, or handed off cleanly." },
    { label: "No Support After Launch", desc: "The developer disappears. You're left managing a system you don't fully understand." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mb-16"
      >
        <SectionLabel>The Real Problem</SectionLabel>
        <SplitReveal
          text="Most Software Projects Fail for the Same Reasons."
          className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
          This isn&apos;t about talent. It&apos;s about process, structure, and long term thinking. Most engagements lack all three.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-8 h-full hover:border-red-500/20 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 mb-6" />
              <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-3">{r.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ApproachSection() {
  const pillars = [
    { title: "Structured Planning First", desc: "Scope document before any code. You know exactly what's being built and what it costs before work begins." },
    { title: "Scalable System Design", desc: "Architecture built for where you're going, not just where you are today." },
    { title: "Performance & Reliability as Priorities", desc: "Production-grade standards from day one. Not performance fixes added later." },
    { title: "Long-Term Support & Iteration", desc: "We offer retainer partnerships for teams that need continued development after launch." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid gap-16 lg:grid-cols-2 items-start">
        <ApproachHead />
        <div className="grid gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard className="flex gap-5 items-start">
                <div className="text-[10px] font-bold text-brand-gold font-times tracking-[0.3em] pt-0.5 shrink-0">0{i + 1}</div>
                <div>
                  <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{p.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const outcomes = [
    { title: "Fewer Issues After Launch", desc: "Structured builds with real testing mean fewer surprises in production." },
    { title: "Systems That Scale", desc: "Architecture designed for growth, so you don't need a rebuild in 18 months." },
    { title: "Reduced Need for Rebuilds", desc: "Built right the first time. Maintainable code your team can actually work with." },
    { title: "Clear Communication Throughout", desc: "Direct access to the engineers. milestone based delivery. No guesswork." },
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
        <SectionLabel>What This Means for You</SectionLabel>
        <SplitReveal
          text="Your Outcomes, Not Our Process."
          className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
          Our process only matters if it translates into real results for your business.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {outcomes.map((o, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltCard className="h-full">
              <div className="w-8 h-px bg-brand-gold mb-6" />
              <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-3">{o.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{o.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function RiskSection() {
  const dontList = [
    "Rush builds to hit arbitrary deadlines",
    "Cut architectural corners to reduce cost",
    "Disappear after delivery",
    "Use vague hourly billing that incentivizes slow work",
  ];

  const doList = [
    "Follow a structured, milestone based process on every project",
    "Define clear scope and pricing before work begins",
    "Stay involved long term with retainer partnerships",
    "Give direct access to the engineers writing the code",
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <RiskHead />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Don't */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-10"
        >
          <p className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest font-times mb-6">We Don&apos;t</p>
          <div className="space-y-4">
            {dontList.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-red-500/40 text-xs mt-0.5 shrink-0">✕</span>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Do */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-10"
        >
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-6">We Do</p>
          <div className="space-y-4">
            {doList.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { feature: "Timeline", typical: "Unclear. Shifts mid-project.", northspec: "milestone based. Defined at start." },
    { feature: "Communication", typical: "Account managers and ticket queues.", northspec: "Direct engineer access throughout." },
    { feature: "Pricing", typical: "Hourly or open-ended estimates.", northspec: "Fixed-scope pricing before work begins." },
    { feature: "Architecture", typical: "Built to ship fast, fix later.", northspec: "Built to scale from day one." },
    { feature: "Post-Launch", typical: "The developer disappears.", northspec: "Retainer partnerships available." },
    { feature: "Documentation", typical: "Minimal or none.", northspec: "Full handoff and documented codebase." },
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <CompareHead />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-white/5 overflow-hidden"
      >
        {/* Table header */}
        <div className="grid grid-cols-3 border-b border-white/5 bg-white/[0.02]">
          <div className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times">Category</div>
          <div className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times border-l border-white/5">Typical Experience</div>
          <div className="px-6 py-4 text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times border-l border-brand-gold/20 bg-brand-gold/[0.03]">Northspec Studio</div>
        </div>

        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="grid grid-cols-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition-colors"
          >
            <div className="px-6 py-5 text-sm font-bold text-white font-times uppercase tracking-wider">{row.feature}</div>
            <div className="px-6 py-5 text-sm text-slate-500 font-medium italic border-l border-white/5">{row.typical}</div>
            <div className="px-6 py-5 text-sm text-slate-200 font-medium border-l border-brand-gold/10 bg-brand-gold/[0.02]">{row.northspec}</div>
          </motion.div>
        ))}
      </motion.div>
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
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">Long-Term Partnerships</p>
          <p className="text-lg text-white font-times italic leading-relaxed">
            Most clients continue working with us long term after launch to maintain and grow their systems.
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Retainer plans from $3,000/month for ongoing development, support, and infrastructure.
          </p>
        </div>
        <Button
          as="link"
          href="/retainers"
          variant="outline-dark"
          className="shrink-0"
        >
          View Retainer Plans
        </Button>
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
        <SectionLabel>Ready to Start</SectionLabel>
        <SplitReveal
          text="Build It Right the First Time."
          className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-8 text-lg text-slate-400 font-medium italic leading-relaxed max-w-xl mx-auto">
          We scope every engagement before any commitment is made. Projects start at $10,000.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button as="link" href="/contact" variant="brand">
            Start a Project
          </Button>
          <Button
            as="link"
            href="https://calendar.app.google/XMN48TcybVjmij4C7"
            variant="outline-dark"
          >
            Book a Call
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
