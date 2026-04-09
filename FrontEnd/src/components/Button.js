"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ArrowRight } from "lucide-react";

const base =
  "group relative inline-flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95]";

const variants = {
  primary: "bg-white text-brand-dark hover:bg-slate-200",
  secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
  outline:
    "border border-[#333333]/40 bg-transparent text-[#111111] hover:text-white",
  brand: "bg-brand-gold text-brand-dark border-brand-gold/40 hover:text-white",
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
  const classes = cn(base, variants[variant] || variants.outline, className);

  const bgCircleColor = variant === "brand" ? "bg-brand-gold" : "bg-[#111111]";
  const circleHoverColor = variant === "brand" ? "group-hover:bg-[#111111]" : "group-hover:bg-[#111111]";
  // If brand, start gold and transition to black? 
  // User said: "all the black buttons should return to gold and all the gold button just turned to black"
  // This likely refers to the "circle" animation or the base state.
  
  const Content = () => (
    <>
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className="absolute w-4 h-4 left-[-25%] stroke-current fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {children}
      </span>

      {/* Circle Layer */}
      <span className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[150%] group-hover:h-[500%] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        variant === "brand" ? "bg-[#111111]" : "bg-brand-gold"
      )}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className="absolute w-4 h-4 right-4 stroke-current fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
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
