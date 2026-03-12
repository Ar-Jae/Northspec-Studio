import Hero from "../components/home/Hero";
import HomeBookingCalendar from "../components/home/HomeBookingCalendar";

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
    <main>
      <Hero />
      <HomeBookingCalendar />
    </main>
  );
}
