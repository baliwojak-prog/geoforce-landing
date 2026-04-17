import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geoforce.ai — Volcano-Powered AI Compute",
  description:
    "Indonesia's sovereign AI infrastructure. Geothermal-powered datacenters delivering zero-carbon, high-performance compute at scale.",
  keywords: [
    "geothermal",
    "AI compute",
    "sovereign AI",
    "Indonesia",
    "datacenter",
    "carbon neutral",
    "GPU",
    "immersion cooling",
  ],
  openGraph: {
    title: "Geoforce.ai — Volcano-Powered AI Compute",
    description:
      "Indonesia's sovereign AI infrastructure. Geothermal-powered datacenters delivering zero-carbon, high-performance compute at scale.",
    siteName: "Geoforce.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
