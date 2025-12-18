import site from "../content/site";

export default function sitemap() {
  const lastModified = new Date();
  const routes = site.nav.map((item) => item.href);

  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
