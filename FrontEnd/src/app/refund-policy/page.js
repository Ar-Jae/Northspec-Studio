import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Refund & Cancellation Policy",
  description: "Northspec Studio's refund and cancellation policy for all project engagements.",
  openGraph: {
    title: "Refund & Cancellation Policy",
    description: "Northspec Studio's refund and cancellation policy for all project engagements.",
    url: "/refund-policy",
  },
};

function Section({ title, children }) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] flex-grow bg-white/[0.03]" />
        <h3 className="text-xl font-bold text-white font-serif uppercase tracking-widest whitespace-nowrap">
          {title}
        </h3>
        <div className="h-[1px] flex-grow bg-white/[0.03]" />
      </div>
      {children}
    </div>
  );
}

function Card({ children, gold }) {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm text-left ${gold ? "border-brand-gold/10 bg-brand-gold/[0.02]" : "border-white/5 bg-white/[0.02]"}`}>
      {children}
    </div>
  );
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Refund & Cancellation Policy"
            description="Our policies around project cancellations, deposits, and refunds. Last updated: March 2026."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">

              <Section title="Our Approach">
                <p>
                  Northspec Studio ("Northspec") operates on fixed-scope, milestone-based billing. Because every project begins with a defined specification and dedicated engineering capacity, our refund and cancellation policy reflects the real costs incurred from the moment work begins.
                </p>
              </Section>

              <Section title="Deposits">
                <p className="mb-6">
                  A 50% deposit is required to initiate any project. This deposit is non-refundable once the discovery and specification phase has begun, as it covers planning, research, and capacity allocation.
                </p>
                <Card gold>
                  <p className="text-sm not-italic font-sans text-slate-300">
                    <strong className="text-brand-gold">Why non-refundable?</strong> Discovery and specification work represents significant upfront investment — stakeholder interviews, technical architecture, scope documentation, and sprint planning. This work has real value regardless of whether development proceeds.
                  </p>
                </Card>
              </Section>

              <Section title="Cancellation by Client">
                <p className="mb-6">
                  If a client cancels a project after work has begun, the following applies:
                </p>
                <div className="grid gap-4 sm:grid-cols-3 not-italic font-sans text-sm text-left">
                  {[
                    { stage: "Before Dev Starts", policy: "Deposit retained. No further charges." },
                    { stage: "During Development", policy: "Payment due for all completed milestones." },
                    { stage: "Near Completion", policy: "Full project value may be invoiced." },
                  ].map((item) => (
                    <Card key={item.stage}>
                      <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">{item.stage}</strong>
                      <p className="text-slate-300">{item.policy}</p>
                    </Card>
                  ))}
                </div>
              </Section>

              <Section title="Cancellation by Northspec">
                <p>
                  Northspec reserves the right to cancel a project if the client fails to provide required materials, misses two or more scheduled check-ins, or violates the terms of the service agreement. In such cases, the client is invoiced for work completed to date.
                </p>
              </Section>

              <Section title="Refund Eligibility">
                <p className="mb-6">
                  Refunds are only considered in the following circumstances:
                </p>
                <Card>
                  <ul className="space-y-3 text-sm not-italic font-sans text-slate-300">
                    <li>• Northspec fails to deliver agreed milestones within a reasonable timeframe</li>
                    <li>• Deliverables materially fail to meet the agreed specification</li>
                    <li>• Northspec cancels the project without cause</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Retainer Cancellations">
                <p>
                  Ongoing retainer agreements (maintenance, support) require 30 days written notice to cancel. Fees for the current billing period are non-refundable. Unused hours within a retainer period do not carry over or convert to credit.
                </p>
              </Section>

              <Section title="Requesting a Refund">
                <p>
                  To initiate a refund request, email{" "}
                  <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline not-italic font-bold">
                    build@northspecstudio.com
                  </a>
                  {" "}with your project name, invoice number, and a description of the issue. We aim to respond within 3 business days.
                </p>
              </Section>

            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
