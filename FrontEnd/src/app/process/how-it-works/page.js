"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { motion } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

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
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden text-slate-400">
      <BackgroundCanvasClient />
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Process"
                title="How It Works"
                description="We follow a structured, engineering-first process designed to eliminate uncertainty and deliver production-ready systems on time."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-black text-white/[0.03] font-times select-none italic tracking-tighter uppercase leading-none">PRCS</div>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="mt-24 relative z-10">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[1px] bg-white/[0.05] -translate-x-1/2 hidden md:block" />

            <div className="space-y-40">
              {phases.map((phase, index) => (
                <div key={phase.id} className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Phase Number Circle */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-brand-dark border border-white/5 flex items-center justify-center z-10 backdrop-blur-xl group hover:border-brand-gold/30 transition-all duration-500">
                    <span className="text-white font-black text-xl font-times italic tracking-tighter transition-colors group-hover:text-brand-gold">{phase.id}</span>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[42%] ml-20 md:ml-0">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="rounded-2xl border border-white/5 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-700 group relative overflow-hidden hover:border-brand-gold/20"
                    >
                      <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.02] font-times select-none italic tracking-tighter uppercase leading-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-700">PHASE</div>
                      <h3 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] group-hover:text-brand-gold transition-colors relative z-10">{phase.title}</h3>
                      <p className="mt-6 text-slate-400 leading-relaxed font-medium italic relative z-10">{phase.description}</p>
                      
                      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                        {phase.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3 text-xs text-slate-300 font-bold uppercase tracking-widest leading-[1.05]">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-gold/60 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-12 relative z-10  pt-8">
                        <Button as="link" href={phase.href} variant="brand-dark" className="text-[10px] py-4">
                          Dive into {phase.title}
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

