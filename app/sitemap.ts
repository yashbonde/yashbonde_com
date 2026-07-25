import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/apps`, changeFrequency: "monthly", priority: 0.5 },
    ];

    const postRoutes: MetadataRoute.Sitemap = posts
        // Only internal blog posts (external links have `url`) get their own page.
        .filter((p) => !p.url)
        .map((p) => ({
            url: `${SITE_URL}/blogs/${p.slug}`,
            lastModified: p.frontMatter.date ? new Date(p.frontMatter.date) : undefined,
            changeFrequency: "yearly",
            priority: 0.7,
        }));

    return [...staticRoutes, ...postRoutes];
}
