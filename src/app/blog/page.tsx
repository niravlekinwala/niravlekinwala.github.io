import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogIndex() {
    const posts = getSortedPostsData();

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <div className="grid gap-8">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post.slug} className="group relative flex flex-col items-start">
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                <Link href={`/blog/${post.slug}`}>
                                    <span className="absolute inset-0 z-10" />
                                    {post.title}
                                </Link>
                            </h2>
                            <time
                                dateTime={post.date}
                                className="relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground pl-3.5"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                                    <span className="h-4 w-0.5 rounded-full bg-border" />
                                </span>
                                {formatDate(post.date)}
                            </time>
                            <p className="relative z-10 mt-2 text-sm text-muted-foreground">
                                {post.description}
                            </p>
                            <div
                                aria-hidden="true"
                                className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary"
                            >
                                Read article
                                <svg
                                    className="ml-1 h-4 w-4 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-muted-foreground">No posts found yet.</p>
                )}
            </div>
        </div>
    );
}
