"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
type Props = { lines: ReactNode[]; className?: string; lineClassName?: string; delay?: number; as?: "h1" | "h2" | "div" };
export default function TextReveal({ lines, className = "", lineClassName = "", delay = 0, as = "div" }: Props) {
  const Tag = as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : motion.div;
  return (
    <Tag className={className} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: delay } } }}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[.10em] -mb-[.10em]">
          <motion.span
            className={`block motion-reduce:!transform-none motion-reduce:!opacity-100 ${lineClassName}`}
            variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } } }}
          >{line}</motion.span>
        </span>
      ))}
    </Tag>
  );
}
