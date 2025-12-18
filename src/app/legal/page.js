import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";

export const metadata = {
  title: "Legal",
  description: "Terms of service, privacy policy, and legal information for Northspec Studio.",
  openGraph: {
    title: "Legal",
    description: "Terms of service, privacy policy, and legal information for Northspec Studio.",
    url: "/legal",
  },
};

export default function LegalPage() {
  return (
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Terms & Privacy"
            description="Important information about using our services and how we handle your data."
          />

          <div className="mt-16 max-w-3xl space-y-16">
            {/* Terms of Service */}
            <section className="space-y-6">
              <h2 className="text-2xl font-serif font-semibold text-white">Terms of Service</h2>
              
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-white mb-2">1. Agreement to Terms</h3>
                  <p>
                    By accessing and using this website and services provided by Northspec Studio ("Services"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">2. Use License</h3>
                  <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Northspec Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">3. Disclaimer</h3>
                  <p>
                    The materials on Northspec Studio's website are provided on an 'as is' basis. Northspec Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">4. Limitations</h3>
                  <p>
                    In no event shall Northspec Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Northspec Studio's website, even if Northspec Studio or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">5. Accuracy of Materials</h3>
                  <p>
                    The materials appearing on Northspec Studio's website could include technical, typographical, or photographic errors. Northspec Studio does not warrant that any of the materials on the website are accurate, complete, or current. Northspec Studio may make changes to the materials contained on its website at any time without notice.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">6. Links</h3>
                  <p>
                    Northspec Studio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Northspec Studio of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">7. Modifications</h3>
                  <p>
                    Northspec Studio may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">8. Governing Law</h3>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section className="space-y-6 border-t border-white/10 pt-16">
              <h2 className="text-2xl font-serif font-semibold text-white">Privacy Policy</h2>
              
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-white mb-2">1. Introduction</h3>
                  <p>
                    Northspec Studio ("we" or "us" or "our") operates the northspecstudio.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">2. Information Collection and Use</h3>
                  <p>
                    We collect several different types of information for various purposes to provide and improve our Service to you:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                    <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include but is not limited to:
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Company name</li>
                        <li>Cookies and Usage Data</li>
                      </ul>
                    </li>
                    <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's IP address, browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">3. Use of Data</h3>
                  <p>
                    Northspec Studio uses the collected data for various purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information so we can improve our Service</li>
                    <li>To monitor the usage of our Service</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">4. Security of Data</h3>
                  <p>
                    The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">5. Changes to This Privacy Policy</h3>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">6. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:hello@northspecstudio.com" className="text-brand-gold hover:underline">
                      hello@northspecstudio.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
