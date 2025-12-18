import Link from "next/link";
import { cn } from "../lib/utils";
import site from "../content/site";
import LogoIcon from "./LogoIcon";

export default function Logo({ className, withMark = true }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 group", className)}>
      {withMark ? (
        <span className="inline-flex h-9 w-9 items-center justify-center group-hover:scale-110 transition-transform">
          <LogoIcon className="h-9 w-9" />
        </span>
      ) : null}
      <span className="text-base font-semibold tracking-tight text-white group-hover:text-brand-gold transition-colors font-serif">
        {site.name}
      </span>
    </Link>
  );
}
