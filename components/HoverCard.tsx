import React from 'react';

interface HoverCardProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'lift' | 'scale' | 'glow';
}

export default function HoverCard({
    children,
    className = '',
    animation = 'lift'
}: HoverCardProps) {
    // Animation classes removed - no hover effects
    return (
        <div className={`${className}`}>
            {children}
        </div>
    );
}
