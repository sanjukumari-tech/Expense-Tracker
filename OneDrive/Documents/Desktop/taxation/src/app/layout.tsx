import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://taxation-associates.in"),
  title: "Taxation & Associates | Chartered Accountants | Tax, Audit & GST Services",
  description:
    "Taxation & Associates is an ICAI-registered CA firm offering expert services in audit & assurance, direct tax, GST, bookkeeping, company law, and business advisory. Free consultation available.",
  keywords: [
    "chartered accountant in Delhi",
    "CA firm India",
    "ITR filing in delhi",
    "GST services in delhi",
    "tax audit",
    "statutory audit",
    "bookkeeping services",
    "income tax consultant",
    "GST registration",
    "GST return filing",
    "TDS filing",
    "company incorporation",
    "ROC compliance",
    "virtual CFO",
    "business advisory CA",
    "FEMA compliance",
    "CA near me",
    "KG Associates CA",
    "tax consultant India",
    "financial compliance services",
  ].join(", "),
  openGraph: {
    title: "Taxation & Associates | Chartered Accountants | Tax, Audit & GST",
    description:
      "Expert CA services: ITR, GST, Audit, Bookkeeping, ROC, and Advisory. ICAI-registered. Free first consultation.",
    images: [{ url: "/ca_hero_bg.png" }],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
