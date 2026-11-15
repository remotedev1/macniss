import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Construction Portfolio",
  "Explore residential, commercial and estate projects across Karnataka, including developments in Bengaluru and Kodagu.",
  "/our-works",
);

export default function WorksLayout({ children }: { children: ReactNode }) {
  return children;
}
