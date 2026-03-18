"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function CustomPlansPage() {
  return (
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16 ">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Bespoke"
                title="Custom Plans"
                description="Tailored engineering ecosystems. We design high-impact technical partnerships for unique business requirements that defy standard categorization."
              />
            </div>
            <div className="flex-none hidden lg:block">
              <div className="text-8xl font-bold text-white/[0.03] font-times select-none uppercase tracking-tighter">SPEC</div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold/20 mr-4" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-6 px-4">Tailored Solutions</h2>
                <p className="text-slate-400 leading-relaxed font-medium text-lg px-4 italic">
                  Whether you require a dedicated engineering squad for a long-term build, a specialized consultant for a complex migration, or a hybrid support model, we architect plans that align with your specific technical and business outcomes.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">01 / Squad</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Dedicated Teams</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">A full engineering pod focused exclusively on your product lifecycle.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">02 / Strategy</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Consulting</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">High-level architecture reviews and long-term technology roadmapping.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">03 / Legacy</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Migration</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Safe, phased transitions from obsolete stacks to modern, scalable infrastructure.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">04 / R&D</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Prototyping</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Rapid engineering of experimental builds and technical proofs-of-concept.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-10  pb-6">Protocol Logistics</h2>
                <ul className="space-y-10">
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">01</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Dynamic Scoping</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Agile resource allocation that adjusts as technical requirements evolve.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">02</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Direct Access</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Dedicated communication channels with engineering leadership.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">03</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Milestone Billing</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Performance-based financial structures tied to technical delivery.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">04</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Immutable Ownership</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Full IP ownership of all source code, schemas, and technical assets.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/10 bg-brand-gold/5 p-12 backdrop-blur-xl text-center group hover:bg-brand-gold/10 transition-colors duration-500">
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-4">Request Specs</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                  Custom plans begin with an exhaustive technical deep dive. No overhead, just pure engineering roadmap.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <Button as="link" href="/contact" variant="brand" className="w-full font-times uppercase tracking-widest text-xs py-5 px-8">Request Custom Quote</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
