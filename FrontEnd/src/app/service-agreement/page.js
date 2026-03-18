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
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
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
