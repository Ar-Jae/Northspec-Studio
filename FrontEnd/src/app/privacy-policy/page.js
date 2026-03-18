import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Privacy Policy | Northspec Studio",
  description:
    "Northspec Studio collects and processes data to deliver software development, automation, and support services. This policy explains what data we collect and how it is used.",
  openGraph: {
    title: "Privacy Policy | Northspec Studio",
    description:
      "How Northspec Studio collects, uses, and protects your personal data across our website and services.",
    url: "/privacy-policy",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          Northspec Studio (&ldquo;Northspec,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides software development, workflow automation, mobile app development, API integration, and ongoing support services. This Privacy Policy explains how we collect, use, store, and protect personal data submitted through our website at{" "}
          <strong className="text-white">northspecstudio.com</strong> and in the course of delivering our services.
        </p>
        <div className="mt-6 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5">
          <p className="text-white font-bold font-times text-sm">
            We do not sell personal data. We never have, and we never will.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What We Collect",
    content: (
      <>
        <p className="mb-6">We collect only the data necessary to respond to inquiries and deliver our services.</p>
        <div className="grid gap-4 sm:grid-cols-2 not-italic">
          {[
            {
              label: "Contact Information",
              items: ["Full name", "Work email address", "Phone number (if provided)", "Company or project name"],
            },
            {
              label: "Project Details",
              items: ["Project type and description", "Budget range", "Timeline preferences", "Technical requirements submitted via forms"],
            },
            {
              label: "Usage Data",
              items: ["IP address (anonymized)", "Browser type and version", "Pages visited and time on site", "Referring URLs"],
            },
            {
              label: "Client System Data",
              items: ["Data submitted during support requests", "System configuration shared for integration work", "Credentials shared securely for service delivery (never stored in plain text)"],
            },
          ].map((block) => (
            <div key={block.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">{block.label}</p>
              <ul className="space-y-1.5">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-gold/40 mt-0.5">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How We Use Your Data",
    content: (
      <>
        <p className="mb-6">We use data collected for the following purposes only:</p>
        <div className="space-y-3 not-italic">
          {[
            ["Respond to inquiries and project requests", "When you submit a contact form or support request, we use your information to follow up within our stated response window."],
            ["Deliver our services", "Project details and technical requirements are used exclusively to scope, build, and support the work you&apos;ve engaged us for."],
            ["Communicate updates", "We may send transactional communications related to your project, support ticket, or billing. We do not send marketing emails without consent."],
            ["Improve our systems", "Anonymized usage data helps us understand how our website performs and where we can improve the experience."],
            ["Comply with legal obligations", "We retain certain data as required by applicable law, including records related to financial transactions and service agreements."],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="text-[10px] font-bold text-brand-gold font-times tracking-[0.3em] pt-0.5 shrink-0">0{i + 1}</div>
              <div>
                <p className="text-sm font-bold text-white font-times uppercase tracking-wide mb-1" dangerouslySetInnerHTML={{ __html: title }} />
                <p className="text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: (
      <>
        <p className="mb-6">
          We use a limited number of trusted third-party services to operate our website and deliver our work. These providers may process data on our behalf under their own privacy policies.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 not-italic">
          {[
            {
              label: "Hosting & Infrastructure",
              services: ["Vercel (website hosting)", "AWS (application infrastructure)", "Docker (containerized deployments)"],
            },
            {
              label: "Analytics",
              services: ["We use privacy-respecting, cookieless analytics only. No advertising pixels or behavioral tracking are deployed on this site."],
            },
            {
              label: "Communication",
              services: ["Email services for transactional communication (inquiry responses, support follow-ups)", "Google Calendar for scheduling (appointment links)"],
            },
            {
              label: "Development & Integrations",
              services: ["APIs and integrations used during client projects are governed by the applicable service agreements for each engagement — not this policy."],
            },
          ].map((block) => (
            <div key={block.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">{block.label}</p>
              <ul className="space-y-1.5">
                {block.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-gold/40 mt-0.5">›</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          We do not integrate advertising networks, third-party retargeting, or data broker services on this website.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <p>
        We implement reasonable technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. This includes encrypted transmission (HTTPS), access controls, and secure credential handling. No method of electronic storage is 100% secure. We cannot guarantee absolute security, but we take the protection of your data seriously and review our practices on an ongoing basis.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>We retain personal data only as long as necessary to:</p>
        <ul className="mt-4 space-y-2 not-italic">
          {[
            "Fulfill the purpose for which it was collected (e.g., respond to an inquiry or deliver a project)",
            "Comply with applicable legal and financial record-keeping obligations",
            "Resolve disputes or enforce our service agreements",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-brand-gold/40 mt-0.5">›</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Contact form data and project inquiry submissions are retained for up to 24 months unless you request earlier deletion.
        </p>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "Your Rights",
    content: (
      <>
        <p className="mb-6">
          Depending on your location, you may have the following rights regarding your personal data. We honor these requests regardless of which state or country you are in.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Access", desc: "Request a copy of the personal data we hold about you." },
            { label: "Correction", desc: "Request correction of inaccurate or incomplete data." },
            { label: "Deletion", desc: 'Request deletion of your personal data ("right to be forgotten"). We will comply unless retention is required by law.' },
            { label: "Opt-Out", desc: "Opt out of any communications that are not strictly transactional or service-related." },
            { label: "Data Portability", desc: "Request your data in a structured, machine-readable format." },
            { label: "Objection", desc: "Object to certain processing activities, including profiling." },
          ].map((r) => (
            <div key={r.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{r.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          To exercise any of these rights, email us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-gold hover:underline font-medium not-italic">
            {SUPPORT_EMAIL}
          </a>
          . We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Our website may use minimal functional cookies to support site navigation and form functionality. We do not use advertising cookies, third-party tracking pixels, or behavioral profiling. You can manage cookie preferences through your browser settings. Disabling cookies may affect certain site features but will not affect your ability to contact us or access our content.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or best practices. The effective date at the top of this page will always reflect the most recent version. We encourage you to review this page periodically. Continued use of our website after changes are posted constitutes your acknowledgment of the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>For questions, concerns, or requests related to this Privacy Policy or our data practices:</p>
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

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />

      <div className="relative z-10 px-6 md:px-36 pt-40 pb-24 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-times uppercase tracking-tight leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            Northspec Studio collects and processes data to deliver software development, automation, and support services. This policy explains what data we collect, how it is used, and how you can control it.
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
              {/* Section heading */}
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
