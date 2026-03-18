import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data handling practices for Northspec Studio.",
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy policy and data handling practices for Northspec Studio.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description="How we collect, use, and protect your personal information."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center sm:text-left">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">
              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Introduction
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p>
                  Northspec Studio ("Northspec") ("we" or "us" or "our") operates the northspecstudio.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Information Collection and Use
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p className="mb-6">
                  We collect several different types of information for various purposes to provide and improve our Service to you:
                </p>
                <div className="grid gap-6 sm:grid-cols-2 text-left">
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    <strong className="text-brand-gold uppercase tracking-widest text-sm block mb-3">Personal Data</strong>
                    <ul className="space-y-2 text-sm not-italic font-sans text-slate-300">
                      <li>• Email address</li>
                      <li>• First and last name</li>
                      <li>• Company name</li>
                      <li>• Cookies & Usage Data</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    <strong className="text-brand-gold uppercase tracking-widest text-sm block mb-3">Usage Data</strong>
                    <p className="text-sm not-italic font-sans text-slate-300">
                      Information on how the Service is accessed and used, including IP addresses, browser types, and page visit duration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Use of Data
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <div className="p-8 rounded-2xl border border-brand-gold/10 bg-brand-gold/[0.02] backdrop-blur-sm text-left">
                  <p className="mb-4 text-white text-center">Northspec uses the collected data to:</p>
                  <ul className="grid gap-3 sm:grid-cols-2 text-sm not-italic font-sans text-slate-300">
                    <li>• Provide and maintain our Service</li>
                    <li>• Notify you about changes</li>
                    <li>• Offer customer support</li>
                    <li>• Gather analysis for improvements</li>
                    <li>• Monitor service usage</li>
                    <li>• Ensure security integrity</li>
                  </ul>
                </div>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Security of Data
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p>
                  The security of your data is paramount. While no method of electronic storage is 100% secure, we utilize industry-standard protocols to protect your information and maintain confidentiality.
                </p>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Contact
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p>
                  For questions regarding this policy or our data practices, contact us at{" "}
                  <a href="mailto:build@northspecstudio.com" className="text-brand-gold hover:underline not-italic font-bold">
                    build@northspecstudio.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
