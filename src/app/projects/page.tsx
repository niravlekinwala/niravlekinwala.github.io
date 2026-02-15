import { Code2, Database, Wind } from "lucide-react";
import Link from "next/link";
import { getSortedProjectsData } from "@/lib/projects";

const getIcon = (tags: string[]) => {
    if (tags.includes("OpenFOAM") || tags.includes("CFD")) return <Code2 className="w-12 h-12 text-primary mb-6" />;
    if (tags.includes("Database") || tags.includes("React")) return <Database className="w-12 h-12 text-purple-500 mb-6" />;
    return <Wind className="w-12 h-12 text-cyan-500 mb-6" />;
};

export default function Projects() {
    const projects = getSortedProjectsData();

    return (
        <div className="min-h-screen pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 text-gradient">Featured Projects</h1>
                    <p className="text-3xl text-muted-foreground max-w-2xl mx-auto">
                        Where programming, data, and visualization come together to tell meaningful stories
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className="group"
                        >
                            <article className="h-full flex flex-col p-8 rounded-3xl glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/30 relative overflow-hidden">

                                {/* Gradient Blob for Hover Effect */}
                                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />

                                <div className="relative z-10">
                                    {getIcon(project.tags)}

                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-lg bg-primary/15 text-primary border border-primary/40"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
