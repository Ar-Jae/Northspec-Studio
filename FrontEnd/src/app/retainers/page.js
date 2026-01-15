"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { motion } from "framer-motion";

const retainerPlans = [
  {
    name: "Startup Retainer",
    price: "$1,500 / month",
    description: "For founders who need steady support post-launch.",
    includes: [
      "Up to 8 hrs/month of development",
      "Bug fixes + stability support",
      "Minor feature updates",
      "Performance + basic monitoring",
      "Workflow health checks",
      "Email support",
      "72-hour response SLA",
    ],
    bestFor: "MVPs • Early teams",
    color: "border-slate-800/50 bg-slate-900/20",
    accent: "group-hover:border-slate-400/30",
    iconColor: "text-slate-400",
  },
  {
    name: "SMB Retainer",
    price: "$3,000 / month",
    description: "For businesses running operations through their platform.",
    includes: [
      "Up to 15 hrs/month",
      "Enhancements & new features",
      "Reliability + optimization work",
      "Integration adjustments",
      "Security + dependency updates",
      "Monthly automation review",
      "Priority support (48-hour SLA)",
    ],
    bestFor: "Internal tools • Portals",
    color: "border-blue-900/20 bg-blue-900/5",
    accent: "group-hover:border-blue-400/30",
    iconColor: "text-blue-400",
  },
  {
    name: "Mid-Market",
    price: "$5,000 / month",
    description: "For companies scaling systems and automation.",
    includes: [
      "Up to 30 hrs/month",
      "Structured rollout support",
      "Advanced integrations",
      "Dedicated roadmap collaboration",
      "Monitoring & stability setup",
      "Active automation refinement",
      "24-hour response SLA",
    ],
    bestFor: "Scaling SaaS • Ops platforms",
    color: "border-brand-gold/20 bg-brand-gold/5",
    accent: "border-brand-gold/40",
    iconColor: "text-brand-gold",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$10,000 / month",
    description: "For organizations requiring governance and strategic partnership.",
    includes: [
      "Dedicated engineering allocation",
      "Change management",
      "Compliance + security support",
      "Structured QA cycles",
      "Monitoring + alerts + stability",
      "Disaster recovery planning",
      "12–24 hour SLA",
    ],
    bestFor: "Finance • Healthcare • Enterprise",
    color: "border-purple-900/20 bg-purple-900/5",
    accent: "group-hover:border-purple-400/30",
    iconColor: "text-purple-400",
  },
];

export default function RetainersPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Ongoing Support"
                title="Retainer Plans"
                description="Software isn't static. Our retainers provide the ongoing engineering support needed to keep your systems secure, fast, and up-to-date."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">24/7</div>
            </div>
          </div>

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

                  <div className="mt-auto pt-8 border-t border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Best For</p>
                    <p className="text-xs text-slate-300 italic">{plan.bestFor}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-32 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white font-serif">Why a Retainer?</h2>
              <p className="text-slate-400 leading-relaxed">
                Once your platform is live, your business doesn’t stop evolving - and neither should your system. 
                Our retainers provide ongoing development, stability, and peace of mind so your platform continues to perform.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Priority Access", desc: "Guaranteed engineering capacity every month." },
                  { title: "Faster Response", desc: "Dedicated SLAs for bug fixes and support." },
                  { title: "Continuous Improvement", desc: "Regular updates and performance tuning." },
                  { title: "Predictable Costs", desc: "Fixed monthly investment for ongoing needs." }
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
                  "R&D and Prototyping"
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
