"use client";

import { useCallback, useMemo, useState } from "react";

type ConciseButtonProps = {
    className?: string;
    label?: string;
};

export default function ConciseButton({ className, label = "Make Small" }: ConciseButtonProps) {
    const [isHidden, setIsHidden] = useState(false);
    const randomSeed = useMemo(() => Math.floor(Math.random() * 1000000), []);
    const colors = useMemo(() => {
        const hue = (randomSeed * 137.508) % 360;
        const saturation = 60 + (randomSeed % 30);
        const lightness = 35 + (randomSeed % 20);
        const bg = '#f3f4f6';
        const text = '#374151';
        const hover = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const hoverText = '#ffffff';
        return { bg, text, hover, hoverText };
    }, [randomSeed]);

    const handleClick = useCallback(() => {
        const candidates = document.querySelectorAll<HTMLElement>("[id^='not-imp']");

        if (isHidden) {
            // Show elements
            candidates.forEach((el) => {
                el.style.display = "";
            });
            setIsHidden(false);
        } else {
            // Hide elements
            candidates.forEach((el) => {
                el.style.display = "none";
            });
            setIsHidden(true);
        }
    }, [isHidden]);

    return (
        <button
            type="button"
            className={`${className ?? "px-3 py-1 rounded-full font-mono text-xs"} transition-colors duration-200`}
            onClick={handleClick}
            aria-label={label}
            style={{
                backgroundColor: isHidden ? colors.hover : colors.bg,
                color: isHidden ? colors.hoverText : colors.text,
            }}
            onMouseEnter={(e) => {
                if (!isHidden) {
                    e.currentTarget.style.backgroundColor = colors.hover;
                    e.currentTarget.style.color = colors.hoverText;
                }
            }}
            onMouseLeave={(e) => {
                if (!isHidden) {
                    e.currentTarget.style.backgroundColor = colors.bg;
                    e.currentTarget.style.color = colors.text;
                }
            }}
        >
            {label}
        </button>
    );
}


