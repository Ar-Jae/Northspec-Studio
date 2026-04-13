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
  title: "AI Systems That Run Your Business | Northspec Studio",
  description:
    "We design and implement AI automation, agents, and systems that reduce manual work, automate operations, and scale your business without increasing headcount.",
  openGraph: {
    title: "Northspec Studio | AI Automation & Systems for Business",
    description:
      "We design and implement AI automation, agents, and systems that reduce manual work, improve efficiency, and scale your business.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="relative bg-brand-dark">
      {/* Persistent 3D canvas. fixed behind everything */}
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
