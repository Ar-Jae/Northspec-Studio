import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import FadeIn from "../../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../../components/animations/Stagger";
import { testimonials } from "../../../lib/data";

export default function TestimonialsPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Work"
            title="Client Testimonials"
            description="Don't just take our word for it. Here's what our clients have to say about working with Northspec Studio."
          />

          <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <StaggerItem key={i} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <p className="text-lg text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-6">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.title}, {t.company}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </Container>
    </div>
  );
}
