import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return notFound();

    return (
        <article className="max-w-2xl mx-auto prose">
            <h1 className="text-3xl font-serif font-bold mb-3 text-ink">{post.frontMatter.title}</h1>
            {post.frontMatter.date && (
                <p className="text-xs text-muted mb-10">{post.frontMatter.date}</p>
            )}
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


