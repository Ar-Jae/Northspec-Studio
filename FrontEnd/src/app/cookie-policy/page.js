import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Cookie Policy",
  description: "How Northspec Studio uses cookies and similar tracking technologies on its website.",
  openGraph: {
    title: "Cookie Policy",
    description: "How Northspec Studio uses cookies and similar tracking technologies on its website.",
    url: "/cookie-policy",
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

const cookieTypes = [
  {
    type: "Essential",
    description: "Required for the website to function. Cannot be disabled.",
    examples: "Session tokens, form security, load balancing",
    required: true,
  },
  {
    type: "Analytics",
    description: "Help us understand how visitors interact with the site.",
    examples: "Page views, session duration, referral source",
    required: false,
  },
  {
    type: "Functional",
    description: "Remember preferences to improve your experience.",
    examples: "Language settings, form pre-fill, UI preferences",
    required: false,
  },
  {
    type: "Marketing",
    description: "Used to deliver relevant content and track campaign performance.",
    examples: "Ad retargeting, conversion tracking",
    required: false,
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="bg-brand-dark min-h-[40vh] relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-24 pb-16 sm:pt-24 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Cookie Policy"
            description="This policy explains how we use cookies and similar technologies on northspecstudio.com. Last updated: March 2026."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">

              <Section title="What Are Cookies">
                <p>
                  Cookies are small text files stored on your device when you visit a website. They allow the site to remember information about your visit, such as your preferences or whether you have already submitted a form.
                </p>
              </Section>

              <Section title="How We Use Cookies">
                <p className="mb-6">
                  Northspec Studio ("Northspec") uses cookies to operate the website, understand how it is used, and improve the experience for visitors. We do not sell cookie data to third parties.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 not-italic font-sans">
                  {cookieTypes.map((c) => (
                    <Card key={c.type} gold={c.required}>
                      <div className="flex items-center justify-between mb-3">
                        <strong className="text-white uppercase tracking-widest text-xs">{c.type}</strong>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${c.required ? "bg-brand-gold/20 text-brand-gold" : "bg-white/5 text-slate-500"}`}>
                          {c.required ? "Required" : "Optional"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{c.description}</p>
                      <p className="text-xs text-slate-600">{c.examples}</p>
                    </Card>
                  ))}
                </div>
              </Section>

              <Section title="Third-Party Cookies">
                <p className="mb-6">
                  Some features on our site may be provided by third parties who set their own cookies. These may include:
                </p>
                <Card>
                  <ul className="space-y-2 text-sm not-italic font-sans text-slate-300">
                    <li>• Google Calendar, for booking integration</li>
                    <li>• Analytics providers, for anonymous usage data</li>
                    <li>• Form services, for contact and application submissions</li>
                  </ul>
                </Card>
              </Section>

              <Section title="Your Choices">
                <p className="mb-6">
                  You can control or delete cookies at any time through your browser settings. Disabling cookies may affect certain functionality of the site.
                </p>
                <Card gold>
                  <p className="text-sm not-italic font-sans text-slate-300">
                    Most browsers allow you to refuse cookies, delete existing cookies, and set preferences per site. Refer to your browser's help documentation for instructions.
                  </p>
                </Card>
              </Section>

              <Section title="GDPR & CCPA">
                <p>
                  For visitors in the EU, UK, or California, you have additional rights regarding personal data collected via cookies. You may request access to, correction of, or deletion of your data by contacting us directly.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  Questions about our cookie practices can be directed to{" "}
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
