"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { ClickableImage } from "@/components";

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

type BlogClientProps = {
    initialPosts: Post[];
    initialTags: string[];
};

// Color generation algorithm with random seed
const generateTagColor = (tag: string, randomSeed: number) => {
    // Create a simple hash from the tag string
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        const char = tag.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Combine tag hash with random seed for variation on each refresh
    const combinedSeed = Math.abs(hash + randomSeed);

    // Generate HSL values for better color consistency
    const hue = (combinedSeed * 137.508) % 360; // Golden angle approximation for good distribution
    const saturation = 60 + (combinedSeed % 30); // 60-90% saturation for vibrant colors
    const lightness = 35 + (combinedSeed % 20); // 35-55% lightness for good contrast

    // Default state: light gray background
    const bgColor = '#f3f4f6'; // light gray
    const textColor = '#374151'; // dark gray text

    // Hover state: generated color
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

export default function BlogClient({ initialPosts, initialTags }: BlogClientProps) {
    const [posts] = useState<Post[]>(initialPosts);
    const [allTags] = useState<string[]>(initialTags);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

    // Generate a random seed once per session
    const randomSeed = useMemo(() => Math.floor(Math.random() * 1000000), []);

    // Generate consistent colors for all tags with random seed
    const tagColors = useMemo(() => {
        const colors: Record<string, { bg: string; text: string; hover: string; hoverAlpha: string; hoverText: string }> = {};
        allTags.forEach(tag => {
            colors[tag] = generateTagColor(tag, randomSeed);
        });
        return colors;
    }, [allTags, randomSeed]);

    // Extract unique years from posts
    const availableYears = useMemo(() => {
        const years = new Set<string>();
        posts.forEach(post => {
            if (post.frontMatter.date) {
                const year = post.frontMatter.date.split('-')[0]; // Extract year from YYYY-MM-DD
                years.add(year);
            }
        });
        return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)
    }, [posts]);

    useEffect(() => {
        let filtered = posts;

        // Filter by tag
        if (selectedTag) {
            filtered = filtered.filter(post =>
                post.frontMatter.tags && post.frontMatter.tags.includes(selectedTag)
            );
        }

        // Filter by year
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
        <section className="max-w-3xl mx-auto">
            {/* Mobile Layout: Image full width, text below */}
            <div className="flex flex-col sm:hidden mb-10">
                <div className="mb-6 w-full">
                    <ClickableImage />
                </div>
                <div className="flex-1">
                    <div className="text-3xl font-serif font-bold text-ink mb-2">Yash Bonde</div>
                    <div className="text-base text-ink mb-4">My journal because documenting is creating. Essays on AI,
                        computation, notes for Barto Sutton, and more.
                    </div>
                    {/* Tags List */}
                    {allTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 font-mono text-xs">
                            {allTags.map(tag => {
                                const colors = tagColors[tag];
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className="px-3 py-1 rounded-full transition-all duration-200"
                                        style={{
                                            backgroundColor: selectedTag === tag ? colors.hover : colors.bg,
                                            color: selectedTag === tag ? colors.hoverText : colors.text,
                                            opacity: selectedTag === tag ? 1 : 0.8,
                                            transform: selectedTag === tag ? 'scale(1)' : 'scale(1)',
                                            boxShadow: selectedTag === tag ? `0 2px 8px ${colors.hoverAlpha}` : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedTag !== tag) {
                                                e.currentTarget.style.backgroundColor = colors.hover;
                                                e.currentTarget.style.color = colors.hoverText;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedTag !== tag) {
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
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-2 font-mono text-xs">
                                {availableYears.map(year => {
                                    const colors = generateTagColor(year, randomSeed);
                                    return (
                                        <button
                                            key={year}
                                            onClick={() => handleYearClick(year)}
                                            className="px-3 py-1 rounded-full transition-all duration-200"
                                            style={{
                                                backgroundColor: selectedYear === year ? colors.hover : colors.bg,
                                                color: selectedYear === year ? colors.hoverText : colors.text,
                                                opacity: selectedYear === year ? 1 : 0.8,
                                                transform: selectedYear === year ? 'scale(1)' : 'scale(1)',
                                                boxShadow: selectedYear === year ? `0 2px 8px ${colors.hoverAlpha}` : 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedYear !== year) {
                                                    e.currentTarget.style.backgroundColor = colors.hover;
                                                    e.currentTarget.style.color = colors.hoverText;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedYear !== year) {
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
                        </div>
                    )}

                </div>
            </div>

            {/* Desktop Layout: Image and text side by side */}
            <div className="hidden sm:flex sm:flex-row items-start sm:items-end gap-8 mb-10">
                {/* Image on the left */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <ClickableImage />
                </div>

                {/* Text content on the right */}
                <div className="flex-1">
                    <div className="text-3xl font-serif font-bold text-ink mb-2">Yash Bonde</div>
                    <div className="text-base text-ink mb-4">My journal because documenting is creating. Essays on AI,
                        computation, notes for Barto Sutton, and more.
                    </div>
                    {/* Tags List */}
                    {allTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 font-mono text-xs">
                            {allTags.map(tag => {
                                const colors = tagColors[tag];
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className="px-3 py-1 rounded-full transition-all duration-200"
                                        style={{
                                            backgroundColor: selectedTag === tag ? colors.hover : colors.bg,
                                            color: selectedTag === tag ? colors.hoverText : colors.text,
                                            opacity: selectedTag === tag ? 1 : 0.8,
                                            transform: selectedTag === tag ? 'scale(1)' : 'scale(1)',
                                            boxShadow: selectedTag === tag ? `0 2px 8px ${colors.hover}40` : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedTag !== tag) {
                                                e.currentTarget.style.backgroundColor = colors.hover;
                                                e.currentTarget.style.color = colors.hoverText;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedTag !== tag) {
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
                        <div className="mt-10">
                            <div className="flex flex-wrap gap-2 font-mono text-xs">
                                {availableYears.map(year => {
                                    const colors = generateTagColor(year, randomSeed);
                                    return (
                                        <button
                                            key={year}
                                            onClick={() => handleYearClick(year)}
                                            className="px-3 py-1 rounded-full transition-all duration-200"
                                            style={{
                                                backgroundColor: selectedYear === year ? colors.hover : colors.bg,
                                                color: selectedYear === year ? colors.hoverText : colors.text,
                                                opacity: selectedYear === year ? 1 : 0.8,
                                                transform: selectedYear === year ? 'scale(1)' : 'scale(1)',
                                                boxShadow: selectedYear === year ? `0 2px 8px ${colors.hover}40` : 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedYear !== year) {
                                                    e.currentTarget.style.backgroundColor = colors.hover;
                                                    e.currentTarget.style.color = colors.hoverText;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedYear !== year) {
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
                        </div>
                    )}
                </div>
            </div>


            {/* Posts List */}
            <ul className="space-y-1">
                {filteredPosts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                        >
                            <span className="text-link">{post.frontMatter.title} </span>
                            {post.frontMatter.date && (
                                <span className="text-gray-500">({post.frontMatter.date})</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </section >
    );
}
