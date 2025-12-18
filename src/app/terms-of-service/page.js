import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";

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
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Terms of Service"
            description="Please read these terms and conditions carefully before using our website."
          />

          <div className="mt-16 max-w-3xl space-y-8">
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Agreement to Terms</h3>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Use License</h3>
                <p className="mb-3">
                  Permission is granted to temporarily download one copy of the materials (information or software) on Northspec Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Disclaimer</h3>
                <p>
                  The materials on Northspec Studio's website are provided on an "as is" basis. Northspec Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Limitations</h3>
                <p>
                  In no event shall Northspec Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if Northspec Studio or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Accuracy of Materials</h3>
                <p>
                  The materials appearing on Northspec Studio's website could include technical, typographical, or photographic errors. Northspec Studio does not warrant that any of the materials on its website are accurate, complete, or current. Northspec Studio may make changes to the materials contained on its website at any time without notice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Links</h3>
                <p>
                  Northspec Studio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Northspec Studio of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Modifications</h3>
                <p>
                  Northspec Studio may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Governing Law</h3>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Northspec Studio operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Contact Us</h3>
                <p>
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:hello@northspecstudio.com" className="text-brand-gold hover:underline">
                    hello@northspecstudio.com
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
