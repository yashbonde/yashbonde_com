import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between mb-8">
            <div className="text-sm font-sans font-semibold">
                <Link className="transition-transform duration-200" href="/">Yash Bonde</Link>
            </div>
            <nav className="flex items-center gap-3 text-sm font-sans">
                <Link className="transition-transform duration-200" href="/about">Work Profile</Link>
            </nav>
        </header >
    );
}
