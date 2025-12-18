"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

const variants = {
  primary: "bg-white text-brand-dark hover:bg-slate-200",
  secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
  outline:
    "border border-white/20 bg-transparent text-white hover:bg-white/10",
  brand: "bg-gradient-to-r from-brand-gold to-[#B8860B] text-brand-dark font-semibold shadow-[0_0_20px_rgba(198,166,104,0.4)]",
};

export default function Button({
  as = "button",
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant] || variants.primary, className);

  const Content = () => (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'brand' && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );

  if (as === "link") {
    return (
      <Link href={href || "#"} className={classes} {...props}>
        <Content />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      <Content />
    </button>
  );
}
