import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Custom Plans",
  description: "Tailored engineering solutions for complex projects.",
};

export default function CustomPlansPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Pricing"
            title="Custom Plans"
            description="For projects that don't fit into a box. We build tailored solutions for complex requirements."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">When you need a custom plan</h2>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-brand-gold">✓</span>
                  <span>Multi-platform ecosystems (Web + Mobile + Desktop)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold">✓</span>
                  <span>Legacy system migrations and modernizations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold">✓</span>
                  <span>High-compliance environments (HIPAA, SOC2)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold">✓</span>
                  <span>Complex AI/ML integration and data pipelines</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white font-serif">The Scoping Process</h2>
              <p className="mt-4 text-slate-400">
                Custom projects require a deeper discovery phase. We'll work with your stakeholders to define technical requirements, security needs, and success metrics.
              </p>
              <div className="mt-8">
                <Button as="link" href="/contact" variant="brand">Request a Custom Quote</Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
