import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((p) => {
        const slugSegments = p.slug.split('/');
        return { slug: slugSegments };
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const slugString = slug.join('/');
    const post = await getPostBySlug(slugString);
    if (!post) return notFound();

    return (
        <article>
            <div className="prose mx-auto">
                <div className="text-3xl font-serif font-bold text-ink text-center mb-2">{post.frontMatter.title}</div>
                {post.frontMatter.subtitle && (
                    <div className="text-lg text-center text-ink mb-2">{post.frontMatter.subtitle}</div>
                )}
                {post.frontMatter.date && (
                    <div className="text-sm font-mono text-center text-ink mb-8">{post.frontMatter.date}</div>
                )}
            </div>
            <div className="prose max-w-none">
                <MDXRemote
                    source={post.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm, remarkMath],
                            rehypePlugins: [rehypeKatex],
                        },
                    }}
                />
            </div>
        </article>
    );
}


