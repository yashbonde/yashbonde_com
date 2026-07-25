import { getAllPosts } from "@/lib/posts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_AUTHOR } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// Titles in the index may contain HTML (e.g. superscripts); strip it for feeds.
function stripHtml(s: string): string {
    return s.replace(/<[^>]+>/g, "");
}

export function GET() {
    const posts = getAllPosts()
        .filter((p) => p.frontMatter.date)
        .sort(
            (a, b) =>
                new Date(b.frontMatter.date!).getTime() -
                new Date(a.frontMatter.date!).getTime()
        );

    const items = posts
        .map((p) => {
            const link = p.url
                ? p.url.startsWith("/")
                    ? `${SITE_URL}${p.url}`
                    : p.url
                : `${SITE_URL}/blogs/${p.slug}`;
            const title = escapeXml(stripHtml(p.frontMatter.title));
            const pubDate = new Date(p.frontMatter.date!).toUTCString();
            const categories = (p.frontMatter.tags ?? [])
                .map((t) => `<category>${escapeXml(t)}</category>`)
                .join("");
            return `    <item>
      <title>${title}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${categories}
    </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <managingEditor>${escapeXml(SITE_AUTHOR)}</managingEditor>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
