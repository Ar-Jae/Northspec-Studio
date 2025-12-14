import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import ContactForm from "../../components/contact/ContactForm";
import site from "../../content/site";

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
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Book a call"
              description="Tell us what you’re building. We’ll follow up with a clear plan and timeline."
            />

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm font-semibold text-slate-900">Direct</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-700">
                <div>
                  <dt className="text-slate-600">Email</dt>
                  <dd className="font-medium text-slate-900">{site.contact.email}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Phone</dt>
                  <dd className="font-medium text-slate-900">{site.contact.phone}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Location</dt>
                  <dd className="font-medium text-slate-900">{site.contact.location}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Share a bit of context and we’ll respond within 1 business day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
