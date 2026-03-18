"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function IntegrationsPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16 border-b border-white/5">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Connectivity"
                title="Integrations & API Mesh"
                description="Bridge the gap between siloed systems. We build high-reliability custom middleware and API integrations for seamless data parity."
              />
            </div>
            <div className="flex-none hidden lg:block">
              <div className="text-8xl font-bold text-white/[0.03] font-times select-none uppercase tracking-tighter">MESH</div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold/20 mr-4" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-6 px-4">Connected Ecosystems</h2>
                <p className="text-slate-400 leading-relaxed font-medium text-lg px-4 italic">
                  Siloed data is the primary bottleneck for scaling. We specialize in engineering the "glue code" that connects disparate systems through custom middleware, webhook handlers, and secure API bridges.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">01 / Ledger</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">FinTech Mesh</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Stripe, Plaid, and custom banking integrations for automated reconciliation.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">02 / Sales</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">CRM Sync</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">HubSpot, Salesforce, and Apollo deep integrations for real-time lead routing.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">03 / Assets</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Cloud Storage</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Google Drive, AWS S3, and Dropbox automated asset management pipelines.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">04 / Comms</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Messaging</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Twilio, SendGrid, and Slack notifications driven by operational events.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-10 border-b border-white/5 pb-6">Integration Audit</h2>
                <ul className="space-y-10">
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">01</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Technical Discovery</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Identifying schema mismatches and bottleneck points between disparate platforms.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">02</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Middleware Build</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Constructing redundant, serverless handlers with retry logic and error tracking.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">03</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Legacy Bridge</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Connecting legacy databases to modern cloud services via secure API wrappers.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">04</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Protocol Security</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">End-to-end credential management via OAuth2 and encrypted environment vaults.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/10 bg-brand-gold/5 p-12 backdrop-blur-xl text-center group hover:bg-brand-gold/10 transition-colors duration-500">
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-4">Eliminate Manual CSVs</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                  Stop exporting data manually. Let's engineer a real-time integration that works while you sleep.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <Button as="link" href="/contact" variant="brand" className="w-full font-times uppercase tracking-widest text-xs py-5 px-8">Discuss My Stack</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
