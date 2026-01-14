import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import Button from "../../components/Button";

export const metadata = {
  title: "Built to Spec. Built to Last. | The Northspec Method",
  description: "Learn about our radical transparency, fixed-scope execution, and the Northspec project lifecycle. Durable software built to last.",
};

const phases = [
  {
    number: "01",
    title: "Discovery & Spec",
    description: "We don't start with code. We start with a deep-dive discovery session to define the 'Spec'. We identify edge cases, technical constraints, and business goals.",
    deliverable: "Comprehensive Technical Specification Document & Fixed-Price Quote",
  },
  {
    number: "02",
    title: "Iterative Development",
    description: "We work in high-velocity sprints. You have access to a staging environment where you can see progress in real-time with direct access to the lead engineer.",
    deliverable: "Live Staging Environment & Direct Slack/Discord Access",
  },
  {
    number: "03",
    title: "Quality Assurance",
    description: "Before any release, code undergoes rigorous automated and manual testing. We focus on security, performance, and cross-browser compatibility.",
    deliverable: "Test Reports & Performance Benchmarks",
  },
  {
    number: "04",
    title: "Deployment & Handover",
    description: "We handle the full deployment pipeline. You receive a full 'Handover Package' including documentation, environment variables, and training.",
    deliverable: "Full Source Code, Documentation & Team Training",
  },
];

export default function BuiltToSpecPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero Section */}
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-3xl">
              <SectionHeading
                eyebrow="The Method"
                title="Built to Spec. Built to Last."
                description="Our operational philosophy is simple: Radical transparency, elite senior engineering, and zero-BS project management."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none italic text-right">SPEC</div>
            </div>
          </div>
        </FadeIn>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <FadeIn delay={0.2}>
            <h3 className="text-xl font-bold text-white font-serif mb-4">Elite Senior Talent</h3>
            <p className="text-slate-400 leading-relaxed">
              We do not employ juniors or account managers. Every person you interact with is a senior engineer capable of making architectural decisions on the spot.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h3 className="text-xl font-bold text-white font-serif mb-4">Fixed-Scope Execution</h3>
            <p className="text-slate-400 leading-relaxed">
              Hourly billing rewards inefficiency. We operate on a value-based, fixed-price model. We define clear deliverables, and the cost remains the same.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <h3 className="text-xl font-bold text-white font-serif mb-4">Durable Architecture</h3>
            <p className="text-slate-400 leading-relaxed">
              We build for the 'Future You'. Clean, readable, and self-documenting code that is easier to maintain and scale as your business grows.
            </p>
          </FadeIn>
        </div>

        {/* Phase Timeline */}
        <div className="space-y-24 mb-32">
          <SectionHeading
            eyebrow="Lifecycle"
            title="The Northspec Project Lifecycle"
          />
          
          <StaggerContainer className="grid gap-12 lg:grid-cols-2">
            {phases.map((phase) => (
              <StaggerItem key={phase.number}>
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors group h-full">
                  <span className="absolute top-8 right-8 text-4xl font-bold text-white/10 font-serif group-hover:text-brand-gold/20 transition-colors">
                    {phase.number}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-serif mb-4">{phase.title}</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    {phase.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Primary Deliverable</span>
                    <span className="text-white text-sm font-medium">{phase.deliverable}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Final CTA */}
        <FadeIn>
          <div className="rounded-3xl bg-hero-gradient p-12 text-center flex flex-col items-center gap-8 border border-white/10">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif max-w-2xl leading-tight">
              Ready to build your next project to spec?
            </h2>
            <p className="text-slate-300 max-w-xl">
              Tell us what you're building. We'll follow up with a clear discovery session and a fixed-price technical specification.
            </p>
            <Button as="link" href="/contact" variant="brand" className="px-12 py-6 text-lg tracking-widest">
              GET STARTED
            </Button>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
