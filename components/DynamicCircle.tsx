'use client';

import { useEffect, useState } from 'react';

export default function DynamicCircle({ noise }: { noise?: number }) {
    const [color, setColor] = useState('bg-ink');

    useEffect(() => {
        // Generate color based on current time
        const now = new Date();
        let timeSeed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        if (noise) {
            timeSeed += noise;
        }

        // Use time-based seed to generate HSL values
        const hue = (timeSeed * 137.5) % 360; // Golden angle for good distribution
        const saturation = 70 + (timeSeed % 30); // 70-100% saturation
        const lightness = 45 + (timeSeed % 20); // 45-65% lightness for good contrast

        setColor(`hsl(${Math.floor(hue)}, ${saturation}%, ${lightness}%)`);
    }, [noise]);

    return <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>;
}
