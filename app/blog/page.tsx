import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
    const [posts, tags] = await Promise.all([
        getAllPosts(),
        getAllTags()
    ]);

    return <BlogClient initialPosts={posts} initialTags={tags} />;
}