"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { motion } from "framer-motion";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function DiscoveryPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Phase 01"
                title="Discovery & Scoping"
                description="The most important part of any project. We define exactly what success looks like before a single line of code is written."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-black text-white/[0.03] font-times select-none italic tracking-tighter uppercase leading-none">01</div>
            </div>
          </div>

          <div className="grid gap-20 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-bold text-white font-times uppercase tracking-[0.2em]">
                    Certainty
                  </h2>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p className="mt-6 text-lg text-slate-400 leading-relaxed font-medium italic">
                  Most software projects fail because of vague requirements. Our discovery phase is designed to uncover every constraint, edge case, and business goal early on.
                </p>
              </section>
              
              <div className="grid gap-8 sm:grid-cols-2">
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
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-10 backdrop-blur-xl hover:border-brand-gold/30 transition-all duration-500 group"
                  >
                    <h3 className="text-xs font-bold text-white font-times uppercase tracking-widest group-hover:text-brand-gold transition-colors">{item.title}</h3>
                    <p className="mt-4 text-sm text-slate-400 leading-relaxed font-medium italic">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-12 backdrop-blur-xl sticky top-32 group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.02] font-times select-none italic tracking-tighter uppercase leading-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-700">LIST</div>
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.1em] relative z-10">The Deliverables</h2>
                <p className="mt-4 text-slate-400 font-medium italic relative z-10">At the end of the discovery phase, you'll receive:</p>
                <ul className="mt-12 space-y-8 relative z-10">
                  {[
                    "Detailed Technical Specification",
                    "System Architecture Diagram",
                    "Fixed-Price Quote & Timeline",
                    "Risk Assessment & Mitigation Plan"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-6 text-slate-300 group/item">
                      <span className="flex-none w-8 h-8 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-gold text-xs font-bold group-hover/item:bg-brand-gold group-hover/item:text-brand-dark transition-all duration-500">
                        {i + 1}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-widest pt-2">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-16 pt-12 relative z-10 ">
                  <h3 className="text-xs font-bold text-brand-gold font-times tracking-[0.3em] uppercase mb-4">Ready to scope?</h3>
                  <p className="text-sm text-slate-400 font-medium italic mb-10">
                    Book a discovery call and we'll start defining the roadmap for your project.
                  </p>
                  <Button as="link" href="/book" variant="brand" className="w-full">Book a Call</Button>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

