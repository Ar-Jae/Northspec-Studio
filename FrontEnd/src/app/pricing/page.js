"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { motion } from "framer-motion";
import { faqs } from "../../lib/data";

const pricingPlans = [
  {
    name: "Startup Plan",
    price: "$3,500 – $6,000",
    delivery: "4–6 weeks",
    description: "For founders building an MVP or first production system.",
    includes: [
      "Frontend: up to 6 pages/screens",
      "Basic backend (auth, CRUD, database)",
      "Secure API foundation",
      "Launch-ready architecture",
      "Performance essentials",
      "Documentation & handoff",
    ],
    bestFor: "MVPs • First launch products",
    color: "border-slate-800/50 bg-slate-900/20",
    accent: "group-hover:border-slate-400/30",
    iconColor: "text-slate-400",
  },
  {
    name: "SMB Plan",
    price: "$7,000 – $12,000",
    delivery: "6–8 weeks",
    description: "For businesses replacing manual processes or building reliable tools.",
    includes: [
      "Frontend: up to 8–10 pages/screens",
      "Business-grade backend (roles, logs)",
      "Secure API layer + webhook support",
      "Performance + reliability testing",
      "Integration support (CRM, billing)",
      "Documentation & training",
    ],
    bestFor: "Customer portals • Internal tools",
    color: "border-blue-900/20 bg-blue-900/5",
    accent: "group-hover:border-blue-400/30",
    iconColor: "text-blue-400",
  },
  {
    name: "Mid-Market",
    price: "$12,000 – $25,000",
    delivery: "8–12 weeks",
    description: "For companies needing scalability and structured growth.",
    includes: [
      "Frontend: 12+ pages/app screens",
      "Platform-level backend architecture",
      "Advanced permissions + user roles",
      "Complex integrations",
      "Stability + monitoring setup",
      "Structured QA & testing",
      "Full documentation + training",
    ],
    bestFor: "Growing SaaS • Ops-heavy businesses",
    color: "border-brand-gold/20 bg-brand-gold/5",
    accent: "border-brand-gold/40",
    iconColor: "text-brand-gold",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$25,000+",
    delivery: "12–20+ weeks",
    description: "For organizations requiring governance and robust systems.",
    includes: [
      "Complex app systems & dashboards",
      "Enterprise-grade architecture",
      "Multi-tenant / hierarchical roles",
      "Security & compliance-ready design",
      "Load resilience + performance",
      "Staging + production pipelines",
      "Observability (monitoring, alerts)",
      "Full documentation",
    ],
    bestFor: "Finance • Healthcare • Corporations",
    color: "border-purple-900/20 bg-purple-900/5",
    accent: "group-hover:border-purple-400/30",
    iconColor: "text-purple-400",
  },
];

const retainerPlans = [
  {
    name: "Maintenance & Support",
    price: "From $1,500/mo",
    description: "Ongoing engineering support to keep your systems secure and fast.",
    color: "border-cyan-900/20 bg-cyan-900/5",
    accent: "hover:border-cyan-400/30",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    dotColor: "bg-cyan-400",
    bullets: [
      "Security Patches & Updates",
      "Performance Audits",
      "Bug Fixes & Incident Response",
      "Feature Updates & Iterations"
    ]
  },
  {
    name: "Custom Plans",
    price: "Custom Quote",
    description: "Tailored engineering partnerships for unique business requirements.",
    color: "border-rose-900/20 bg-rose-900/5",
    accent: "hover:border-rose-400/30",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-400/10",
    dotColor: "bg-rose-400",
    bullets: [
      "Dedicated Engineering Teams",
      "Technical Consulting & Strategy",
      "Legacy System Migrations",
      "R&D and Prototyping"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Investment"
                title="Transparent Pricing"
                description="High-performance engineering shouldn't be a black box. We offer clear, project-based pricing and ongoing support plans."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">$$$</div>
            </div>
          </div>

          <StaggerContainer className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <div className={`group relative h-full rounded-3xl border p-8 transition-all duration-300 ${plan.color} ${plan.accent}`}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-8 rounded-full bg-brand-gold px-4 py-1 text-xs font-bold text-brand-dark">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white font-serif">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${plan.iconColor}`}>{plan.price}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400 font-medium uppercase tracking-wider">{plan.delivery} delivery</p>
                  </div>
                  
                  <p className="mb-8 text-sm text-slate-400 leading-relaxed">
                    {plan.description}
                  </p>

                  <ul className="mb-8 space-y-4">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className={`mt-1 ${plan.iconColor}`}>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8 border-t border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Best For</p>
                    <p className="text-xs text-slate-300 italic">{plan.bestFor}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Automation Add-ons */}
          <div className="mt-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white font-serif">Automation Add-Ons (n8n)</h2>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "n8n Setup", price: "$1,500", desc: "Deployment & Security", color: "hover:border-blue-400/30", iconColor: "text-blue-400" },
                { title: "Simple Workflows", price: "$500 each", desc: "Basic data sync", color: "hover:border-cyan-400/30", iconColor: "text-cyan-400" },
                { title: "Advanced Workflows", price: "$900 – $1,200", desc: "Complex logic & APIs", color: "hover:border-brand-gold/30", iconColor: "text-brand-gold" },
                { title: "AI Workflows", price: "$1,500 – $2,500", desc: "LLM integrations", color: "hover:border-purple-400/30", iconColor: "text-purple-400" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors ${item.color}`}
                >
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className={`font-bold mt-1 ${item.iconColor}`}>{item.price}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Retainers Section */}
          <div className="mt-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white font-serif">Ongoing Support & Custom Plans</h2>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {retainerPlans.map((plan) => (
                <motion.div 
                  key={plan.name}
                  whileHover={{ y: -5 }}
                  className={`rounded-3xl border p-10 transition-all ${plan.color} ${plan.accent}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white font-serif">{plan.name}</h3>
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
                    <Button as="link" href="/contact" variant="outline" className="w-full">Inquire About This Plan</Button>
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
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-bold">{item.value}</span>
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

