"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { motion } from "framer-motion";

const phases = [
  {
    id: "01",
    title: "Discovery",
    description: "Defining the scope, technical requirements, and success metrics.",
    details: [
      "Technical feasibility study",
      "Architecture & stack selection",
      "Detailed project roadmap",
      "Fixed-scope pricing"
    ],
    href: "/process/discovery"
  },
  {
    id: "02",
    title: "Development",
    description: "Building the system in iterative blocks with weekly demos.",
    details: [
      "Weekly sprint cycles",
      "Staging environment access",
      "Continuous integration",
      "Automated testing"
    ],
    href: "/process/development"
  },
  {
    id: "03",
    title: "Delivery",
    description: "Rigorous testing, deployment, and full documentation handoff.",
    details: [
      "Production deployment",
      "Technical documentation",
      "Team training & handoff",
      "Post-launch monitoring"
    ],
    href: "/process/delivery"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Process"
            title="How It Works"
            description="We follow a structured, engineering-first process designed to eliminate uncertainty and deliver production-ready systems on time."
          />

          {/* Interactive Timeline */}
          <div className="mt-24 relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {phases.map((phase, index) => (
                <div key={phase.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Phase Number Circle */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-dark border border-brand-gold flex items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <span className="text-brand-gold font-bold text-sm">{phase.id}</span>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] ml-12 md:ml-0">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-brand-gold/30 transition-colors group"
                    >
                      <h3 className="text-2xl font-semibold text-white font-serif group-hover:text-brand-gold transition-colors">{phase.title}</h3>
                      <p className="mt-4 text-slate-400 leading-relaxed">{phase.description}</p>
                      
                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {phase.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-brand-gold" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <Button as="link" href={phase.href} variant="secondary" className="text-xs">
                          Learn more about {phase.title}
                        </Button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Principles Section */}
          <div className="mt-32 grid gap-12 lg:grid-cols-3">
            {[
              {
                title: "Transparency",
                desc: "You'll always know exactly what we're working on and where the budget is going."
              },
              {
                title: "Quality First",
                desc: "We don't cut corners. We build systems that are maintainable and scalable."
              },
              {
                title: "Clear Communication",
                desc: "No technical jargon. Just clear, actionable updates and documentation."
              }
            ].map((principle, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white font-serif">{principle.title}</h3>
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">{principle.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-24 text-center">
            <div className="inline-flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-white font-serif mb-6">Ready to start your build?</h2>
              <Button as="link" href="/contact" variant="brand" className="px-12 py-4">
                Book a Discovery Call
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

