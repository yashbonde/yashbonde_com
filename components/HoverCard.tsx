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
    const animationClass = {
        lift: 'hover-lift',
        scale: 'hover-scale',
        glow: 'hover-glow'
    }[animation];

    return (
        <div className={`${animationClass} ${className}`}>
            {children}
        </div>
    );
}
