import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Accessibility Commitment | Northspec Studio",
  description:
    "Northspec Studio is committed to ensuring digital accessibility for all users. We aim to conform to WCAG 2.1 Level AA. Learn how to report accessibility issues.",
  openGraph: {
    title: "Accessibility Commitment | Northspec Studio",
    description:
      "We follow WCAG 2.1 Level AA standards and continuously work to improve accessibility across our website. Contact us to report any issues.",
    url: "/accessibility",
  },
};

const SUPPORT_EMAIL = "build@northspecstudio.com";
const LAST_REVIEWED = "March 2026";
const EFFECTIVE_DATE = "March 18, 2026";

const sections = [
  {
    id: "commitment",
    title: "Our Commitment",
    content: (
      <>
        <p>
          Northspec Studio is committed to improving accessibility and usability for all visitors, including individuals with disabilities. We recognize that digital accessibility is an essential component of professional software engineering and enterprise-grade user experience.
        </p>
        <div className="mt-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5 not-italic">
          <p className="text-sm text-white font-bold font-times leading-relaxed uppercase tracking-wide">
            Accessibility is a core standard, not a compliance checklist.
          </p>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            We follow recognized industry standards and take accessibility seriously from the architectural level up.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "standard",
    title: "Standards (WCAG)",
    content: (
      <>
        <p>
          We aim to conform to the <strong className="text-white not-italic">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>, which define recognized best practices for accessible digital experiences.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 not-italic">
          {[
            { label: "Standard", value: "WCAG 2.1 Level AA" },
            { label: "Conformance Status", value: "Targeted & Active" },
            { label: "Last Audit", value: LAST_REVIEWED },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white font-times uppercase">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-500 not-italic">
          Level AA is the globally recognized standard for most modern web experiences and enterprise applications.
        </p>
      </>
    ),
  },
  {
    id: "principles",
    title: "Accessibility Principles",
    content: (
      <>
        <p>
          WCAG 2.1 is organized around four core principles. Here&apos;s how we address each:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          {[
            {
              label: "Perceivable",
              desc: "Content is presented in ways that users can perceive. We maintain sufficient color contrast ratios, use alt text for meaningful images, and avoid content that relies solely on sensory characteristics.",
            },
            {
              label: "Operable",
              desc: "Interface components and navigation are operable via keyboard. We include visible focus indicators, avoid keyboard traps, and ensure interactive elements are reachable without a mouse.",
            },
            {
              label: "Understandable",
              desc: "Content and operation are understandable. Pages have clear structure, labels, and instructions. Error messages are descriptive and guide users toward resolution.",
            },
            {
              label: "Robust",
              desc: "Content is robust enough to be interpreted by assistive technologies. We use semantic HTML, ARIA attributes where appropriate, and test against common screen reader behavior.",
            },
          ].map((p) => (
            <div key={p.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-times mb-2">{p.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "measures",
    title: "Measures We Take",
    content: (
      <>
        <p>
          We take the following concrete measures to ensure accessibility across our website:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 not-italic">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Design</p>
            <ul className="space-y-2">
              {[
                "Sufficient color contrast ratios (4.5:1 minimum for body text)",
                "Scalable text without loss of functionality up to 200%",
                "No content that flashes more than 3 times per second",
                "Visible focus indicators on all interactive elements",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times mb-3">Code</p>
            <ul className="space-y-2">
              {[
                "Semantic HTML structure throughout all pages",
                "ARIA labels on interactive and dynamic components",
                "Full keyboard navigation support",
                "Descriptive page titles and heading hierarchy",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
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
    id: "limitations",
    title: "Known Limitations",
    content: (
      <>
        <p>
          Despite our efforts, some areas of the site do not yet fully meet all WCAG 2.1 AA criteria. We are transparent about these limitations and actively working to resolve them:
        </p>
        <div className="mt-5 space-y-3 not-italic">
          {[
            ["3D Canvas Background", "The WebGL canvas background animation does not have a fully accessible non-animated fallback for users with motion sensitivity preferences (prefers-reduced-motion). We are evaluating a static fallback."],
            ["Third-Party Booking Calendar", "The embedded appointment scheduling calendar is a third-party component and may not fully conform to WCAG AA. We have limited control over its accessibility implementation."],
            ["Complex Animations", "Some Framer Motion-based animations may not fully respect the prefers-reduced-motion media query across all browsers. This is under active review."],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 mt-2 shrink-0" />
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
    id: "improvement",
    title: "Continuous Improvement",
    content: (
      <p>
        Accessibility is an ongoing effort, not a one-time checklist. We regularly audit our website, review new features against WCAG criteria, and incorporate accessibility improvements into every development cycle. When we build or rebuild any section of the site, accessibility is part of the acceptance criteria, not an afterthought.
      </p>
    ),
  },
  {
    id: "feedback",
    title: "Feedback & Reporting",
    content: (
      <>
        <p>
          If you experience any difficulty accessing content, using our website, or experience a barrier, please let us know. We take all accessibility input seriously and aim to resolve issues promptly.
        </p>
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 not-italic space-y-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-times">When reporting an issue, include:</p>
          {[
            "The URL of the page where you encountered the problem",
            "A description of what you were trying to do and what barrier you encountered",
            "Your preferred method of contact and any assistive technology in use",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
              <span className="text-brand-gold/40 mt-0.5 shrink-0">›</span>
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-400 not-italic">
          Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Accessibility Feedback`} className="text-brand-gold hover:underline font-bold">
            {SUPPORT_EMAIL}
          </a>
          {" "}with the subject line <strong className="text-white uppercase tracking-wider">&ldquo;Accessibility Feedback&rdquo;</strong>.
        </p>

        <div className="mt-8 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-6 py-5 not-italic">
          <p className="text-sm text-white font-bold font-times mb-1 uppercase tracking-widest">Need Assistance?</p>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            If you need help accessing any part of our website or require content in an alternative format, we are here to assist. reach out and we’ll make sure you get what you need.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Accessibility Assistance`}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark font-bold font-times uppercase tracking-widest text-[10px] rounded-lg px-4 py-2 hover:bg-brand-gold/90 transition-colors"
          >
            Get Assistance
          </a>
        </div>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Formal Complaints",
    content: (
      <p>
        If you are not satisfied with our response to your accessibility feedback, you may contact the relevant authority in your jurisdiction. For U.S. users, accessibility concerns related to digital services may be directed to the relevant state or federal civil rights body. For EU residents, this may be your national data protection or equality authority.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />

      <div className="relative z-10 px-6 md:px-36 pt-40 pb-24 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] font-times">Accessibility</span>
          </div>
          <h1 className="text-[2.7rem] md:text-[3.375rem] font-bold text-white font-times uppercase tracking-tight leading-[1.05]">
            Accessibility Commitment
          </h1>
          <p className="mt-6 text-lg text-slate-400 font-medium italic leading-relaxed max-w-2xl">
            We are committed to ensuring our website and digital services are accessible to all users. At Northspec Studio, we follow recognized standards and take accessibility seriously from initial architecture to final deployment.
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
