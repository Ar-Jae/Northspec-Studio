import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service and conditions for using Northspec Studio's website and services.",
  openGraph: {
    title: "Terms of Service",
    description: "Terms of service and conditions for using Northspec Studio's website and services.",
    url: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Terms of Service"
            description="Please read these terms and conditions carefully before using our website."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-12 text-center">
            <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium italic">
              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Agreement to Terms
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Use License
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p className="mb-6">
                  Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                  <ul className="grid gap-4 sm:grid-cols-2 text-sm not-italic font-sans text-slate-300">
                    <li>• Modify or copy the materials</li>
                    <li>• Use for any commercial purpose</li>
                    <li>• Attempt to decompile or reverse engineer</li>
                    <li>• Remove any proprietary notations</li>
                    <li>• Transfer materials to another "mirror"</li>
                    <li>• Create derivative works</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-12 lg:grid-cols-2">
                <div className="relative group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] flex-grow bg-white/[0.03]" />
                    <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                      Disclaimer
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  </div>
                  <div className="p-6 rounded-2xl border border-brand-gold/10 bg-brand-gold/[0.02] backdrop-blur-sm">
                    <p className="text-sm not-italic font-sans text-slate-300">
                      Materials are provided on an "as is" basis. Northspec Studio ("Northspec") makes no warranties, expressed or implied, and hereby disclaims all other warranties including fitness for a particular purpose.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] flex-grow bg-white/[0.03]" />
                    <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                      Limitations
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    <p className="text-sm not-italic font-sans text-slate-300">
                      In no event shall Northspec or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest whitespace-nowrap">
                    Governance
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Northspec operates.
                </p>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                  <h3 className="text-xl font-bold text-white font-times uppercase tracking-widest">
                    Contact
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p>
                  If you have any questions about these Terms of Service, please contact us at{" "}
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
