import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Maintenance & Support",
  description: "Ongoing technical support, security updates, and performance monitoring.",
};

export default function MaintenanceSupportPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Service"
            title="Maintenance & Support"
            description="Software isn't static. We provide the ongoing engineering support needed to keep your systems secure, fast, and up-to-date."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">Proactive Engineering</h2>
              <p className="text-slate-400 leading-relaxed">
                We don't just wait for things to break. Our maintenance plans focus on preventing issues before they impact your users or your bottom line.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Security Patches</h3>
                  <p className="mt-2 text-sm text-slate-400">Regular updates to dependencies and security protocols.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Performance Audits</h3>
                  <p className="mt-2 text-sm text-slate-400">Continuous monitoring and optimization of load times.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Bug Fixes</h3>
                  <p className="mt-2 text-sm text-slate-400">Rapid response to technical issues and user-reported bugs.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Feature Updates</h3>
                  <p className="mt-2 text-sm text-slate-400">Small iterative improvements and new feature rollouts.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white font-serif">Support Tiers</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Retainer Plans</p>
                      <p className="text-sm text-slate-400">Guaranteed monthly hours for ongoing development and support.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">On-Call Support</p>
                      <p className="text-sm text-slate-400">Emergency technical support for mission-critical systems.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Infrastructure Management</p>
                      <p className="text-sm text-slate-400">Monitoring server health, database backups, and uptime.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Documentation</p>
                      <p className="text-sm text-slate-400">Keeping technical docs and system diagrams up to date.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Peace of mind</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Focus on your business while we handle the technical heavy lifting. We're your dedicated engineering partner.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/retainers" variant="brand" className="w-full">View Retainer Plans</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
