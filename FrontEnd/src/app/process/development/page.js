"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { motion } from "framer-motion";

export default function DevelopmentPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Process Phase 02"
                title="Iterative Development"
                description="We build in the open. You'll see progress every week through demos, staging deployments, and clear communication."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">02</div>
            </div>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  Building with Velocity
                </h2>
                <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                  Our development process is designed for speed without compromising stability. We use modern tools and best practices to ensure the codebase remains clean and maintainable.
                </p>
              </section>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Weekly Sprints",
                    desc: "Focused blocks of work with clear goals and deliverables every week."
                  },
                  {
                    title: "Staging Environments",
                    desc: "A live preview of the project where you can test features as they are built."
                  },
                  {
                    title: "Code Reviews",
                    desc: "Rigorous internal reviews to ensure security and performance standards."
                  },
                  {
                    title: "Automated Testing",
                    desc: "Unit and integration tests that run on every code change."
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-gold/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sticky top-32">
                <h2 className="text-2xl font-semibold text-white font-serif">Communication Loop</h2>
                <p className="mt-4 text-slate-400">How we stay in sync during the build:</p>
                <ul className="mt-8 space-y-6">
                  {[
                    { title: "Weekly Demos", desc: "A video call or recorded demo showing the latest progress." },
                    { title: "Slack/Discord Access", desc: "Direct access to the engineering team for quick questions." },
                    { title: "Project Dashboard", desc: "Real-time tracking of tasks, milestones, and budget." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-slate-300 group">
                      <span className="flex-none w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-[10px] font-bold group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white font-serif">Deep Work Focus</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    We protect our development time to ensure high-quality output. We respond to all communication within 24 hours.
                  </p>
                  <div className="mt-6">
                    <Button as="link" href="/work" variant="secondary" className="w-full">View Our Work</Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

