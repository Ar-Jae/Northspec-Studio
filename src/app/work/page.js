import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import CaseStudyCard from "../../components/work/CaseStudyCard";
import caseStudies from "../../content/caseStudies";

export const metadata = {
  title: "Work",
  description:
    "A selection of projects across e-commerce, B2B SaaS, and performance-focused support work.",
  openGraph: {
    title: "Work",
    description:
      "A selection of projects across e-commerce, B2B SaaS, and performance-focused support work.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <SectionHeading
          eyebrow="Work"
          title="Case studies"
          description="Realistic examples of how we improve conversion, reliability, and velocity for teams." 
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} compact />
          ))}
        </div>
      </Container>
    </div>
  );
}
