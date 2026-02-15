import { getProjectData, getSortedProjectsData } from "@/lib/projects";
import { notFound } from "next/navigation";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = getSortedProjectsData();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectData(slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="prose dark:prose-invert prose-xl max-w-none">
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
                        {project.content}
                    </ReactMarkdown>
                </div>

            </div >
        </article >
    );
}
