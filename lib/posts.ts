import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type FrontMatter = {
    title: string;
    date?: string;
    [key: string]: unknown;
};

export async function ensureContentDirs(): Promise<void> {
    await fs.mkdir(POSTS_DIR, { recursive: true });
}

export async function getAllPosts(): Promise<
    { slug: string; frontMatter: FrontMatter }[]
> {
    await ensureContentDirs();
    const entries = await fs.readdir(POSTS_DIR);
    const files = entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.(md|mdx)$/i, "");
            const fullPath = path.join(POSTS_DIR, file);
            const raw = await fs.readFile(fullPath, "utf8");
            const { data } = matter(raw);
            return { slug, frontMatter: data as FrontMatter };
        })
    );
    posts.sort((a, b) => (b.frontMatter.date || "").localeCompare(a.frontMatter.date || ""));
    return posts;
}

export async function getPostBySlug(slug: string): Promise<
    | { slug: string; frontMatter: FrontMatter; content: string }
    | null
> {
    await ensureContentDirs();
    const candidates = [
        path.join(POSTS_DIR, `${slug}.mdx`),
        path.join(POSTS_DIR, `${slug}.md`),
    ];
    for (const filePath of candidates) {
        try {
            const raw = await fs.readFile(filePath, "utf8");
            const { data, content } = matter(raw);
            return { slug, frontMatter: data as FrontMatter, content };
        } catch {
            // try next
        }
    }
    return null;
}


