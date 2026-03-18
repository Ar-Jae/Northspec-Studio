import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "NDA Policy",
  description: "Northspec Studio's non-disclosure agreement policy for client engagements.",
  openGraph: {
    title: "NDA Policy",
    description: "Northspec Studio's non-disclosure agreement policy for client engagements.",
    url: "/nda-policy",
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

export default function NdaPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="NDA Policy"
            description="Our standard approach to confidentiality and non-disclosure across all client engagements. Last updated: March 2026."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">

              <Section title="Our Commitment">
                <p>
                  Northspec Studio ("Northspec") treats all client information as confidential by default. We do not share, sell, or disclose client details, business logic, technical architecture, or project specifics to any third party without explicit written consent.
                </p>
              </Section>

              <Section title="What We Protect">
                <p className="mb-6">
                  The following categories of information are treated as confidential from the moment they are shared with us:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-italic font-sans">
                  <Card gold>
                    <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-3">Business Information</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Business models and strategy</li>
                      <li>• Revenue figures and financials</li>
                      <li>• Customer lists and pipeline data</li>
                      <li>• Unreleased product plans</li>
                    </ul>
                  </Card>
                  <Card>
                    <strong className="text-white uppercase tracking-widest text-xs block mb-3">Technical Information</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• System architecture and design</li>
                      <li>• Source code and algorithms</li>
                      <li>• API keys and credentials</li>
                      <li>• Infrastructure configuration</li>
                    </ul>
                  </Card>
                </div>
              </Section>

              <Section title="Mutual Confidentiality">
                <p>
                  All engagements are governed by mutual confidentiality. Northspec will not disclose your information, and we expect the same in return with respect to our proprietary methods, tooling, and internal processes.
                </p>
              </Section>

              <Section title="Signed NDA Requests">
                <p className="mb-6">
                  If your organization requires a formal signed NDA before beginning discovery discussions, we are happy to accommodate this. We offer:
                </p>
                <Card gold>
                  <ul className="space-y-3 text-sm not-italic font-sans text-slate-300">
                    <li>• Signing of client-provided NDA templates</li>
                    <li>• Provision of our standard mutual NDA document</li>
                    <li>• Project-specific confidentiality addendums</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Duration">
                <p>
                  Confidentiality obligations survive the termination of any engagement for a period of <strong className="text-white not-italic">two (2) years</strong>, unless a longer period is specified in a signed agreement. Information that becomes publicly available through no fault of either party is excluded from this obligation.
                </p>
              </Section>

              <Section title="Sub-contractors">
                <p>
                  In cases where Northspec engages sub-contractors or specialist partners to assist with delivery, those parties are bound by the same confidentiality obligations under written agreement before any project details are shared.
                </p>
              </Section>

              <Section title="Request an NDA">
                <p>
                  To request a formal NDA before our discovery call, email{" "}
                  <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline not-italic font-bold">
                    build@northspecstudio.com
                  </a>
                  {" "}with the subject line "NDA Request." We will respond within one business day.
                </p>
              </Section>

            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
