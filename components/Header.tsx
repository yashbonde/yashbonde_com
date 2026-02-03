'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DynamicCircle from './DynamicCircle';

export default function Header() {
    const pathname = usePathname();
    const isSVJeezPage = pathname?.includes('/apps/svjeez');

    if (isSVJeezPage) {
        return null;
    }

    return (
        <header className="flex items-center justify-between mb-8">
            <div className="text-sm font-sans font-semibold">
                <Link className="transition-transform duration-200" href="/">Yash Bonde</Link>
            </div>
            <nav className="flex items-center gap-3 text-sm font-sans">
                {/* <Link className="transition-transform duration-200" href="/">Home</Link>
                <DynamicCircle noise={2134} /> */}
                <Link className="transition-transform duration-200" href="/about">Work Profile</Link>
            </nav>
        </header >
    );
}
