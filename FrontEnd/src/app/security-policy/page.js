import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";
import Button from "../../components/Button";

export const metadata = {
  title: "Security Policy | Northspec Studio",
  description:
    "Security is built into every system Northspec Studio delivers, from architecture to deployment. Learn how we protect data, systems, and client infrastructure.",
  openGraph: {
    title: "Security Policy | Northspec Studio",
    description:
      "How Northspec Studio implements security across all client systems, encryption, access control, monitoring, and vulnerability disclosure.",
    url: "/security-policy",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "approach",
    title: "Security-First Engineering",
    content: (
      <>
        <p>
          Security is not an afterthought at Northspec Studio; it is a core engineering requirement. From the initial system architecture to the final deployment of an AI agent, every decision is weighed against its impact on data integrity, privacy, and system resilience. We build for enterprise operators who cannot afford downtime or data leakage.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5 not-italic">
          <p className="text-sm text-white font-bold font-times leading-relaxed uppercase tracking-wide">
            Every system we build is designed with protection, reliability, and long term stability in mind.
          </p>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            We integrate security protocols into every stage: architecture, development, testing, and deployment.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 not-italic">
          {[
            { label: "Architecture", desc: "Hardened system design with isolated environments and minimum attack surfaces." },
            { label: "Logic Security", desc: "Rigorous validation of business logic and automated workflow triggers." },
            { label: "Data Sovereignty", desc: "Ensuring your data stays within your controlled infrastructure and stays private." },
            { label: "Monitoring", desc: "Real time performance and anomaly detection for proactive incident prevention." },
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
    id: "ai-specific",
    title: "AI & Workflow Security",
    content: (
      <>
        <p>
          AI systems introduce unique security challenges. We implement custom agents and large language model (LLM) workflows with controlled data flows to ensure sensitive information stays within your sandbox.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-brand-gold/10 bg-brand-gold/[0.04] p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Prompt & Model Security</p>
            <ul className="space-y-2">
              {[
                "Enterprise API tiers with data-opt-out enabled (data never trains models)",
                "Sanitized prompt construction to prevent injection",
                "Controlled LLM output validation before system triggers",
                "Isolated RAG knowledge bases with role-based access",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest font-times mb-3">Workflow Integrity</p>
            <p className="text-sm text-slate-400 mb-4 font-times italic leading-relaxed">
              We focus on the integrity of your n8n and system-trigger logic to prevent unintended executions.
            </p>
            <ul className="space-y-2">
              {[
                "Webhooks secured with signature validation and authentication",
                "Strict retry and error-handling logic for critical workflows",
                "Audit logs for all major AI-triggered operations",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
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
    id: "client-projects",
    title: "Client Project Security",
    content: (
      <>
        <p>
          Every system we build for clients follows a security-first engineering process. Security requirements are defined during scoping and verified before delivery.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 not-italic">
          {[
            { label: "Authentication", desc: "Established libraries only, NextAuth, Clerk, or Auth0. No custom authentication implementations." },
            { label: "Access Control", desc: "Role-based access control (RBAC) on all sensitive routes and API endpoints." },
            { label: "Secrets Management", desc: "All credentials, API keys, and secrets stored as environment variables, never hardcoded in source." },
            { label: "SQL Injection Prevention", desc: "Parameterized queries and ORM-level protections prevent injection attacks on all database operations." },
            { label: "Dependency Audits", desc: "All third-party dependencies are audited before handoff. Known vulnerabilities are addressed before delivery." },
            { label: "Handoff Documentation", desc: "Secrets rotation guidance and security practices are included in all project handoff documentation." },
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
    id: "data",
    title: "Data Protection",
    content: (
      <>
        <p>
          We protect data at every stage of its lifecycle, in transit, at rest, and during processing. Data minimization is a core principle: we collect and retain only what is strictly necessary.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 not-italic">
          {[
            { label: "In Transit", desc: "All data transmitted between systems is encrypted using TLS. We do not transmit sensitive data over unencrypted channels." },
            { label: "At Rest", desc: "Sensitive data stored on Northspec-managed infrastructure uses encrypted storage configurations with access controls applied." },
            { label: "During Processing", desc: "Sensitive data access is limited to authorized processes and personnel. Logging practices are designed to minimize exposure of sensitive values." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 not-italic">
          {[
            { label: "Collection", desc: "Only data necessary for project delivery or service operation is collected." },
            { label: "Storage", desc: "Client data is not stored on Northspec systems beyond active project delivery." },
            { label: "Retention", desc: "Project files are deleted from our systems 90 days post-handoff unless retained by written agreement." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-brand-gold/10 bg-brand-gold/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "access-control",
    title: "Access Control",
    content: (
      <>
        <p>
          We apply the principle of least privilege across all systems we build and operate, both internally and in client projects.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Principle of Least Privilege", "Access to systems, data, and credentials is limited to the minimum necessary for the task at hand. No team member has broader access than their role requires."],
            ["Role-Based Permissions", "User roles and permissions are defined explicitly and enforced at the application level. Sensitive operations require elevated authorization."],
            ["Credential Management", "Credentials, tokens, and keys are never shared over insecure channels. Rotation guidance is provided as part of all project handoffs."],
            ["Subcontractor Access", "Any subcontractors or specialist partners who require system access are granted scoped, time-limited credentials with access revoked upon project completion."],
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
    id: "infrastructure",
    title: "Infrastructure Security",
    content: (
      <>
        <p>
          For systems hosted on Northspec-managed infrastructure, the following baseline security controls are applied:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            { label: "Hosting Environment", desc: "All systems are deployed on reputable cloud providers (AWS, Vercel) with established security certifications and infrastructure controls." },
            { label: "SSL/TLS Encryption", desc: "All connections to hosted applications are encrypted. SSL certificates are automatically provisioned and renewed." },
            { label: "Automated Patching", desc: "Server-level dependencies and runtimes are kept updated with automated patching for known vulnerabilities." },
            { label: "Activity Monitoring", desc: "Unusual activity, error spikes, and performance anomalies are monitored. Alerts are configured for early detection of potential issues." },
            { label: "Containerization", desc: "Applications are containerized where appropriate, reducing the attack surface and enabling clean isolation between services." },
            { label: "Backup & Recovery", desc: "Critical data and configuration is backed up with recovery procedures tested and documented before go-live." },
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
    id: "third-party",
    title: "Third-Party Services & Integrations",
    content: (
      <>
        <p>
          Third-party systems and integrations are one of the most common sources of risk in modern software. We evaluate all third-party tools and services before integrating them into client systems.
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["Pre-Integration Evaluation", "Before integrating any third-party service, we assess its security posture, data handling practices, and reputation. Known-vulnerable or poorly-maintained packages are avoided."],
            ["Minimal Permissions", "Third-party integrations are granted only the permissions required for their function. OAuth scopes are limited; API access is scoped to the minimum necessary."],
            ["Dependency Management", "All project dependencies are audited during development and before handoff. We use automated tools to flag known vulnerabilities in the dependency tree."],
            ["Client Notification", "If a significant vulnerability is identified in a third-party service used in a client&apos;s system, we notify the affected client and advise on remediation."],
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
    id: "shared-responsibility",
    title: "Shared Responsibility",
    content: (
      <>
        <p>
          Security is a shared responsibility. Northspec is responsible for building secure systems and maintaining secure infrastructure. Clients are responsible for maintaining secure operational practices on their side.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Northspec Is Responsible For</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "Secure system architecture and code",
                "Dependency management and updates",
                "Infrastructure security for hosted systems",
                "Timely notification of security incidents",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Clients Are Responsible For</p>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                "Maintaining secure user credentials and access policies",
                "Protecting API keys and secrets provided by Northspec",
                "Applying security updates to client-hosted infrastructure",
                "Reporting suspected incidents or anomalies promptly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500 italic text-center">
          Many clients continue with ongoing support to maintain security, apply updates, and adapt to evolving risks.
        </p>
      </>
    ),
  },
  {
    id: "vulnerability-disclosure",
    title: "Vulnerability Disclosure",
    content: (
      <>
        <p>
          If you discover a security vulnerability in our website or in a system we have built, we ask that you report it responsibly before public disclosure.
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic space-y-4">
          {[
            ["01", `Email ${SUPPORT_EMAIL} with the subject line "Security Disclosure"`],
            ["02", "Include a description of the vulnerability, affected URL or component, and steps to reproduce"],
            ["03", "Allow us 14 days to investigate and respond before any public disclosure"],
            ["04", "We will acknowledge receipt within 2 business days"],
          ].map(([num, text]) => (
            <div key={num} className="flex items-start gap-3 text-sm text-slate-400">
              <span className="text-[10px] font-bold text-brand-gold font-times tracking-widest shrink-0 pt-0.5">{num}</span>
              <span dangerouslySetInnerHTML={{ __html: text.replace(SUPPORT_EMAIL, `<a href="mailto:${SUPPORT_EMAIL}" class="text-brand-gold hover:underline font-bold">${SUPPORT_EMAIL}</a>`) }} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500 not-italic">
          We do not pursue legal action against researchers who follow this responsible disclosure process in good faith.
        </p>
      </>
    ),
  },
  {
    id: "incidents",
    title: "Incident Response",
    content: (
      <>
        <p>
          In the event of a confirmed security incident affecting client data or systems, the following response process applies:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 not-italic">
          {[
            { label: "Detection", desc: "Incidents are identified through monitoring alerts, client reports, or internal discovery." },
            { label: "Notification", desc: "Affected clients are notified within 72 hours of Northspec becoming aware of a confirmed breach, consistent with applicable data protection regulations." },
            { label: "Remediation", desc: "We work to contain, analyze, and remediate the incident as quickly as possible, providing updates throughout the process." },
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
    id: "ongoing",
    title: "Ongoing Security",
    content: (
      <>
        <p>
          Security is not a one-time configuration, it requires continuous attention. Unpatched systems, outdated dependencies, and evolving threat landscapes mean that security must be actively maintained after launch.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-6 not-italic">
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-3">Long-Term Security Partnerships</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Most clients continue with an ongoing retainer to maintain security updates, apply patches, monitor systems, and adapt to evolving risks. Without ongoing maintenance, even well-built systems become vulnerable over time.
          </p>
          <div className="mt-6 flex">
            <Button
              as="link"
              href="/retainers"
              variant="outline-dark"
              className="text-xs py-3"
            >
              View Retainer Plans
            </Button>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>
          For security-related inquiries, responsible disclosure, or to report a concern:
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Northspec Studio</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Security Inquiry`}
            className="text-brand-gold font-bold font-times hover:underline text-sm"
          >
            {SUPPORT_EMAIL}
          </a>
          <p className="mt-2 text-xs text-slate-600">Use subject line &ldquo;Security Disclosure&rdquo; for vulnerability reports, or &ldquo;Security Inquiry&rdquo; for general questions.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 not-italic">
          <Button as="link" href="/contact" variant="brand">
            Start a Project
          </Button>
          <Button
            as="link"
            href="https://calendar.app.google/XMN48TcybVjmij4C7"
            variant="outline-dark"
          >
            Book a Call
          </Button>
        </div>
      </>
    ),
  },
];

export default function SecurityPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />

      <div className="relative z-10 px-6 md:px-36 pt-40 pb-24 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">Security</span>
          </div>
          <h1 className="text-[2.7rem] md:text-[3.375rem] font-bold text-white font-times uppercase tracking-tight leading-[1.05]">
            Security Built Into Every System
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            We design and develop high throughput software, automation, and AI systems with security as a core priority. We protect your data, workflows, and operations with an enterprise grade security mindset.
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
