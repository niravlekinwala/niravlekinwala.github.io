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
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                    components={{
                        code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                                <SyntaxHighlighter
                                    // @ts-expect-error - style type mismatch in library
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-lg shadow-sm border border-border !m-2 !p-2 !text-base"
                                    customStyle={{ fontSize: '1rem', lineHeight: '1.6' }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-lg text-primary" style={{ fontFamily: 'var(--font-ibm-mono), ui-monospace, SFMono-Regular, Menlo, monospace' }} {...props}>
                                    {children}
                                </code>
                            )
                        },
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground border-b pb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground" {...props} />,
                        h4: ({ node, ...props }) => <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground" {...props} />,
                        p: ({ node, ...props }) => <p className="leading-7 mb-4 text-foreground/90" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 mb-4 marker:text-primary" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 mb-4 marker:text-primary" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1 leading-relaxed" {...props} />,
                        a: ({ node, ...props }) => <a className="text-primary hover:underline font-medium transition-colors" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6" {...props} />
                        ),
                        img: ({ node, ...props }) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img className="rounded-lg shadow-md max-w-full h-auto my-6 border border-border" {...props} alt={props.alt || ''} />
                        ),
                        table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-6 rounded-lg border border-border">
                                <table className="w-full text-sm text-left" {...props} />
                            </div>
                        ),
                        th: ({ node, ...props }) => <th className="bg-muted/50 px-4 py-3 font-semibold text-foreground border-b" {...props} />,
                        td: ({ node, ...props }) => <td className="px-4 py-3 border-b last:border-0" {...props} />,
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
