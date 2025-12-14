import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import services from "../../content/services";

export const metadata = {
  title: "Services",
  description:
    "Web development, software engineering, and product support, defined clearly and delivered to spec.",
  openGraph: {
    title: "Services",
    description:
      "Web development, software engineering, and product support, defined clearly and delivered to spec.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Services"
          title="Built to spec"
          description="We build, fix, and maintain production software with clear scopes, documented decisions, and maintainable systems."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <section
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
              aria-labelledby={`${service.title}-title`}
            >
              <h2
                id={`${service.title}-title`}
                className="text-xl font-semibold tracking-tight text-slate-900"
              >
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {service.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1 text-slate-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Ready to scope your project?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Book a call and we’ll define scope, timeline, and next steps.
              </p>
            </div>
            <div className="flex gap-2">
              <Button as="link" href="/work" variant="secondary">
                View Work
              </Button>
              <Button as="link" href="/contact" variant="primary">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
