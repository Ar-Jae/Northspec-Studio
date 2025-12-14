"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { cn } from "../lib/utils";
import site from "../content/site";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = useMemo(() => site.nav, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2" aria-label="Primary">
          <ul className="flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      isActive && "text-slate-900"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button as="link" href="/work" variant="secondary">
            View Work
          </Button>
          <Button as="link" href="/contact" variant="primary">
            Book a Call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={panelId}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-lg">
            {mobileOpen ? "×" : "≡"}
          </span>
        </button>
      </Container>

      <div
        id={panelId}
        className={cn(
          "md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        isActive && "bg-slate-100 text-slate-900"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <Button as="link" href="/work" variant="secondary" className="flex-1">
              View Work
            </Button>
            <Button as="link" href="/contact" variant="primary" className="flex-1">
              Book a Call
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
