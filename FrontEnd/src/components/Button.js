"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ArrowRight } from "lucide-react";

const base =
  "group relative inline-flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.95]";

const variants = {
  brand: "bg-brand-gold text-brand-dark border-brand-gold hover:text-white",
  "brand-dark": "bg-brand-dark text-white border-brand-dark hover:text-brand-dark",
  "outline-dark": "bg-transparent text-white border-white/20 hover:text-brand-dark",
};

export default function Button({
  as = "button",
  href,
  onClick,
  type = "button",
  variant = "brand",
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant] || variants.brand, className);

  const Content = () => (
    <>
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className="absolute w-4 h-4 left-[-25%] group-hover:left-4 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[10]" 
      />

      {/* Text */}
      <span className="relative z-[10] -translate-x-3 group-hover:translate-x-3 transition-all duration-[600ms] ease-out">
        {children}
      </span>

      {/* Circle Layer */}
      <span className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full opacity-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-[5]",
        (variant === "brand") ? "bg-brand-dark" : "bg-brand-gold"
      )}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className="absolute w-4 h-4 right-4 group-hover:right-[-25%] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[10]" 
      />
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
