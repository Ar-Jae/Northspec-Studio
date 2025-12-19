import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[#1e1e1e] text-white selection:bg-blue-500 selection:text-white">
          <div className="mx-auto max-w-[1600px] p-6">
            <div className="overflow-hidden rounded-3xl bg-[#2b2b2b] shadow-2xl ring-1 ring-white/10">
              <div className="grid grid-cols-[280px_1fr]">
                <Sidebar />
                <main className="flex flex-col gap-6 bg-[#1e1e1e]/50 p-8 backdrop-blur-xl">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
