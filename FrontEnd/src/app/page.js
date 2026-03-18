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
  title: "Build, Launch, and Scale Software That Actually Works | Northspec Studio",
  description:
    "Northspec Studio designs and develops production-ready applications, automation systems, and platforms for startups and growing businesses.",
  openGraph: {
    title: "Northspec Studio | Product Development & Automation for Startups",
    description:
      "We build MVPs, automation systems, and scalable platforms for startups and growing businesses. Serious projects only.",
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
