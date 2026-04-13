import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import Button from "../../components/Button";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Process",
  description: "How we build, communicate, and deliver production-ready systems.",
};

const steps = [
  {
    title: "Discovery & Scoping",
    description: "We start by defining exactly what success looks like. No 'figuring it out later'-we document requirements, constraints, and success metrics before a single line of code is written.",
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
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Process"
            title="Methodical. Transparent. Reliable."
            description="We don't just ship software; we build durable systems. Our process is designed to eliminate uncertainty and deliver quality."
          />

          {/* How Timelines Work */}
          <div id="how-it-works" className="mt-16 rounded-2xl border border-white/5 bg-white/[0.03] p-10 backdrop-blur-xl scroll-mt-32 hover:border-brand-gold/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.02] font-times select-none italic tracking-tighter uppercase leading-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-700">TIME</div>
            <h2 className="text-3xl font-bold text-white font-times uppercase tracking-[0.2em] relative z-10">How Timelines Work</h2>
            <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed relative z-10 font-medium italic">
              Our delivery timelines are designed to prioritize reliability over rush. We leave space for real testing, account for feedback cycles, and avoid burnout that leads to compromised quality.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {[
                { label: "Quality First", desc: "We prioritize stability over speed every time." },
                { label: "Real Testing", desc: "Space for edge cases and performance audits." },
                { label: "Feedback Loops", desc: "Structured windows for your review and input." },
                { label: "No Burnout", desc: "Sustainable pace ensures consistent high quality." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-brand-gold/5 transition-all duration-500 hover:scale-[1.02]">
                  <span className="text-brand-gold font-bold block mb-2 text-[10px] uppercase tracking-[0.2em] font-times">✓ {item.label}</span>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capacity & Focus */}
          <div className="mt-16 rounded-2xl border border-white/5 bg-white/[0.03] p-10 backdrop-blur-xl hover:border-brand-gold/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.02] font-times select-none italic tracking-tighter uppercase leading-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-700">CAP</div>
            <h2 className="text-3xl font-bold text-white font-times uppercase tracking-[0.2em] relative z-10">Capacity & Focus</h2>
            <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed relative z-10 font-medium italic">
              As a solo-led agency, we protect our focus to ensure your project gets the attention it deserves.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3 relative z-10">
              {[
                { title: "The 1+1 Rule", desc: "We only handle one Primary build and one Secondary project at a time. This prevents context switching and ensures deep focus." },
                { title: "Deep Work Blocks", desc: "Development time is protected from interruptions. We respond to all communication within 24 hours on business days." },
                { title: "Staggered Kickoffs", desc: "We never start two projects in the same week. Every build gets a dedicated, high-energy launch phase." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-brand-gold/5 transition-all duration-500 hover:scale-[1.02]">
                  <h4 className="text-white font-bold font-times uppercase tracking-[0.1em] text-xs mb-4">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The Steps */}
          <div className="mt-40 relative z-10">
            <div className="flex items-center gap-4 mb-20 justify-center">
              <div className="h-[1px] w-24 bg-white/[0.03]" />
              <h2 className="text-3xl font-bold text-white font-times uppercase tracking-[0.3em]">Lifecycle</h2>
              <div className="h-[1px] w-24 bg-white/[0.03]" />
            </div>
            <div className="mt-16 space-y-24">
              {steps.map((step, index) => {
                const slug = step.title.toLowerCase().split(' ')[0];
                const id = slug === 'discovery' ? 'discovery' : 
                           slug === 'iterative' ? 'development' : 
                           slug === 'deployment' ? 'delivery' : slug;
                return (
                  <div key={step.title} id={id} className="relative pl-12 md:pl-0 scroll-mt-32 group">
                    <div className="md:grid md:grid-cols-5 md:gap-12 items-start">
                      <div className="md:col-span-1 md:text-right pt-2 relative">
                        <span className="text-5xl font-bold text-white/10 font-times italic tracking-tighter group-hover:text-brand-gold/20 transition-colors">0{index + 1}</span>
                      </div>
                      <div className="md:col-span-4 pt-4 border-l border-white/5 pl-8 md:pl-12 group-hover:border-brand-gold/20 transition-colors duration-700">
                        <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest group-hover:text-brand-gold transition-colors">{step.title}</h3>
                        <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed font-medium">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-40 text-center relative z-10">
            <div className="inline-block p-10 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white font-times uppercase tracking-[0.2em] mb-6">Execution is Everything</h2>
              <p className="text-slate-400 max-w-2xl mx-auto italic font-medium mb-10 text-sm">
                We work best with serious founders and businesses building real systems.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button as="link" href="/contact" variant="brand">
                  Book a Discovery Call
                </Button>
                <Button as="link" href="/pricing" variant="brand-dark">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
