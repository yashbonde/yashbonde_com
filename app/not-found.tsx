import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-paper flex items-center justify-center">
            <div className="max-w-md mx-auto text-center px-6">
                <h1 className="text-6xl font-serif font-bold text-ink mb-4">404</h1>
                <h2 className="text-2xl font-serif font-semibold text-ink mb-4">Page Not Found</h2>
                <p className="text-base text-muted mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
