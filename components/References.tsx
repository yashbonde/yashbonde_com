import type { Reference } from "@/lib/posts";
import { Link2 } from "lucide-react";

interface ReferencesProps {
    references: Reference[];
}

export default function References({ references }: ReferencesProps) {
    if (!references || references.length === 0) return null;

    return (
        <div className="mt-16 pt-8 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-ink/10" />
            <h2 className="text-2xl font-serif font-bold text-ink mb-6">References</h2>
            <ul className="space-y-4">
                {references.map((ref, index) => (
                    <li key={index} className="group">
                        <div className="flex items-start gap-3">
                            <span className="text-sm font-mono text-ink/40 mt-1">[{index + 1}]</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    {ref.url ? (
                                        <a
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-ink hover:opacity-70 underline decoration-ink/20 underline-offset-4 transition-all"
                                        >
                                            {ref.title}
                                        </a>
                                    ) : (
                                        <span className="font-medium text-ink">
                                            {ref.title}
                                        </span>
                                    )}
                                    {ref.url && (
                                        <Link2 size={14} className="text-ink/30" />
                                    )}
                                </div>
                                {(ref.author || ref.year) && (
                                    <div className="text-sm text-ink/60 mt-0.5">
                                        {ref.author} {ref.year && <span>({ref.year})</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
