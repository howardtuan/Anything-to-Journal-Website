import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const editorialSerif = Libre_Caslon_Text({
  variable: "--font-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Anything-to-Journal — Anything in. Journal out.",
    template: "%s — Anything-to-Journal",
  },
  description:
    "Turn a folder of notes, data, figures, references, and source material into an editable journal manuscript and an Overleaf-ready upload.",
  applicationName: "Anything-to-Journal",
  keywords: [
    "journal manuscript",
    "LaTeX",
    "Overleaf",
    "research workflow",
    "agent skill",
  ],
  openGraph: {
    title: "Anything-to-Journal",
    description: "Anything in. Journal out.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Anything-to-Journal — Anything in. Journal out.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anything-to-Journal",
    description: "Anything in. Journal out.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${editorialSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
