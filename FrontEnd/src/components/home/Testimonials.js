import Container from "../Container";
import SectionHeading from "../SectionHeading";
import testimonials from "../../content/testimonials";
import { StaggerContainer, StaggerItem } from "../animations/Stagger";

export default function Testimonials() {
  return (
    <section className="bg-brand-dark border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams come back for the support"
          description="We focus on calm delivery: clear communication, solid engineering, and measurable outcomes."
        />

        <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem
              key={`${t.name}-${t.company}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <blockquote className="text-sm text-slate-300 font-serif italic">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-slate-500">
                  {t.title} • {t.company}
                </p>
              </figcaption>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
