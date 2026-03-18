"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { motion } from "framer-motion";
import { faqs } from "../../lib/data";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

const pricingPlans = [
  {
    name: "MVP & Early Product Builds",
    price: "Starting at $8,000",
    range: "Most projects: $12,000 – $30,000+",
    delivery: "6–8 weeks",
    description: "For teams validating and launching initial products. Designed to support initial user acquisition.",
    includes: [
      "Frontend: up to 6 screens",
      "Backend: auth, CRUD, database",
      "Secure API foundation",
      "Launch-ready architecture",
      "Performance essentials",
      "Documentation & handoff",
    ],
    color: "border-slate-800/50 bg-white/5",
    accent: "group-hover:border-slate-400/30 group-hover:bg-brand-gold/5",
    iconColor: "text-slate-400",
  },
  {
    name: "Growth Systems & Business Tools",
    price: "Starting at $15,000",
    range: "Most projects: $20,000 – $50,000+",
    delivery: "8–12 weeks",
    description: "For businesses replacing manual processes and building operational systems. Built to reduce overhead and improve efficiency.",
    includes: [
      "8–10 screens",
      "Role-based backend systems",
      "API + webhook integrations",
      "CRM / billing integrations",
      "Reliability + performance testing",
      "Documentation & training",
    ],
    color: "border-blue-900/20 bg-white/5",
    accent: "group-hover:border-blue-400/30 group-hover:bg-brand-gold/5",
    iconColor: "text-blue-400",
  },
  {
    name: "Scalable Platforms & SaaS",
    price: "Starting at $30,000",
    range: "Most projects: $40,000 – $90,000+",
    delivery: "10–16 weeks",
    description: "For companies building scalable, revenue-generating platforms. Engineered for scale, performance, and growth.",
    includes: [
      "12+ screens",
      "Platform-level backend",
      "Advanced roles & permissions",
      "Complex integrations",
      "Monitoring + system stability",
      "Full QA + documentation",
    ],
    color: "border-brand-gold/20 bg-white/5",
    accent: "group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10",
    iconColor: "text-brand-gold",
    popular: true,
  },
  {
    name: "Enterprise Systems",
    price: "Starting at $60,000+",
    range: "Custom quote required",
    delivery: "16–24+ weeks",
    description: "For organizations requiring high-performance, secure, and scalable systems built for long-term operational demand.",
    includes: [
      "Multi-system architecture",
      "Enterprise-grade backend",
      "Multi-tenant systems",
      "Security & compliance",
      "Observability + alerting",
      "CI/CD pipelines",
    ],
    color: "border-purple-900/20 bg-white/5",
    accent: "group-hover:border-purple-400/30 group-hover:bg-brand-gold/5",
    iconColor: "text-purple-400",
    custom: true,
  },
];

const ongoingPlans = [
  {
    layer: "Layer 01 — Service Layer",
    name: "Retainer Plans",
    price: "From $3,000/mo",
    description: "Ongoing product growth and reliability — not just support. Guaranteed engineering capacity with defined SLAs and minimum commitments.",
    color: "border-white/10 bg-white/5",
    accent: "hover:border-brand-gold/30 hover:bg-brand-gold/5",
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/10",
    dotColor: "bg-brand-gold",
    bullets: [
      "Code Maintenance",
      "Feature Updates",
      "Bug Fixes & Incident Response",
      "Dev Support",
    ],
    href: "/retainers",
  },
  {
    layer: "Layer 02 — Infrastructure Layer",
    name: "Managed Infrastructure",
    price: "From $750/mo",
    description: "The environment your system lives in. Dedicated deployment, AI workload scaling, performance optimization, monitoring, security, and backups.",
    color: "border-white/10 bg-white/5",
    accent: "hover:border-brand-gold/30 hover:bg-brand-gold/5",
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/10",
    dotColor: "bg-brand-gold",
    bullets: [
      "Dedicated Deployment Environment",
      "AI Workload Scaling",
      "Performance Optimization",
      "Monitoring, Security & Backups",
    ],
    href: "/retainers",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Investment"
                title="Guided Pricing"
                description="We show you real starting points and typical ranges — enough to know if we're the right fit, without boxing either side into a number before we understand your scope."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-times select-none uppercase">RATE</div>
            </div>
          </div>

          <div className="mt-12 mb-8 grid gap-4 sm:grid-cols-3 not-italic font-sans text-sm">
            {[
              { label: "App & AI Development", anchor: "Projects typically start at $8,000+" },
              { label: "Managed Retainer", anchor: "Starts at $3,000 / month" },
              { label: "Managed Infrastructure", anchor: "Starts at $750 / month + usage" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2">{item.label}</p>
                <p className="text-slate-300 font-medium">{item.anchor}</p>
              </div>
            ))}
          </div>

          <StaggerContainer className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name} className="pt-6">
                <div className={`group relative h-full rounded-2xl border border-white/5 p-10 backdrop-blur-xl transition-all duration-500 ${plan.accent}`}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.02] font-times select-none italic tracking-tighter uppercase leading-none group-hover:text-white/[0.04] transition-all duration-700">PLAN</div>
                  </div>
                  {plan.popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-brand-gold px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-brand-dark z-20">
                      Standard Issue
                    </span>
                  )}
                  {plan.custom && (
                    <span className="absolute -top-3 left-8 rounded-full bg-white/10 border border-white/20 px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-slate-300 z-20">
                      Custom Quote
                    </span>
                  )}
                  <div className="mb-8 relative z-10">
                    <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] font-times mb-2">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white font-times tracking-tight">{plan.price}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">{plan.range}</p>
                    <p className="mt-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-none">{plan.delivery} DELIVERY</p>
                  </div>
                  
                  <p className="mb-8 text-sm text-slate-400 leading-relaxed relative z-10 font-medium italic">
                    {plan.description}
                  </p>

                  <ul className="mb-8 space-y-4 relative z-10">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-xs text-slate-300">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-gold/60 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <p className="mt-8 text-center text-xs text-slate-600 font-medium relative z-10">
            All pricing is tailored based on scope, system complexity, integrations, and infrastructure requirements.
          </p>

          <div className="mt-32 relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white font-times uppercase tracking-widest">Automation Add-Ons</h2>
              <div className="h-[1px] flex-grow bg-white/[0.03]" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "n8n Workflow Setup", price: "From $3,000", desc: "Typically $3,000 – $8,000", color: "hover:border-brand-gold/30 hover:bg-brand-gold/5", iconColor: "text-brand-gold" },
                { title: "Core Automation Systems", price: "From $1,000", desc: "Typically $1,000 – $2,500", color: "hover:border-brand-gold/30 hover:bg-brand-gold/5", iconColor: "text-brand-gold" },
                { title: "Advanced Workflow Systems", price: "From $3,000", desc: "Typically $3,000 – $10,000", color: "hover:border-brand-gold/30 hover:bg-brand-gold/5", iconColor: "text-brand-gold" },
                { title: "AI-Driven Automation", price: "From $5,000", desc: "Typically $5,000 – $15,000+", color: "hover:border-brand-gold/30 hover:bg-brand-gold/5", iconColor: "text-brand-gold" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 group hover:border-brand-gold/20"
                >
                  <h4 className="font-bold text-white font-times uppercase tracking-widest text-xs group-hover:text-brand-gold transition-colors">{item.title}</h4>
                  <p className="font-bold mt-4 text-2xl text-white font-times">{item.price}</p>
                  <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Retainers Section */}
          <div className="mt-32 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-white font-times">Ongoing Support & Managed Infrastructure</h2>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <div className="mb-12 flex items-start gap-4 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
              <svg className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-brand-gold font-semibold">Northspec-hosted clients only.</span> Retainer plans are available exclusively to clients whose systems run on Northspec infrastructure. Direct access to your environment is what makes proactive monitoring and automatic fixes possible. Clients who self-host are not eligible — future support requires a new engagement.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {ongoingPlans.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -5 }}
                  className={`rounded-3xl border p-10 transition-all backdrop-blur-sm ${plan.color} ${plan.accent}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{plan.layer}</p>
                      <h3 className="text-2xl font-bold text-white font-times uppercase tracking-wide">{plan.name}</h3>
                      <p className={`font-semibold mt-1 ${plan.iconColor}`}>{plan.price}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${plan.iconBg} ${plan.iconColor}`}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-slate-400 mb-8">{plan.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {plan.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${plan.dotColor}`} />
                        {bullet}
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Button as="link" href={plan.href} variant="outline" className="w-full">View Plans</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Priority Delivery */}
          <div className="mt-32 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white font-serif">Priority Delivery</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                For teams with critical deadlines, we offer Priority Delivery as a premium scheduling option. 
                It guarantees earlier delivery windows, dedicated capacity, and accelerated execution.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: "Accelerated (~25% faster)", value: "+30%" },
                  { label: "Priority (~40% faster)", value: "+50%" },
                  { label: "Emergency (Mission Critical)", value: "+100%" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center  pb-4 last:border-0 hover:bg-white/5 transition-colors p-2 rounded-lg">
                    <span className="text-slate-400 font-times uppercase tracking-widest text-xs">{item.label}</span>
                    <span className="text-white font-bold font-times">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white font-serif">Why Our Pricing Works</h2>
              <div className="mt-8 space-y-8">
                {[
                  { title: "Quality Over Speed", desc: "Fast is impressive. Stable is profitable. Our timelines allow for proper planning and real testing." },
                  { title: "Engineering for Your Stage", desc: "A startup needs momentum; an enterprise needs governance. Pricing by maturity ensures you don’t overpay." },
                  { title: "Transparent & Predictable", desc: "Every project is defined clearly before development begins. No hidden charges, no surprises." }
                ].map((item, i) => (
                  <div key={i}>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white font-serif">Frequently Asked Questions</h2>
              <p className="mt-4 text-slate-400">Everything you need to know about our process and pricing.</p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-white/10 bg-white/5 p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-slate-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-32 rounded-3xl bg-brand-gold p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark font-serif">Ready to build something durable?</h2>
            <p className="mt-4 text-brand-dark/80 max-w-2xl mx-auto">
              Schedule a free technical consultation to discuss your project requirements and get a detailed proposal.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button as="link" href="/contact" variant="brand-dark">Start Your Project</Button>
              <Button as="link" href="/built-to-spec" variant="outline-dark">Built to Spec. Built to Last. Method</Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

