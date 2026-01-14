import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import CaseStudyCard from "../../../components/work/CaseStudyCard";
import FadeIn from "../../../components/animations/FadeIn";
import { caseStudies } from "../../../lib/data";

export default function CaseStudiesPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Work"
            title="Case Studies"
            description="Detailed breakdowns of how we've helped businesses solve complex problems and achieve measurable results."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
