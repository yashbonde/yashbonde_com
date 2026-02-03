"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

type Post = {
    slug: string;
    frontMatter: {
        title: string;
        subtitle?: string;
        date?: string;
        tags?: string[];
        readingTime?: number;
    };
};

type LandingBlogListProps = {
    initialPosts: Post[];
    initialTags: string[];
};

const generateTagColor = (tag: string, randomSeed: number) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        const char = tag.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const combinedSeed = Math.abs(hash + randomSeed);
    const hue = (combinedSeed * 137.508) % 360;
    const saturation = 60 + (combinedSeed % 30);
    const lightness = 35 + (combinedSeed % 20);

    const bgColor = '#f3f4f6';
    const textColor = '#374151';
    const hoverColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const hoverColorWithAlpha = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.25)`;

    return {
        bg: bgColor,
        text: textColor,
        hover: hoverColor,
        hoverAlpha: hoverColorWithAlpha,
        hoverText: '#ffffff'
    };
};

export default function LandingBlogList({ initialPosts, initialTags }: LandingBlogListProps) {
    const [posts] = useState<Post[]>(initialPosts);
    const [allTags] = useState<string[]>(initialTags);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

    const randomSeed = useMemo(() => Math.floor(Math.random() * 1000000), []);

    const tagColors = useMemo(() => {
        const colors: Record<string, any> = {};
        allTags.forEach(tag => {
            colors[tag] = generateTagColor(tag, randomSeed);
        });
        return colors;
    }, [allTags, randomSeed]);

    const availableYears = useMemo(() => {
        const years = new Set<string>();
        posts.forEach(post => {
            if (post.frontMatter.date) {
                const year = post.frontMatter.date.split('-')[0];
                years.add(year);
            }
        });
        return Array.from(years).sort((a, b) => b.localeCompare(a));
    }, [posts]);

    useEffect(() => {
        let filtered = posts;
        if (selectedTag) {
            filtered = filtered.filter(post =>
                post.frontMatter.tags && post.frontMatter.tags.includes(selectedTag)
            );
        }
        if (selectedYear) {
            filtered = filtered.filter(post => {
                if (!post.frontMatter.date) return false;
                const year = post.frontMatter.date.split('-')[0];
                return year === selectedYear;
            });
        }
        setFilteredPosts(filtered);
    }, [selectedTag, selectedYear, posts]);

    const handleTagClick = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
    };

    const handleYearClick = (year: string) => {
        setSelectedYear(selectedYear === year ? null : year);
    };

    return (
        <div className="mt-12">

            <div className="mb-8 space-y-4">
                {/* Tags Filter */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {allTags.map(tag => {
                            const colors = tagColors[tag];
                            const isActive = selectedTag === tag;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className="px-3 py-1 rounded-full transition-all duration-200"
                                    style={{
                                        backgroundColor: isActive ? colors.hover : colors.bg,
                                        color: isActive ? colors.hoverText : colors.text,
                                        opacity: isActive ? 1 : 0.8,
                                        boxShadow: isActive ? `0 2px 8px ${colors.hoverAlpha}` : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = colors.hover;
                                            e.currentTarget.style.color = colors.hoverText;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = colors.bg;
                                            e.currentTarget.style.color = colors.text;
                                        }
                                    }}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Year Filter */}
                {availableYears.length > 0 && (
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {availableYears.map(year => {
                            const colors = generateTagColor(year, randomSeed);
                            const isActive = selectedYear === year;
                            return (
                                <button
                                    key={year}
                                    onClick={() => handleYearClick(year)}
                                    className="px-3 py-1 rounded-full transition-all duration-200"
                                    style={{
                                        backgroundColor: isActive ? colors.hover : colors.bg,
                                        color: isActive ? colors.hoverText : colors.text,
                                        opacity: isActive ? 1 : 0.8,
                                        boxShadow: isActive ? `0 2px 8px ${colors.hoverAlpha}` : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = colors.hover;
                                            e.currentTarget.style.color = colors.hoverText;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.backgroundColor = colors.bg;
                                            e.currentTarget.style.color = colors.text;
                                        }
                                    }}
                                >
                                    {year}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Posts List */}
            <ul className="space-y-1">
                {filteredPosts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blogs/${post.slug}`} className="group">
                            <span className="text-link group-hover:text-link-hover transition-colors">{post.frontMatter.title} </span>
                            {post.frontMatter.date && (
                                <span className="text-gray-500 font-mono text-sm">({post.frontMatter.date})</span>
                            )}
                        </Link>
                    </li>
                ))}
                {filteredPosts.length === 0 && (
                    <p className="text-gray-500 italic">No posts found matching the filters.</p>
                )}
            </ul>
        </div>
    );
}
