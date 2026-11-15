import type { Metadata } from "next";

export const SITE_URL = "https://macnissbuilders.in";
export const SITE_NAME = "Macniss Builders";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;
  const socialImage = absoluteUrl("/website-thumbnail.jpg");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: socialImage,
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
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
