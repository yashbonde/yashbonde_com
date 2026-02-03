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
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
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
        if (!selectedFilter) {
            setFilteredPosts(posts);
            return;
        }

        // Check if the filter is a year (all digits)
        const isYear = /^\d{4}$/.test(selectedFilter);

        const filtered = posts.filter(post => {
            if (isYear) {
                if (!post.frontMatter.date) return false;
                const year = post.frontMatter.date.split('-')[0];
                return year === selectedFilter;
            } else {
                return post.frontMatter.tags && post.frontMatter.tags.includes(selectedFilter);
            }
        });

        setFilteredPosts(filtered);
    }, [selectedFilter, posts]);

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(selectedFilter === filter ? null : filter);
    };

    return (
        <div className="mt-12">
            <div className="mb-8">
                {/* Filters */}
                {(allTags.length > 0 || availableYears.length > 0) && (
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {/* Year Filters */}
                        {availableYears.map(year => {
                            const colors = generateTagColor(year, randomSeed);
                            const isActive = selectedFilter === year;
                            return (
                                <button
                                    key={year}
                                    onClick={() => handleFilterClick(year)}
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

                        {/* Tag Filters */}
                        {allTags.map(tag => {
                            const colors = tagColors[tag];
                            const isActive = selectedFilter === tag;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleFilterClick(tag)}
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
            </div>

            {/* Posts List */}
            <ul className="space-y-1">
                {filteredPosts.map((post, index) => {
                    const year = post.frontMatter.date ? post.frontMatter.date.split('-')[0] : '';
                    const prevYear = index > 0 && filteredPosts[index - 1].frontMatter.date
                        ? filteredPosts[index - 1].frontMatter.date.split('-')[0]
                        : '';
                    const showYear = year && year !== prevYear;

                    return (
                        <li key={post.slug}>
                            <Link href={`/blogs/${post.slug}`} className="group">
                                <span className="text-gray-500 font-mono text-sm" style={{ width: '2.5rem', display: 'inline-block' }}>
                                    {showYear ? year : ''}
                                </span>
                                <span className="text-link group-hover:text-link-hover transition-colors">{post.frontMatter.title}</span>
                            </Link>
                        </li>
                    );
                })}
                {filteredPosts.length === 0 && (
                    <p className="text-gray-500 italic">No posts found matching the filters.</p>
                )}
            </ul>
        </div>
    );
}
