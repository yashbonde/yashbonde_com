import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import TagsDisplay from "@/components/TagsDisplay";
import References from "@/components/References";

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
            <div className="prose mx-auto py-16 px-8">
                <div className="text-3xl font-serif font-bold text-ink text-center mb-2">{post.frontMatter.title}</div>
                {post.frontMatter.subtitle && (
                    <div className="text-lg text-center text-ink mb-2">{post.frontMatter.subtitle}</div>
                )}
                {post.frontMatter.date && (
                    <div className="text-sm font-mono text-center text-ink mb-8">
                        Yash Bonde . {post.frontMatter.date}
                        {post.frontMatter.readingTime && (
                            <span> . {post.frontMatter.readingTime} min read</span>
                        )}
                    </div>
                )}
                {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                    <TagsDisplay tags={post.frontMatter.tags} />
                )}
                {post.frontMatter.disclaimer && (
                    <div className="text-sm text-gray-500 text-center italic mb-12">
                        <div className="font-semibold mb-2">Disclaimer</div>
                        <div className="prose prose-sm text-gray-500">
                            <MDXRemote
                                source={post.frontMatter.disclaimer}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="prose max-w-none py-12 px-8">
                <MDXRemote
                    source={post.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm, remarkMath],
                            rehypePlugins: [rehypeKatex],
                        },
                    }}
                />
                {post.frontMatter.references && (
                    <References references={post.frontMatter.references} />
                )}
            </div>
        </article>
    );
}


