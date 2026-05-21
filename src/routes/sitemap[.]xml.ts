import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE } from "@/config/site";
import { listCases } from "@/content/case-studies";


interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/oferta", changefreq: "monthly", priority: "0.9" },
  { path: "/oferta/energia", changefreq: "monthly", priority: "0.8" },
  { path: "/kalkulator-pompy-ciepla", changefreq: "monthly", priority: "0.8" },
  { path: "/realizacje", changefreq: "monthly", priority: "0.6" },
  { path: "/zespol", changefreq: "monthly", priority: "0.6" },
  { path: "/kontakt", changefreq: "monthly", priority: "0.7" },
  { path: "/wiedza", changefreq: "weekly", priority: "0.8" },
  {
    path: "/wiedza/pompy-ciepla/cennik-pomp-ciepla-2026",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/wiedza/pompy-ciepla/gruntowa-pompa-ciepla-kompletny-przewodnik",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/wiedza/pompy-ciepla/zbiorniki-cwu-do-pompy-ciepla",
    changefreq: "monthly",
    priority: "0.7",
  },
  { path: "/lab", changefreq: "weekly", priority: "0.7" },
  { path: "/polityka-prywatnosci", changefreq: "yearly", priority: "0.2" },
  { path: "/polityka-cookies", changefreq: "yearly", priority: "0.2" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const dynamicEntries: SitemapEntry[] = listCases().map((c) => ({
          path: `/realizacje/${c.slug}`,
          lastmod: c.updatedAt ?? c.publishedAt,
          changefreq: "monthly",
          priority: "0.7",
        }));
        const urls = [...STATIC_ENTRIES, ...dynamicEntries].map((e) =>

          [
            `  <url>`,
            `    <loc>${SITE.url}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq
              ? `    <changefreq>${e.changefreq}</changefreq>`
              : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
