import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getCombinedPosts, getAllTags } from "@/lib/posts";
import LandingBlogList from "@/components/LandingBlogList";

export default function Home() {
  const posts = getCombinedPosts();
  const tags = getAllTags();

  return (
    <section className="max-w-3xl mx-auto">
      {/* Letter Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 md:gap-8 mb-6">
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Image
              src="https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/photos/IMG_5522.webp"
              alt="Yash Bonde"
              width={400}
              height={250}
              className="object-cover max-w-full h-auto"
              priority

            />
          </div>
          <div className="flex-1">
            <p className="text-3xl font-serif font-bold text-ink  mb-2">Yash's Notes</p>
            <p className="text-base text-ink mb-6">AI Researcher. Lived a 0 → 1 Devtool Startup. Product Builder. Developing{' '}
              <a href="https://artha-pearl.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-link hover:text-link-hover"
              >
                Project अर्थ (Artha)
              </a>.
            </p>
            <p className="text-base text-ink">
              Working on neural networks and automata theory.
              I think we can build an end to end neural computer by 2030.
              My we<span className="font-semibold">b-log</span> is a bunch of structured thoughts, code commits or tweets over the years.
              Subscrible on <a href="https://in.linkedin.com/in/yash-bonde" target="_blank" rel="noopener noreferrer" className="underline text-link hover:text-link-hover">
                LinkedIn
              </a>, <a href="https://x.com/bondebhai" target="_blank" rel="noopener noreferrer" className="underline text-link hover:text-link-hover">
                X
              </a>, <a href="https://www.youtube.com/@yash_bonde" target="_blank" rel="noopener noreferrer" className="underline text-link hover:text-link-hover">
                YouTube
              </a>.
            </p>
            {/* 
            <p className="text-base text-ink mb-2">
              Click on the filters below to search things faster!
            </p> */}

          </div>
        </div>
      </div>

      <Suspense>
        <LandingBlogList initialPosts={posts} initialTags={tags} />
      </Suspense>

      <div className="mt-8 border-t border-gray-200 pt-8 mx-auto" style={{ maxWidth: '48rem', width: '100%' }}>
        <p className="text-gray-500 italic text-sm">
          The opinions expressed herein are solely those of the author in their individual capacity and do not necessarily reflect the official policy or position of any current or former employer, client, or affiliated organization.
          {" "}
          <a
            href={`https://github.com/yashbonde/yashbonde_com`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:link-hover transition-colors"
          >
            See source
          </a>.
        </p>
      </div>
    </section>
  );
}
