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
  const isActive = item.href === "/"
    ? pathname === "/"
    : item.children?.some(child => pathname?.startsWith(child.href)) || pathname === item.href;

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-xl transition-all flex items-center gap-1",
          isActive
            ? "text-brand-gold bg-brand-gold/10"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
      >
        {item.label}
        {item.children && (
          <svg 
            className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} 
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
              <ul className="flex flex-col gap-0.5">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="group/item flex flex-col items-start px-4 py-3 leading-tight transition-all hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5"
                    >
                      <span className="text-sm font-semibold text-slate-200 group-hover/item:text-brand-gold transition-colors">
                        {child.label}
                      </span>
                      {child.description && (
                        <p className="mt-1 text-[12px] text-slate-500 group-hover/item:text-slate-400 line-clamp-1">
                          {child.description}
                        </p>
                      )}
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

// On the homepage, these nav items scroll to sections instead of navigating away
const HOME_SECTION_MAP = {
  "/pricing":  "#pricing",
  "/contact":  "#contact",
};

function scrollToSection(e, href, pathname) {
  const anchor = HOME_SECTION_MAP[href];
  if (!anchor || pathname !== "/") return;
  e.preventDefault();
  const el = document.querySelector(anchor);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = useMemo(() => site.nav, []);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full backdrop-blur-xl transition-all duration-500",
      scrolled || pathname !== "/"
        ? "bg-brand-dark/95"
        : "bg-transparent"
    )}>
      <Container className="flex items-center justify-between h-20">
        <div className="flex items-center flex-shrink-0">
          <Logo className="text-white" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-2">
            {navLinks.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        {/* Desktop CTA button */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
<Button as="link" href="/contact" variant="brand">
            Get Started
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
                  item.href === "/"
                    ? pathname === "/"
                    : item.children?.some(child => pathname?.startsWith(child.href)) || pathname === item.href;
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMobileItem === item.label;

                return (
                  <li key={item.href} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          scrollToSection(e, item.href, pathname);
                          setMobileOpen(false);
                        }}
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
            <div className="mt-8 px-4">
              <Button as="link" href="/contact" variant="brand" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
                Get Started
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
