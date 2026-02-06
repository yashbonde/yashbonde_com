"use client";

import { useMemo } from "react";

type TagsDisplayProps = {
    tags: string[];
};

// Color generation algorithm with random seed (same as BlogClient)
const generateTagColor = (tag: string, randomSeed: number): { bg: string; text: string; hover: string; hoverText: string } => {
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

    return {
        bg: bgColor,
        text: textColor,
        hover: hoverColor,
        hoverText: '#ffffff'
    };
};

export default function TagsDisplay({ tags }: TagsDisplayProps) {
    // Generate a random seed once per component mount
    const randomSeed = useMemo(() => 42, []); // Use stable seed for hydration consistency

    // Generate consistent colors for all tags with random seed
    const tagColors = useMemo(() => {
        const colors: Record<string, { bg: string; text: string; hover: string; hoverText: string }> = {};
        tags.forEach(tag => {
            colors[tag] = generateTagColor(tag, randomSeed);
        });
        return colors;
    }, [tags, randomSeed]);

    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-2 font-mono text-xs mb-8">
            {tags.map(tag => {
                const colors = tagColors[tag];
                return (
                    <span
                        key={tag}
                        className="px-3 py-1 rounded-full transition-all duration-200"
                        style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            opacity: 0.8,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.hover;
                            e.currentTarget.style.color = colors.hoverText;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.bg;
                            e.currentTarget.style.color = colors.text;
                        }}
                    >
                        {tag}
                    </span>
                );
            })}
        </div>
    );
}




