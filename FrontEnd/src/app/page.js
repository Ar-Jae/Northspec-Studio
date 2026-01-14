import Hero from "../components/home/Hero";
import site from "../content/site";

export const metadata = {
  title: "Elite Engineering for Scalable Software & Automation",
  description:
    "Northspec Studio provides senior-only engineering talent for custom software development, high-performance web apps, and intelligent workflow automations. Built to spec, built to last.",
  openGraph: {
    title: "Northspec Studio | Elite Engineering for Scalable Software",
    description:
      "Modern engineering collective specializing in durable software, workflow automation, and scalable technical infrastructure.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
