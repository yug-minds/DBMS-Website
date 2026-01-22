import { useEffect } from "react";

const SITE_URL = "https://dawnbudsmodelschool.com";

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/academics", priority: "0.9", changefreq: "monthly" },
  { path: "/beyond-academics", priority: "0.8", changefreq: "monthly" },
  { path: "/facilities", priority: "0.8", changefreq: "monthly" },
  { path: "/gallery", priority: "0.7", changefreq: "weekly" },
  { path: "/admissions", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

export default function SitemapXml() {
  useEffect(() => {
    // Generate XML sitemap
    const today = new Date().toISOString().split("T")[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Set content type header if possible (for server-side rendering)
    // For client-side, we'll replace the document
    if (typeof document !== "undefined") {
      document.open("text/xml; charset=utf-8");
      document.write(xml);
      document.close();
    }
  }, []);

  return null;
}
