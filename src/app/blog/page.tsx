import { getSortedPostsData } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogIndex() {
    const posts = getSortedPostsData();

    // Extract unique tags
    const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <BlogList posts={posts} allTags={allTags} />
        </div>
    );
}
