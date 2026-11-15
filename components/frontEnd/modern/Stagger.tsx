"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = { children: ReactNode; className?: string };

export function Stagger({ children, className }: Props) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={{ visible: { transition: { staggerChildren: 0.105 } } }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: Props) {
  return (
    <motion.div className={`motion-reduce:!transform-none motion-reduce:!opacity-100 ${className}`} variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
      {children}
    </motion.div>
  );
}
