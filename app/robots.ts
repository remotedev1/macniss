export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about-us", "/services", "/our-works", "/interior-gallery", "/contact"],
        disallow: ["/dashboard/", "/settings/", "/auth/", "/setup", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
