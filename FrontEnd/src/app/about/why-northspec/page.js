"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../../components/animations/Stagger";
import { motion } from "framer-motion";

const values = [
  {
    title: "Senior-Only Execution",
    description: "We don't have junior developers or account managers. When you hire us, you work directly with the engineers building your system. This eliminates communication overhead and ensures every line of code meets senior standards.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Fixed-Scope Pricing",
    description: "Open-ended billing is a conflict of interest. We define clear deliverables, timelines, and fixed pricing upfront. You know exactly what you're getting and exactly what it will cost before we write a single line of code.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Durable Architecture",
    description: "We build for the 'future you'. Our systems are documented, tested, and architected to be maintainable. We don't just ship features; we ship assets that your team can own and scale for years.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

const comparisons = [
  {
    feature: "Communication",
    traditional: "Account Managers & Tickets",
    northspec: "Direct Engineer Access (Slack/Discord)",
    highlight: true
  },
  {
    feature: "Pricing",
    traditional: "Hourly / Estimated",
    northspec: "Fixed-Scope / Value-Based",
    highlight: false
  },
  {
    feature: "Code Quality",
    traditional: "Ship fast, fix later",
    northspec: "Automated testing & Documentation",
    highlight: true
  },
  {
    feature: "Team",
    traditional: "Junior-heavy / Outsourced",
    northspec: "100% Senior / In-house",
    highlight: false
  }
];

export default function WhyNorthspecPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Our Philosophy"
                title="Why Northspec"
                description="We aren't just another agency. We are an engineering partner focused on durability, transparency, and senior-level execution."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">SPEC</div>
            </div>
          </div>

          {/* Core Values Grid */}
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-brand-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif">{value.title}</h3>
                  <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* The "No-BS" Section */}
          <div className="mt-32 grid gap-16 lg:grid-cols-2 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl font-bold text-white font-serif leading-tight">
                The "No-BS" Approach to <span className="text-brand-gold">Software Engineering</span>
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed">
                Most agencies are built to maximize billable hours. We are built to maximize project success. 
                We don't use fluff, we don't hide behind account managers, and we don't over-complicate things to justify a higher price.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  "We say 'no' to features that don't add value.",
                  "We prioritize stability over 'shiny' new tech.",
                  "We provide weekly demos, not monthly reports.",
                  "We deliver code that your team can actually read."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn direction="right" className="relative">
              <div className="absolute -inset-4 bg-brand-gold/5 blur-3xl rounded-full" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                </div>
                <p className="text-xl text-white font-serif italic leading-relaxed relative z-10">
                  "Northspec isn't just a vendor; they are an extension of our engineering team. They care as much about the architecture as we do."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20" />
                  <div>
                    <p className="text-white font-bold text-sm">Technical Director</p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest">Series B Fintech</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Comparison Table */}
          <div className="mt-32">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white font-serif">How we compare</h2>
                <p className="mt-4 text-slate-400">A side-by-side look at the Northspec difference.</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-6 px-4 text-slate-500 text-xs uppercase tracking-widest font-bold">Feature</th>
                      <th className="py-6 px-4 text-slate-500 text-xs uppercase tracking-widest font-bold">Traditional Agency</th>
                      <th className="py-6 px-4 text-brand-gold text-xs uppercase tracking-widest font-bold">Northspec Studio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-4 text-white font-medium">{row.feature}</td>
                        <td className="py-6 px-4 text-slate-400 text-sm">{row.traditional}</td>
                        <td className={`py-6 px-4 text-sm font-bold ${row.highlight ? 'text-brand-gold' : 'text-white'}`}>
                          {row.northspec}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>

          {/* What we don't do & Tech Stack */}
          <div className="mt-32 grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left" className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <h3 className="text-2xl font-bold text-white font-serif mb-6">What we don't do</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                To maintain our quality standards, we are very specific about the work we take on. We are not a 'catch-all' shop.
              </p>
              <ul className="space-y-4">
                {[
                  "Low-budget, template-based websites",
                  "Marketing-only projects without technical depth",
                  "Junior-level staff augmentation",
                  "Fixed-price projects with undefined scope",
                  "Working without automated testing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="text-red-500/50">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="right" className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-10">
              <h3 className="text-2xl font-bold text-white font-serif mb-6">Our Tech Stack</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                We specialize in modern, scalable technologies that allow for rapid development without sacrificing performance or security.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-3">Frontend</h4>
                  <ul className="space-y-1 text-slate-300 text-xs">
                    <li>Next.js 15</li>
                    <li>React / TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-3">Backend</h4>
                  <ul className="space-y-1 text-slate-300 text-xs">
                    <li>Node.js / Express</li>
                    <li>Python / FastAPI</li>
                    <li>PostgreSQL / MongoDB</li>
                    <li>Redis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-3">Automation</h4>
                  <ul className="space-y-1 text-slate-300 text-xs">
                    <li>n8n / Zapier</li>
                    <li>Custom Webhooks</li>
                    <li>AI Integration</li>
                    <li>Plaid API</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-brand-gold text-[10px] uppercase tracking-widest font-bold mb-3">Infrastructure</h4>
                  <ul className="space-y-1 text-slate-300 text-xs">
                    <li>AWS / Vercel</li>
                    <li>Docker</li>
                    <li>GitHub Actions</li>
                    <li>Terraform</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Final CTA */}
          <div className="mt-32 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white font-serif mb-8">Ready to build something durable?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button as="link" href="/book" variant="brand" className="px-8 py-4">
                  Book a Strategy Call
                </Button>
                <Button as="link" href="/contact" variant="outline" className="px-8 py-4">
                  Start a Project
                </Button>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
