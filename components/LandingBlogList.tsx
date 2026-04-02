"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

type Post = {
    slug: string;
    url?: string;
    group?: string;
    frontMatter: {
        title: string;
        subtitle?: string;
        date?: string;
        tags?: string[];
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

function EmptyFilterState({ tag, onClear }: { tag: string; onClear: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClear, 3000);
        return () => clearTimeout(timer);
    }, [onClear]);

    return (
        <p className="text-gray-500 italic">
            No posts found for tag &apos;{tag}&apos;. Redirecting...{" "}
            <button onClick={onClear} className="underline text-link hover:text-link-hover">
                clear now
            </button>
        </p>
    );
}

export default function LandingBlogList({ initialPosts, initialTags }: LandingBlogListProps) {
    const searchParams = useSearchParams();
    const [selectedFilter, setSelectedFilter] = useState<string | null>(
        searchParams.get("tag")
    );
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (groupName: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const randomSeed = useMemo(() => 42, []); // Use stable seed for hydration consistency

    const tagColors = useMemo(() => {
        const colors: Record<string, any> = {};
        initialTags.forEach(tag => {
            colors[tag] = generateTagColor(tag, randomSeed);
        });
        return colors;
    }, [initialTags, randomSeed]);

    const availableYears = useMemo(() => {
        const years = new Set<string>();
        initialPosts.forEach(post => {
            if (post.frontMatter.date) {
                const year = post.frontMatter.date.split('-')[0];
                years.add(year);
            }
        });
        return Array.from(years).sort((a, b) => b.localeCompare(a));
    }, [initialPosts]);

    const filteredPosts = useMemo(() => {
        if (!selectedFilter) {
            return initialPosts;
        }

        // Check if the filter is a year (all digits)
        const isYear = /^\d{4}$/.test(selectedFilter);

        return initialPosts.filter(post => {
            if (isYear) {
                if (!post.frontMatter.date) return false;
                const year = post.frontMatter.date.split('-')[0];
                return year === selectedFilter;
            } else {
                return post.frontMatter.tags && post.frontMatter.tags.includes(selectedFilter);
            }
        });
    }, [selectedFilter, initialPosts]);

    const groupCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        filteredPosts.forEach(post => {
            if (post.group) {
                counts[post.group] = (counts[post.group] || 0) + 1;
            }
        });
        return counts;
    }, [filteredPosts]);

    const syncFilterToUrl = useCallback((filter: string | null) => {
        const url = filter ? `/?tag=${encodeURIComponent(filter)}` : "/";
        window.history.replaceState(null, "", url);
    }, []);

    const handleFilterClick = (filter: string) => {
        const newFilter = selectedFilter === filter ? null : filter;
        setSelectedFilter(newFilter);
        syncFilterToUrl(newFilter);
    };

    const renderPostLink = (post: Post) => {
        const content = (
            <span
                className="text-link group-hover:text-link-hover transition-colors"
                dangerouslySetInnerHTML={{ __html: post.frontMatter.title }}
            />
        );

        if (post.url) {
            return (
                <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-link group-hover:text-link-hover transition-colors"
                    >
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    {content}
                </a>
            );
        }

        return (
            <Link href={`/blogs/${post.slug}`} className="group" prefetch={false}>
                {content}
            </Link>
        );
    };

    return (
        <div className="mt-12">
            <div className="mb-8">
                {/* Filters */}
                {(initialTags.length > 0 || availableYears.length > 0) && (
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
                        {initialTags.map((tag: string) => {
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
                {(() => {
                    const renderedGroups = new Set<string>();
                    return filteredPosts.map((post, index) => {
                        const year = post.frontMatter.date ? post.frontMatter.date.split('-')[0] : '';
                        const prevYear = index > 0
                            ? filteredPosts[index - 1].frontMatter.date?.split('-')[0] ?? ''
                            : '';
                        const showYear = year && year !== prevYear;

                        // Check if post belongs to a group AND there's more than one matching item
                        if (post.group && groupCounts[post.group] > 1) {
                            if (renderedGroups.has(post.group)) {
                                // If group is expanded, render the post as part of the group
                                if (expandedGroups[post.group]) {
                                    return (
                                        <li key={post.slug} className="flex items-baseline ml-6">
                                            <span className="text-gray-400 font-mono text-xs shrink-0" style={{ width: '2.5rem', display: 'inline-block' }}>
                                                {/* No year for grouped items to keep it clean, or could show small version */}
                                            </span>
                                            {renderPostLink(post)}
                                        </li>
                                    );
                                }
                                return null; // Already rendered the group header and this item is hidden
                            } else {
                                renderedGroups.add(post.group);
                                const isExpanded = !!expandedGroups[post.group];
                                return (
                                    <li key={`group-${post.group}`} className="flex flex-col">
                                        <div className="flex items-baseline">
                                            <span className="text-gray-500 font-mono text-sm shrink-0" style={{ width: '2.5rem', display: 'inline-block' }}>
                                                {showYear ? year : ''}
                                            </span>
                                            <button
                                                onClick={() => toggleGroup(post.group!)}
                                                className="text-link hover:text-link-hover transition-colors text-left cursor-pointer flex items-center gap-1.5 group"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                                <span>{post.group}</span>
                                            </button>
                                        </div>
                                        {isExpanded && (
                                            <div className="flex items-baseline ml-6 mt-1">
                                                <span className="text-gray-400 font-mono text-xs shrink-0" style={{ width: '2.5rem', display: 'inline-block' }}>
                                                </span>
                                                {renderPostLink(post)}
                                            </div>
                                        )}
                                    </li>
                                );
                            }
                        }

                        return (
                            <li key={post.slug} className="flex items-baseline">
                                <span className="text-gray-500 font-mono text-sm shrink-0" style={{ width: '2.5rem', display: 'inline-block' }}>
                                    {showYear ? year : ''}
                                </span>
                                {renderPostLink(post)}
                            </li>
                        );
                    });
                })()}
                {filteredPosts.length === 0 && selectedFilter && (
                    <EmptyFilterState
                        tag={selectedFilter}
                        onClear={() => {
                            setSelectedFilter(null);
                            syncFilterToUrl(null);
                        }}
                    />
                )}
                {filteredPosts.length === 0 && !selectedFilter && (
                    <p className="text-gray-500 italic">No posts found.</p>
                )}
            </ul>
        </div>
    );
}
