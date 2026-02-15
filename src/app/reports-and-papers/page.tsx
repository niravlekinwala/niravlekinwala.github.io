"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileText, Github } from "lucide-react";
import { publications } from "@/lib/publications";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportsAndPapers() {
    const [filter, setFilter] = useState<"All" | "Reports" | "Papers">("All");
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpand = (title: string) => {
        setExpandedItems((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title]
        );
    };

    const filteredPublications = publications
        .filter((pub) => {
            if (filter === "All") return true;
            if (filter === "Reports")
                return pub.type === "Technical Report" || pub.type === "PhD Thesis";
            if (filter === "Papers")
                return pub.type === "Journal Paper" || pub.type === "Conference Paper";
            return true;
        })
        .sort((a, b) => Number(b.date) - Number(a.date));

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Reports & Papers</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    A collection of my academic publications, technical reports, and research findings.
                </p>

                {/* Filter Tabs */}
                <div className="flex gap-2 p-1 bg-secondary/50 rounded-full w-fit backdrop-blur-sm border border-border/50">
                    {["All", "Reports", "Papers"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab as any)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === tab
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredPublications.map((pub) => {
                        // Determine styles based on type
                        const isReport = pub.type === "Technical Report";
                        const typeColor = isReport
                            ? "text-orange-500 bg-orange-500/10 border-orange-500/20"
                            : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";

                        // Determine styles based on role
                        const isPrimaryAuthor = pub.role === "First Author" || pub.role === "Author";
                        const roleColor = isPrimaryAuthor
                            ? "text-red-500 bg-red-500/10 border-red-500/20"
                            : "text-purple-500 bg-purple-500/10 border-purple-500/20";

                        const isExpanded = expandedItems.includes(pub.title);

                        return (
                            <motion.div
                                key={pub.title}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative border border-border bg-card p-6 rounded-2xl hover:shadow-lg transition-all overflow-hidden"
                            >
                                {pub.logo && (
                                    <div className="absolute bottom-2 right-2 opacity-30 pointer-events-none grayscale transition-opacity group-hover:opacity-50">
                                        <Image
                                            src={pub.logo}
                                            alt="Institute Logo"
                                            width={120}
                                            height={120}
                                            className="object-contain dark:invert"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                    {/* Prominent Year */}
                                    <div className="flex-shrink-0 flex items-center justify-center">
                                        <span className="text-2xl md:text-5xl font-bold text-muted-foreground/20 md:-rotate-90 origin-center">
                                            {pub.date}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-1 mb-3">
                                            <span className={`px-2.5 py-0.5 text-xl font-semibold rounded-full border ${typeColor}`}>
                                                {pub.type}
                                            </span>
                                            <span className={`px-2.5 py-0.5 text-xl font-semibold rounded-full border ${roleColor}`}>
                                                {pub.role}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
                                            {pub.link ? (
                                                <Link
                                                    href={pub.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-start gap-2"
                                                >
                                                    <span dangerouslySetInnerHTML={{ __html: pub.title }} />
                                                    <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                                                </Link>
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: pub.title }} />
                                            )}
                                        </h2>

                                        <p className="text-xl font-medium text-foreground/80 mb-2"
                                            dangerouslySetInnerHTML={{ __html: pub.authors || "" }}
                                        />
                                        <p
                                            className="text-xl text-muted-foreground italic mb-4"
                                            dangerouslySetInnerHTML={{ __html: pub.venue || "" }}
                                        />

                                        {pub.abstract && (
                                            <div>
                                                <button
                                                    onClick={() => toggleExpand(pub.title)}
                                                    className="text-sm font-medium text-primary hover:underline focus:outline-none mb-2"
                                                >
                                                    {isExpanded ? "Hide Abstract" : "Show Abstract"}
                                                </button>
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p
                                                                className="text-xl text-muted-foreground/80 leading-relaxed pb-2 text-justify whitespace-pre-line"
                                                                dangerouslySetInnerHTML={{ __html: pub.abstract || "" }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 hidden md:flex">
                                        {pub.link && (
                                            <Link
                                                href={pub.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                                aria-label="View Publication"
                                            >
                                                <FileText className="w-5 h-5" />
                                            </Link>
                                        )}
                                        {pub.githubrepo && (
                                            <Link
                                                href={pub.githubrepo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                                aria-label="View GitHub Repository"
                                            >
                                                <Github className="w-5 h-5" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div >
    );
}
