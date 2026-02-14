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

                <div className="prose dark:prose-invert prose-xl max-w-none prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
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
                        {project.content}
                    </ReactMarkdown>
                </div>

            </div >
        </article >
    );
}
