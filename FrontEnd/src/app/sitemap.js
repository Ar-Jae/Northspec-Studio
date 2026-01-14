import site from "../content/site";

export default function sitemap() {
  const lastModified = new Date();
  
  // Extract all routes including children
  const routes = [];
  
  site.nav.forEach((item) => {
    routes.push(item.href);
    if (item.children) {
      item.children.forEach((child) => {
        routes.push(child.href);
      });
    }
  });

  // Remove duplicates and normalize
  const uniqueRoutes = [...new Set(routes)];

  return uniqueRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
