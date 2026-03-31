"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import site from "../content/site";
import LogoIcon from "./LogoIcon";

export default function Logo({ className, withMark = true }) {
  const pathname = usePathname();

  const handleClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2 group", className)}
      onClick={handleClick}
    >
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
