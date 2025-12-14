import Hero from "../components/home/Hero";
import LogoCloud from "../components/home/LogoCloud";
import ServicesOverview from "../components/home/ServicesOverview";
import FeaturedWork from "../components/home/FeaturedWork";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTASection from "../components/home/CTASection";
import site from "../content/site";

export const metadata = {
  title: site.name,
  description:
    "Northspec Studio builds and maintains web and software products to spec with clean code, clear scope, and reliable delivery.",
  openGraph: {
    title: site.name,
    description:
      "Northspec Studio builds and maintains web and software products to spec with clean code, clear scope, and reliable delivery.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <ServicesOverview />
      <FeaturedWork />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
