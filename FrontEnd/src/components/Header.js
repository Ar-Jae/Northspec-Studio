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
    <header className="fixed top-0 z-50 w-full pt-6">
      <Container className="relative flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Logo className="text-white" />
        </div>

        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2" aria-label="Primary">
          <ul className="flex items-center gap-1 rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-5 py-2 text-sm font-medium rounded-full transition-all",
                      isActive 
                        ? "bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20" 
                        : "text-slate-300 hover:text-white hover:bg-white/10"
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
          <Button as="link" href="/contact" variant="brand">
            Contact Us
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold md:hidden"
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
          "md:hidden fixed inset-0 top-24 z-40 bg-brand-dark/95 backdrop-blur-xl",
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
                        "block rounded-lg px-3 py-2 text-sm font-medium",
                        isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
