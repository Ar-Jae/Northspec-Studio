import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { services } from "../../../lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Service Detail"
                title={service.title}
                description={service.description}
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none uppercase">
                {service.slug.substring(0, 2)}
              </div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  Capabilities
                </h2>
                <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                  {service.short || "We provide specialized engineering solutions tailored to your specific technical requirements and business goals."}
                </p>
              </section>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {service.bullets?.map((bullet, i) => (
                  <div 
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-gold/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <h3 className="text-lg font-semibold text-white">{bullet}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sticky top-32">
                <h2 className="text-2xl font-semibold text-white font-serif">Ready to build?</h2>
                <p className="mt-4 text-slate-400">
                  We'll help you define the scope, timeline, and budget for your {service.title.toLowerCase()} project.
                </p>
                
                <div className="mt-10 space-y-4">
                  <Button as="link" href="/contact" variant="brand" className="w-full justify-center">Book a Discovery Call</Button>
                  <Button as="link" href="/pricing" variant="outline" className="w-full justify-center">View Pricing & Plans</Button>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Why Northspec?</h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Production-ready engineering",
                      "Transparent project management",
                      "Full source code ownership",
                      "30-day post-launch warranty"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-brand-gold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

