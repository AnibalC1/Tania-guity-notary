import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tania Guity | Notary Public · Loan Signing · Apostille Agent",
  description:
    "Professional notary public, loan signing agent, and apostille services serving Boston, Brookline, and beyond. Available Mon–Sat 8AM–8PM. Call 617-675-1974.",
  keywords: [
    "notary public Boston",
    "loan signing agent Massachusetts",
    "apostille agent Boston",
    "mobile notary Brookline",
    "notary services Boston",
  ],
  openGraph: {
    title: "Tania Guity | Notary Public · Loan Signing · Apostille",
    description:
      "Fast, professional notary services in Boston & Brookline. Book your appointment today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
