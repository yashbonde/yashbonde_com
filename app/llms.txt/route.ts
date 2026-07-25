import { getAllPosts } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

// Serves /llms.txt following the llmstxt.org convention: a concise, link-first
// map of the site for large language models.
export function GET() {
    const posts = getAllPosts()
        .filter((p) => p.frontMatter.date)
        .sort(
            (a, b) =>
                new Date(b.frontMatter.date!).getTime() -
                new Date(a.frontMatter.date!).getTime()
        );

    const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "");
    const line = (p: (typeof posts)[number]) => {
        const link = p.url
            ? p.url.startsWith("/")
                ? `${SITE_URL}${p.url}`
                : p.url
            : `${SITE_URL}/blogs/${p.slug}`;
        const year = p.frontMatter.date?.slice(0, 4) ?? "";
        const tags = (p.frontMatter.tags ?? []).join(", ");
        return `- [${stripHtml(p.frontMatter.title)}](${link})${
            year ? ` — ${year}` : ""
        }${tags ? ` (${tags})` : ""}`;
    };

    const body = `# ${SITE_NAME}

> Notes, essays and code by Yash Bonde — an AI researcher working on neural
> networks and automata theory. This weblog collects structured thoughts, code
> commits and talks from over the years.

## About

- [About Yash Bonde](${SITE_URL}/about)
- [Apps and projects](${SITE_URL}/apps)
- [RSS feed](${SITE_URL}/rss.xml)

## Writing

${posts.map(line).join("\n")}
`;

    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
