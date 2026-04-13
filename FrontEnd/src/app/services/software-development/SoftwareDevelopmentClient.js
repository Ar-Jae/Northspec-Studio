"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";
import Button from "../../../components/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const outcomes = [
  "Replace manual workflows with systems that run automatically",
  "Streamline operations so your team focuses on real work",
  "Support business growth without adding overhead",
  "Scale infrastructure as your product and users grow",
];

const whoFor = [
  "Startups building MVPs and validating products",
  "Businesses replacing inefficient manual processes",
  "Teams scaling internal tools and operational systems",
  "Companies building SaaS platforms and revenue products",
];

const whatWeBuild = [
  {
    number: "01",
    title: "Web Applications",
    short: "Custom-built applications designed for performance and scalability.",
    bullets: [
      "Full stack React / Next.js",
      "Scalable backend architecture",
      "Auth, roles, and permissions",
    ],
    accent: "from-brand-gold/20 to-transparent",
  },
  {
    number: "02",
    title: "Internal Systems",
    short: "Tools that reduce manual work and improve team efficiency.",
    bullets: [
      "Internal dashboards and portals",
      "Workflow automation tools",
      "Admin and ops systems",
    ],
    accent: "from-blue-500/10 to-transparent",
  },
  {
    number: "03",
    title: "SaaS Platforms",
    short: "Revenue-generating products built for growth and long term use.",
    bullets: [
      "Multi tenant architecture",
      "Subscription and billing logic",
      "Platform-level scalability",
    ],
    accent: "from-purple-500/10 to-transparent",
  },
  {
    number: "04",
    title: "Integrations & APIs",
    short: "Systems that connect your tools and automate workflows end to end.",
    bullets: [
      "REST and GraphQL APIs",
      "Third-party service connectors",
      "Webhook and event pipelines",
    ],
    accent: "from-emerald-500/10 to-transparent",
  },
];

const steps = [
  {
    number: "01",
    phase: "Discovery",
    title: "Define your requirements and goals",
    description:
      "We break down your workflows, constraints, and business objectives before writing a single line of code.",
    detail: "Discovery call → Requirements doc → Scope definition",
  },
  {
    number: "02",
    phase: "System Design",
    title: "Plan architecture and scalability",
    description:
      "We design the technical architecture, integration points, and data structure specific to your use case.",
    detail: "Technical spec → Architecture plan → Timeline",
  },
  {
    number: "03",
    phase: "Development",
    title: "Build with performance and reliability in mind",
    description:
      "milestone based delivery with real visibility. You see progress at every stage, no black box development.",
    detail: "Milestone delivery → Staging access → Code review",
  },
  {
    number: "04",
    phase: "Launch & Support",
    title: "Deploy, monitor, and keep improving",
    description:
      "We handle deployment, monitor performance, and continue improving the system after it goes live.",
    detail: "Production deploy → Monitoring → Ongoing improvements",
  },
];

const why = [
  "Built for real-world use, not prototypes or demos",
  "Focus on performance, scalability, and long term reliability",
  "Clear communication with milestone based delivery",
  "Long term product thinking, not one-off builds",
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

export default function SoftwareDevelopmentClient() {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className="bg-brand-dark text-white min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Web Development</SectionLabel>
          <h1 className="font-serif font-bold text-white mb-10 leading-[1.05] tracking-tight">
            <SplitReveal
              text="Custom Software Solutions"
              className="block text-[clamp(2.5rem,6vw,5.5rem)]"
            />
            <SplitReveal
              text="Built for Scale."
              delay={0.5}
              className="block text-brand-gold italic text-[clamp(2.5rem,6vw,5.5rem)]"
            />
          </h1>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p className="text-xl text-slate-300 leading-relaxed font-times font-medium italic mb-12">
                We design and build high performance web applications, internal systems, and SaaS
                platforms that solve real business problems and support long term growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  as="link"
                  href="/contact"
                  variant="brand"
                  className="rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  Start a Project
                </Button>
                <Button
                  as="link"
                  href="/pricing"
                  variant="outline-dark"
                  className="rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  View Pricing
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            >
              <h3 className="text-brand-gold font-bold uppercase tracking-widest text-[10px] mb-6">
                Outcomes
              </h3>
              <ul className="space-y-4">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span className="text-sm text-slate-300 font-medium">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Expertise</SectionLabel>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeBuild.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl border border-white/5 bg-black/20 hover:border-brand-gold/30 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`}
                />
                <span className="block text-brand-gold/40 font-mono text-xs mb-8">
                  {service.number}
                </span>
                <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
                  {service.short}
                </p>
                <ul className="space-y-3">
                  {service.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <SectionLabel>Roadmap</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">The Process.</h2>
            </div>
            <p className="text-slate-400 max-w-sm text-sm font-medium italic">
              From the initial discovery call to the final production deployment, we focus on
              communication and precision.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="mb-8">
                  <span className="text-4xl font-serif text-brand-gold/20 font-bold italic">
                    {step.number}
                  </span>
                  <div className="h-px w-full bg-white/5 mt-4" />
                </div>
                <h3 className="text-brand-gold font-bold uppercase tracking-widest text-[10px] mb-2">
                  Phase {step.number}: {step.phase}
                </h3>
                <h4 className="text-lg font-serif font-bold mb-4 leading-snug">{step.title}</h4>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed font-medium">
                  {step.description}
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold font-mono tracking-tighter italic">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who For & Why */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <SectionLabel>Product Focus</SectionLabel>
              <h2 className="text-3xl font-serif font-bold mb-12">Who We Build For.</h2>
              <div className="space-y-6">
                {whoFor.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center shrink-0 border border-brand-gold/10 group-hover:border-brand-gold/30 transition-colors">
                      <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300 font-medium italic group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>Commitment</SectionLabel>
              <h2 className="text-3xl font-serif font-bold mb-12">Why Northspec Studio?</h2>
              <div className="grid gap-4">
                {why.map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <p className="text-slate-300 text-sm font-medium italic">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Let&apos;s Build Your System.
          </h2>
          <p className="text-slate-400 text-lg mb-12 italic font-medium">
            Ready to replace manual workflows with high performance software and automation? Scale
            your operations with custom-built systems designed for your business.
          </p>
          <Button
            as="link"
            href="/contact"
            variant="brand"
            className="rounded-full px-12 py-5 text-sm font-bold uppercase tracking-[0.25em]"
          >
            Start Discovery
          </Button>
        </div>
      </section>
    </div>
  );
}
