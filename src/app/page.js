import Hero from "../components/home/Hero";
import ServicesOverview from "../components/home/ServicesOverview";
import FeaturedWork from "../components/home/FeaturedWork";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import site from "../content/site";
import FadeIn from "../components/animations/FadeIn";

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
      <FadeIn><ServicesOverview /></FadeIn>
      <FadeIn><FeaturedWork /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
      <FadeIn><FAQ /></FadeIn>
    </>
  );
}
