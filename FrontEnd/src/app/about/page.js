"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";
import Button from "../../components/Button";
import Link from "next/link";

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

function SplitReveal({ text, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
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

// ─── Extracted section heads (avoids hook-order issues) ───────────────────────

function ApproachHead() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      <SectionLabel>How We Think</SectionLabel>
      <SplitReveal
        text="A Product-Focused Approach."
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] max-w-2xl"
      />
      <p className="mt-6 text-slate-400 font-medium italic leading-relaxed max-w-xl">
        This is what separates a system builder from a freelancer. Every engagement is structured around long-term outcomes — not just shipping code.
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
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
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
        className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1] max-w-2xl"
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
    <div className="bg-brand-dark text-white">
      <BackgroundCanvasClient />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(212,175,55,0.06),transparent_60%)]" />
        </motion.div>

        <div className="relative z-10 px-6 md:px-36 pt-40 pb-24 max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>About Northspec</SectionLabel>
          </motion.div>

          <SplitReveal
            text="Built for Real Systems, Not Just Code."
            className="text-5xl md:text-7xl font-bold text-white font-times uppercase tracking-tight leading-[1.05] max-w-4xl mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 text-xl text-slate-400 font-medium italic leading-relaxed max-w-2xl"
          >
            Northspec is a development studio focused on building scalable software, automation, and platforms that support real business operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Button as="link" href="/contact" variant="brand">
              Start a Project
            </Button>
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
    { label: "Launching Products", desc: "MVPs and SaaS platforms built for real users, not just demos." },
    { label: "Improving Operations", desc: "Automation and internal tooling that reduces manual overhead." },
    { label: "Connecting Systems", desc: "API integrations that eliminate data silos and sync your stack." },
    { label: "Supporting Long-Term Growth", desc: "Retainer partnerships that keep your system stable and scaling." },
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
          className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
        />
        <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
          We don&apos;t just build applications — we build systems that businesses rely on.
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
    { title: "Long-Term Scalability", desc: "We architect for where your business is going, not just where it is today." },
    { title: "Performance & Reliability", desc: "Systems built to handle real load — not just pass a demo." },
    { title: "Structured Development", desc: "Clear scoping, milestone-based delivery, no surprises mid-build." },
    { title: "Clear Communication", desc: "Direct access to the people writing the code. No account managers in between." },
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
            className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
          />
          <p className="mt-6 text-slate-400 font-medium italic leading-relaxed">
            We work best with businesses that need a reliable technical partner — not just a contractor to ship features and disappear.
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
    { stat: "Long-Term", label: "Client Partnerships", desc: "Most clients continue working with us after their first project — on retainer, not one-off." },
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
          className="text-4xl md:text-5xl font-bold text-white font-times uppercase tracking-tight leading-[1.1]"
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
    { num: "02", title: "Structured Development", desc: "Milestone-based delivery with regular check-ins. No disappearing for 6 weeks. You're involved throughout." },
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
    "Rushed timelines with no planning phase",
    "Poorly structured codebases that can't scale",
    "Built for a demo — not for real-world usage",
    "No documentation or handoff process",
  ];

  const howWeBuild = [
    "Systems that work in real-world conditions",
    "Architecture that scales with your business",
    "Code that remains reliable and maintainable over time",
    "Full ownership and documentation on every project",
  ];

  return (
    <section className="py-28 px-6 md:px-36 max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid gap-16 lg:grid-cols-2 items-start">
        <div>
          <WhyHead />
          <p className="mt-6 text-slate-400 font-medium italic leading-relaxed max-w-lg">
            Most software projects fail not because of a lack of talent — but because of a lack of structure, clarity, and long-term thinking.
          </p>

          <div className="mt-10 space-y-3">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-times mb-4">Common failure points</p>
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
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-6">How we build</p>
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
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times mb-3">Long-Term Partnerships</p>
          <p className="text-lg text-white font-times italic leading-relaxed">
            Most clients continue working with us long-term to maintain and grow their systems.
          </p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            We offer dedicated retainer plans starting at $3,000/month for ongoing development and support.
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
          text="Let's Build Something That Lasts."
          className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]"
        />
        <p className="mt-8 text-lg text-slate-400 font-medium italic leading-relaxed max-w-xl mx-auto">
          Projects typically start at $10,000. We scope every engagement before any commitment is made.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button as="link" href="/contact" variant="brand">
            Start a Project
          </Button>
          <a
            href="https://calendar.app.google/XMN48TcybVjmij4C7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-gold/40 text-slate-300 hover:text-white transition-all rounded-xl px-6 py-3 text-sm font-medium font-times uppercase tracking-widest"
          >
            Book a Call
          </a>
        </div>
      </motion.div>
    </section>
  );
}
