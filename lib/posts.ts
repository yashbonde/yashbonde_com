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
    url?: string; // Optional external URL
    frontMatter: FrontMatter;
};

export async function ensureContentDirs(): Promise<void> {
    for (const dir of CONTENT_DIRS) {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function getAllFilesRecursively(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subFiles = await getAllFilesRecursively(fullPath);
            files.push(...subFiles);
        } else if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
            files.push(fullPath);
        }
    }

    return files;
}

async function getAllFilesFromDir(dir: string): Promise<string[]> {
    try {
        return await getAllFilesRecursively(dir);
    } catch {
        return [];
    }
}

export async function getAllPosts(): Promise<Post[]> {
    await ensureContentDirs();

    const dirResults = await Promise.all(CONTENT_DIRS.map(async (dir) => {
        const files = await getAllFilesFromDir(dir);
        return files.map(f => ({ path: f, baseDir: dir }));
    }));

    const posts = await Promise.all(
        dirResults.flat().map(async ({ path: filePath, baseDir }) => {
            const relativePath = path.relative(baseDir, filePath);
            const slug = relativePath.replace(/\.(md|mdx)$/i, "");
            const raw = await fs.readFile(filePath, "utf8");
            const { data } = matter(raw);
            const frontMatter = {
                ...data,
                references: data.references || [],
                tags: data.tags || [],
            } as FrontMatter;
            return {
                slug,
                url: frontMatter.url as string | undefined,
                frontMatter
            };
        })
    );
    posts.sort((a, b) => (b.frontMatter.date || "").localeCompare(a.frontMatter.date || ""));
    return posts;
}

export async function getCombinedPosts(): Promise<Post[]> {
    return getAllPosts();
}

export async function getAllTags(): Promise<string[]> {
    const posts = await getCombinedPosts();
    const allTags = posts.flatMap(post => post.frontMatter.tags || []);
    return [...new Set(allTags)].sort();
}

export async function getPostsByTag(tag: string): Promise<
    { slug: string; frontMatter: FrontMatter }[]
> {
    const posts = await getAllPosts();
    return posts.filter(post =>
        post.frontMatter.tags && post.frontMatter.tags.includes(tag)
    );
}

export async function getPostBySlug(slug: string): Promise<
    | { slug: string; frontMatter: FrontMatter; content: string }
    | null
> {
    await ensureContentDirs();
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
    // Try markdown image syntax: ![alt](url)
    const mdImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (mdImageMatch && mdImageMatch[1]) {
        return mdImageMatch[1];
    }

    // Try HTML img tag: <img src="url" />
    const htmlImageMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (htmlImageMatch && htmlImageMatch[1]) {
        return htmlImageMatch[1];
    }

    return null;
}


