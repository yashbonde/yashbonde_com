import type { Metadata } from "next";
import { Brawler, Eczar, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const brawler = Brawler({
  variable: "--font-brawler",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yash Bonde",
  description: "Portfolio and blog of Yash Bonde - ML Engineer, Systems Developer",
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
        <link href="https://fonts.googleapis.com/css2?family=Brawler:wght@400;700&family=Eczar:wght@400..800&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${brawler.variable} ${eczar.variable} ${robotoMono.variable} antialiased`}>
        <div className="min-h-screen bg-paper">
          <div className="max-w-5xl mx-auto px-12 py-14">
            <header className="flex items-center justify-end mb-14 text-right">
              <nav className="flex items-center gap-3 text-sm font-sans">
                <Link className="transition-transform duration-200 hover:scale-105" href="/">Yash Bonde</Link>
                <span className="opacity-50">.</span>
                <Link className="transition-transform duration-200 hover:scale-105" href="/blog">Thoughts</Link>
                <span className="opacity-50">.</span>
                <Link className="transition-transform duration-200 hover:scale-105" href="/about">About</Link>
              </nav>
            </header>
            <main className="flex flex-col gap-8">
              {children}
            </main>
            {/* Footer intentionally removed */}
          </div>
        </div>
      </body>
    </html>
  );
}
