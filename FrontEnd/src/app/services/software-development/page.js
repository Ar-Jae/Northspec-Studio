"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function SoftwareDevelopmentPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16 border-b border-white/5">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Lifecycle"
                title="Software Development"
                description="Engineered for performance. Built for scale. We deliver production-ready systems that form the backbone of your digital operations."
              />
            </div>
            <div className="flex-none hidden lg:block">
              <div className="text-8xl font-bold text-white/[0.03] font-times select-none uppercase tracking-tighter">SOFT</div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold/20 mr-4" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-6 px-4">The Engineering Standard</h2>
                <p className="text-slate-400 leading-relaxed font-medium text-lg px-4">
                  We don't just write code; we engineer systems. Every project starts with a rigorous technical specification and ends with a robust, tested deployment. Our focus is on clean architecture, maintainability, and extreme performance.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">01 / Logic</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Full-Stack Web</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Modern web applications built with Next.js, React, and Node.js.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">02 / Schema</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">API Design</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Secure, scalable REST and GraphQL APIs built for high-throughput performance.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">03 / Data</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Architecture</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Optimized SQL and NoSQL schemas designed for long-term data integrity.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">04 / DevOps</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Infrastructure</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Automated deployments and self-healing scaling on AWS and Vercel.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-10 border-b border-white/5 pb-6">Delivery Protocol</h2>
                <ul className="space-y-10">
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">01</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Technical Discovery</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">Defining requirements, stack selection, and immutable architecture patterns.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">02</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Iterative Sprints</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">Weekly production-grade deployments with real-time feedback loops.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">03</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Rigorous QA</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">Automated testing for security, performance, and boundary conditions.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">04</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Deployment</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">Final production rollout with comprehensive documentation and engineering handoff.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/10 bg-brand-gold/5 p-12 backdrop-blur-xl text-center group hover:bg-brand-gold/10 transition-colors duration-500">
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-4">Request Build</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-8 italic">
                  Discuss your infrastructure requirements with our engineering team.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <Button as="link" href="/book" variant="brand" className="w-full font-times uppercase tracking-widest text-xs py-5">Book Discovery Call</Button>
                  <Button as="link" href="/contact" variant="outline" className="w-full font-times uppercase tracking-widest text-xs py-5">Submit RFQ</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
