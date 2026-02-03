import type { Reference } from "@/lib/posts";
import { Link2 } from "lucide-react";

interface ReferencesProps {
    references: Reference[];
}

export default function References({ references }: ReferencesProps) {
    if (!references || references.length === 0) return null;

    return (
        <div className="pt-2 relative text-left">
            {/* <div className="absolute top-0 left-0 w-full h-[1px] bg-ink/20" /> */}
            <h2 className="text-2xl font-serif font-bold text-ink mb-6">References</h2>
            <ul className="list-none p-0 space-y-2">
                {references.map((ref, index) => (
                    <li key={index} className="group">
                        <div className="flex flex-col items-left">
                            <div className="flex items-center justify-left gap-2">
                                <span className="text-xs font-mono text-ink/40">[{index + 1}]</span>
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
                                {/* {ref.url && (
                                    <Link2 size={14} className="text-ink/30" />
                                )} */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
