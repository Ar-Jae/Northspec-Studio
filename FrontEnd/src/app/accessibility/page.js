import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Accessibility Statement",
  description: "Northspec Studio's commitment to web accessibility and inclusive design.",
  openGraph: {
    title: "Accessibility Statement",
    description: "Northspec Studio's commitment to web accessibility and inclusive design.",
    url: "/accessibility",
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

export default function AccessibilityPage() {
  return (
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Accessibility"
            title="Accessibility Statement"
            description="Our commitment to making northspecstudio.com accessible to all visitors. Last updated: March 2026."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">

              <Section title="Our Commitment">
                <p>
                  Northspec Studio ("Northspec") is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to our work and our own site.
                </p>
              </Section>

              <Section title="Conformance Status">
                <p className="mb-6">
                  We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content accessible to people with disabilities.
                </p>
                <Card gold>
                  <div className="grid gap-4 sm:grid-cols-3 text-sm not-italic font-sans">
                    {[
                      { label: "Standard", value: "WCAG 2.1 AA" },
                      { label: "Status", value: "Partially Conformant" },
                      { label: "Last Audited", value: "March 2026" },
                    ].map((item) => (
                      <div key={item.label}>
                        <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-1">{item.label}</strong>
                        <p className="text-slate-300">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </Section>

              <Section title="Measures We Take">
                <p className="mb-6">
                  Northspec takes the following measures to ensure accessibility:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-italic font-sans">
                  <Card>
                    <strong className="text-white uppercase tracking-widest text-xs block mb-3">Design</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Sufficient color contrast ratios</li>
                      <li>• Scalable text without loss of function</li>
                      <li>• No content that flashes more than 3x per second</li>
                      <li>• Visible focus indicators on interactive elements</li>
                    </ul>
                  </Card>
                  <Card>
                    <strong className="text-white uppercase tracking-widest text-xs block mb-3">Code</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Semantic HTML structure throughout</li>
                      <li>• ARIA labels on interactive components</li>
                      <li>• Keyboard navigation support</li>
                      <li>• Skip-to-content link on all pages</li>
                    </ul>
                  </Card>
                </div>
              </Section>

              <Section title="Known Limitations">
                <p className="mb-6">
                  Despite our best efforts, some areas of the site may not yet fully conform. Known limitations include:
                </p>
                <Card>
                  <ul className="space-y-2 text-sm not-italic font-sans text-slate-300">
                    <li>• The 3D WebGL canvas background does not have a non-animated fallback for users with motion sensitivity preferences</li>
                    <li>• Some third-party embedded content (booking calendar) may not fully conform to WCAG AA</li>
                    <li>• Complex animations may not respect prefers-reduced-motion in all browsers</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Feedback">
                <p>
                  We welcome feedback on the accessibility of this site. If you encounter any barriers or have suggestions, please contact us at{" "}
                  <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline not-italic font-bold">
                    build@northspecstudio.com
                  </a>
                  . We aim to respond to accessibility feedback within 5 business days.
                </p>
              </Section>

              <Section title="Formal Complaints">
                <p>
                  If you are not satisfied with our response, you may contact the relevant authority in your jurisdiction. For EU residents, this may be your national data protection or equality authority.
                </p>
              </Section>

            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
