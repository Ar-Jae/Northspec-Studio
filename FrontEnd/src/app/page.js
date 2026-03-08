import Hero from "../components/home/Hero";
import site from "../content/site";

export const metadata = {
  title: "Automation + Engineering for Established Local Companies",
  description:
    "Northspec Studio helps local established businesses drive operational gains with AI workflow automation, software engineering, and mobile app development.",
  openGraph: {
    title: "Northspec Studio | Automation + Engineering for Local Business",
    description:
      "Outcome-driven engineering partner for workflow automation, web/backend systems, and mobile app delivery.",
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
