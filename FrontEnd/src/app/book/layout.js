import site from "../../content/site";

export const metadata = {
  title: `Book a Call | ${site.name}`,
  description: "Schedule a discovery call with Northspec Studio to discuss your project requirements, timeline, and technical strategy.",
  openGraph: {
    title: `Book a Call | ${site.name}`,
    description: "Schedule a discovery call with Northspec Studio to discuss your project requirements, timeline, and technical strategy.",
    url: "/book",
  },
};

export default function BookLayout({ children }) {
  return children;
}
