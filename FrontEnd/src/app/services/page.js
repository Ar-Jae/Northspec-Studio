import Link from "next/link";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { services } from "../../lib/data";

export default function ServicesPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Capabilities"
                title="Our Service Offerings"
                description="Custom software, workflow automation, and financial integrations built by senior engineers. All projects follow our Built to Spec. Built to Last. method."
              />
              <div className="mt-8">
                <Button as="link" href="/built-to-spec" variant="secondary">
                  Learn about Built to Spec. Built to Last.
                </Button>
              </div>
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">0101</div>
            </div>
          </div>

          <StaggerContainer className="flex flex-wrap justify-center gap-8">
            {services.map((service) => {
              const slug = service.slug || service.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <StaggerItem key={service.title} id={slug} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex">
                  <div
                    className="group relative flex w-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.07]"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white font-serif group-hover:text-brand-gold transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-slate-400 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <ul className="mt-auto space-y-3">
                      {service.bullets.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="w-1 h-1 rounded-full bg-brand-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mt-32 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-hero-gradient p-12 text-center flex flex-col items-center gap-6 border border-white/10">
              <h2 className="text-3xl font-bold text-white font-serif">Ready to scope your project?</h2>
              <p className="text-slate-300 max-w-sm">
                Book a call and we’ll define scope, timeline, and next steps for your engineering requirements.
              </p>
              <div className="mt-auto flex flex-wrap justify-center gap-4">
                <Button as="link" href="/book" variant="brand">Book a Discovery Call</Button>
                <Button as="link" href="/contact" variant="outline">Start a Project</Button>
              </div>
            </div>

            <div className="rounded-3xl bg-hero-gradient p-12 text-center flex flex-col items-center gap-6 border border-white/10">
              <h2 className="text-3xl font-bold text-white font-serif">Ready to automate your business?</h2>
              <p className="text-slate-300 max-w-sm">
                Stop wasting time on manual tasks. Let's build systems that scale your operations while you sleep.
              </p>
              <div className="mt-auto">
                <Button as="link" href="/contact" variant="brand">Send a Message</Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

