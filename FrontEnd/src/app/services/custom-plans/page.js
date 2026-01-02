import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";

export const metadata = {
  title: "Custom Plans",
  description: "Tailored engineering solutions for unique business requirements.",
};

export default function CustomPlansPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Service"
            title="Custom Plans"
            description="Not every project fits into a standard box. We design custom engineering partnerships tailored to your specific technical and business goals."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white font-serif">Tailored Solutions</h2>
              <p className="text-slate-400 leading-relaxed">
                Whether you need a dedicated team for a long-term build, a specialized consultant for a complex migration, or a hybrid support model, we can build a plan that works.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Dedicated Teams</h3>
                  <p className="mt-2 text-sm text-slate-400">A full engineering squad focused exclusively on your product.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Technical Consulting</h3>
                  <p className="mt-2 text-sm text-slate-400">High-level architecture reviews and technology strategy.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">Legacy Migrations</h3>
                  <p className="mt-2 text-sm text-slate-400">Safe, phased transitions from old systems to modern stacks.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">R&D Projects</h3>
                  <p className="mt-2 text-sm text-slate-400">Prototyping and experimental builds for new product ideas.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-white font-serif">Why Custom?</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Flexible Scoping</p>
                      <p className="text-sm text-slate-400">Adjust resources and focus as your project evolves.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Priority Access</p>
                      <p className="text-sm text-slate-400">Direct line to our senior leadership and lead engineers.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">Custom Billing</p>
                      <p className="text-sm text-slate-400">Milestone-based or resource-based billing models.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <span className="text-brand-gold font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-white">IP Ownership</p>
                      <p className="text-sm text-slate-400">Full ownership of all code and assets from day one.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Let's design your plan</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Every custom plan starts with a deep dive into your business needs. No pressure, just engineering talk.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/contact" variant="brand" className="w-full">Request a Custom Quote</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
