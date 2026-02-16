import type { Metadata } from "next";
import { Source_Sans_3, Roboto_Mono, Eczar } from "next/font/google";
import Header from "../components/Header";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${sourceSans.variable} ${eczar.variable} ${robotoMono.variable} antialiased bg-canvas`}>
        <div className="min-h-screen max-w-screen-xl mx-auto bg-paper px-6 py-10 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Header />
          </div>
          <main className="flex flex-col gap-8">
            {children}
          </main>
          {/* Footer intentionally removed */}
        </div>
      </body>
    </html>
  );
}
