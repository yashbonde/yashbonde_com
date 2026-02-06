import type { Reference } from "@/lib/posts";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface ReferencesProps {
    references: Reference[];
}

export default function References({ references }: ReferencesProps) {
    if (!references || references.length === 0) return null;

    return (
        <div className="pt-2 pb-4 relative text-left">
            <h3 className="text-xl font-serif font-bold text-ink mb-6">Important Links</h3>
            <ul className="list-none p-0 space-y-2">
                {references.map((ref, index) => (
                    <li key={index} className="group">
                        <div className="flex flex-col items-left">
                            <div className="flex items-start justify-left gap-2">
                                <span className="text-xs font-mono text-ink/40 mt-1">[{index + 1}]</span>
                                {ref.url ? (
                                    (() => {
                                        const isExternal = ref.url.startsWith('http') || ref.url.startsWith('//');
                                        if (isExternal) {
                                            return (
                                                <a
                                                    href={ref.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-ink hover:opacity-70 transition-all"
                                                >
                                                    {ref.title}
                                                </a>
                                            );
                                        } else {
                                            return (
                                                <Link
                                                    href={ref.url}
                                                    className="font-medium text-ink hover:opacity-70 transition-all"
                                                >
                                                    {ref.title}
                                                </Link>
                                            );
                                        }
                                    })()
                                ) : (
                                    <span className="font-medium text-ink">
                                        {ref.title}
                                    </span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
