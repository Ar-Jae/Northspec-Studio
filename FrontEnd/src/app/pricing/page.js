import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import faqs from "../../content/faqs";

export const metadata = {
  title: "Pricing",
  description: "Clear, scalable pricing aligned to the size of your business.",
};

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
    bestFor: "MVPs • First launch products • Early platforms",
    color: "border-green-500/20 bg-green-500/5",
    tagColor: "text-green-400 bg-green-400/10",
  },
  {
    name: "Small Business / SMB Plan",
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
    bestFor: "Customer portals • Internal tools • Operational platforms",
    color: "border-yellow-500/20 bg-yellow-500/5",
    tagColor: "text-yellow-400 bg-yellow-400/10",
  },
  {
    name: "Mid-Market Plan",
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
    bestFor: "Growing SaaS • Ops-heavy businesses • Workflow platforms",
    color: "border-orange-500/20 bg-orange-500/5",
    tagColor: "text-orange-400 bg-orange-400/10",
  },
  {
    name: "Enterprise Plan",
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
    bestFor: "Finance • Healthcare • Corporations • Enterprise SaaS",
    color: "border-red-500/20 bg-red-500/5",
    tagColor: "text-red-400 bg-red-400/10",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Pricing"
            title="Clear, scalable pricing"
            description="Aligned to the size of your business — with delivery timelines built for quality, stability, and proper testing."
          />

          <StaggerContainer className="mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan) => (
              <StaggerItem
                key={plan.name}
                className={`flex flex-col rounded-3xl border p-8 backdrop-blur-sm ${plan.color}`}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white font-serif">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline text-white">
                    <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-400">Delivery: {plan.delivery}</p>
                  <p className="mt-6 text-sm text-slate-300">{plan.description}</p>
                  <ul className="mt-8 space-y-3 text-sm text-slate-300">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-brand-gold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Best For</p>
                  <p className="mt-2 text-sm text-slate-400">{plan.bestFor}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Automation Add-ons */}
          <FadeIn className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white font-serif">Automation Add-Ons (n8n)</h2>
            <p className="mt-2 text-slate-400">Automation isn’t a feature — it’s infrastructure. We price it separately to keep expectations clear.</p>
            <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StaggerItem>
                <h4 className="font-semibold text-white">n8n Setup</h4>
                <p className="text-brand-gold font-bold">$1,500</p>
                <p className="text-xs text-slate-500 mt-1">Deployment & Security</p>
              </StaggerItem>
              <StaggerItem>
                <h4 className="font-semibold text-white">Simple Workflows</h4>
                <p className="text-brand-gold font-bold">$500 each</p>
                <p className="text-xs text-slate-500 mt-1">Basic data sync</p>
              </StaggerItem>
              <StaggerItem>
                <h4 className="font-semibold text-white">Advanced Workflows</h4>
                <p className="text-brand-gold font-bold">$900 – $1,200 each</p>
                <p className="text-xs text-slate-500 mt-1">Complex logic & APIs</p>
              </StaggerItem>
              <StaggerItem>
                <h4 className="font-semibold text-white">AI Workflows</h4>
                <p className="text-brand-gold font-bold">$1,500 – $2,500 each</p>
                <p className="text-xs text-slate-500 mt-1">LLM integrations</p>
              </StaggerItem>
            </StaggerContainer>
          </FadeIn>

          {/* Priority Delivery */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <FadeIn direction="right" className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white font-serif">Priority Delivery</h2>
              <p className="mt-4 text-slate-300">
                For teams with critical deadlines, we offer Priority Delivery as a premium scheduling option. 
                It guarantees earlier delivery windows, dedicated capacity, and accelerated execution.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-slate-400">Accelerated (~25% faster)</span>
                  <span className="text-white font-bold">+30%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-slate-400">Priority (~40% faster)</span>
                  <span className="text-white font-bold">+50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Emergency (Mission Critical)</span>
                  <span className="text-white font-bold">+100%</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white font-serif">Why Our Pricing Works This Way</h2>
              <div className="mt-6 space-y-6 text-sm text-slate-300">
                <p>
                  <strong className="text-white block mb-1">Quality Over Speed</strong>
                  Fast is impressive. Stable is profitable. Our timelines allow for proper planning, careful development, and real testing.
                </p>
                <p>
                  <strong className="text-white block mb-1">Engineering for Your Stage</strong>
                  A startup needs momentum; an enterprise needs governance. Pricing by maturity ensures you don’t overpay or underbuild.
                </p>
                <p>
                  <strong className="text-white block mb-1">Transparent & Predictable</strong>
                  Every project is defined clearly before development begins. No hidden charges, no surprises.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <FadeIn>
              <h2 className="text-3xl font-semibold text-white font-serif text-center">Pricing FAQ</h2>
            </FadeIn>
            <StaggerContainer className="mt-12 grid gap-8 lg:grid-cols-2">
              {faqs.map((faq) => (
                <StaggerItem key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-2xl font-semibold text-white font-serif">Ready to build something durable?</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              We don’t compete on being the cheapest. We compete on being the team you don’t need to replace later.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button as="link" href="/contact" variant="brand">
                Book a Discovery Call
              </Button>
              <Button as="link" href="/work" variant="secondary">
                View Case Studies
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
