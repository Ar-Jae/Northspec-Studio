import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import site from "../../../content/site";

export const metadata = {
  title: "Support",
  description: "Get support for your Northspec Studio project.",
};

export default function SupportPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Support"
            title="How can we help?"
            description="Existing clients can get technical support, report bugs, or request maintenance."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white font-serif">Technical Support</h3>
                <p className="mt-4 text-slate-400">
                  For urgent technical issues or bug reports, please email our support desk directly. 
                  We respond to all support tickets within 4-8 business hours.
                </p>
                <p className="mt-6 text-brand-gold font-mono">{site.contact.emails?.main}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white font-serif">Maintenance Requests</h3>
                <p className="mt-4 text-slate-400">
                  Need a small update or a new feature? If you're on a retainer plan, these are covered. 
                  If not, we'll provide a quick quote for the work.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/contact" variant="secondary">Submit Request</Button>
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white font-serif">Support Hours</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Monday – Friday</span>
                  <span className="text-white">9am – 5pm EST</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Saturday</span>
                  <span className="text-white">Emergency Only</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold text-white font-serif">Emergency?</h3>
                <p className="mt-2 text-sm text-slate-400">
                  If your system is down and it's outside of business hours, please use the emergency contact number provided in your onboarding document.
                </p>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
