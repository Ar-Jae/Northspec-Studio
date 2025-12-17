import Link from "next/link";
import { cn } from "../lib/utils";
import site from "../content/site";

function initialsFromName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
  return initials || "NS";
}

export default function Logo({ className, withMark = true }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 group", className)}>
      {withMark ? (
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gold text-brand-dark font-bold shadow-lg shadow-brand-gold/20 group-hover:scale-105 transition-transform font-serif"
        >
          {initialsFromName(site.name)}
        </span>
      ) : null}
      <span className="text-base font-semibold tracking-tight text-white group-hover:text-brand-gold transition-colors font-serif">
        {site.name}
      </span>
    </Link>
  );
}
