import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Software Development",
  description: "Custom software engineering for production-ready systems.",
};

export default function SoftwareDevelopmentPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Service"
            title="Software Development"
            description="We build, fix, and scale production-ready software. From MVPs to enterprise-grade platforms, we focus on clean architecture and maintainable code."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">Our Approach</h2>
              <p className="text-slate-400 leading-relaxed">
                We don't just write code; we engineer systems. Every project starts with a clear technical specification and ends with a robust, tested deployment.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Full-Stack Web</h3>
                  <p className="mt-2 text-sm text-slate-400">Modern web applications built with Next.js, React, and Node.js.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">API Design</h3>
                  <p className="mt-2 text-sm text-slate-400">Secure, scalable REST and GraphQL APIs built for performance.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Database Architecture</h3>
                  <p className="mt-2 text-sm text-slate-400">Optimized SQL and NoSQL schemas designed for data integrity.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Cloud Infrastructure</h3>
                  <p className="mt-2 text-sm text-slate-400">Automated deployments and scaling on AWS, Vercel, or GCP.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white font-serif">The Build Process</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">01</span>
                    <div>
                      <p className="font-semibold text-white">Technical Discovery</p>
                      <p className="text-sm text-slate-400">Defining requirements, stack selection, and architecture.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">02</span>
                    <div>
                      <p className="font-semibold text-white">Iterative Development</p>
                      <p className="text-sm text-slate-400">Weekly sprints with staging deployments for feedback.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">03</span>
                    <div>
                      <p className="font-semibold text-white">QA & Testing</p>
                      <p className="text-sm text-slate-400">Rigorous testing for security, performance, and edge cases.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">04</span>
                    <div>
                      <p className="font-semibold text-white">Launch & Handoff</p>
                      <p className="text-sm text-slate-400">Production deployment with full documentation and training.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Ready to build?</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Let's discuss your project requirements and build a system that scales with your business.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/contact" variant="brand" className="w-full">Book a Discovery Call</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
