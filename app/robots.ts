import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about-us", "/services", "/our-works", "/interior-gallery", "/contact"],
        disallow: ["/dashboard/", "/settings/", "/auth/", "/setup", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
