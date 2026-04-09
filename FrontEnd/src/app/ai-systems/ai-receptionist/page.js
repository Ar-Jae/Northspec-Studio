"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const problems = [
  "Every missed call after hours is a lead going directly to a competitor",
  "Receptionists cost $35,000–$55,000/year before benefits, sick days, or turnover",
  "Manual scheduling, lead logging, and follow-ups create gaps and human error",
  "Callers expect immediate responses. voicemail means lost trust and lost revenue",
];

const whoFor = [
  "Service businesses where inbound calls drive most of their revenue",
  "Medical, dental, and legal practices handling appointment scheduling",
  "Real estate agents and property managers qualifying inbound leads",
  "Home services businesses that miss calls during active job sites",
  "Any operation where a human receptionist is a bottleneck or cost center",
];

const capabilities = [
  {
    number: "01",
    title: "Call Answering & Routing",
    short: "Answers every call instantly, in your brand's voice, 24 hours a day.",
    bullets: [
      "Custom voice and brand tone",
      "Intelligent call routing logic",
      "After-hours and overflow handling",
    ],
    accent: "from-brand-gold/20 to-transparent",
  },
  {
    number: "02",
    title: "Lead Qualification",
    short: "Asks the right questions and scores every caller before a human ever picks up.",
    bullets: [
      "Dynamic qualification scripts",
      "Intent detection and scoring",
      "Hot lead escalation and alerts",
    ],
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "Appointment Booking",
    short: "Books directly into your calendar in real time. no back-and-forth, no friction.",
    bullets: [
      "Live calendar availability checks",
      "Automated confirmations and reminders",
      "Rescheduling and cancellation handling",
    ],
    accent: "from-purple-500/10 to-transparent",
  },
  {
    number: "04",
    title: "CRM & System Integration",
    short: "Every call, every note, every action logged automatically in your existing tools.",
    bullets: [
      "Native CRM entry and updates",
      "Post-call summaries and transcripts",
      "Webhook and API connections",
    ],
    accent: "from-emerald-500/10 to-transparent",
  },
];

const steps = [
  {
    number: "01",
    phase: "Discovery & Voice Design",
    title: "Map your call flows and brand voice",
    description:
      "We audit your current call handling, understand your business logic, and design the conversation flows your AI receptionist will handle.",
    detail: "Call Flow Audit → Script Design → Voice & Tone Selection",
  },
  {
    number: "02",
    phase: "Knowledge Base Build",
    title: "Train it on your business",
    description:
      "We build a custom knowledge base covering your services, FAQs, pricing, policies, and escalation triggers so the AI answers accurately every time.",
    detail: "Content Mapping → Knowledge Structuring → Edge Case Handling",
  },
  {
    number: "03",
    phase: "Integration & Testing",
    title: "Connect to your calendar, CRM, and phone system",
    description:
      "We integrate your existing tools. calendar, CRM, phone number. and run extensive testing across call scenarios before going live.",
    detail: "System Connections → Scenario Testing → QA Sign-Off",
  },
  {
    number: "04",
    phase: "Go Live & Optimize",
    title: "Launch and continuously improve",
    description:
      "After launch, we monitor performance, review call transcripts, and refine the AI's responses and logic to improve accuracy and conversion over time.",
    detail: "Production Launch → Transcript Review → Continuous Refinement",
  },
];

const why = [
  "Available 24/7. no sick days, no holidays, no staffing gaps",
  "Handles unlimited concurrent calls without queue wait times",
  "Consistent, on-brand responses on every single call",
  "Instant CRM logging eliminates manual data entry entirely",
  "Learns and improves over time with ongoing refinement",
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
    const x = (e.clientX. rect.left. rect.width / 2) / 18;
    const y = (e.clientY. rect.top. rect.height / 2) / 18;
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

export default function AIReceptionistPage() {
  const heroRef   = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1],   ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const problemRef = useRef(null);
  const whoRef     = useRef(null);
  const capRef     = useRef(null);
  const priceRef   = useRef(null);
  const stepsRef   = useRef(null);
  const whyRef     = useRef(null);
  const retainRef  = useRef(null);
  const ctaRef     = useRef(null);

  const problemIn = useInView(problemRef, { once: true, margin: "-100px" });
  const whoIn     = useInView(whoRef,     { once: true, margin: "-100px" });
  const capIn     = useInView(capRef,     { once: true, margin: "-100px" });
  const priceIn   = useInView(priceRef,   { once: true, margin: "-100px" });
  const stepsIn   = useInView(stepsRef,   { once: true, margin: "-100px" });
  const whyIn     = useInView(whyRef,     { once: true, margin: "-100px" });
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
              Voice AI Layer
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6">
            <SplitReveal text="AI Voice Receptionist" delay={0.6} className="block text-[clamp(2.5rem,6.3vw,5.85rem)]" />
            <SplitReveal
              text="Never Miss a Call Again."
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
            An intelligent AI agent that answers every inbound call, qualifies leads,
            books appointments, and logs everything to your CRM. available 24/7 in your brand&apos;s voice.
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
              Start an AI Receptionist Build
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

      {/* ── THE REAL PROBLEM ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={problemRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={problemIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>The Real Problem</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={problemIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
                Every missed call is a{" "}
                <em className="not-italic text-brand-gold">missed opportunity.</em>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-times mb-6">
                Businesses lose thousands in revenue every month to unanswered calls, slow follow-ups,
                and inconsistent lead handling. A traditional receptionist is expensive, limited to
                business hours, and impossible to scale.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm font-times italic">
                An AI receptionist doesn&apos;t just answer calls. it runs a consistent,
                always-on front-line operation that captures every lead and books every opportunity.
              </p>
            </motion.div>

            <div className="space-y-4">
              {problems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={problemIn ? { opacity: 1, x: 0 } : {}}
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

      {/* ── WHO THIS IS FOR ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whoRef} className="relative z-10 w-full px-6 md:px-36">
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
              Built for businesses where{" "}
              <em className="not-italic text-brand-gold">the phone drives revenue.</em>
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
                className="group flex items-center gap-4 py-7 border-b border-white/[0.06] last:border-0
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

      {/* ── WHAT IT DOES ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={capRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={capIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Core Capabilities</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={capIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              Everything a great receptionist does.{" "}
              <em className="not-italic text-brand-gold">Automated.</em>
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, i) => (
              <TiltCard key={item.title} index={i}>
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.accent} rounded-t-3xl`}
                />
                <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-4">
                  {item.number}
                </p>
                <h3 className="text-base font-bold text-white font-serif mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5 font-times italic">
                  {item.short}
                </p>
                <ul className="space-y-2">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-xs text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ANCHOR ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={priceRef} className="relative z-10 w-full px-6 md:px-24 lg:px-36">
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
                  Priced for real{" "}
                  <em className="not-italic text-brand-gold">business efficiency.</em>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times max-w-sm">
                  Every AI receptionist build is custom-scoped. the complexity of your
                  call flows, integrations, and knowledge base determines the investment.
                  Ranges shown are market-rate estimates.
                </p>
              </div>

              <div className="p-12 lg:p-16 flex flex-col justify-center gap-8 bg-brand-gold/[0.03]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-2">
                    Estimated Build Range
                  </p>
                  <div className="text-5xl font-bold font-serif text-white leading-[1.05] mb-1">
                    $3,000. $10,000+
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    Depending on call flows, integrations, and AI complexity
                  </p>
                </motion.div>

                <div className="h-[1px] bg-white/[0.06]" />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={priceIn ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-slate-400 text-sm leading-relaxed"
                >
                  Every project is custom-scoped to your requirements. You receive a
                  tailored proposal before any work begins.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={priceIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-wrap gap-3"
                >
                  <a
                    href="/pricing"
                    className="inline-block bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-white transition-all active:scale-[0.98]"
                  >
                    View Pricing
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-6 py-4"
                  >
                    Get a Quote
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={stepsRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={stepsIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>How It Works</SectionLabel>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={stepsIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1] tracking-tight"
            >
              From zero to live{" "}
              <em className="not-italic text-brand-gold">in a matter of weeks.</em>
            </motion.h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={stepsIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-bold text-white/10 text-[clamp(5rem,10vw,12rem)] leading-[1] tracking-tight select-none flex-shrink-0"
            >
              HOW
            </motion.span>
          </div>

          <div className="mt-16 space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={stepsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group grid md:grid-cols-[80px_1fr_1fr] gap-8 py-10 border-b border-white/[0.06] last:border-0
                  hover:border-brand-gold/20 transition-colors duration-300"
              >
                <div>
                  <span className="text-[11px] font-bold tracking-[0.3em] text-slate-700">
                    {step.number}
                  </span>
                  <p className="text-[10px] font-bold tracking-[0.25em] text-brand-gold/60 uppercase mt-1">
                    {step.phase}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-white group-hover:text-brand-gold transition-colors duration-300 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-times">
                    {step.description}
                  </p>
                </div>
                <div className="flex items-end">
                  <p className="text-[10px] font-bold tracking-[0.25em] text-slate-700 uppercase leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AI OVER TRADITIONAL ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.93) 30%, rgba(8,6,3,0.93) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={whyRef} className="relative z-10 w-full px-6 md:px-36">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={whyIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Why AI Over Voicemail or IVR</SectionLabel>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={whyIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif font-bold text-white text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
                Not press 1, press 2.{" "}
                <em className="not-italic text-brand-gold">An actual conversation.</em>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-times">
                Traditional IVR systems frustrate callers and lose leads. Voicemail
                means a delayed response. often too late. Our AI receptionists hold
                natural conversations, understand context, and take real action
                on every call without a human in the loop.
              </p>
            </motion.div>

            <div className="space-y-4">
              {why.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={whyIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                    hover:border-brand-gold/20 transition-colors duration-300"
                >
                  <svg className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ONGOING OPTIMIZATION ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.88) 60%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={retainRef} className="relative z-10 w-full px-6 md:px-24 lg:px-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={retainIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-10 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <SectionLabel>Ongoing Support</SectionLabel>
                <h2 className="font-serif font-bold text-white text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05] tracking-tight mb-3">
                  Your AI receptionist improves over time.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-times">
                  We review call transcripts, monitor performance, and continuously refine
                  conversation logic so your AI receptionist gets sharper with every call.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-start lg:items-end">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase mb-2">
                    Monthly from
                  </p>
                  <div className="text-4xl font-bold font-serif text-white leading-[1.05]">
                    $3,000
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mt-1">
                    per month (retainer)
                  </p>
                </div>
                <a
                  href="/retainers"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-6 py-4"
                >
                  View Retainer Plans
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(8,6,3,0.95) 30%, rgba(8,6,3,0.95) 70%, rgba(5,5,5,0.4) 100%)",
          }}
        />

        <div ref={ctaRef} className="relative z-10 w-full px-6 md:px-36 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={ctaIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <SectionLabel>Get Started</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-[clamp(1.8rem,4vw,4rem)] leading-[1.05] tracking-tight mb-6 max-w-3xl mx-auto"
          >
            Ready to stop losing leads to{" "}
            <em className="not-italic text-brand-gold">missed calls?</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md mx-auto font-times italic"
          >
            Tell us about your call volume and business. we&apos;ll scope the right AI receptionist build for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              as="link"
              href="/contact"
              variant="brand"
              className="rounded-full px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold"
            >
              Start Your Build
            </Button>
            <Button
              as="link"
              href="/pricing"
              variant="outline"
              className="rounded-full px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold"
            >
              View Pricing
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
