import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default async function BlogIndexPage() {
    const posts = await getAllPosts();
    return (
        <section className="max-w-3xl mr-auto text-left">
            <h1 className="text-3xl font-serif font-bold mb-10 text-ink">Blog</h1>
            <ul className="space-y-6">
                {posts.map((post, idx) => (
                    <li key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-base text-primary font-medium inline-block hover:scale-105"
                        >
                            <span className="text-muted mr-2">#{idx + 1}</span>
                            {post.frontMatter.title}
                        </Link>
                        {post.frontMatter.date && (
                            <span className="block text-xs text-muted">{post.frontMatter.date}</span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}


