import site from "../../../content/site";

export const metadata = {
  title: `Why Northspec | ${site.name}`,
  description: "What sets Northspec Studio apart from other engineering agencies. Our philosophy, approach, and commitment to technical excellence.",
  openGraph: {
    title: `Why Northspec | ${site.name}`,
    description: "What sets Northspec Studio apart from other engineering agencies. Our philosophy, approach, and commitment to technical excellence.",
    url: "/about/why-northspec",
  },
};

export default function WhyNorthspecLayout({ children }) {
  return children;
}
