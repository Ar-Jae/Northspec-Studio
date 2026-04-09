import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Refund & Cancellation Policy | Northspec Studio",
  description:
    "Northspec Studio's refund and cancellation policy for project engagements and retainer plans. Due to the nature of custom development, payments are generally non-refundable once work has begun.",
  openGraph: {
    title: "Refund & Cancellation Policy | Northspec Studio",
    description:
      "How refunds, cancellations, deposits, and retainer payments are handled for all Northspec Studio engagements.",
    url: "/refund-policy",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "core-position",
    title: "Core Position",
    content: (
      <>
        <p>
          Northspec Studio provides highly specialized, custom engineering services including AI system implementation and automated workflow orchestration. Because our work involves immediate allocation of expert engineering capacity and architectural planning, our refund policy is firm.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5 not-italic">
          <p className="text-sm text-white font-bold font-times leading-relaxed underline">
            All payments are non-refundable once work has begun.
          </p>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Due to the nature of custom software, AI models, and automation logic, time and expertise are consumed immediately upon engagement. We do not sell "off-the-shelf" products that can be returned; we provide dedicated systems and expertise that cannot be recaptured.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "deposits",
    title: "Deposits & Milestone Payments",
    content: (
      <>
        <p>
          All project engagements require a commitment deposit (typically 50% of the project total) to secure architectural capacity. <strong className="text-white uppercase tracking-tighter">Deposits are strictly non-refundable</strong> once discovery or specification work has commenced.
        </p>
        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Work Completed = Billable</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Any work completed up to the point of a cancellation request is fully billable. If a project is cancelled mid-milestone, the client is responsible for all hours and resources allocated toward that milestone.
            </p>
          </div>
          <div className="rounded-xl border border-brand-gold/10 bg-brand-gold/[0.02] p-6">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Retainer Payments</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monthly retainer payments are non-refundable once the billing cycle has started. Retainer capacity is provided on a "use-it-or-lose-it" basis and does not roll over. Cancellation of a retainer requires 30 days written notice.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "ai-automation-disclaimer",
    title: "AI & Automation Disclaimer",
    content: (
      <>
        <p>
          AI systems and automated workflows are dependent on third-party APIs, external data quality, and evolving model behaviors.
        </p>
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-6 not-italic">
          <p className="text-sm text-slate-400 leading-relaxed">
            Outcomes from AI models (e.g., OpenAI, Anthropic) may vary and are not guaranteed to be error-free or 100% autonomous. <strong className="text-white">Lack of satisfaction with AI-generated outputs or changes in third-party API behavior do not qualify for refunds.</strong> We address system performance through optimization and tuning within the project scope.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "client-responsibility",
    title: "Client Responsibilities",
    content: (
      <>
        <p>
          Successful system implementation requires active client participation. The following circumstances <strong className="text-white">explicitly do not qualify</strong> for refunds:
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 not-italic">
          {[
            "Delays caused by lack of communication or feedback",
            "Failure to provide required data, assets, or credentials",
            "Changes in business requirements or mindsets mid-project",
            "Dissatisfaction with outcomes not defined in the SOW",
            "Third-party system outages beyond Northspec control",
            "Decisions to pivot or cancel the project internally",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <span className="text-red-500/40 mt-0.5 shrink-0 text-xs">✕</span>
              <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "refund-eligibility",
    title: "Refund Eligibility",
    content: (
      <>
        <p>
          Refunds may be considered only in the following circumstances:
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Cancellation Before Work Begins", "If a project is cancelled before any discovery, specification, or development work has commenced, a partial refund of the deposit may be considered at Northspec&apos;s discretion."],
            ["Northspec Fails to Deliver", "If Northspec is unable to deliver agreed milestones within a reasonable timeframe and does not remedy the situation with written notice."],
            ["Deliverables Materially Fail Specification", "If delivered work materially and demonstrably fails to meet the agreed written specification, and Northspec declines to remedy the defect within the 30-day warranty window."],
            ["Northspec Cancels Without Cause", "If Northspec terminates the engagement without a valid cause as defined in the Service Agreement, prepaid amounts for undelivered scope will be refunded."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-brand-gold/10 bg-brand-gold/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1">{title}</p>
                <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "retainer-cancellations",
    title: "Retainer Cancellations",
    content: (
      <>
        <p>
          Retainer agreements are available exclusively to clients on Northspec-managed infrastructure. Monthly retainer payments are non-refundable once the billing cycle has begun.
        </p>
        <div className="mt-5 space-y-4 not-italic">
          {[
            { label: "Cancellation Notice", desc: "Retainers require 30 days written notice to cancel after the minimum commitment period. Fees for the current billing cycle at time of notice are non-refundable." },
            { label: "Unused Capacity", desc: "Unused hours or capacity within a billing cycle do not carry over, roll over, or convert to credit unless explicitly agreed in a separate written arrangement." },
            { label: "Minimum Commitment", desc: "Early cancellation within the minimum commitment period (typically 3 or 6 months) does not relieve the Client of payment obligations for that period." },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1">{item.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-6">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Service Suspension, 30 Days Past Due</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              If a retainer invoice remains unpaid <strong className="text-white">30 days past its due date</strong>, all hosted services associated with the account will be suspended. No data will be deleted during this period.
            </p>
          </div>
          <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-6">
            <p className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest font-times mb-3">Data Removal, 90 Days Past Due</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Failure to pay in full within <strong className="text-white">90 days</strong> of the invoice due date will result in permanent removal of all client data from Northspec infrastructure. This action is irreversible. Northspec will make reasonable efforts to notify the Client before this threshold is reached.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Service Restoration</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upon receipt of the outstanding balance in full prior to the 90-day threshold, all services will be fully restored, typically within one business day. No reactivation fees apply beyond the overdue invoice amount.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "chargebacks",
    title: "Payment Disputes & Chargebacks",
    content: (
      <>
        <p>
          By engaging Northspec Studio&apos;s services, you agree not to initiate a chargeback or payment dispute with your bank or credit card provider without first contacting us directly to attempt resolution.
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Resolution Process</p>
          <div className="space-y-3">
            {[
              "Contact us at build@northspecstudio.com with your project name, invoice number, and a clear description of the concern.",
              "We will respond within 3 business days and work in good faith toward resolution.",
              "Chargebacks filed without prior written contact may be contested with evidence of service delivery.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="text-[10px] font-bold text-brand-gold font-times tracking-widest shrink-0 pt-0.5">0{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },
  {
    id: "approach",
    title: "Our Approach",
    content: (
      <>
        <p>
          We work collaboratively with clients throughout every engagement. Outcomes depend on communication, feedback, and the natural evolution of requirements during development.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-6 not-italic">
          <p className="text-sm text-white font-times italic leading-relaxed">
            Our goal is to deliver high quality systems and long term value. We address concerns through collaboration and iteration, not refunds.
          </p>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            If something isn&apos;t right, talk to us first. The vast majority of concerns are resolved through honest communication, and we are always willing to engage in good faith.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "requesting",
    title: "Requesting a Refund",
    content: (
      <>
        <p>
          To initiate a refund request, contact us with the following:
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic space-y-2 text-sm text-slate-400">
          {[
            "Your full name and company",
            "Project name and invoice number",
            "A clear description of the issue and what resolution you are requesting",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-400 not-italic">
          We aim to respond within <strong className="text-white">3 business days</strong>. Contact us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-gold hover:underline font-bold">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />

      <div className="relative z-10 px-6 md:px-36 pt-40 pb-24 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">Legal</span>
          </div>
          <h1 className="text-[2.7rem] md:text-[3.375rem] font-bold text-white font-times uppercase tracking-tight leading-[1.05]">
            Refund Policy
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            This policy outlines how refunds and cancellations are handled for all Northspec Studio project engagements and retainer plans.
          </p>
          <p className="mt-4 text-xs text-slate-600 font-medium uppercase tracking-widest font-times">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>

        {/* Quick nav */}
        <div className="mb-16 flex flex-wrap gap-3">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[10px] font-bold text-slate-500 hover:text-brand-gold uppercase tracking-widest font-times border border-white/5 hover:border-brand-gold/30 rounded-lg px-4 py-2 transition-colors"
            >
              {s.title}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="max-w-3xl space-y-16">
          {sections.map((section, i) => (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-bold text-brand-gold/40 font-times tracking-widest shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-bold text-white font-times uppercase tracking-widest">
                  {section.title}
                </h2>
                <div className="h-px flex-grow bg-white/[0.04]" />
              </div>

              <div className="text-slate-400 text-base leading-relaxed font-medium italic space-y-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
