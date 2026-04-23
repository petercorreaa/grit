import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRIT Capital Group | Broker Financiero Argentino",
  description:
    "Transformamos Información en Decisiones Estratégicas. GRIT Capital Group — broker financiero argentino regulado por CNV, ALyC N°2230.",
  openGraph: {
    title: "GRIT Capital Group",
    description: "Transformamos Información en Decisiones Estratégicas",
    siteName: "GRIT Capital Group",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GRIT Capital Group — Broker Financiero Argentino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRIT Capital Group",
    description: "Transformamos Información en Decisiones Estratégicas",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      {/* suppressHydrationWarning prevents Framer Motion client/server mismatch warnings */}
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
