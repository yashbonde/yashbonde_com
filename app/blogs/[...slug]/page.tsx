import { notFound } from "next/navigation";
import React from "react";
import { getPostBySlug, getAllPosts, extractFirstImage } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import TagsDisplay from "@/components/TagsDisplay";
import References from "@/components/References";
import ReferenceHover from "@/components/ReferenceHover";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((p) => {
        const slugSegments = p.slug.split('/');
        return { slug: slugSegments };
    });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const { slug } = await params;
    const slugString = slug.join('/');
    const post = await getPostBySlug(slugString);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const firstImage = extractFirstImage(post.content);
    const title = post.frontMatter.title;
    const description = post.frontMatter.subtitle || title;
    const url = `https://yashbonde.com/blogs/${slugString}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: 'Yash Bonde',
            type: 'article',
            publishedTime: post.frontMatter.date,
            authors: ['Yash Bonde'],
            ...(firstImage && {
                images: [
                    {
                        url: firstImage.startsWith('http') ? firstImage : `https://yashbonde.com${firstImage}`,
                        alt: title,
                    }
                ],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(firstImage && {
                images: [firstImage.startsWith('http') ? firstImage : `https://yashbonde.com${firstImage}`],
            }),
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const slugString = slug.join('/');
    const post = await getPostBySlug(slugString);
    if (!post) return notFound();

    const mdxComponents = {
        img: (props: any) => {
            const { className, alt, ...rest } = props;
            let sizeClass = "size-m"; // default
            let cleanAlt = alt || "";

            if (cleanAlt.startsWith("S:")) {
                sizeClass = "size-s";
                cleanAlt = cleanAlt.replace(/^S:\s*/, "");
            } else if (cleanAlt.startsWith("M:")) {
                sizeClass = "size-m";
                cleanAlt = cleanAlt.replace(/^M:\s*/, "");
            } else if (cleanAlt.startsWith("L:")) {
                sizeClass = "size-l";
                cleanAlt = cleanAlt.replace(/^L:\s*/, "");
            } else if (cleanAlt.startsWith("XL:")) {
                sizeClass = "size-xl";
                cleanAlt = cleanAlt.replace(/^XL:\s*/, "");
            } else if (className?.includes("size-s")) sizeClass = "size-s";
            else if (className?.includes("size-m")) sizeClass = "size-m";
            else if (className?.includes("size-l")) sizeClass = "size-l";
            else if (className?.includes("size-xl")) sizeClass = "size-xl";

            return (
                <span className={`block my-8 ${sizeClass}`}>
                    <img {...rest} alt={cleanAlt} className="w-full rounded-lg" />
                </span>
            );
        },
        table: (props: any) => {
            const { className, children, ...rest } = props;
            let sizeClass = "size-l"; // default

            // Try to detect size from a marker in the first cell of the header
            try {
                // children[0] is thead, children[1] is tbody
                const thead = React.Children.toArray(children).find((c: any) => c.type === 'thead') as any;
                if (thead) {
                    const tr = React.Children.toArray(thead.props.children).find((c: any) => c.type === 'tr') as any;
                    if (tr) {
                        const firstCell = React.Children.toArray(tr.props.children)[0] as any;
                        if (firstCell && firstCell.props.children) {
                            const content = firstCell.props.children;
                            if (typeof content === 'string') {
                                if (content.startsWith("S:")) sizeClass = "size-s";
                                else if (content.startsWith("M:")) sizeClass = "size-m";
                                else if (content.startsWith("L:")) sizeClass = "size-l";
                                else if (content.startsWith("XL:")) sizeClass = "size-xl";
                            }
                        }
                    }
                }
            } catch (e) {
                // Fallback to className if markers fail
            }

            if (className?.includes("size-s")) sizeClass = "size-s";
            if (className?.includes("size-m")) sizeClass = "size-m";
            if (className?.includes("size-xl")) sizeClass = "size-xl";

            return (
                <div className={`table-wrapper ${sizeClass} overflow-x-auto`}>
                    <table {...rest} className="w-full">
                        {children}
                    </table>
                </div>
            );
        },
        // Custom component for sized sections if needed
        SizedSection: ({ size = 'l', children }: { size: string, children: React.ReactNode }) => {
            return <div className={`size-${size}`}>{children}</div>
        },
        // Handle unwrapping images and sized elements from paragraphs
        p: (props: any) => {
            const childrenArray = React.Children.toArray(props.children);
            const hasSizedChild = childrenArray.some((child: any) => {
                if (!child || typeof child !== 'object') return false;

                const childProps = child.props || {};
                const className = childProps.className || "";
                const isSized = className.includes('size-') ||
                    (typeof child.type === 'string' && (child.type === 'img' || child.type === 'table')) ||
                    (child.type?.name === 'img');
                return isSized;
            });

            if (hasSizedChild) {
                return <div className="w-full my-4">{props.children}</div>;
            }
            return <p {...props} className="mx-auto" style={{ maxWidth: '48rem', width: '100%' }} />;
        },
        a: (props: any) => {
            const { href, children, ...rest } = props;
            const isExternal = href?.startsWith('http') || href?.startsWith('//');
            return (
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    {...rest}
                >
                    {children}
                </a>
            );
        }
    };

    return (
        <article>
            <div className="prose py-16 px-8">
                <div className="mx-auto" style={{ maxWidth: '48rem', width: '100%' }}>
                    <div className="text-4xl font-serif font-bold text-ink text-center mb-2">{post.frontMatter.title}</div>
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
            </div>
            <div className="prose px-8">
                <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm, remarkMath],
                            rehypePlugins: [rehypeKatex],
                        },
                    }}
                />
                {post.frontMatter.references && (
                    <>
                        <References references={post.frontMatter.references} />
                        <ReferenceHover references={post.frontMatter.references} />
                    </>
                )}
            </div>
        </article>
    );
}


