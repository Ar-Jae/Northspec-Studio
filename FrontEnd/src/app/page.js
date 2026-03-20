import BackgroundCanvasClient from "../components/3d/BackgroundCanvasClient";
import ImmersiveHero from "../components/home/ImmersiveHero";
import TrustStrip from "../components/home/TrustStrip";
import WhoWeWorkWith from "../components/home/WhoWeWorkWith";
import ServicesSection from "../components/home/ServicesSection";
import ProcessSection from "../components/home/ProcessSection";
import PricingSection from "../components/home/PricingSection";
import OngoingSupport from "../components/home/OngoingSupport";
import Differentiator from "../components/home/Differentiator";
import CaseStudy from "../components/home/CaseStudy";
import FinalCTA from "../components/home/FinalCTA";
import ContactSection from "../components/home/ContactSection";

export const metadata = {
  title: "Build, Launch, and Scale Software That Works for You | Northspec Studio",
  description:
    "Northspec Studio designs and develops production ready applications, automation systems, and scalable platforms that help startups and growing businesses operate more efficiently and scale with confidence.",
  openGraph: {
    title: "Northspec Studio | Product Development & Automation for Startups",
    description:
      "We design and develop production ready applications, automation systems, and scalable platforms that help startups and growing businesses operate more efficiently and scale with confidence.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="relative bg-brand-dark">
      {/* Persistent 3D canvas - fixed behind everything */}
      <BackgroundCanvasClient />

      {/* All sections flow as one continuous page */}
      <ImmersiveHero />
      <TrustStrip />
      <WhoWeWorkWith />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <OngoingSupport />
      <Differentiator />
      <CaseStudy />
      <FinalCTA />
      <ContactSection />
    </div>
  );
}
