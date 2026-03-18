"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function MobileAppDevelopmentPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16 ">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Mobility"
                title="Mobile App Development"
                description="High-performance iOS and Android applications. We deliver production-grade mobile experiences connected to your core business logic."
              />
            </div>
            <div className="flex-none hidden lg:block">
              <div className="text-8xl font-bold text-white/[0.03] font-times select-none uppercase tracking-tighter">MOBL</div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold/20 mr-4" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-6 px-4">The Mobile Standard</h2>
                <p className="text-slate-400 leading-relaxed font-medium text-lg px-4 italic">
                  We don't just build apps; we build extensions of your operational infrastructure. From customer-facing products to internal field tools, every build is optimized for reliability, offline capability, and seamless backend parity.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">01 / Interface</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Customer Apps</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">High-conversion mobile products for booking, payments, and engagement.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">02 / Utility</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Internal Ops</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Custom field tools with real-time syncing and offline-first capabilities.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">03 / Sync</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Backend Parity</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Secure API integrations and automated data flow with your core systems.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">04 / Lifecycle</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">App Store Ops</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Full management of deployments, monitoring, and iterative improvements.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-10  pb-6">Delivery Approach</h2>
                <ul className="space-y-10">
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">01</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Technical Scoping</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Clear technical boundaries, UX architecture, and milestone definitions.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">02</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Outcome-Focused Build</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Features tied directly to retention, efficiency, or business growth.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">03</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Engineered Stability</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Native-grade performance and maintainable code architecture.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">04</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Post-Launch Ownership</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Active monitoring, bug mitigation, and structured product evolution.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/10 bg-brand-gold/5 p-12 backdrop-blur-xl text-center group hover:bg-brand-gold/10 transition-colors duration-500">
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-4">Request Deployment</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                  We’ll map your mobile requirements into a clear engineering roadmap and delivery plan.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <Button as="link" href="/book" variant="brand" className="w-full font-times uppercase tracking-widest text-xs py-5 px-8">Book Mobile Strategy Call</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
