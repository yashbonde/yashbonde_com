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
        <header className="flex items-center justify-end mb-8 text-right">
            <nav className="flex items-center gap-3 text-sm font-sans">
                <Link className="transition-transform duration-200" href="/">Home</Link>
                <DynamicCircle noise={1} />
                <Link className="transition-transform duration-200" href="/blog">Journal</Link>
                <DynamicCircle noise={2134} />
                <Link className="transition-transform duration-200" href="/about">Work</Link>
                <DynamicCircle noise={5678} />
                <Link className="transition-transform duration-200" href="/consultancy">Consultancy</Link>
            </nav>
        </header>
    );
}



