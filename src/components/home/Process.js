import Container from "../Container";
import SectionHeading from "../SectionHeading";

const steps = [
  {
    title: "Define the spec",
    body: "We agree on scope, requirements, and success criteria. Estimates are based on what’s written down.",
  },
  {
    title: "Make the decisions",
    body: "We document tradeoffs and choose an approach your team can maintain. No mystery architecture.",
  },
  {
    title: "Build and review",
    body: "Work ships in weekly checkpoints with clear updates. You work directly with the engineers writing the code.",
  },
  {
    title: "Maintain",
    body: "Launch is not the end. We support, fix, and improve systems so they stay stable over time.",
  },
];

export default function Process() {
  return (
    <section className="bg-slate-50">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Process"
          title="Clear scope. Predictable delivery."
          description="Work is defined up front, decisions are documented, and you always know what comes next."
        />

        <ol className="mt-10 grid gap-6 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-600">Step {idx + 1}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
