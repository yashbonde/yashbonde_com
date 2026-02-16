import { notFound, redirect } from "next/navigation";
import React from "react";
import { getPostBySlug, getAllPosts, extractFirstImage } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import TagsDisplay from "@/components/TagsDisplay";
import References from "@/components/References";
import ReferenceHover from "@/components/ReferenceHover";
import CopyButton from "@/components/CopyButton";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
    const posts = getAllPosts();
    return posts
        .filter((p) => !p.url) // Only generate pages for internal blog posts
        .map((p) => {
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

    const image = post.frontMatter.ogImage || extractFirstImage(post.content);
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
            ...(image && {
                images: [
                    {
                        url: image.startsWith('http') ? image : `https://yashbonde.com${image}`,
                        alt: title,
                    }
                ],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(image && {
                images: [image.startsWith('http') ? image : `https://yashbonde.com${image}`],
            }),
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const slugString = slug.join('/');
    const post = await getPostBySlug(slugString);
    if (!post) return notFound();

    if (post.frontMatter.url && typeof post.frontMatter.url === 'string') {
        redirect(post.frontMatter.url);
    }

    const createHeading = (Tag: string) => (props: any) => (
        <Tag {...props} className="group relative mx-auto" style={{ maxWidth: '48rem', width: '100%', clear: 'both' }}>
            {props.id && <CopyButton id={props.id} />}
            {props.children}
        </Tag>
    );

    const mdxComponents = {
        h1: createHeading('h1'),
        h2: createHeading('h2'),
        h3: createHeading('h3'),
        h4: createHeading('h4'),
        h5: createHeading('h5'),
        h6: createHeading('h6'),
        img: (props: any) => {
            const { className, alt, ...rest } = props;
            let sizeClass = "size-m"; // default
            let floatClass = "";
            let floatStyle = {};
            let cleanAlt = alt || "";

            if (cleanAlt.startsWith("Around-Left")) {
                floatClass = "float-left";
                floatStyle = { marginRight: '1.5rem', marginBottom: '0.5rem' };
                cleanAlt = cleanAlt.replace(/^Around-Left:?\s*/, "");
            } else if (cleanAlt.startsWith("Around-Right")) {
                floatClass = "float-right";
                floatStyle = { marginLeft: '1.5rem', marginBottom: '0.5rem' };
                cleanAlt = cleanAlt.replace(/^Around-Right:?\s*/, "");
            }

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

            if (floatClass) {
                return (
                    <img
                        {...rest}
                        alt={cleanAlt}
                        className={`${floatClass} rounded-lg`}
                        style={{ maxWidth: '40%', height: 'auto', maxHeight: '450px', objectFit: 'contain', ...floatStyle }}
                    />
                );
            }

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
        SizedSection: ({ size = 'l', children }: { size: string, children: React.ReactNode }) => {
            return <div className={`size-${size}`}>{children}</div>
        },
        p: (props: any) => {
            const { children } = props;

            // Check if this paragraph only contains a floated image
            const childrenArray = React.Children.toArray(children);
            if (childrenArray.length === 1) {
                const child = childrenArray[0] as any;
                // If the child is an img (which might be our custom img component wrap)
                if (child.props && child.props.alt && (child.props.alt.startsWith("Around-Left") || child.props.alt.startsWith("Around-Right"))) {
                    return <>{children}</>;
                }
            }

            // Fallback to the original p component logic if not a floated image
            let hasFloatingImage = false;
            const hasSizedChild = childrenArray.some((child: any) => {
                if (!child || typeof child !== 'object') return false;

                const childProps = (child as any).props || {};
                const alt = childProps.alt || "";
                const className = childProps.className || "";

                if (alt.startsWith("Around-Left") || alt.startsWith("Around-Right")) {
                    hasFloatingImage = true;
                    return false; // Don't treat as sized child that breaks p
                }

                const isSized = className.includes('size-') ||
                    (typeof child.type === 'string' && (child.type === 'img' || child.type === 'table')) ||
                    (child.type as any)?.name === 'img';
                return isSized;
            });

            if (hasSizedChild) {
                return <div className="w-full my-4">{props.children}</div>;
            }

            return (
                <p
                    {...props}
                    className="mx-auto"
                    style={{ maxWidth: '48rem', width: '100%' }}
                />
            );
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
            <div className="prose py-4 mt-4 px-8">
                <div className="mx-auto" style={{ maxWidth: '48rem', width: '100%' }}>
                    {post.frontMatter.ogImage && (
                        <div className="mb-12 overflow-hidden rounded-lg aspect-video">
                            <img
                                src={post.frontMatter.ogImage}
                                alt={post.frontMatter.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="text-4xl font-serif font-bold text-ink text-center mb-2">{post.frontMatter.title}</div>
                    {post.frontMatter.subtitle && (
                        <div className="text-lg text-center text-ink mb-2">{post.frontMatter.subtitle}</div>
                    )}
                    {post.frontMatter.date && (
                        <div className="text-sm font-mono text-center text-ink mb-8">
                            Yash Bonde . {post.frontMatter.date}
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
                            rehypePlugins: [rehypeKatex, rehypeSlug],
                        },
                    }}
                />
                {(
                    (() => {
                        const currentPathSegments = slug.slice(0, -1);
                        const basePath = currentPathSegments.length > 0
                            ? `/blogs/${currentPathSegments.join('/')}/`
                            : '/blogs/';

                        const resolvedReferences = post.frontMatter.references.map(ref => {
                            if (!ref.url) return ref;
                            const isExternal = ref.url.startsWith('http') || ref.url.startsWith('//');
                            const isRootRelative = ref.url.startsWith('/');

                            if (!isExternal && !isRootRelative) {
                                // Resolve relative to current folder
                                const cleanUrl = ref.url.startsWith('./') ? ref.url.substring(2) : ref.url;
                                return {
                                    ...ref,
                                    url: `${basePath}${cleanUrl}`
                                };
                            }
                            return ref;
                        });

                        return (
                            <>
                                <References references={resolvedReferences} />
                                <ReferenceHover references={resolvedReferences} />
                            </>
                        );
                    })()
                )}

                <div className="mt-4 border-t border-gray-200 pt-8 mx-auto" style={{ maxWidth: '48rem', width: '100%' }}>
                    <p className="text-gray-500 italic text-sm">
                        The opinions expressed herein are solely those of the author in their individual capacity and do not necessarily reflect the official policy or position of any current or former employer, client, or affiliated organization.
                        {" "}
                        <a
                            href={`https://github.com/yashbonde/yashbonde_com/issues/new?title=${encodeURIComponent(`Request changes in ${slugString}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:link-hover transition-colors"
                        >
                            Suggest changes
                        </a>.
                    </p>
                </div>
            </div>
        </article>
    );
}


