import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Service Agreement | Northspec Studio",
  description:
    "Master Service Agreement governing all project engagements, payment terms, intellectual property, retainers, and liability with Northspec Studio.",
  openGraph: {
    title: "Service Agreement | Northspec Studio",
    description:
      "Scope, payments, change requests, IP ownership, retainer terms, and liability, everything that governs working with Northspec Studio.",
    url: "/service-agreement",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "parties",
    title: "Parties & Agreement",
    content: (
      <>
        <p>
          This Master Service Agreement (&ldquo;Agreement&rdquo;) is entered into between Northspec Studio (&ldquo;Northspec,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) and the client entity or individual identified in the applicable project proposal or statement of work (&ldquo;Client&rdquo;).
        </p>
        <p className="mt-4">
          This Agreement governs all services delivered by Northspec, including software development, workflow automation, API integration, mobile app development, and ongoing support or retainer engagements. By signing a project proposal, statement of work, or retainer agreement, or by initiating payment, the Client agrees to the terms set forth below.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5 not-italic">
          <p className="text-sm text-white font-bold font-times">
            This Agreement applies to all engagements unless superseded by a separate written contract signed by both parties.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope of Work",
    content: (
      <>
        <p>
          All work is performed based on a written scope of work agreed upon before development begins. The scope document defines deliverables, timeline, and the specific features or systems to be built.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["What Is Included", "Only work explicitly defined in the scope document is included in the quoted price. Any feature, integration, or system not described in that document is considered out of scope."],
            ["What Is Not Included", "General consulting, strategic planning, third-party licensing fees, content creation, copywriting, or services not related to direct software delivery are not included unless explicitly stated."],
            ["Scope Confirmation", "The Client is responsible for reviewing and approving the scope document before work begins. Approval (written or via payment of deposit) constitutes acceptance of the defined scope."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1">{title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "changes",
    title: "Change Requests",
    content: (
      <>
        <p>
          Software development involves evolving requirements. All changes to the agreed scope are managed through a documented change request process.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Request Process", desc: "Change requests must be submitted in writing (email or project management system). Verbal requests will not be actioned until confirmed in writing." },
            { label: "Assessment", desc: "Northspec will assess the requested change and provide an updated estimate for time, cost, and impact on the existing timeline." },
            { label: "Approval Required", desc: "No out-of-scope work will begin without written Client approval of the change request estimate. Work already in progress will not be paused without mutual agreement." },
            { label: "Cumulative Impact", desc: "Significant accumulated changes may require a full scope revision. Northspec reserves the right to pause active development to re-scope when changes materially alter the project." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: (
      <>
        <p>
          All projects are priced on a fixed-scope basis. Payment schedules are defined in the project proposal. Standard payment structure is as follows:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 not-italic">
          {[
            { label: "Deposit", value: "50% due upon signing", note: "Required before any work begins. Non-refundable." },
            { label: "Milestone", value: "25% at mid-delivery", note: "Due upon delivery of agreed midpoint checkpoint." },
            { label: "Final", value: "25% upon completion", note: "Due on delivery day, prior to or at time of delivery." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-1">{item.label}</p>
              <p className="text-base font-bold text-white font-times mt-1 mb-2">{item.value}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-6">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Non-Delivery for Non-Payment</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Final payment is due on delivery day, prior to or at the time of the delivery. If the Client fails to submit final payment on delivery day, the project will not be delivered. Access to all deliverables, source code, and assets will be withheld until payment is received in full.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Late Payments</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Invoices are due within 14 calendar days of issuance. Northspec reserves the right to pause active development on accounts with overdue balances. Resumed work is subject to schedule availability and does not guarantee original timeline restoration.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Retainer Non-Payment</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold/40 shrink-0 mt-0.5">›</span>
                <span><strong className="text-white">30 days past due:</strong> All hosted services are suspended until the outstanding balance is settled. No data is deleted during this period.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500/40 shrink-0 mt-0.5">›</span>
                <span><strong className="text-white">90 days past due:</strong> Failure to pay in full within 90 days will result in permanent removal of all client data from Northspec infrastructure. This action is irreversible. Payment received before the 90-day threshold will restore services without data loss.</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Intellectual property ownership is structured to give clients full ownership of custom work while protecting Northspec&apos;s reusable systems and tools.
        </p>
        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">Client Owns</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upon receipt of full and final payment, the Client owns all custom code, designs, and deliverables produced specifically for their project under this engagement.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-2">Northspec Retains</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Northspec retains ownership of all pre-existing frameworks, boilerplate, reusable components, internal tooling, and methodologies used in delivery. These may be used in other client engagements. Third-party libraries and dependencies remain under their respective open-source or commercial licenses.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-2">Portfolio Reference</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Northspec may reference the project name, category, and general description in its portfolio and marketing materials unless the Client requests otherwise in writing prior to project completion.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "acceptance",
    title: "Delivery & Acceptance",
    content: (
      <>
        <p>
          Deliverables are subject to a structured review and acceptance process to prevent open-ended revision cycles and protect both parties.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Delivery", "Upon completion of a milestone or the full project, Northspec will notify the Client and provide access to deliverables for review."],
            ["Review Period", "The Client has 7 business days from delivery notification to review deliverables and submit written feedback or identify defects."],
            ["Acceptance", "Deliverables are considered accepted if no written issues are reported within the 7-day review window. Silence constitutes acceptance."],
            ["Bug Fix Warranty", "Bugs or defects within the defined scope reported within 30 days of final delivery will be corrected at no additional charge. Issues caused by client-side modifications, third-party changes, or out-of-scope requests are not covered under this warranty."],
            ["Revision Limits", "Revisions during the review period are limited to fixing functional issues against the agreed specification. Design or feature changes beyond the original scope are treated as change requests."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1">{title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "timeline",
    title: "Timeline & Client Responsibilities",
    content: (
      <>
        <p>
          Project timelines are established in the scope document and are dependent on mutual cooperation. Northspec will make reasonable efforts to meet agreed timelines, subject to the following:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Client Delays", desc: "Timelines may be adjusted if the Client is unresponsive, delays required approvals, or fails to provide necessary materials, access, or feedback within agreed windows." },
            { label: "Feedback Windows", desc: "The Client agrees to review and respond to deliverables, design reviews, and approval requests within 5 business days. Extended delays may result in timeline adjustments at Northspec&apos;s discretion." },
            { label: "Third-Party Dependencies", desc: "Timelines involving third-party APIs, platforms, or integrations are subject to the availability and behavior of those services. Northspec is not liable for delays caused by third parties." },
            { label: "Force Majeure", desc: "Neither party shall be liable for delays caused by events outside their reasonable control, including outages, natural events, or regulatory changes." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "retainers",
    title: "Ongoing Services & Retainers",
    content: (
      <>
        <p>
          Retainer engagements provide a monthly allocation of ongoing development capacity. These terms apply in addition to the retainer-specific plan selected.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Minimum Commitment", "Retainer engagements require a minimum commitment period (typically 3 months for standard plans, 6 months for Dedicated Team). This period begins on the first billing date."],
            ["Monthly Capacity", "Retainer hours or capacity are allocated per billing cycle on a use-it-or-lose-it basis. Unused capacity does not roll over unless explicitly agreed in writing."],
            ["Scope Flexibility", "Within the monthly capacity, the Client may direct work across maintenance, feature development, and support. Major new systems or products outside the original project scope may require a separate project agreement."],
            ["Support Not Included in Projects", "Ongoing support and maintenance after project delivery is not included in project pricing. Continued access to engineering support requires a separate retainer agreement."],
            ["Cancellation", "After the minimum commitment period, either party may cancel with 30 days written notice. All work completed and hours used through the final billing cycle are payable in full."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1">{title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "hosting",
    title: "Hosting & Infrastructure",
    content: (
      <>
        <p>
          At project delivery, the Client selects one of two hosting arrangements. This choice determines post-delivery responsibility and retainer eligibility.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-4">Client-Hosted</p>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                "Client provisions and manages all infrastructure",
                "Northspec delivers the completed work and steps back",
                "Client assumes full responsibility for uptime, security, and maintenance",
                "Northspec bears no liability for issues arising post-delivery",
                "Retainer plans are not available for client-hosted deployments",
                "Future fixes or changes require a new paid engagement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-6">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-4">Northspec-Hosted</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "Northspec hosts and manages all infrastructure on its systems",
                "Direct access enables faster incident response and automated fixes",
                "Client is eligible for retainer plans and ongoing support",
                "Proactive monitoring, patching, and uptime management included",
                "Most issues resolved without requiring client involvement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500 not-italic">
          Clients who initially chose self-hosting may transition to Northspec-managed infrastructure under a separate infrastructure onboarding agreement.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <>
        <p>
          Both parties agree to keep confidential any proprietary, business, or technical information disclosed during the course of an engagement (&ldquo;Confidential Information&rdquo;).
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Client Confidentiality", "Northspec will not disclose the Client&apos;s Confidential Information, including project details, business logic, or system architecture, to third parties without written consent, except as required by law."],
            ["Northspec Confidentiality", "The Client agrees not to disclose Northspec&apos;s internal pricing, methodologies, or proprietary systems to third parties."],
            ["Duration", "This confidentiality obligation survives termination of the engagement for a period of two (2) years."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1">{title}</p>
                <p className="text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "warranties",
    title: "Warranties & Disclaimers",
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Northspec Warrants</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "Work is performed professionally and with reasonable skill and care",
                "30-day bug fix warranty post-delivery for in-scope defects",
                "All original code is created by Northspec or properly licensed third-party components",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Northspec Does Not Warrant</p>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                "Specific business outcomes, revenue results, or user growth",
                "Uninterrupted or error-free operation of third-party services",
                "Continued availability of external APIs or platforms integrated into deliverables",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Northspec Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost revenue, lost profits, loss of data, business interruption, or system downtime, arising from the delivery or use of any services or deliverables under this Agreement.
        </p>
        <p className="mt-4">
          Northspec&apos;s total cumulative liability under any claim arising from a specific engagement shall not exceed the total fees paid by the Client for that engagement.
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-5 not-italic">
          <p className="text-sm text-slate-400 leading-relaxed">
            This limitation applies even if Northspec has been advised of the possibility of such damages. Some jurisdictions do not allow exclusion of certain damages, in such cases, Northspec&apos;s liability is limited to the maximum extent permitted by law.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>
          Either party may terminate an active engagement with 14 days written notice, subject to the following:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Work Completed is Billable", desc: "All work completed up to the point of termination is due and payable. Deliverables will not be transferred until outstanding invoices are settled." },
            { label: "Deposits Are Non-Refundable", desc: "The initial deposit is non-refundable once discovery and specification work has commenced." },
            { label: "Northspec-Initiated Termination", desc: "Northspec reserves the right to terminate immediately in cases of non-payment, material breach, or conduct that makes continued engagement unreasonable." },
            { label: "Handoff", desc: "Upon termination, Northspec will provide a reasonable handoff of completed work, documentation, and access credentials within 10 business days, provided all invoices are settled." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>
        This Agreement is governed by the laws of the United States and the state in which Northspec Studio is registered and operates. Any disputes arising from this Agreement that cannot be resolved informally shall first be submitted to good-faith mediation before litigation is pursued. Both parties agree to binding arbitration as the preferred dispute resolution mechanism, unless otherwise required by law.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>Questions or concerns regarding this Agreement should be directed to:</p>
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Northspec Studio</p>
          <p className="text-sm text-slate-300 font-medium">Remote / North America</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-block mt-2 text-brand-gold font-bold font-times hover:underline text-sm"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </>
    ),
  },
];

export default function ServiceAgreementPage() {
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
            Service Agreement
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            This Master Service Agreement governs all project engagements between Northspec Studio and its clients, covering scope, payments, change requests, intellectual property, retainers, and liability.
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
