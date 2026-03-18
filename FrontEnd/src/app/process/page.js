import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import Button from "../../components/Button";

export const metadata = {
  title: "Process",
  description: "How we build, communicate, and deliver production-ready systems.",
};

const steps = [
  {
    title: "Discovery & Scoping",
    description: "We start by defining exactly what success looks like. No 'figuring it out later'—we document requirements, constraints, and success metrics before a single line of code is written.",
  },
  {
    title: "Architecture & Setup",
    description: "We build the foundation. This includes database schema design, API structure, and security protocols. We prioritize stability and scalability from day one.",
  },
  {
    title: "Iterative Development",
    description: "We build in focused blocks. You'll see progress every week through demos and staging deployments. We don't disappear for months; we build in the open.",
  },
  {
    title: "Testing & QA",
    description: "We don't rush production systems. We leave space for real testing, edge-case handling, and performance optimization to ensure your system works when it matters.",
  },
  {
    title: "Deployment & Handoff",
    description: "Once paid in full, you own everything. We provide full documentation, training for your team, and a clean handoff of the codebase and infrastructure.",
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Process"
            title="Methodical. Transparent. Reliable."
            description="We don't just ship software; we build durable systems. Our process is designed to eliminate uncertainty and deliver quality."
          />

          {/* How Timelines Work */}
          <div id="how-it-works" className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm scroll-mt-32">
            <h2 className="text-2xl font-semibold text-white font-serif">How Timelines Work</h2>
            <p className="mt-4 text-slate-300 max-w-3xl">
              Our delivery timelines are designed to prioritize reliability over rush. We leave space for real testing, account for feedback cycles, and avoid burnout that leads to compromised quality.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-brand-gold font-bold block mb-1">✓ Quality First</span>
                <p className="text-xs text-slate-400">We prioritize stability over speed every time.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-brand-gold font-bold block mb-1">✓ Real Testing</span>
                <p className="text-xs text-slate-400">Space for edge cases and performance audits.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-brand-gold font-bold block mb-1">✓ Feedback Loops</span>
                <p className="text-xs text-slate-400">Structured windows for your review and input.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-brand-gold font-bold block mb-1">✓ No Burnout</span>
                <p className="text-xs text-slate-400">Sustainable pace ensures consistent high quality.</p>
              </div>
            </div>
          </div>

          {/* Capacity & Focus */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white font-serif">Capacity & Focus</h2>
            <p className="mt-4 text-slate-300 max-w-3xl">
              As a solo-led agency, we protect our focus to ensure your project gets the attention it deserves.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-semibold">The 1+1 Rule</h4>
                <p className="mt-1 text-sm text-slate-400">
                  We only handle one Primary build and one Secondary project at a time. This prevents context switching and ensures deep focus.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-semibold">Deep Work Blocks</h4>
                <p className="mt-1 text-sm text-slate-400">
                  Development time is protected from interruptions. We respond to all communication within 24 hours on business days.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-semibold">Staggered Kickoffs</h4>
                <p className="mt-1 text-sm text-slate-400">
                  We never start two projects in the same week. Every build gets a dedicated, high-energy launch phase.
                </p>
              </div>
            </div>
          </div>

          {/* The Steps */}
          <div className="mt-24">
            <h2 className="text-3xl font-semibold text-white font-serif text-center">The Lifecycle of a Build</h2>
            <div className="mt-16 space-y-12">
              {steps.map((step, index) => {
                const slug = step.title.toLowerCase().split(' ')[0];
                const id = slug === 'discovery' ? 'discovery' : 
                           slug === 'iterative' ? 'development' : 
                           slug === 'deployment' ? 'delivery' : slug;
                return (
                  <div key={step.title} id={id} className="relative pl-12 md:pl-0 scroll-mt-32">
                    <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                      <div className="md:col-span-1 md:text-right">
                        <span className="text-5xl font-bold text-white/10 font-serif">0{index + 1}</span>
                      </div>
                      <div className="md:col-span-4 pt-2">
                        <h3 className="text-xl font-semibold text-white font-serif">{step.title}</h3>
                        <p className="mt-3 text-slate-400 max-w-3xl leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-2xl font-semibold text-white font-serif">Ready to start?</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              We work best with serious founders and businesses building real systems.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button as="link" href="/contact" variant="brand">
                Book a Discovery Call
              </Button>
              <Button as="link" href="/pricing" variant="secondary">
                View Pricing
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
