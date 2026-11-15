"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
export default function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`overflow-hidden motion-reduce:![clip-path:none] ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
