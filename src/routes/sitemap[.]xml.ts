import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://developer-galib.lovable.app";

const STATIC_PATHS = ["/", "/about", "/skills", "/projects", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = STATIC_PATHS.map((path) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${path}</loc>`,
            "    <changefreq>weekly</changefreq>",
            `    <priority>${path === "/" ? "1.0" : "0.8"}</priority>`,
            "  </url>",
          ].join("\n"),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
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
