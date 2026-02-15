"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogListProps {
    posts: BlogPost[];
    allTags: string[];
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogList({ posts, allTags }: BlogListProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = selectedTag
        ? posts.filter((post) => post.tags && post.tags.includes(selectedTag))
        : posts;

    return (
        <div>
            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedTag === null
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                >
                    All
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 text-lg font-medium rounded-full transition-colors ${selectedTag === tag
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            <div className="grid gap-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <article key={post.slug} className="group relative border border-border p-6 rounded-2xl bg-card hover:shadow-lg transition-all overflow-hidden">
                            {/* Date in top-right, similar to year in reports */}
                            <div className="absolute top-3 right-4">
                                <time dateTime={post.date} className="text-2xl md:text-3xl font-bold text-muted-foreground/20">
                                    {formatDate(post.date)}
                                </time>
                            </div>

                            <div className="relative z-10">
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="relative z-10 rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-primary border border-primary/40">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h2 className="text-2xl font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="mt-2 line-clamp-3 text-lg leading-6 text-muted-foreground">
                                    {post.description}
                                </p>
                                <div className="mt-4 flex items-center text-base font-medium text-primary">
                                    Read article
                                    <svg
                                        className="ml-1 h-4 w-4 stroke-current transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-12">No posts found.</p>
                )}
            </div>
        </div>
    );
}
