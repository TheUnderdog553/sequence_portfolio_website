"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  id?: string;
};

export default function SectionReveal({
  children,
  className,
  style,
  delay = 0,
  id,
}: SectionRevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
