import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Service Agreement",
  description: "Master service agreement governing all engagements with Northspec Studio.",
  openGraph: {
    title: "Service Agreement",
    description: "Master service agreement governing all engagements with Northspec Studio.",
    url: "/service-agreement",
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

export default function ServiceAgreementPage() {
  return (
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Service Agreement"
            description="This Master Service Agreement governs all project engagements between Northspec Studio and its clients. Last updated: March 2026."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">

              <Section title="Parties & Scope">
                <p>
                  This agreement is between Northspec Studio ("Northspec") and the client entity identified in the project proposal ("Client"). It governs all services, deliverables, and engagements initiated via a signed project proposal or statement of work.
                </p>
              </Section>

              <Section title="Scope of Work">
                <p className="mb-6">
                  All work is defined in a written project specification agreed upon before development begins. Work outside that specification constitutes a change order and requires written approval before execution.
                </p>
                <Card gold>
                  <ul className="grid gap-3 sm:grid-cols-2 text-sm not-italic font-sans text-slate-300">
                    <li>• Scope is fixed at project start</li>
                    <li>• Changes require written approval</li>
                    <li>• Timelines are milestone-based</li>
                    <li>• Deliverables are defined in the spec doc</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Payment Terms">
                <p className="mb-6">
                  Projects are billed on a scope basis, not hourly. Payment schedules are outlined in each project proposal. Standard terms are:
                </p>
                <div className="grid gap-4 sm:grid-cols-3 not-italic font-sans text-sm text-left">
                  {[
                    { label: "Deposit", value: "50% due upon signing" },
                    { label: "Milestone", value: "25% at mid-delivery checkpoint" },
                    { label: "Final", value: "25% upon project completion" },
                  ].map((item) => (
                    <Card key={item.label}>
                      <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">{item.label}</strong>
                      <p className="text-slate-300">{item.value}</p>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 space-y-4 not-italic font-sans">
                  <Card gold>
                    <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-3">Non-Delivery for Non-Payment</strong>
                    <p className="text-sm text-slate-300">Final payment is due on delivery day, prior to or at the time of the delivery demo. If the Client fails to submit final payment on delivery day, the project will not be delivered. Access to all deliverables, source code, and assets will be withheld until payment is received in full.</p>
                  </Card>
                  <Card>
                    <strong className="text-white uppercase tracking-widest text-xs block mb-3">Retainer Non-Payment</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• <strong className="text-white">30 days past due:</strong> All hosted services are suspended until the outstanding balance is settled. No data is deleted during this period.</li>
                      <li>• <strong className="text-white">90 days past due:</strong> Failure to pay in full within 90 days will result in the permanent removal of all client data from Northspec infrastructure. This action is irreversible.</li>
                      <li>• Upon receipt of full payment before the 90-day threshold, services will be fully restored without data loss.</li>
                    </ul>
                  </Card>
                </div>
              </Section>

              <Section title="Intellectual Property">
                <p className="mb-6">
                  Upon receipt of final payment, the Client owns all custom code, designs, and deliverables produced under this agreement. Northspec retains no claim to the work product.
                </p>
                <Card gold>
                  <ul className="space-y-2 text-sm not-italic font-sans text-slate-300">
                    <li>• Client owns all deliverables upon final payment</li>
                    <li>• Third-party libraries remain under their respective licenses</li>
                    <li>• Northspec may reference the project name in its portfolio unless agreed otherwise</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Confidentiality">
                <p>
                  Both parties agree to keep confidential any proprietary information shared during the engagement. This obligation survives termination of the agreement for a period of two (2) years.
                </p>
              </Section>

              <Section title="Warranties & Liability">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <strong className="text-white text-sm block mb-3 not-italic font-sans uppercase tracking-widest">Northspec Warranties</strong>
                    <ul className="space-y-2 text-sm not-italic font-sans text-slate-300">
                      <li>• Work performed professionally</li>
                      <li>• 30-day bug fix warranty post-launch</li>
                      <li>• Code is original or properly licensed</li>
                    </ul>
                  </Card>
                  <Card>
                    <strong className="text-white text-sm block mb-3 not-italic font-sans uppercase tracking-widest">Limitations</strong>
                    <ul className="space-y-2 text-sm not-italic font-sans text-slate-300">
                      <li>• No liability for indirect damages</li>
                      <li>• Max liability capped at project value</li>
                      <li>• No warranty on third-party services</li>
                    </ul>
                  </Card>
                </div>
              </Section>

              <Section title="Termination">
                <p>
                  Either party may terminate with 14 days written notice. Upon termination, the Client owes payment for all work completed to date. Deposits are non-refundable once discovery and specification work has begun.
                </p>
              </Section>

              <Section title="Hosting & Responsibility">
                <p className="mb-6">
                  At project delivery, the Client selects one of two hosting arrangements. This choice determines ongoing support eligibility and Northspec's post-delivery responsibilities.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-italic font-sans">
                  <Card>
                    <strong className="text-white uppercase tracking-widest text-xs block mb-3">Client-Hosted</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Client provisions and manages all infrastructure</li>
                      <li>• Northspec delivers the completed work and steps back</li>
                      <li>• Client assumes full responsibility for uptime, security, and maintenance</li>
                      <li>• Northspec bears no liability for any issues arising post-delivery</li>
                      <li>• Retainer plans are not available</li>
                      <li>• Future fixes or changes require a new paid engagement</li>
                    </ul>
                  </Card>
                  <Card gold>
                    <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-3">Northspec-Hosted</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Northspec hosts and manages all infrastructure on its systems</li>
                      <li>• Direct access allows faster incident response and automated fixes</li>
                      <li>• Client is eligible for Northspec retainer plans</li>
                      <li>• Proactive monitoring, patching, and uptime management included</li>
                      <li>• Issues can often be resolved without client involvement</li>
                    </ul>
                  </Card>
                </div>
                <p className="mt-4 text-sm not-italic font-sans text-slate-500">
                  The hosting arrangement is selected and documented at project delivery. Clients who initially chose self-hosting may transition to Northspec-hosted infrastructure under a separate infrastructure onboarding agreement.
                </p>
              </Section>

              <Section title="Governing Law">
                <p>
                  This agreement is governed by the laws of the jurisdiction in which Northspec operates. Any disputes shall be resolved through binding arbitration before litigation is pursued.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  Questions about this agreement should be directed to{" "}
                  <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline not-italic font-bold">
                    build@northspecstudio.com
                  </a>
                </p>
              </Section>

            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
