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
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${brawler.variable} ${eczar.variable} ${robotoMono.variable} antialiased`}>
        <div className="min-h-screen bg-paper">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <header className="flex items-center justify-end mb-8 text-right">
              <nav className="flex items-center gap-3 text-sm font-sans">
                <Link className="transition-transform duration-200" href="/">Home</Link>
                <span className="w-1 h-1 bg-ink rounded-full"></span>
                <Link className="transition-transform duration-200" href="/blog">Journal</Link>
                <span className="w-1 h-1 bg-ink rounded-full"></span>
                <Link className="transition-transform duration-200" href="/about">Work</Link>
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
