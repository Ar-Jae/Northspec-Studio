import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Mobile App Development",
  description: "Design and build production-ready mobile apps connected to your real business workflows.",
};

export default function MobileAppDevelopmentPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Service"
            title="Mobile App Development"
            description="We build mobile apps that drive real outcomes — connected to your backend systems, your team workflows, and your growth goals."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">What We Build</h2>
              <p className="text-slate-400 leading-relaxed">
                From customer-facing apps to internal field tools, we deliver reliable iOS/Android experiences with clear scope, stable architecture, and measurable business impact.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Customer Apps</h3>
                  <p className="mt-2 text-sm text-slate-400">Mobile products for booking, communication, and service delivery.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Internal Ops Apps</h3>
                  <p className="mt-2 text-sm text-slate-400">Apps for teams in the field with real-time operational workflows.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Backend-Connected</h3>
                  <p className="mt-2 text-sm text-slate-400">Secure API integrations, auth, and data sync with your core systems.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Launch + Iteration</h3>
                  <p className="mt-2 text-sm text-slate-400">Release support, post-launch improvements, and reliability ownership.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white font-serif">Delivery Approach</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Scope First</p>
                      <p className="text-sm text-slate-400">Clear milestones, acceptance criteria, and technical boundaries.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Business-Focused Features</p>
                      <p className="text-sm text-slate-400">Every release ties to conversion, retention, or operational efficiency.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Reliable Architecture</p>
                      <p className="text-sm text-slate-400">Performance, stability, and maintainability built in from day one.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Ownership After Launch</p>
                      <p className="text-sm text-slate-400">Monitoring, fixes, and structured iteration as your product evolves.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Ready to scope your mobile app?</h2>
                <p className="mt-4 text-sm text-slate-400">
                  We’ll map your requirements into a clear roadmap and delivery plan.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/book" variant="brand" className="w-full">Book Automation + Engineering Call</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
