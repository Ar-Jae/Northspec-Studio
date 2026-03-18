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
    title: "Services",
    content: (
      <>
        <p>
          Northspec Studio provides software development, workflow automation, API integration, mobile application development, and ongoing technical support services. All work is performed based on an agreed project scope or monthly retainer engagement, as defined in a separate statement of work, proposal, or service agreement provided to the client.
        </p>
        <p className="mt-4">
          The specific deliverables, timeline, and pricing for each engagement are defined in writing prior to commencement of work. These Terms of Service apply in addition to any project-specific agreement.
        </p>
      </>
    ),
  },
  {
    id: "scope-changes",
    title: "Project Scope & Changes",
    content: (
      <>
        <p>
          All projects are performed based on an agreed scope of work. Any features, changes, or deliverables outside of that agreed scope constitute a change request and may require additional time and cost.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Scope Document", "A written scope is established before any development begins. This document defines what is included and what is not."],
            ["Change Requests", "Requests for work outside the original scope will be assessed and quoted separately. No out-of-scope work will begin without written client approval."],
            ["Requirement Changes", "If client-provided requirements change materially after work has begun, Northspec reserves the right to re-scope and re-price the engagement."],
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
    id: "payment",
    title: "Payment Terms",
    content: (
      <>
        <p>
          All projects require a deposit prior to the commencement of work. Remaining payments are structured by milestone or delivery phase, as outlined in the project agreement.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Deposit", desc: "A non-refundable deposit is required before work begins. The deposit amount is specified in the project proposal." },
            { label: "Milestone Payments", desc: "Remaining fees are invoiced at agreed milestones or upon delivery of phases. Work on subsequent phases will not begin until prior invoices are paid." },
            { label: "Late Payments", desc: "Invoices are due within 14 days of issuance. Northspec reserves the right to pause active work on overdue accounts." },
            { label: "Retainer Billing", desc: "Retainer plans are billed monthly in advance. Non-payment of a retainer invoice may result in suspension of service without liability to Northspec." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-500">
          All prices are in USD unless otherwise specified. Taxes are the responsibility of the client where applicable.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Intellectual property rights for deliverables are transferred to the client upon receipt of full and final payment.
        </p>
        <div className="mt-5 space-y-4 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">Client Ownership</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upon full payment, the client owns the final deliverables produced specifically for their project, including custom code, design assets, and documentation created solely for that engagement.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-2">Northspec Retains</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Northspec retains ownership of all underlying frameworks, boilerplate code, libraries, reusable components, tooling, and methodologies that are not created exclusively for the client&apos;s project. These may be reused in other engagements.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-2">Website Content</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              All content on northspecstudio.com, including copy, design, branding, and code, is the exclusive property of Northspec Studio. Reproduction, distribution, or commercial use without written permission is prohibited.
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
          To the fullest extent permitted by applicable law, Northspec Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to: lost revenue, lost profits, loss of data, business interruption, or system downtime, arising from the use of our services or deliverables, even if advised of the possibility of such damages.
        </p>
        <p className="mt-4">
          Northspec&apos;s total cumulative liability for any claim arising out of a service engagement shall not exceed the total fees paid by the client for the specific engagement giving rise to the claim.
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
