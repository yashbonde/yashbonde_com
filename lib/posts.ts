import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type FrontMatter = {
    title: string;
    subtitle?: string;
    date?: string;
    tags?: string[];
    readingTime?: number;
    [key: string]: unknown;
};

export async function ensureContentDirs(): Promise<void> {
    await fs.mkdir(POSTS_DIR, { recursive: true });
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

export async function getAllPosts(): Promise<
    { slug: string; frontMatter: FrontMatter }[]
> {
    await ensureContentDirs();
    const files = await getAllFilesRecursively(POSTS_DIR);
    const posts = await Promise.all(
        files.map(async (filePath) => {
            const relativePath = path.relative(POSTS_DIR, filePath);
            const slug = relativePath.replace(/\.(md|mdx)$/i, "");
            const raw = await fs.readFile(filePath, "utf8");
            const { data } = matter(raw);
            return { slug, frontMatter: data as FrontMatter };
        })
    );
    posts.sort((a, b) => (b.frontMatter.date || "").localeCompare(a.frontMatter.date || ""));
    return posts;
}

export async function getAllTags(): Promise<string[]> {
    const posts = await getAllPosts();
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


