import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Terms of Service | Northspec Studio",
  description:
    "Terms governing the use of the Northspec Studio website and engagement with our software development, automation, and support services.",
  openGraph: {
    title: "Terms of Service | Northspec Studio",
    description:
      "Terms governing project engagements, payment, intellectual property, retainers, and liability for Northspec Studio.",
    url: "/terms-of-service",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    content: (
      <>
        <p>
          By accessing or using the Northspec Studio website at <strong className="text-white">northspecstudio.com</strong>, or by engaging Northspec Studio for any service, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use this website or engage our services.
        </p>
        <p className="mt-4">
          These terms apply to all visitors, clients, and anyone else who accesses the site or enters into a service engagement with Northspec Studio (&ldquo;Northspec,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Services Overview",
    content: (
      <>
        <p>
          Northspec Studio provides specialized AI implementation, automated workflow orchestration, custom systems architecture, and ongoing technical support. Our services are designed to automate business operations and scale efficiency through the strategic deployment of autonomous agents and integrated software solutions.
        </p>
        <p className="mt-4">
          All work is performed based on an agreed project scope or monthly retainer engagement. The specific deliverables, timeline, and pricing for each engagement are defined in a separate Statement of Work (SOW), proposal, or service agreement.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment Terms & Protection",
    content: (
      <>
        <p>
          All project engagements require a non-refundable deposit to secure capacity and initiate architectural planning.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Deposits", desc: "A 50% deposit (or as specified in the SOW) is required before work begins. This fee is non-refundable as it covers initial resource allocation and system design." },
            { label: "Milestones", desc: "For projects exceeding $20,000, payments are structured by technical milestones. Work on subsequent phases will pause until the prior milestone invoice is settled." },
            { label: "Late Payments", desc: "Invoices are due within 7 days. A late fee of 1.5% per month applies to overdue balances. Northspec reserves the right to suspend API keys or system access on overdue accounts." },
            { label: "Retainer Billing", desc: "Retainer plans are billed monthly in advance. Service is provided on a \"use-it-or-lose-it\" basis; unused monthly capacity does not roll over unless explicitly stated." },
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
    id: "scope-changes",
    title: "Scope Control & Client Responsibilities",
    content: (
      <>
        <p>
          To maintain project integrity and timelines, we implement strict scope control. Any deviation from the signed SOW requires a formal change request.
        </p>
        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">Change Requests</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Work outside the agreed scope will be billed at our standard hourly rate or quoted as a separate project phase. This may affect the final delivery date and system architecture.
            </p>
          </div>
          <div className="rounded-xl border border-brand-gold/10 bg-brand-gold/[0.03] p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">Client Obligations</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Timely delivery depends on client responsiveness. Clients must provide required data, feedback, and system credentials within 48 hours of request. Delays caused by the client may result in project rescheduling and additional administrative fees.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "ai-disclaimer",
    title: "AI & Automation Disclaimer",
    content: (
      <>
        <p className="text-brand-gold font-bold mb-4 uppercase text-xs tracking-widest">Crucial for AI Engagements</p>
        <p>
          AI systems, Large Language Models (LLMs), and automated workflows are inherently dependent on external variables, third-party APIs (e.g., OpenAI, Anthropic, AWS), and the quality of input data provided.
        </p>
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
          <p className="text-sm text-slate-400">
            <strong className="text-white">Output Variability:</strong> AI outputs may vary and are not guaranteed to be 100% error-free, factual, or autonomous in every scenario. Northspec is not responsible for hallucinations or unexpected logic paths generated by third-party models.
          </p>
          <p className="text-sm text-slate-400">
            <strong className="text-white">API Dependencies:</strong> We are not liable for business interruptions caused by uptime issues, rate limits, or changes in terms of third-party AI providers or infrastructure partners.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Ownership is structured to give clients full control of their specific business logic while allowing Northspec to maintain its toolkit for future operations.
        </p>
        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">Final Deliverables</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upon receipt of full and final payment, the client owns the final deliverables produced specifically for their project, including custom codebases and system documentation.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-2">Retained Rights</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Northspec retains all rights to reusable components, proprietary automation frameworks, boilerplate code, n8n workflow patterns, and methodologies developed prior to or during the engagement that are not unique to the client&apos;s trade secrets.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "retainers",
    title: "Retainer Engagements",
    content: (
      <>
        <p>
          Retainer agreements provide a monthly allocation of development and support capacity. The following terms apply to all retainer engagements.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Minimum Commitment", "Retainer plans require a minimum commitment period as specified at the time of engagement (typically 3 or 6 months). Early cancellation within the minimum period does not relieve the client of payment obligations for that period."],
            ["Monthly Capacity", "Retainer capacity is provided on a use-it-or-lose-it basis per billing cycle. Unused hours or capacity do not roll over to subsequent months unless otherwise agreed in writing."],
            ["Scope Flexibility", "Retainer engagements allow for flexible scope within the agreed monthly capacity. Major scope changes, such as a significant new system or product, may require a separate project agreement."],
            ["Cancellation", "After the minimum commitment period, either party may cancel a retainer with 30 days written notice. Work in progress at time of cancellation will be delivered and billed accordingly."],
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
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>
          Either party may terminate a project engagement or service agreement with written notice, subject to the following:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Work Completed is Billable", desc: "All work completed up to the point of termination is billable and must be paid in full before any deliverables are transferred to the client." },
            { label: "Client Termination", desc: "If the client terminates a project early, the deposit is non-refundable and any milestone payments already made are not subject to refund." },
            { label: "Northspec Termination", desc: "Northspec reserves the right to terminate an engagement in cases of non-payment, abusive conduct, or material breach of these terms." },
            { label: "Handoff", desc: "Upon termination, Northspec will provide a reasonable handoff of completed work, documentation, and access credentials, provided all outstanding invoices have been settled." },
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
    id: "warranties",
    title: "Warranties & Disclaimers",
    content: (
      <>
        <p>
          Services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. Northspec makes no guarantees of specific business outcomes, revenue results, user growth, or system uptime beyond what is explicitly stated in a written service agreement.
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic">
          <p className="text-sm text-slate-400 leading-relaxed">
            Northspec does not warrant that: (a) software will be error-free or uninterrupted; (b) results will meet all of the client&apos;s expectations; (c) third-party services, APIs, or platforms integrated into deliverables will remain available or unchanged. All third-party dependencies are subject to their own terms and availability.
          </p>
        </div>
        <p className="mt-5 text-sm text-slate-500">
          Any bugs or defects identified within 30 days of delivery will be addressed at no additional cost, provided they are within the original project scope and not caused by client-side changes.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Northspec Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to: lost revenue, lost profits, loss of data, business interruption, or system downtime, even if advised of the possibility of such damages.
        </p>
        <p className="mt-4">
          In no event shall Northspec&apos;s total cumulative liability for any claim arising out of a service engagement exceed 50% of the total fees paid by the client for the specific phase or milestone giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: (
      <>
        <p>By using this website, you agree not to:</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 not-italic">
          {[
            "Scrape, crawl, or extract content, data, or code from this website",
            "Copy, reproduce, or distribute Northspec-owned content without written permission",
            "Impersonate Northspec Studio or misrepresent your affiliation with us",
            "Use this website for any unlawful purpose or to violate any applicable law",
            "Attempt to gain unauthorized access to any system, server, or data",
            "Interfere with the website&apos;s operation, security, or integrity",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <span className="text-red-500/40 text-xs mt-0.5 shrink-0">✕</span>
              <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <p>
        Both parties agree to treat as confidential any proprietary, business, or technical information disclosed during the course of an engagement (&ldquo;Confidential Information&rdquo;). This includes but is not limited to: project details, source code, system architecture, business processes, and client data. Northspec will not disclose client Confidential Information to third parties without written consent, except as required by law. Clients agree not to disclose Northspec&apos;s proprietary methodologies, internal tooling, or pricing structures to third parties.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>
        These Terms of Service are governed by and construed in accordance with the laws of the United States and the state in which Northspec Studio operates. Any disputes arising from these terms or a service engagement that cannot be resolved informally shall be subject to binding arbitration or the jurisdiction of the applicable courts, as agreed upon in the project-specific service agreement.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: (
      <p>
        Northspec Studio reserves the right to update or modify these Terms of Service at any time. The effective date at the top of this page will reflect the most recent revision. Continued use of the website or ongoing service engagement after changes are posted constitutes acceptance of the revised terms. For active project or retainer clients, material changes to service terms will be communicated directly.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>For questions or concerns regarding these Terms of Service:</p>
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Northspec Studio</p>
          <p className="text-sm text-slate-300 font-medium">North America</p>
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

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            These terms govern your use of the Northspec Studio website and all service engagements, including software development, automation, integration, retainer plans, and ongoing support.
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
