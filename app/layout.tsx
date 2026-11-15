import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./fonts.css";
import "./globals.css";
import { Providers } from "./Providers";
import PageLoader from "@/components/common/PageLoader";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: {
    default: "Macniss Builders | Property Development & Construction in Karnataka",
    template: "%s | Macniss Builders",
  },
  description:
    "Macniss Builders delivers residential, commercial and estate projects in Bengaluru, Kodagu and across Karnataka, from planning through construction and handover.",
  keywords: [
    "Macniss Builders",
    "construction company Bengaluru",
    "property development Karnataka",
    "residential construction Bengaluru",
    "commercial construction Karnataka",
    "estate construction Kodagu",
    "interior fit-out Bengaluru",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Macniss Builders | Property Development & Construction in Karnataka",
    description:
      "Residential, commercial and estate projects in Bengaluru, Kodagu and across Karnataka, from planning through construction and handover.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl("/website-thumbnail.jpg"),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macniss Builders | Property Development & Construction in Karnataka",
    description:
      "Residential, commercial and estate projects in Bengaluru, Kodagu and across Karnataka.",
    images: [absoluteUrl("/website-thumbnail.jpg")],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <Providers>
            {children}
            <PageLoader />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
