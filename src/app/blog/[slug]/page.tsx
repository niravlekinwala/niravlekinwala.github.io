import { getPostData, getSortedPostsData } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostData(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-16 max-w-3xl prose dark:prose-invert prose-xl">
            <header className="mb-8 not-prose">
                <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
                <div className="text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </header>
            <div className="text-foreground">
                <ReactMarkdown
                    components={{
                        code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                                <SyntaxHighlighter
                                    // @ts-expect-error - style type mismatch in library
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-lg shadow-sm border border-border !m-0 !p-4"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
