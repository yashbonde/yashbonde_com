import ClickZoom from "../components/ClickZoom";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <section>
      {/* Letter Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 md:gap-8 mb-6">
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Image
              src="https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/photos/IMG_5717.jpeg"
              alt="Yash Bonde"
              width={400}
              height={250}
              className="rounded-lg object-cover max-w-full h-auto"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-serif font-bold text-ink  mb-2">Yash Bonde</div>
            <div className="text-base text-ink mb-6">Developer of <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
              Project अर्थ (Artha)
              <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
            </Link> . AI Researcher . 0 → 1 Startup . Product Builder . Burger Advocate . Foobar .
            </div>
            <div className="text-sm text-ink">
              <Link href="https://ema.co" target="_blank" rel="noopener noreferrer" className="block mb-1">
                CVE Lead at Ema
                <ArrowUpRight className="w-4 h-4 font-bold text-ink inline ml-2" />
              </Link>
              <Link href="https://in.linkedin.com/in/yash-bonde" target="_blank" rel="noopener noreferrer" className="block mb-1">
                LinkedIn
                <ArrowUpRight className="w-4 h-4 font-bold text-ink inline ml-2" />
              </Link>
              <Link href="https://x.com/bondebhai" target="_blank" rel="noopener noreferrer" className="block mb-1">
                X (Twitter)
                <ArrowUpRight className="w-4 h-4 font-bold text-ink inline ml-2" />
              </Link>
              <Link href="https://github.com/yashbonde" target="_blank" rel="noopener noreferrer" className="block">
                Github
                <ArrowUpRight className="w-4 h-4 font-bold text-ink inline ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
