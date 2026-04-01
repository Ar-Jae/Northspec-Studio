"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import site from "../content/site";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const showCTA = pathname !== "/services";

  return (
    <footer className="bg-brand-dark">
      {/* CTA Section */}
      {showCTA && (
        <div className="bg-white/[0.02] border-t border-white/[0.06]">
          <Container className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-gold/[0.01] pointer-events-none" />
            <div className="flex flex-col items-center text-center relative z-10">
              <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif mb-6 uppercase tracking-tight leading-tight max-w-2xl">
                Ready to automate your business?
              </h2>
              <p className="text-slate-400 max-w-xl mb-10">
                Stop wasting time on manual tasks. Let's build the systems that will scale your operations while you sleep.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button as="link" href="/contact" variant="brand" className="px-8 py-4 text-lg">
                  Submit Project Specs
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Newsletter section */}
      <div className="bg-brand-dark pb-8">
        <Container>
          <NewsletterSignup />
        </Container>
      </div>

      {/* Main footer content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Contact Direct */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-brand-gold">📞</span>
                <a href={`tel:${site.contact.phone}`} className="hover:text-white transition-colors">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-1">✉</span>
                <a href={`mailto:${site.contact.emails?.main}`} className="hover:text-white transition-colors">
                  {site.contact.emails?.main || site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Our Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white">Links</h3>
            <ul className="mt-6 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`text-sm transition-colors ${item.label === "Home" ? "text-brand-gold" : "text-slate-400 hover:text-white"}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services/Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white">Services</h3>
            <ul className="mt-6 space-y-2 text-sm text-slate-400">
              {site.nav.find(n => n.label === "Services")?.children?.map((child) => (
                <li key={child.href}>
                  <a href={child.href} className="hover:text-white transition-colors">
                    {child.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white">Legal & Resources</h3>
            <ul className="mt-6 space-y-2">
              {[
                { label: "Privacy Policy",       href: "/privacy-policy" },
                { label: "Terms of Service",     href: "/terms-of-service" },
                { label: "Service Agreement",    href: "/service-agreement" },
                { label: "Refund Policy",        href: "/refund-policy" },
                { label: "Cookie Policy",        href: "/cookie-policy" },
                { label: "NDA Policy",           href: "/nda-policy" },
                { label: "Accessibility",        href: "/accessibility" },
                { label: "Security Policy",      href: "/security-policy" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider removed to create a more seamless transition */}
        <div className="pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Logo className="text-white" />
              <p className="mt-3 max-w-xs text-sm text-slate-400">
                We deliver workflow automation, software engineering, and mobile systems with reliability ownership. All projects follow our <Link href="/built-to-spec" className="text-brand-gold hover:underline">Built to Spec. Built to Last.</Link> method.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="text-xs text-slate-500">
                <p className="mb-2 uppercase tracking-wide text-slate-400">Follow us</p>
                <ul className="flex gap-3">
                  {site.social.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-slate-400 hover:text-brand-gold transition-colors"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - border removed for a cleaner look */}
        <div className="mt-8 pt-6 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
