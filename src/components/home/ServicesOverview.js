import Container from "../Container";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import services from "../../content/services";

export default function ServicesOverview() {
  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Build, integrate, and support"
            description="Three ways we help teams ship and maintain high-quality web products."
          />
          <div className="flex gap-2">
            <Button as="link" href="/services" variant="secondary">
              Explore services
            </Button>
            <Button as="link" href="/contact" variant="primary">
              Book a Call
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{service.short}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {service.bullets.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1 text-slate-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
