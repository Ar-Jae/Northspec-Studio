import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import ContactForm from "../../components/contact/ContactForm";
import site from "../../content/site";
import FadeIn from "../../components/animations/FadeIn";

export const metadata = {
  title: "Contact",
  description:
    "Book a call or send a message. We’ll respond within one business day.",
  openGraph: {
    title: "Contact",
    description:
      "Book a call or send a message. We’ll respond within one business day.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Contact"
                title="Book a call"
                description="Tell us what you’re building. We’ll follow up with a clear plan and timeline."
              />

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-sm font-semibold text-white font-serif">Direct</h2>
                <div className="mt-4 grid gap-6 text-sm text-slate-300">
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-500">Public / Front-facing</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-slate-500">Main</dt>
                        <dd className="font-medium text-white">{site.contact.emails?.main || site.contact.email}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Projects</dt>
                        <dd className="font-medium text-white">{site.contact.emails?.projects}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-500">Business</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-slate-500">Billing</dt>
                        <dd className="font-medium text-white">{site.contact.emails?.billing}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Press</dt>
                        <dd className="font-medium text-white">{site.contact.emails?.press}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="grid gap-1">
                    <div>
                      <dt className="text-slate-500">Phone</dt>
                      <dd className="font-medium text-white">{site.contact.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Location</dt>
                      <dd className="font-medium text-white">{site.contact.location}</dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <h2 className="text-lg font-semibold tracking-tight text-white font-serif">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Share a bit of context and we’ll respond within 1 business day.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
