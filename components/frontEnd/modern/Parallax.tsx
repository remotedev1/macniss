"use client";
import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax({ children, className = "", distance = 35 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="motion-reduce:!transform-none" style={{ y }}>{children}</motion.div>
    </div>
  );
}
