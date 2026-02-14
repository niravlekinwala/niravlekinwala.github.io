import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Nirav Lekinwala. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <Link
                        href="https://github.com/niravlekinwala"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/niravlekinwala"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Linkedin className="w-5 h-5" />
                    </Link>
                    <Link
                        href="mailto:contact@niravlekinwala.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
