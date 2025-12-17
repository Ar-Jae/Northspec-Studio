import Container from "../Container";
import SectionHeading from "../SectionHeading";

const steps = [
  {
    title: "Discovery & System Analysis",
    description:
      "We start by understanding your business model, goals, and operational bottlenecks. This phase defines what needs to be built, what can be automated, and what should be avoided.",
    points: [
      "Core business objectives",
      "Current pain points and manual processes",
      "Technical constraints and opportunities",
      "Scope clarity to prevent surprises later",
    ],
    footer: "This ensures we’re solving the right problem before writing any code.",
  },
  {
    title: "Design & Prototyping",
    description: "We translate strategy into a clear, intuitive user experience. Our designers create:",
    points: [
      "Clean, functional interfaces",
      "User flows aligned with real use cases",
      "Interactive prototypes for early feedback",
    ],
    footer:
      "You’ll be able to see and validate the product before development begins, reducing risk and rework.",
  },
  {
    title: "Development & Testing",
    description:
      "Our engineers build the system using modern, scalable technologies and proven best practices. This includes:",
    points: [
      "Frontend and backend development",
      "Secure APIs and integrations",
      "Automation-ready architecture",
      "Continuous testing throughout development",
    ],
    footer:
      "Every feature is tested for performance, reliability, and edge cases — not just “happy paths.”",
  },
  {
    title: "Deployment & Ongoing Support",
    description:
      "We deploy your system into a production-ready environment with stability and security in mind. This phase includes:",
    points: [
      "Deployment and environment configuration",
      "Monitoring and error handling setup",
      "Documentation and handoff",
      "Optional ongoing support and maintenance",
    ],
    footer:
      "You’re not left guessing after launch — we ensure a smooth transition and long-term reliability.",
  },
];

export default function Process() {
  return (
    <section className="bg-brand-dark border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Process"
          title="How we work"
          description="A proven methodology to deliver high-quality software that solves real business problems."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 shadow-sm hover:bg-white/10 transition-colors"
            >
              <p className="text-sm font-medium text-brand-gold">Step {idx + 1}</p>
              <h3 className="mt-2 text-xl font-serif font-medium tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-base text-slate-400">{step.description}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-brand-gold">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-6 flex-1 text-sm italic text-slate-500">{step.footer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
