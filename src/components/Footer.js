import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import site from "../content/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-slate-600">
              {site.tagline}
            </p>
            <div className="mt-6 flex gap-2">
              <Button as="link" href="/contact" variant="primary">
                Book a Call
              </Button>
              <Button as="link" href="/work" variant="secondary">
                View Work
              </Button>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Pages</h3>
              <ul className="mt-4 space-y-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <span className="font-medium text-slate-900">Email:</span> {site.contact.email}
                </li>
                <li>
                  <span className="font-medium text-slate-900">Phone:</span> {site.contact.phone}
                </li>
                <li>
                  <span className="font-medium text-slate-900">Location:</span> {site.contact.location}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Social</h3>
              <ul className="mt-4 space-y-2">
                {site.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-slate-900"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-slate-500">Built with Next.js + Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
