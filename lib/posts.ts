import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIRS = [
    path.join(process.cwd(), "content", "blog"),
    path.join(process.cwd(), "content", "external"),
];

export type Reference = {
    title: string;
    url?: string;
    author?: string;
    year?: string | number;
};

export type FrontMatter = {
    title: string;
    subtitle?: string;
    date?: string;
    tags?: string[];
    disclaimer?: string;
    ogImage?: string;
    references: Reference[];
    [key: string]: unknown;
};

export type Post = {
    slug: string;
    url?: string;
    frontMatter: FrontMatter;
};

// Hardcoded post index — no disk reads needed for listing.
// When you add a new post, add an entry here.
const POST_INDEX: { slug: string; url?: string; title: string; date: string; tags: string[] }[] = [
    // { slug: "automata/6-anna-nueral-model", title: "Neural Automata #6: ANNA", date: "2026-02-13", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    // { slug: "automata/5-i-mean-why", title: "Neural Automata #5: I mean, why?", date: "2026-02-12", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    // { slug: "automata/4-5-code-review-neural-automata", title: "Neural Automata #4: Literature review", date: "2026-02-11", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    // { slug: "automata/4-literature-review-neural-automata", title: "Neural Automata #4: Literature review", date: "2026-02-11", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    // { slug: "automata/3-types-of-automata", title: "Neural Automata #3: The species of computers", date: "2026-02-10", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    { slug: "automata/2-real-computers", title: "Neural Automata #2: How to build a computer", date: "2026-02-14", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    { slug: "automata/1-automata-history", title: "Neural Automata #1: Theoretical computers", date: "2026-02-06", tags: ["Notes", "Automata Theory"] },
    { slug: "neural-automata-task-visualizer", url: "/pages/neural-automata-task-visualizer.html", title: "Neural Automata Task Visualizer", date: "2026-02-13", tags: ["Notes", "Automata Theory"] },
    { slug: "automata/0-prologue-start", title: "Neural Automata #0: Hitchhiker's Guide", date: "2026-02-05", tags: ["Notes", "Automata Theory", "Neural Networks"] },
    { slug: "open-square-prism", url: "https://github.com/yashbonde/open-square-prism", title: "Open<sup>2</sup>Prism: A clone of OpenAI Prism for personal notes", date: "2026-02-04", tags: ["Github"] },
    { slug: "panchayati-raj", title: "Did India's Constitution makers really care about local democracy?", date: "2025-11-30", tags: ["Bharat (India)"] },
    { slug: "software-of-making", title: "The software of making", date: "2025-06-21", tags: ["Shorts"] },
    { slug: "on-rag-system-basics", title: "On RAG system basics", date: "2025-02-22", tags: ["Agent Engineering"] },
    { slug: "artha/project-arth-ui-design-and-implementation", title: "Project Arth: UI Design and Implementation", date: "2025-01-20", tags: ["Project Artha"] },
    { slug: "artha/project-arth-introduction", title: "Project Arth: Introduction", date: "2025-01-15", tags: ["Project Artha"] },
    { slug: "every-diwali-i-do-something-just-for-my-personal-growth", title: "Third in the series of musings", date: "2024-10-31", tags: ["Shorts"] },
    { slug: "chess-engine-part-1-5", title: "Chess Engine - (Part 1.5)", date: "2020-11-23", tags: ["Neural Networks", "Research"] },
    { slug: "chess-engine-part-1", title: "Chess Engine - (Part 1)", date: "2020-11-21", tags: ["Neural Networks", "Research"] },
    { slug: "reading-list-neural-graph-execution", title: "Reading List on Neural Graph Execution", date: "2020-05-11", tags: ["Neural Networks", "Automata Theory", "Research", "Notes"] },
    { slug: "rl/chapter-6-exercises", title: "RL Chapter 6: Exercises", date: "2020-04-27", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-6-temporal-difference-learning", title: "RL Chapter 6: Temporal Difference Learning", date: "2020-04-27", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-5-exercises", title: "RL Chapter 5: Exercises", date: "2020-04-11", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-5-monte-carlo-methods", title: "RL Chapter 5: Monte Carlo Methods", date: "2020-04-11", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "teaching-machines-rules-algorithms-cellular-automata", title: "Teaching Machines Rules and Algorithms", date: "2020-04-04", tags: ["Neural Networks", "Automata Theory", "Research"] },
    { slug: "rl/chapter-4-dynamic-programming", title: "RL Chapter 4: Dynamic Programming", date: "2019-08-25", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-4-exercises", title: "RL Chapter 4: Exercises", date: "2019-08-25", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-3-goals-and-rewards", title: "RL Chapter 3: Goals and Rewards", date: "2019-07-14", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "how-to-read-textbooks-like-pro", title: "How to Read Textbooks like a Pro", date: "2019-05-31", tags: ["Shorts"] },
    { slug: "rl/chapter-2-additional-topics", title: "RL Chapter 2: Additional Topics", date: "2019-05-19", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-2-exercises", title: "RL Chapter 2: Exercises", date: "2019-05-19", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "rl/chapter-2-multi-armed-bandit", title: "RL Chapter 2: Multi-Armed Bandit", date: "2019-05-19", tags: ["Reinforcement Learning", "Notes"] },
    { slug: "transfer-learning-rl-generative-models", title: "Transfer Learning in RL using Generative Models", date: "2019-01-23", tags: ["Research"] },
    { slug: "freeciv-learning-environment-update-2", title: "Freeciv Learning Environment Update #2", date: "2019-01-08", tags: ["Freeciv"] },
    { slug: "second-series-musings", title: "Second in the Series of Musings", date: "2018-12-29", tags: ["Shorts"] },
    { slug: "lets-go-over-few-things-freeciv", title: "Let's go over a few things freeciv!", date: "2018-11-19", tags: ["Freeciv"] },
    { slug: "call-for-army-of-beasts", title: "Call for an Army of Be(a)sts!", date: "2018-11-09", tags: ["Freeciv"] },
    { slug: "the-mathematical-probability-of-failure", title: "The mathematical probability of failure", date: "2018-10-04", tags: ["Shorts"] },
    { slug: "lets-build-attention-is-all-you-need-2-2", title: "Let's build 'Attention is all you need' — 2/2", date: "2018-09-21", tags: ["Transformer", "Neural Networks"] },
    { slug: "lets-build-attention-is-all-you-need-1-2", title: "Let's build 'Attention is all you need' — 1/2", date: "2018-08-27", tags: ["Transformer", "Neural Networks", "Notes"] },
    { slug: "first-series-musings", title: "First in the series of musings", date: "2018-08-15", tags: ["Shorts"] },
    { slug: "typesetting", title: "Typesetting and the Software of Making", date: "2018-08-14", tags: ["Notes"] },
];

export function getAllPosts(): Post[] {
    return POST_INDEX.map(p => ({
        slug: p.slug,
        url: p.url,
        frontMatter: {
            title: p.title,
            date: p.date,
            tags: p.tags,
            references: [],
        } as FrontMatter,
    }));
}

export function getCombinedPosts(): Post[] {
    return getAllPosts();
}

export function getAllTags(): string[] {
    const allTags = POST_INDEX.flatMap(p => p.tags);
    return [...new Set(allTags)].sort();
}

export function getPostsByTag(tag: string): Post[] {
    return getAllPosts().filter(p => p.frontMatter.tags?.includes(tag));
}

// Only this function reads from disk — when rendering a single blog post.
export async function getPostBySlug(slug: string): Promise<
    | { slug: string; frontMatter: FrontMatter; content: string }
    | null
> {
    for (const dir of CONTENT_DIRS) {
        const candidates = [
            path.join(dir, `${slug}.mdx`),
            path.join(dir, `${slug}.md`),
        ];
        for (const filePath of candidates) {
            try {
                const raw = await fs.readFile(filePath, "utf8");
                const { data, content } = matter(raw);
                const frontMatter = {
                    ...data,
                    references: data.references || [],
                    tags: data.tags || [],
                } as FrontMatter;
                return { slug, frontMatter, content };
            } catch {
                // try next
            }
        }
    }
    return null;
}

export function extractFirstImage(content: string): string | null {
    const mdImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (mdImageMatch && mdImageMatch[1]) {
        return mdImageMatch[1];
    }
    const htmlImageMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (htmlImageMatch && htmlImageMatch[1]) {
        return htmlImageMatch[1];
    }
    return null;
}
