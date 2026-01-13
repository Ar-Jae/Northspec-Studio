import Hero from "../components/home/Hero";
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
    </>
  );
}
