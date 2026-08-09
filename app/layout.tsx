import type { Metadata } from "next";
import { Source_Sans_3, Newsreader, Roboto_Mono, Eczar } from "next/font/google";
import Header from "../components/Header";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/images/favicon.svg",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${newsreader.variable} ${eczar.variable} ${robotoMono.variable} antialiased bg-canvas`}>
        <div className="min-h-screen max-w-5xl mx-auto bg-paper px-6 py-10 md:px-12">
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
