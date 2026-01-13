import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Northspec Studio Dashboard",
  description: "Customer relationship insights at a glance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <div className="flex min-h-screen bg-brand-dark">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-brand-gray/30 m-3 rounded-3xl border border-white/5">
            {children}
          </main>
          <RightSidebar />
        </div>
      </body>
    </html>
  );
}
