"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  priority?: boolean;
  style?: CSSProperties;
};

/** Illustration-only component; CMS media continues to come from the data source. */
export default function EditorialPhoto({ src, alt, className = "", imageClassName = "", eager = false, priority = false, style }: Props) {
  return (
    <motion.div
      className={cn("relative overflow-hidden bg-stone-300 motion-reduce:![clip-path:none]", className)}
      style={style}
      initial={{ clipPath: "inset(0 0 12% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`} />
    </motion.div>
  );
}
