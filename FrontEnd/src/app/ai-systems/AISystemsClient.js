"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroSection from "../../components/HeroSection";
import Button from "../../components/Button";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-brand-gold" />
      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">
        {children}
      </span>
    </div>
  );
}

function SplitReveal({ text, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.2em] mr-[0.3em]">
          <motion.span
            className="inline-block -mb-[0.2em]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function AISystemsClient() {
  return (
    <div className="bg-brand-dark text-white relative min-h-screen">
      <BackgroundCanvasClient />
      
      {/* Hero */}
      <HeroSection
        label="Autonomous Systems"
        headline="AI Systems That Automate"
        accent="And Scale Your Business."
        subheading="We implement AI-powered workflows, automation systems, and custom applications that reduce manual work and help businesses operate more efficiently."
      >
        <Button as="link" href="/contact" variant="brand" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">Start Automating</Button>
        <Button as="link" href="#solutions" variant="outline" className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold">View Solutions</Button>
      </HeroSection>

      {/* Big Promise Section */}
      <section className="py-24 px-6 md:px-36 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-3xl font-serif text-brand-gold mb-2">Automate 70%</h3>
              <p className="text-slate-400 text-sm">of repetitive operational workflows within 30 days.</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-brand-gold mb-2">Never Miss</h3>
              <p className="text-slate-400 text-sm">a customer call or lead with an AI Voice Receptionist.</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-brand-gold mb-2">Scale Fast</h3>
              <p className="text-slate-400 text-sm">without increasing headcount or training costs.</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-brand-gold mb-2">Zero Overhead</h3>
              <p className="text-slate-400 text-sm">manual data entry, scheduling, and admin work eliminated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions */}
      <section id="solutions" className="py-32 px-6 md:px-36">
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel>Core Solutions</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-16">Custom AI Implementation.</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Receptionist */}
            <div id="receptionist" className="group p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8">
                <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">AI Voice Receptionist</h3>
              <p className="text-slate-400 mb-8 italic">Available 24/7. Answers in your voice. Books meetings directly into your CRM.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>24/7 Availability</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>Multi-lingual Support</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>Instant CRM Integration</span>
                </li>
              </ul>
              <Button as="link" href="/ai-systems/ai-receptionist" variant="outline" className="w-full text-xs py-3 rounded-xl border-white/10 hover:border-brand-gold/50">Details</Button>
            </div>

            {/* Workflow Automation */}
            <div id="workflows" className="group p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8">
                <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Workflow Automation</h3>
              <p className="text-slate-400 mb-8 italic">End-to-end business process automation using n8n and custom AI logic.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>n8n/Zapier Architectures</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>Slack/Discord/Email Bots</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>Data Ingestion & Cleaning</span>
                </li>
              </ul>
              <Button as="link" href="/ai-systems/workflow-automation" variant="outline" className="w-full text-xs py-3 rounded-xl border-white/10 hover:border-brand-gold/50">Details</Button>
            </div>
          </div>
        </div>
      </section>

      {/* All AI Services */}
      <section className="py-28 px-6 md:px-36 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel>All AI Services</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Every Way We Automate.</h2>
          <p className="text-slate-400 italic mb-16 max-w-2xl">
            From voice AI to full workflow automation. every service designed to reduce manual work and scale your operations.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                href: "/ai-systems/workflow-automation",
                title: "Workflow Automation",
                desc: "Eliminate manual work and reduce operational overhead with custom n8n automation systems.",
                bullets: ["Multi-step workflow automation", "AI-assisted processing", "Trigger-based pipelines", "CRM & ops automation"],
              },
              {
                href: "/ai-systems/integrations",
                title: "AI Integrations",
                desc: "Connect your tools and eliminate data silos. Make your existing systems work intelligently together.",
                bullets: ["API integrations", "Data sync between platforms", "Webhook & event systems", "Third-party connector builds"],
              },
              {
                href: "/ai-systems/maintenance-support",
                title: "AI Optimization & Support",
                desc: "Keep your AI systems running, accurate, and continuously improving after deployment.",
                bullets: ["Performance tuning & monitoring", "Prompt & model refinement", "Reliability & uptime support", "System updates & scaling"],
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <a
                  href={s.href}
                  className="group flex flex-col h-full p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-gold/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-400 italic mb-6 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-2 mt-auto mb-6">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-brand-gold/60 mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] flex items-center gap-2">
                    Learn More <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-36 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic">Ready to automate your business?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Book a consultation to see how our AI systems can replace manual work 
            and scale your operations starting this month.
          </p>
          <Button as="link" href="/contact" variant="brand" className="rounded-full px-12 py-5 text-lg">
            Schedule a Strategy Session
          </Button>
        </div>
      </section>
    </div>
  );
}

