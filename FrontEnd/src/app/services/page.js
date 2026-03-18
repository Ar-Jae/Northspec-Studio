import Link from "next/link";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { services } from "../../lib/data";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export default function ServicesPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Capabilities"
                title="Our Service Offerings"
                description="AI/workflow automation, software engineering, and mobile app development for established companies. All projects follow our Built to Spec. Built to Last. method."
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <Button as="link" href="/built-to-spec" variant="secondary" className="font-times uppercase tracking-widest text-xs">
                  Learn about our Method
                </Button>
                <Button as="link" href="/contact" variant="brand" className="font-times uppercase tracking-widest text-xs">
                  Request Automation Audit
                </Button>
              </div>
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-times select-none uppercase">SVCS</div>
            </div>
          </div>

          <StaggerContainer className="flex flex-wrap justify-center gap-8">
            {services.map((service) => {
              const slug = service.slug || service.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <StaggerItem key={service.title} id={slug} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex">
                  <div
                    className="group relative flex w-full flex-col rounded-3xl border border-white/5 bg-white/5 p-10 transition-all duration-500 hover:border-brand-gold/30 hover:bg-brand-gold/5 backdrop-blur-md"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
                    
                    <div className="mb-6 flex items-center justify-between relative z-10">
                      <h2 className="text-2xl font-bold text-white font-times uppercase tracking-wider group-hover:text-brand-gold transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                      {service.description}
                    </p>

                    <ul className="mt-auto space-y-4 relative z-10">
                      {service.bullets.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-gold" />
                          <span className="font-medium tracking-tight leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-10 relative z-10 pt-6 border-t border-white/5">
                      <Link 
                        href={`/services/${slug}`}
                        className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] flex items-center gap-2 group/link"
                      >
                        Explore Service 
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mt-32 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl p-12 text-center flex flex-col items-center gap-6 border border-white/5 group hover:border-brand-gold/20 transition-all duration-500">
              <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest group-hover:text-brand-gold transition-colors">Book Discovery</h2>
              <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                Book a call and we’ll define scope, timeline, and next steps for your engineering requirements.
              </p>
              <div className="mt-auto flex flex-wrap justify-center gap-4 pt-8">
                <Button as="link" href="/book" variant="brand" className="font-times uppercase tracking-[0.2em] text-xs px-8 py-4">Book Now</Button>
                <Button as="link" href="/contact" variant="outline" className="font-times uppercase tracking-[0.2em] text-xs px-8 py-4">Inquire</Button>
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl p-12 text-center flex flex-col items-center gap-6 border border-white/5 group hover:border-brand-gold/20 transition-all duration-500">
              <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest group-hover:text-brand-gold transition-colors">Fast Track</h2>
              <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                Tell us the outcome you need. We’ll map the right blend of automation, software, and mobile delivery with clear milestones.
              </p>
              <div className="mt-auto pt-8">
                <Button as="link" href="/contact" variant="brand" className="font-times uppercase tracking-[0.2em] text-xs px-8 py-4">Start Engineering Audit</Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

