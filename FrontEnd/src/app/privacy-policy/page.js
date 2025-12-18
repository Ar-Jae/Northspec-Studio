import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import FadeIn from "../../components/animations/FadeIn";

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
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            description="How we collect, use, and protect your personal information."
          />

          <div className="mt-16 max-w-3xl space-y-8">
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Introduction</h3>
                <p>
                  Northspec Studio ("we" or "us" or "our") operates the northspecstudio.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Information Collection and Use</h3>
                <p className="mb-3">
                  We collect several different types of information for various purposes to provide and improve our Service to you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include but is not limited to:
                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                      <li>Email address</li>
                      <li>First name and last name</li>
                      <li>Company name</li>
                      <li>Cookies and Usage Data</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's IP address, browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Use of Data</h3>
                <p className="mb-3">
                  Northspec Studio uses the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Security of Data</h3>
                <p>
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Changes to This Privacy Policy</h3>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white font-serif mb-2">Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
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
