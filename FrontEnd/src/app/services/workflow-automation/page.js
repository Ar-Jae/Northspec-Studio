import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Workflow Automation",
  description: "Automate manual processes and scale your operations with n8n and custom scripts.",
};

export default function WorkflowAutomationPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Service"
            title="Workflow Automation"
            description="Stop doing manual work. We build robust automation systems that connect your tools, sync your data, and free up your team's time."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">Automation Infrastructure</h2>
              <p className="text-slate-400 leading-relaxed">
                We specialize in building "invisible infrastructure" - the workflows that run in the background to keep your business moving without human intervention.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">n8n Workflows</h3>
                  <p className="mt-2 text-sm text-slate-400">Self-hosted, secure automation for complex business logic.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Data Sync</h3>
                  <p className="mt-2 text-sm text-slate-400">Keep your CRM, database, and marketing tools in perfect sync.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">AI Integration</h3>
                  <p className="mt-2 text-sm text-slate-400">Leverage LLMs to automate content, classification, and analysis.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Custom Scripts</h3>
                  <p className="mt-2 text-sm text-slate-400">Tailored Node.js or Python scripts for unique automation needs.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white font-serif">What We Automate</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Lead Management</p>
                      <p className="text-sm text-slate-400">Capture, enrich, and route leads to your CRM automatically.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Financial Operations</p>
                      <p className="text-sm text-slate-400">Automate invoicing, payment tracking, and reconciliation.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Customer Onboarding</p>
                      <p className="text-sm text-slate-400">Trigger welcome emails, account setup, and internal alerts.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Reporting & Alerts</p>
                      <p className="text-sm text-slate-400">Get real-time data summaries in Slack, Discord, or Email.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Save 10+ hours a week</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Most businesses are sitting on hours of manual work that can be automated in days. Let's find them.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/contact" variant="brand" className="w-full">Audit My Workflows</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
