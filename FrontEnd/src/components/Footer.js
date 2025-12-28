import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import site from "../content/site";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-brand-dark">
      {/* Newsletter section */}
      <div className="border-b border-white/10 bg-brand-dark">
        <Container className="py-8">
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
              <li><a href="/services" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Software Engineering</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Product Support</a></li>
            </ul>
          </div>

          {/* Email Directory */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white">Email</h3>
            <ul className="mt-6 space-y-2 text-xs text-slate-500">
              <li>
                <span className="block text-slate-400">Main:</span>
                <a href={`mailto:${site.contact.emails?.main}`} className="text-brand-gold hover:text-yellow-300 transition-colors">
                  {site.contact.emails?.main}
                </a>
              </li>
              <li>
                <span className="block text-slate-400 mt-2">Projects:</span>
                <a href={`mailto:${site.contact.emails?.projects}`} className="text-brand-gold hover:text-yellow-300 transition-colors">
                  {site.contact.emails?.projects}
                </a>
              </li>
              <li>
                <span className="block text-slate-400 mt-2">Billing:</span>
                <a href={`mailto:${site.contact.emails?.billing}`} className="text-brand-gold hover:text-yellow-300 transition-colors">
                  {site.contact.emails?.billing}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white">Resources</h3>
            <ul className="mt-6 space-y-2">
              <li>
                <a href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Logo className="text-white" />
              <p className="mt-3 max-w-xs text-sm text-slate-400">
                Engineering websites and software that ship.
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

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
