import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nusantara Tourism | Discover Paradise",
  description: "Jelajahi keindahan Indonesia bersama kami. Destinasi wisata terbaik dengan pengalaman tak terlupakan. Raja Ampat, Bali, Komodo, dan masih banyak lagi.",
  keywords: "tourism, indonesia, travel, bali, raja ampat, komodo, borobudur, vacation, holiday",
  authors: [{ name: "Nusantara Tourism" }],
  openGraph: {
    title: "Nusantara Tourism | Discover Paradise",
    description: "Jelajahi keindahan Indonesia bersama kami. Destinasi wisata terbaik.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
