"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function MaintenanceSupportPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16 border-b border-white/5">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Continuity"
                title="Maintenance & Support"
                description="Production systems require constant vigilance. We provide the ongoing engineering oversight needed to ensure 24/7 reliability."
              />
            </div>
            <div className="flex-none hidden lg:block">
              <div className="text-8xl font-bold text-white/[0.03] font-times select-none uppercase tracking-tighter">SUST</div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold/20 mr-4" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-6 px-4">Proactive Engineering</h2>
                <p className="text-slate-400 leading-relaxed font-medium text-lg px-4 italic">
                  We don't wait for systems to fail. Our maintenance protocol focuses on preemptive security patching, performance profiling, and infrastructure hardening to prevent downtime before it impacts your bottom line.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">01 / Security</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">CVE Isolation</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Continuous dependency auditing and emergency security patching.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">02 / Speed</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Perf Profiling</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Scheduled performance audits and database optimization sprints.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">03 / Stability</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Bug Mitigation</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Rapid response to critical regressions and production edge cases.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">04 / Evolution</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Feature Flow</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Iterative system enhancements and regular technical debt reduction.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-10 border-b border-white/5 pb-6">Support Logistics</h2>
                <ul className="space-y-10">
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">01</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Dedicated Retainers</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Guaranteed monthly engineering capacity for priority development.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">02</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Infrastructure Ops</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Active server health monitoring, database shadowing, and automated backups.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">03</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Technical Docs</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Maintaining system diagrams and deployment schemas to ensure parity.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">04</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Uptime Ownership</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Incident response protocols for mission-critical production environments.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/10 bg-brand-gold/5 p-12 backdrop-blur-xl text-center group hover:bg-brand-gold/10 transition-colors duration-500">
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-4">Engineering Peace of Mind</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                  Focus on your core business while we handle the technical infrastructure. We are your dedicated engineering stewards.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <Button as="link" href="/retainers" variant="brand" className="w-full font-times uppercase tracking-widest text-xs py-5 px-8">View Retainer Plans</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
