"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { motion } from "framer-motion";

export default function DiscoveryPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Process Phase 01"
                title="Discovery & Scoping"
                description="The most important part of any project. We define exactly what success looks like before a single line of code is written."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">01</div>
            </div>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  Eliminating Uncertainty
                </h2>
                <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                  Most software projects fail because of vague requirements. Our discovery phase is designed to uncover every constraint, edge case, and business goal early on.
                </p>
              </section>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Stakeholder Interviews",
                    desc: "Understanding the 'why' behind the project and the needs of the users."
                  },
                  {
                    title: "Technical Audit",
                    desc: "Reviewing existing systems, APIs, and data structures."
                  },
                  {
                    title: "Architecture Design",
                    desc: "Selecting the right stack and designing the system foundation."
                  },
                  {
                    title: "Scope Definition",
                    desc: "Creating a detailed roadmap with clear milestones and deliverables."
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-gold/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sticky top-32">
                <h2 className="text-2xl font-semibold text-white font-serif">The Deliverables</h2>
                <p className="mt-4 text-slate-400">At the end of the discovery phase, you'll receive:</p>
                <ul className="mt-8 space-y-6">
                  {[
                    "Detailed Technical Specification",
                    "System Architecture Diagram",
                    "Fixed-Price Quote & Timeline",
                    "Risk Assessment & Mitigation Plan"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-slate-300 group">
                      <span className="flex-none w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-[10px] font-bold group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white font-serif">Ready to scope?</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Book a discovery call and we'll start defining the roadmap for your project.
                  </p>
                  <div className="mt-6">
                    <Button as="link" href="/book" variant="brand" className="w-full">Book a Call</Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

