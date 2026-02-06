"use client";

import React, { useState } from 'react';
import { Link as LinkIcon, Check, Hash } from 'lucide-react';

interface CopyButtonProps {
    id: string;
}

export default function CopyButton({ id }: CopyButtonProps) {
    const [copiedL, setCopiedL] = useState(false);
    const [copiedS, setCopiedS] = useState(false);

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.hash = id;
        navigator.clipboard.writeText(url.toString());
        setCopiedL(true);
        setTimeout(() => setCopiedL(false), 2000);
    };

    const handleCopySlug = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(`#${id}`);
        setCopiedS(true);
        setTimeout(() => setCopiedS(false), 2000);
    };

    return (
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex items-center gap-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
                onClick={handleCopyLink}
                className="p-1 px-1.5 text-gray-300 hover:text-ink hover:bg-white/80 rounded-l transition-all focus:outline-none"
                title="Copy full URL link"
            >
                {copiedL ? <Check size={14} className="text-green-600" strokeWidth={3} /> : <LinkIcon size={14} />}
            </button>
            <button
                onClick={handleCopySlug}
                className="p-1 px-1.5 text-gray-300 hover:text-ink hover:bg-white/80 rounded-r transition-all focus:outline-none"
                title="Copy section slug (#id)"
            >
                {copiedS ? <Check size={14} className="text-green-600" strokeWidth={3} /> : <Hash size={14} />}
            </button>
        </div>
    );
}

