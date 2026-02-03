'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Reference } from '@/lib/posts';
import { Link2 } from 'lucide-react';

interface ReferenceHoverProps {
    references: Reference[];
}

export default function ReferenceHover({ references }: ReferenceHoverProps) {
    const [activeRef, setActiveRef] = useState<Reference | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
                const href = (target as HTMLAnchorElement).href;
                const ref = references.find(r => r.url === href || (r.url && href.endsWith(r.url)));

                if (ref) {
                    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

                    const rect = target.getBoundingClientRect();
                    setPosition({
                        x: rect.left,
                        y: rect.top - 10
                    });
                    setActiveRef(ref);
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
                hoverTimeout.current = setTimeout(() => {
                    setActiveRef(null);
                }, 300);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        };
    }, [references]);

    if (!activeRef) return null;

    return (
        <div
            className="fixed z-50 transition-all duration-200 pointer-events-none"
            style={{
                left: position.x,
                top: position.y,
                transform: 'translateY(-100%)'
            }}
        >
            <div className="bg-white border border-ink/10 shadow-xl rounded-lg p-4 max-w-sm pointer-events-auto">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <h4 className="font-serif font-bold text-ink mb-1">{activeRef.title}</h4>
                        {(activeRef.author || activeRef.year) && (
                            <div className="text-xs text-ink/60 mb-2">
                                {activeRef.author} {activeRef.year && <span>({activeRef.year})</span>}
                            </div>
                        )}
                        {activeRef.url && (
                            <div className="flex items-center gap-1 text-[10px] text-ink/40 font-mono break-all">
                                <Link2 size={10} />
                                <span>{activeRef.url}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Arrow */}
            <div className="w-3 h-3 bg-white border-r border-b border-ink/10 transform rotate-45 mx-0 mt-[-6px] ml-4"></div>
        </div>
    );
}
