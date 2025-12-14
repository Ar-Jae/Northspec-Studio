import Link from "next/link";
import { cn } from "../lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-slate-900 text-white hover:bg-slate-800",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
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

  if (as === "link") {
    return (
      <Link href={href || "#"} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
