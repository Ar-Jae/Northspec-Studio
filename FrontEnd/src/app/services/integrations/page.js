import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Integrations",
  description: "Connect your software ecosystem with secure, reliable API integrations.",
};

export default function IntegrationsPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Service"
            title="Integrations"
            description="Your tools should talk to each other. We build custom integrations that bridge the gap between your software, ensuring data flows where it's needed."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">Connected Ecosystems</h2>
              <p className="text-slate-400 leading-relaxed">
                Siloed data is a bottleneck. We specialize in connecting disparate systems through custom middleware, webhooks, and API development.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Payment Gateways</h3>
                  <p className="mt-2 text-sm text-slate-400">Stripe, Plaid, and PayPal integrations for seamless billing.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">CRM & Marketing</h3>
                  <p className="mt-2 text-sm text-slate-400">HubSpot, Salesforce, and Mailchimp deep integrations.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Cloud Storage</h3>
                  <p className="mt-2 text-sm text-slate-400">Google Drive, AWS S3, and Dropbox file management.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Communication</h3>
                  <p className="mt-2 text-sm text-slate-400">Slack, Twilio, and SendGrid for automated messaging.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white font-serif">Integration Capabilities</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Custom Middleware</p>
                      <p className="text-sm text-slate-400">Building the "glue" code that transforms and routes data between APIs.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Webhook Management</p>
                      <p className="text-sm text-slate-400">Reliable handling of real-time events with retry logic and logging.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Legacy to Modern</p>
                      <p className="text-sm text-slate-400">Connecting older systems to modern web apps and cloud services.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Security & Auth</p>
                      <p className="text-sm text-slate-400">Implementing OAuth2, API Keys, and secure credential management.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Bridge the gap</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Stop manually exporting CSVs. Let's build a real-time integration that works while you sleep.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/contact" variant="brand" className="w-full">Discuss Integrations</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
