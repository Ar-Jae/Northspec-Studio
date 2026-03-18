"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../../components/3d/BackgroundCanvasClient";

export default function WorkflowAutomationPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16 border-b border-white/5">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Efficiency"
                title="Workflow Automation"
                description="Eradicate manual overhead. We architect robust automation systems that bridge technical debt and operational excellence."
              />
            </div>
            <div className="flex-none hidden lg:block">
              <div className="text-8xl font-bold text-white/[0.03] font-times select-none uppercase tracking-tighter">FLOW</div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold/20 mr-4" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-6 px-4">Invisible Infrastructure</h2>
                <p className="text-slate-400 leading-relaxed font-medium text-lg px-4 italic">
                  We specialize in building the "silent engines" of modern business—workflows that run 24/7 without human intervention, ensuring data parity and operational speed across your entire stack.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">01 / Engine</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">n8n Flows</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Self-hosted, secure automation for complex, private business logic.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">02 / Parity</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">Data Sync</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Real-time synchronization between CRMs, databases, and ERP systems.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">03 / Compute</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">AI Agents</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Leverage LLMs for automated content classification and sentiment analysis.</p>
                </div>
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5">
                  <div className="text-brand-gold font-times mb-4 text-xs tracking-widest uppercase">04 / Custom</div>
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-wider mb-3">OS Scripts</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Tailored Node.js or Python micro-services for edge-case automation.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-2xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest mb-10 border-b border-white/5 pb-6">Protocol Targets</h2>
                <ul className="space-y-10">
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">01</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Lead Pipeline</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Capture, enrich via Apollo/Clay, and route leads to CRM without delay.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">02</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">FinOps</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Invoicing, payment reconciliation, and ledger updates via Plaid APIs.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">03</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Ops Onboarding</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Automated client setup, internal alert routing, and file system prep.</p>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <span className="text-brand-gold font-times font-bold text-xl tracking-tighter opacity-50">04</span>
                    <div>
                      <p className="font-bold text-white font-times uppercase tracking-wider mb-2">Dynamic Reporting</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Scheduled executive summaries pushed to Slack or custom dashboards.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/10 bg-brand-gold/5 p-12 backdrop-blur-xl text-center group hover:bg-brand-gold/10 transition-colors duration-500">
                <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-4">Eliminate Overhead</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                  Most organizations sit on 10+ hours of "hidden manual work" per employee. We eliminate it.
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  <Button as="link" href="/book" variant="brand" className="w-full font-times uppercase tracking-widest text-xs py-5 px-8">Audit My Infrastructure</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
