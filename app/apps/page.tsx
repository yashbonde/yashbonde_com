import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AppsPage() {
    return (
        <section>
            {/* Header Section */}
            <div className="mb-10">
                <div className="text-3xl font-serif font-bold text-ink mb-2">Apps</div>
                <div className="text-base text-ink mb-4">
                    A collection of applications and tools I&apos;ve built and want to share with the world.
                </div>
            </div>

            {/* Apps List */}
            <div className="space-y-8">
                {/* Maze Generator */}
                <div className="border-l-4 border-gray-300 pl-4">
                    <div className="mb-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <div>
                                <Link
                                    href="/apps/svjeez"
                                    className="inline-flex items-center gap-2"
                                >
                                    <span className="text-lg font-serif font-semibold text-ink">Maze Generator</span>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </div>
                            <div className="text-sm text-ink">
                                <span className="font-semibold">[Active]</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-3">
                        Interactive maze generator using recursive backtracking algorithm. Customize size, density, line width, and complexity to create unique mazes. Download as SVG.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">Interactive</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">SVG</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">Algorithm</span>
                    </div>
                </div>

                {/* Add more apps here following the same structure */}
            </div>
        </section>
    );
}

