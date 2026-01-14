"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { cn } from "../lib/utils";
import site from "../content/site";

function NavLink({ item, pathname }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

  return (
    <li 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "px-5 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-1",
          isActive 
            ? "bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20" 
            : "text-slate-300 hover:text-white hover:bg-white/10"
        )}
      >
        {item.label}
        {item.children && (
          <svg 
            className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-56 rounded-2xl bg-brand-dark/90 backdrop-blur-xl border border-white/10 p-2 shadow-2xl"
            >
              <ul className="flex flex-col gap-1">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  const panelId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  const navLinks = useMemo(() => site.nav, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-brand-dark/95 backdrop-blur-xl">
      <Container className="flex flex-wrap md:flex-nowrap h-16 items-center justify-between gap-2 px-2 md:px-0">
        <div className="flex items-center flex-shrink-0">
          <Logo className="text-white" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block flex-grow text-center" aria-label="Primary">
          <ul className="inline-flex items-center gap-1 rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10">
            {navLinks.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        {/* Desktop contact button */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Button as="link" href="/contact" variant="brand">
            Contact Us
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold md:hidden flex-shrink-0"
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

      {/* Mobile nav panel - always visible and scrollable below header */}
      <div
        id={panelId}
        className={cn(
          "md:hidden fixed left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-xl transition-all duration-200 pt-16 max-h-screen overflow-y-auto",
          mobileOpen ? "block" : "hidden"
        )}
        style={{ top: 0, height: '100vh' }}
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMobileItem === item.label;

                return (
                  <li key={item.href} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex-grow rounded-lg px-3 py-2 text-sm font-medium",
                          isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          onClick={() => setExpandedMobileItem(isExpanded ? null : item.label)}
                          className="p-2 text-slate-400 hover:text-white"
                        >
                          <svg 
                            className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-180")} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {hasChildren && isExpanded && (
                      <ul className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
