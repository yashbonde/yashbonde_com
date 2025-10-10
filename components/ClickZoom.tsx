"use client";

import React, { useRef } from "react";

interface ClickZoomProps {
    children: React.ReactNode;
    className?: string;
    debounceMs?: number;
}

export default function ClickZoom({
    children,
    className = "",
    debounceMs = 350,
}: ClickZoomProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const lastClickRef = useRef<number>(0);

    function handleClick() {
        const now = Date.now();
        if (now - lastClickRef.current < debounceMs) return;
        lastClickRef.current = now;

        const el = ref.current;
        if (!el) return;
        el.classList.add("zooming");
        window.setTimeout(() => {
            el.classList.remove("zooming");
        }, 180);
    }

    return (
        <div ref={ref} onClick={handleClick} className={`zoom-on-click ${className}`}>
            {children}
        </div>
    );
}


