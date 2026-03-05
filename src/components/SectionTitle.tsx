"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4 tracking-wide uppercase">
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-gray"}`}
        >
          {description}
        </p>
      )}
      <div className={`mt-6 flex ${centered ? "justify-center" : ""}`}>
        <div className="w-16 h-1 rounded-full bg-gold" />
        <div className="w-4 h-1 rounded-full bg-gold/40 ml-1" />
      </div>
    </motion.div>
  );
}
