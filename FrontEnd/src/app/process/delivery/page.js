"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { motion } from "framer-motion";

export default function DeliveryPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Process Phase 03"
                title="Deployment & Handoff"
                description="We don't just ship code; we deliver durable systems. Our delivery phase ensures a smooth transition to production and full ownership for your team."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">03</div>
            </div>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  Production Ready
                </h2>
                <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                  Before any system goes live, it undergoes a rigorous final audit. We ensure that the infrastructure is secure, the performance is optimized, and the documentation is complete.
                </p>
              </section>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Final QA Audit",
                    desc: "End-to-end testing of all critical paths and edge cases."
                  },
                  {
                    title: "Performance Tuning",
                    desc: "Optimizing database queries, assets, and server response times."
                  },
                  {
                    title: "Security Hardening",
                    desc: "Final security sweep and environment variable audit."
                  },
                  {
                    title: "Production Launch",
                    desc: "Managed deployment to your production infrastructure."
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
                <h2 className="text-2xl font-semibold text-white font-serif">The Handoff Package</h2>
                <p className="mt-4 text-slate-400">Once the project is complete, you own everything. We provide:</p>
                <ul className="mt-8 space-y-6">
                  {[
                    { title: "Full Source Code", desc: "Clean, documented code in your private repository." },
                    { title: "Technical Documentation", desc: "API docs, system diagrams, and deployment guides." },
                    { title: "Admin Training", desc: "A walkthrough of the system for your team." },
                    { title: "30-Day Warranty", desc: "Post-launch support for any bugs or technical issues." }
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
                  <h3 className="text-lg font-semibold text-white font-serif">Ongoing Support</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Need long-term maintenance? We offer retainer plans to keep your system running smoothly.
                  </p>
                  <div className="mt-6">
                    <Button as="link" href="/retainers" variant="brand" className="w-full">View Retainer Plans</Button>
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

