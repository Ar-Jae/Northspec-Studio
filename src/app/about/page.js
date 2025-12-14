import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import Process from "../../components/home/Process";

export const metadata = {
  title: "About",
  description:
    "Northspec Studio builds, fixes, and maintains web and software products to spec with clean code and clear communication.",
  openGraph: {
    title: "About",
    description:
      "Northspec Studio builds, fixes, and maintains web and software products to spec with clean code and clear communication.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="About"
          title="Engineering first"
          description="We build, fix, and maintain production software to spec. Clean code. Clear communication. No guesswork."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              What we believe
            </h2>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <p>
                We take an engineering-first approach: clear requirements, thoughtful architecture,
                and documented decisions. The goal is a system your team can maintain.
              </p>
              <p>
                We’re a good fit for teams that want senior execution and predictable delivery.
                We are not a fit for vague projects with no ownership or clients shopping for the cheapest bid.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Typical engagements
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span aria-hidden="true" className="text-slate-400">•</span>
                  <span>Website builds with a clear spec and clean handoff</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="text-slate-400">•</span>
                  <span>APIs, integrations, and internal tools delivered in milestones</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="text-slate-400">•</span>
                  <span>Ongoing support for stability, debugging, and performance</span>
                </li>
              </ul>

              <div className="mt-6 flex gap-2">
                <Button as="link" href="/work" variant="secondary">
                  View Work
                </Button>
                <Button as="link" href="/contact" variant="primary">
                  Book a Call
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
    <Process />
    </>
  );
}
