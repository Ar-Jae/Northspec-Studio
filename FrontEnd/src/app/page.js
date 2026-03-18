import BackgroundCanvasClient from "../components/3d/BackgroundCanvasClient";
import ImmersiveHero from "../components/home/ImmersiveHero";
import ServicesSection from "../components/home/ServicesSection";
import WorkSection from "../components/home/WorkSection";
import ProcessSection from "../components/home/ProcessSection";
import PricingSection from "../components/home/PricingSection";
import ContactSection from "../components/home/ContactSection";

export const metadata = {
  title: "Automation, Software Engineering, and Mobile Apps for Growth",
  description:
    "Northspec Studio helps established companies improve operations through workflow automation, software engineering, and mobile app development. Built to spec, built to last.",
  openGraph: {
    title: "Northspec Studio | Automation + Engineering for Established Companies",
    description:
      "Outcome-driven delivery across AI automation, software engineering, and mobile app development with reliability built in.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="relative bg-brand-dark">
      {/* Persistent 3D canvas — fixed behind everything */}
      <BackgroundCanvasClient />

      {/* All sections flow as one continuous page */}
      <ImmersiveHero />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}
