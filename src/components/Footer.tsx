import { Github, Linkedin, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 mt-auto">
            <div className="container mx-auto px-4 flex flex-col items-center gap-6 text-center">

                {/* Social Links */}
                <div className="flex gap-6">
                    {/* <Link
                        href="https://scholar.google.com/citations?hl=en&user=EarHUEQAAAAJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                    >
                        <GraduationCap className="w-7 h-7" />
                    </Link> */}
                    <Link
                        href="https://github.com/niravlekinwala"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                    >
                        <Github className="w-7 h-7" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/nirav-lekinwala/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                    >
                        <Linkedin className="w-7 h-7" />
                    </Link>
                    <Link
                        href="mailto:nirav.lekin@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                    >
                        <Mail className="w-7 h-7" />
                    </Link>
                    <Link
                        href="https://scholar.google.com/citations?hl=en&user=EarHUEQAAAAJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full"
                        aria-label="Google Scholar"
                    >
                        <svg
                            className="w-7 h-7"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 0 6 0 9 5.5V18" />
                        </svg>
                    </Link>
                </div>

                {/* Disclaimer */}
                <div className="max-w-2xl mx-auto space-y-2">
                    <p className="text-l text-muted-foreground/60 leading-relaxed">
                        <span className="font-bold block mb-1">Disclaimer</span>
                        The views and opinions expressed on this website are solely those of the author and do not necessarily reflect the official policy or position of any current or former employer.
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-l text-muted-foreground">
                    © {new Date().getFullYear()} Nirav Lekinwala. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
