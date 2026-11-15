// import { Footer } from "@/components/frontEnd/Footer";

import Footer from "@/components/frontEnd/Footer";
import Header from "@/components/frontEnd/Header";
import PublicMotionProvider from "@/components/frontEnd/modern/PublicMotionProvider";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    areaServed: ["Bengaluru", "Kodagu", "Karnataka"],
    knowsAbout: [
      "Property development",
      "Residential construction",
      "Commercial construction",
      "Estate construction",
      "Interior fit-out",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default async function RootLayout({ children }) {
  return (
    <PublicMotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="macniss-public font-sans min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </PublicMotionProvider>
  );
}
