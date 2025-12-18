import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../lib/auth-context";
import site from "../content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:ring-2 focus:ring-slate-900"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="min-h-[70vh]">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
