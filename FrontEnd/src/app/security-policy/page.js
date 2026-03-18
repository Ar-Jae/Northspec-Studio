import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Security Policy",
  description: "How Northspec Studio handles security across its website and client engagements.",
  openGraph: {
    title: "Security Policy",
    description: "How Northspec Studio handles security across its website and client engagements.",
    url: "/security-policy",
  },
};

function Section({ title, children }) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] flex-grow bg-white/[0.03]" />
        <h3 className="text-xl font-bold text-white font-serif uppercase tracking-widest whitespace-nowrap">
          {title}
        </h3>
        <div className="h-[1px] flex-grow bg-white/[0.03]" />
      </div>
      {children}
    </div>
  );
}

function Card({ children, gold }) {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm text-left ${gold ? "border-brand-gold/10 bg-brand-gold/[0.02]" : "border-white/5 bg-white/[0.02]"}`}>
      {children}
    </div>
  );
}

export default function SecurityPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Security"
            title="Security Policy"
            description="Our approach to security across our website, client systems, and internal operations. Last updated: March 2026."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">

              <Section title="Our Approach">
                <p>
                  Security is not an afterthought at Northspec Studio ("Northspec") — it is built into every project from the specification phase. We apply industry-standard security practices to our own systems and to every codebase we deliver.
                </p>
              </Section>

              <Section title="Website Security">
                <p className="mb-6">
                  The northspecstudio.com website is built with security as a baseline requirement:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-italic font-sans">
                  <Card gold>
                    <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-3">Transport</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• HTTPS enforced on all pages</li>
                      <li>• TLS 1.2+ only</li>
                      <li>• HSTS headers enabled</li>
                      <li>• Secure cookie attributes</li>
                    </ul>
                  </Card>
                  <Card>
                    <strong className="text-white uppercase tracking-widest text-xs block mb-3">Application</strong>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Input validation on all forms</li>
                      <li>• CSRF protection on API routes</li>
                      <li>• Content Security Policy headers</li>
                      <li>• No sensitive data stored client-side</li>
                    </ul>
                  </Card>
                </div>
              </Section>

              <Section title="Client Project Security">
                <p className="mb-6">
                  Every system we build for clients follows a security-first engineering process:
                </p>
                <Card gold>
                  <ul className="grid gap-3 sm:grid-cols-2 text-sm not-italic font-sans text-slate-300">
                    <li>• Authentication using established libraries (NextAuth, Clerk, Auth0)</li>
                    <li>• Role-based access control on all sensitive routes</li>
                    <li>• Environment variables for all secrets — never hardcoded</li>
                    <li>• SQL parameterization to prevent injection attacks</li>
                    <li>• Dependency audits before project handoff</li>
                    <li>• Secrets rotation guidance included in handoff docs</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Data Handling">
                <p className="mb-6">
                  We minimize data collection and handle what we do collect responsibly:
                </p>
                <div className="grid gap-4 sm:grid-cols-3 not-italic font-sans">
                  {[
                    { label: "Collection", desc: "Only data necessary for project delivery is collected." },
                    { label: "Storage", desc: "Client data is never stored on Northspec systems beyond project delivery." },
                    { label: "Retention", desc: "Project files are deleted from our systems 90 days post-handoff unless retained by agreement." },
                  ].map((item) => (
                    <Card key={item.label}>
                      <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">{item.label}</strong>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </Section>

              <Section title="Vulnerability Disclosure">
                <p className="mb-6">
                  If you discover a security vulnerability on our website or in a system we have built, we ask that you report it responsibly:
                </p>
                <Card>
                  <ol className="space-y-3 text-sm not-italic font-sans text-slate-300 list-none">
                    <li><span className="text-brand-gold font-bold mr-2">1.</span>Email us at{" "}
                      <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline font-bold">
                        build@northspecstudio.com
                      </a>
                      {" "}with subject line "Security Disclosure"
                    </li>
                    <li><span className="text-brand-gold font-bold mr-2">2.</span>Include a description of the vulnerability and steps to reproduce</li>
                    <li><span className="text-brand-gold font-bold mr-2">3.</span>Allow us 14 days to investigate before public disclosure</li>
                    <li><span className="text-brand-gold font-bold mr-2">4.</span>We will acknowledge receipt within 2 business days</li>
                  </ol>
                </Card>
              </Section>

              <Section title="Incident Response">
                <p>
                  In the event of a confirmed security incident affecting client data, affected clients will be notified within 72 hours of our becoming aware of the breach, consistent with applicable data protection regulations.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  For security-related inquiries, contact us at{" "}
                  <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline not-italic font-bold">
                    build@northspecstudio.com
                  </a>
                </p>
              </Section>

            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
