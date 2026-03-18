"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

const retainerPlans = [
  {
    name: "Starter Support",
    price: "$3,000 – $5,000 / month",
    description: "Ongoing product reliability and stability for early-stage systems that need to stay live and healthy.",
    includes: [
      "Bug fixes + minor updates",
      "Basic monitoring & alerting",
      "Small feature tweaks",
      "Email / Slack support",
      "72-hour response SLA",
      "3-month minimum commitment",
    ],
    color: "border-slate-800/50 bg-slate-900/20",
    accent: "group-hover:border-slate-400/30",
    iconColor: "text-slate-400",
  },
  {
    name: "Growth Partner",
    price: "$4,000 – $7,000 / month",
    description: "Continuous product growth and reliability for operational platforms with evolving requirements.",
    includes: [
      "Ongoing feature development",
      "Performance improvements",
      "Integrations + automation work",
      "Security + dependency updates",
      "Priority support (48-hour SLA)",
      "3-month minimum commitment",
    ],
    color: "border-blue-900/20 bg-blue-900/5",
    accent: "group-hover:border-blue-400/30",
    iconColor: "text-blue-400",
    popular: true,
  },
  {
    name: "Product Partner",
    price: "$8,000 – $15,000 / month",
    description: "Dedicated engineering capacity with strategic input — we become a core part of your product team.",
    includes: [
      "Dedicated dev capacity",
      "Continuous product iteration",
      "Strategic roadmap collaboration",
      "Fast turnaround + priority queue",
      "24-hour response SLA",
      "3-month minimum commitment",
    ],
    color: "border-brand-gold/20 bg-brand-gold/5",
    accent: "border-brand-gold/40",
    iconColor: "text-brand-gold",
  },
  {
    name: "Dedicated Team",
    price: "$12,000 – $25,000+ / month",
    description: "Near full-time team access for organizations scaling high-performance systems and infrastructure.",
    includes: [
      "Dev + QA coverage",
      "Scaling infrastructure management",
      "Change management",
      "Compliance + security support",
      "Disaster recovery planning",
      "12–24 hour SLA",
      "6-month minimum commitment",
    ],
    color: "border-purple-900/20 bg-purple-900/5",
    accent: "group-hover:border-purple-400/30",
    iconColor: "text-purple-400",
  },
];

const hostingPlans = [
  {
    name: "Starter",
    price: "From $750 / mo + usage",
    description: "A dedicated deployment environment for early-stage products that need a solid, secure foundation.",
    includes: [
      "Dedicated deployment environment",
      "Performance optimization baseline",
      "Uptime monitoring",
      "Security hardening",
      "Weekly backups",
    ],
    color: "border-slate-800/50 bg-slate-900/20",
    accent: "group-hover:border-slate-400/30",
    iconColor: "text-slate-400",
  },
  {
    name: "Growth",
    price: "From $1,200 / mo + usage",
    description: "Production-grade infrastructure for apps under real load with growing operational demands.",
    includes: [
      "Dedicated deployment environment",
      "Performance optimization",
      "Uptime monitoring + alerting",
      "Security & automated backups",
      "Scaling support",
    ],
    color: "border-blue-900/20 bg-blue-900/5",
    accent: "group-hover:border-blue-400/30",
    iconColor: "text-blue-400",
  },
  {
    name: "Scale",
    price: "From $2,000 / mo + usage",
    description: "Built for platforms running AI workloads, high traffic, and complex infrastructure at scale.",
    includes: [
      "Dedicated deployment environment",
      "AI workload scaling",
      "Advanced performance optimization",
      "Real-time monitoring & uptime",
      "Security, backups & recovery",
    ],
    color: "border-brand-gold/20 bg-brand-gold/5",
    accent: "border-brand-gold/40",
    iconColor: "text-brand-gold",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Mission-critical infrastructure for organizations requiring compliance, multi-region, and dedicated capacity.",
    includes: [
      "Dedicated deployment environment",
      "Multi-region deployment",
      "AI workload scaling",
      "Advanced performance optimization",
      "Real-time monitoring & on-call",
      "Security, compliance & disaster recovery",
    ],
    color: "border-purple-900/20 bg-purple-900/5",
    accent: "group-hover:border-purple-400/30",
    iconColor: "text-purple-400",
  },
];

function LayerHeader({ label, title, description }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.25em] font-times">{label}</span>
        <div className="h-[1px] flex-grow bg-white/[0.05]" />
      </div>
      <h2 className="text-3xl font-bold text-white font-serif">{title}</h2>
      <p className="mt-3 text-slate-400 max-w-2xl leading-relaxed">{description}</p>
    </div>
  );
}

export default function RetainersPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Ongoing Support"
                title="Retainer & Hosting Plans"
                description="Two layers. One outcome: your product grows, performs, and stays live. The service layer is your engineering team. The infrastructure layer is the environment it runs on."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">24/7</div>
            </div>
          </div>

          {/* Two-layer explainer */}
          <div className="mb-16 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Layer 01</p>
              <h3 className="text-white font-bold font-serif text-lg mb-2">Retainer — Service Layer</h3>
              <p className="text-sm text-slate-400 leading-relaxed">What we do for your system each month. Code maintenance, feature updates, bug fixes, and dev support.</p>
            </div>
            <div className="rounded-2xl border border-brand-gold/10 bg-brand-gold/[0.02] p-6 backdrop-blur-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Layer 02</p>
              <h3 className="text-white font-bold font-serif text-lg mb-2">Managed Infrastructure — Infrastructure Layer</h3>
              <p className="text-sm text-slate-400 leading-relaxed">The environment your system lives in. Dedicated deployment, AI workload scaling, performance optimization, monitoring, security, and backups.</p>
            </div>
          </div>

          {/* Eligibility banner */}
          <div className="mb-16 rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold font-serif uppercase tracking-widest text-sm mb-2">Northspec-Hosted Clients Only</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Both layers are available exclusively to clients whose systems are hosted on Northspec infrastructure. Direct access to your environment is what makes proactive monitoring, automatic fixes, and managed scaling possible. Clients who opted for self-hosting at delivery are not eligible — any future support requires a new engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Layer 1 — Retainer */}
          <LayerHeader
            label="Layer 01 — Service Layer"
            title="Retainer Plans"
            description="Ongoing product growth and reliability — not just support. Guaranteed engineering capacity each month with defined SLAs and minimum commitments that protect your roadmap and ours."
          />
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {retainerPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <div className={`group relative h-full rounded-3xl border p-8 transition-all duration-300 ${plan.color} ${plan.accent}`}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-8 rounded-full bg-brand-gold px-4 py-1 text-xs font-bold text-brand-dark">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-8">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Retainer</p>
                    <h3 className="text-xl font-bold text-white font-serif">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${plan.iconColor}`}>{plan.price}</span>
                    </div>
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

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Layer 2 — Managed Infrastructure */}
          <div className="mt-32">
            <LayerHeader
              label="Layer 02 — Infrastructure Layer"
              title="Managed Infrastructure"
              description="The environment your system lives in. Northspec manages your dedicated deployment environment, performance optimization, AI workload scaling, monitoring, security, and backups — so you never have to think about it."
            />
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {hostingPlans.map((plan) => (
                <StaggerItem key={plan.name}>
                  <div className={`group relative h-full rounded-3xl border p-8 transition-all duration-300 ${plan.color} ${plan.accent}`}>
                    {plan.popular && (
                      <span className="absolute -top-4 left-8 rounded-full bg-brand-gold px-4 py-1 text-xs font-bold text-brand-dark">
                        Most Popular
                      </span>
                    )}
                    <div className="mb-8">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Managed Infrastructure</p>
                      <h3 className="text-xl font-bold text-white font-serif">{plan.name}</h3>
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${plan.iconColor}`}>{plan.price}</span>
                      </div>
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

                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Policies */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <h4 className="text-white font-bold font-serif uppercase tracking-widest text-xs mb-3">Non-Payment Policy</h4>
              <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
                <li><span className="text-white font-semibold">30 days past due:</span> All hosted services are suspended. No data is deleted. Services restore upon full payment.</li>
                <li><span className="text-white font-semibold">90 days past due:</span> All client data is permanently removed from Northspec infrastructure. This is irreversible.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <h4 className="text-white font-bold font-serif uppercase tracking-widest text-xs mb-3">Cancellation</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Both retainer and hosting agreements require 30 days written notice to cancel. Fees for the current billing period are non-refundable. Unused hours do not carry over or convert to credit.
              </p>
            </div>
          </div>

          {/* Why both layers */}
          <div className="mt-32 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white font-serif">Why Two Layers?</h2>
              <p className="text-slate-400 leading-relaxed">
                Separating service and infrastructure gives you clarity on exactly what you're paying for — and the flexibility to right-size each independently as your business scales. One client at $6K/month is $72K/year. That's a real business.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Clear Cost Ownership", desc: "Know exactly what's engineering and what's infrastructure." },
                  { title: "Independent Scaling", desc: "Scale compute without changing your dev support tier." },
                  { title: "Faster Incident Response", desc: "Northspec owns the infrastructure, so fixes happen without coordination delays." },
                  { title: "Predictable Monthly Total", desc: "Fixed pricing across both layers — no billing surprises, no hourly guesswork." },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white font-serif">Custom Engineering Partnerships</h2>
              <p className="mt-4 text-slate-400">
                Need something more specialized? We design custom engineering partnerships for organizations with unique requirements.
              </p>
              <ul className="mt-8 space-y-6">
                {[
                  "Dedicated Engineering Teams",
                  "Technical Consulting & Strategy",
                  "Legacy System Migrations",
                  "R&D and Prototyping",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-brand-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button as="link" href="/contact" variant="brand" className="w-full">Inquire About Custom Plans</Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
