import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

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
        <div className="flex min-h-screen bg-gradient-to-br from-[#2d4a2d] via-[#3d5a3d] to-[#4d6a4d]">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <RightSidebar />
        </div>
      </body>
    </html>
  );
}
