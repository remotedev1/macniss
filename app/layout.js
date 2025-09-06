import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Providers } from "./Providers";
import PageLoader from "@/components/common/PageLoader";

export const metadata = {
  title:
    "Macniss - Builders Private Limited | Trusted Home & Commercial Construction in Bangalore",
  description:
    "Macniss Builders Private Limited is a trusted construction company in Bangalore, specializing in residential villas, commercial projects, and turnkey solutions. Quality, transparency, and on-time delivery are our promise.",
  keywords: [
    "Macniss Builders",
    "construction company Bangalore",
    "construction company kodagu",
    "villa builders Bangalore",
    "commercial builders",
    "turnkey construction",
    "residential construction",
    "home builders in Bangalore",
    "home builders in kodagu",
    "interior designers in Bangalore",
    "interior designers in kodagu",
  ],
  metadataBase: new URL("https://macnissbuilders.in"),
  alternates: {
    canonical: "https://macnissbuilders.in",
  },
  openGraph: {
    title:
      "Macniss Builders Private Limited | Trusted Home & Commercial Construction in Bangalore",
    description:
      "Building dreams with quality & trust. Explore residential and commercial construction services with Macniss Builders Private Limited, Bangalore.",
    url: "https://macnissbuilders.in",
    siteName: "Macniss Builders Private Limited",
    images: [
      {
        url: "/website-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Macniss Builders Private Limited",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Macniss Builders Private Limited | Trusted Construction in Bangalore",
    description:
      "Residential & commercial construction in Bangalore with guaranteed quality and on-time delivery.",
    images: ["/website-thumbnail.jpg"],
    creator: "@macnissbuilders", // update if you have a Twitter handle
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
