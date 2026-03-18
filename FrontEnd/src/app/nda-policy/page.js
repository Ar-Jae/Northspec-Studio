import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";
import Button from "../../components/Button";

export const metadata = {
  title: "NDA Policy | Northspec Studio",
  description:
    "Confidentiality comes standard at Northspec Studio. NDAs are available for all projects and discussions. We regularly work with sensitive product ideas, internal systems, and proprietary business processes.",
  openGraph: {
    title: "NDA Policy | Northspec Studio, Confidentiality Comes Standard",
    description:
      "We take confidentiality seriously. Request a formal NDA before any discovery discussions. Signed within one business day.",
    url: "/nda-policy",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "position",
    title: "Our Position",
    content: (
      <>
        <p>
          We regularly work with sensitive product ideas, internal systems, proprietary business processes, and unreleased technology. Protecting that information is a standard part of how we operate, not an exception.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5 not-italic">
          <p className="text-sm text-white font-bold font-times leading-relaxed">
            Confidentiality comes standard. NDAs are available for all projects and pre-project discussions.
          </p>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            We treat all client information as confidential from the moment it is shared, whether or not a formal NDA has been signed.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "what-is-covered",
    title: "What an NDA Covers",
    content: (
      <>
        <p>
          Our non-disclosure agreements typically cover any information shared during the course of inquiry, discovery, or engagement, including:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Business Information</p>
            <ul className="space-y-2">
              {[
                "Product ideas and concepts",
                "Business models and unreleased strategy",
                "Revenue figures and financial data",
                "Customer lists and pipeline information",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Technical Information</p>
            <ul className="space-y-2">
              {[
                "Source code and technical architecture",
                "API keys, credentials, and access configurations",
                "Internal systems, workflows, and processes",
                "Infrastructure design and third-party integrations",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-500 not-italic">
          Any proprietary or sensitive information shared during or in relation to a project engagement is treated as confidential unless explicitly excluded by the agreement.
        </p>
      </>
    ),
  },
  {
    id: "how-it-works",
    title: "How It Works",
    content: (
      <>
        <p>
          Requesting and signing an NDA is straightforward. We&apos;ve deliberately kept this process as frictionless as possible.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 not-italic">
          {[
            { step: "01", title: "Request", desc: "Email us or mention it during first contact. We respond within one business day with a document for review." },
            { step: "02", title: "Sign", desc: "We sign before any sensitive project details are shared. We can sign your NDA or provide our standard mutual agreement." },
            { step: "03", title: "Work Securely", desc: "All information shared throughout the engagement is handled with confidentiality by our team and any authorized subcontractors." },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden">
              <div className="absolute top-3 right-4 text-5xl font-black text-white/[0.03] font-times select-none">{item.step}</div>
              <p className="text-[10px] font-bold text-brand-gold font-times tracking-[0.3em] mb-3">{item.step}</p>
              <h3 className="text-sm font-bold text-white font-times uppercase tracking-widest mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "our-commitment",
    title: "Our Commitment",
    content: (
      <>
        <p>
          Regardless of whether a formal NDA has been signed, the following apply to every engagement:
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["We Do Not Share Client Information", "Client project details, business logic, system architecture, and data are never shared with third parties without explicit written consent."],
            ["We Do Not Reuse Proprietary Systems", "Custom code, workflows, or business logic built specifically for your project is not reused in other client engagements."],
            ["Access Is Limited", "Only team members directly involved in your project have access to your information. This applies to any authorized subcontractors as well."],
            ["Structured Confidentiality Practices", "We maintain internal data handling policies consistent with professional confidentiality standards, including secure storage and credential management."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <svg className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
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
    id: "mutual",
    title: "Mutual Protection",
    content: (
      <>
        <p>
          NDAs protect both parties and create the foundation for a secure, trust-based working relationship from the start.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">You Are Protected</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your product ideas, business processes, and technical systems are treated as confidential throughout and after the engagement.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">We Are Protected</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our proprietary methodologies, internal tooling, and pricing structures are similarly protected under the mutual agreement.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500 not-italic">
          This makes the relationship fair and professional, not one-sided.
        </p>
      </>
    ),
  },
  {
    id: "subcontractors",
    title: "Subcontractors",
    content: (
      <p>
        In cases where Northspec engages specialist subcontractors or partners to assist with project delivery, those parties are bound by the same confidentiality obligations under written agreement before any project details are shared with them. Client information is never disclosed to subcontractors beyond what is strictly necessary for their scope of work.
      </p>
    ),
  },
  {
    id: "exclusions",
    title: "Standard Exclusions",
    content: (
      <>
        <p>
          Confidentiality obligations do not apply to information that:
        </p>
        <div className="mt-5 space-y-2 not-italic">
          {[
            "Is or becomes publicly available through no fault of either party",
            "Was already known to the receiving party before disclosure",
            "Was independently developed by the receiving party without use of the confidential information",
            "Must be disclosed by law, regulation, or court order, in which case, the disclosing party will provide reasonable advance notice",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3">
              <span className="text-slate-600 mt-0.5 shrink-0 text-xs">›</span>
              <p className="text-sm text-slate-500 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500 not-italic">
          These exclusions are standard in all professional NDA agreements and are included to ensure fairness.
        </p>
      </>
    ),
  },
  {
    id: "duration",
    title: "Duration",
    content: (
      <p>
        Confidentiality obligations survive the termination of any engagement for a period of <strong className="text-white not-italic">two (2) years</strong>, unless a longer period is specified in a separately signed agreement. For engagements involving particularly sensitive technical or business information, an extended duration can be negotiated in writing.
      </p>
    ),
  },
  {
    id: "request",
    title: "Request an NDA",
    content: (
      <>
        <p>
          Need an NDA before we talk? We&apos;ll turn it around within one business day.
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic space-y-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times">To request an NDA, email us with:</p>
          {[
            "Your name and company",
            "A brief description of what you're looking to discuss",
            "Whether you'd prefer to use our standard agreement or provide your own",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
              <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-400 not-italic">
          Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=NDA Request`} className="text-brand-gold hover:underline font-bold">
            {SUPPORT_EMAIL}
          </a>
          {" "}with the subject line <strong className="text-white">&ldquo;NDA Request&rdquo;</strong>, we&apos;ll respond within one business day.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 not-italic">
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=NDA Request`}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark font-bold font-times uppercase tracking-widest text-xs rounded-xl px-6 py-4 hover:bg-brand-gold/90 transition-colors"
          >
            Request an NDA
          </a>
          <Button as="link" href="/contact" variant="outline">
            Start a Project
          </Button>
        </div>
      </>
    ),
  },
];

export default function NdaPolicyPage() {
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
            Confidentiality Comes Standard
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            We take your ideas, systems, and data seriously. NDAs are available for all projects and discussions, and we&apos;re structured about how we handle confidential information throughout every engagement.
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
