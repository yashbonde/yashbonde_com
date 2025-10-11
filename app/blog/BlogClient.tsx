"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Post = {
    slug: string;
    frontMatter: {
        title: string;
        subtitle?: string;
        date?: string;
        tags?: string[];
    };
};

type BlogClientProps = {
    initialPosts: Post[];
    initialTags: string[];
};

export default function BlogClient({ initialPosts, initialTags }: BlogClientProps) {
    const [posts] = useState<Post[]>(initialPosts);
    const [allTags] = useState<string[]>(initialTags);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

    useEffect(() => {
        if (selectedTag) {
            const filtered = posts.filter(post =>
                post.frontMatter.tags && post.frontMatter.tags.includes(selectedTag)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [selectedTag, posts]);

    const handleTagClick = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
    };

    return (
        <section className="max-w-2xl mr-auto text-left">
            <h1 className="text-3xl font-serif font-bold mb-8 text-ink">Blog</h1>

            {/* Posts List */}
            <ul className="space-y-6">
                {filteredPosts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-base text-ink text-lg inline-block hover:scale-105"
                        >
                            <span className=" mr-2">#{posts.length - posts.findIndex(p => p.slug === post.slug)}</span>
                            {post.frontMatter.title}
                        </Link>
                        {post.frontMatter.subtitle && (
                            <p className="text-md  mb-2">{post.frontMatter.subtitle}</p>
                        )}
                        {post.frontMatter.date && (
                            <span className="block text-sm">{post.frontMatter.date}</span>
                        )}
                        {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {post.frontMatter.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Tags List */}
            {allTags.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-xl font-serif font-bold mb-4 text-ink">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTag === null
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTag === tag
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
