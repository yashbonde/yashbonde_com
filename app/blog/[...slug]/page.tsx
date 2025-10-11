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
        <article className="max-w-2xl mx-auto">
            <div className="prose max-w-2xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-ink text-center">{post.frontMatter.title}</h1>
                {post.frontMatter.subtitle && (
                    <p className="text-lg text-center text-ink">{post.frontMatter.subtitle}</p>
                )}
                {post.frontMatter.date && (
                    <p className="text-sm text-center text-ink mb-8">{post.frontMatter.date}</p>
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


