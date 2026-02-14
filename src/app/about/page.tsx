import { Mail, MapPin, FileText } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                <div>
                    <h1 className="text-4xl font-bold mb-6">About Me</h1>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        <p className="text-lg leading-relaxed mb-6">
                            I am an Air Quality Modeller and Data Scientist passionate about using technology to understand and improve our environment.
                            My work focuses on the intersection of atmospheric science, computational modelling, and machine learning.
                        </p>
                        <p className="mb-4">
                            With a background in Environmental Engineering and Data Science, I specialize in:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>Developing high-resolution dispersion models for urban areas.</li>
                            <li>Applying deep learning techniques to forecast air pollution episodes.</li>
                            <li>Analyzing large datasets from satellite observations and ground-based sensor networks.</li>
                            <li>Building interactive visualizations to communicate complex environmental data to policymakers and the public.</li>
                        </ul>
                        <p>
                            When I'm not coding or running simulations, you can find me hiking, reading about climate policy, or experimenting with new visualization tools.
                        </p>
                    </div>
                </div>

                <div className="md:pl-8 md:border-l border-border">
                    <div className="flex flex-col gap-6">
                        <div className="rounded-lg overflow-hidden bg-muted aspect-square mb-4 flex items-center justify-center text-muted-foreground">
                            {/* Placeholder for Profile Image */}
                            <span className="text-sm">Profile Image</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>New Delhi, India</span>
                            </div>
                            <a
                                href="mailto:contact@niravlekinwala.com"
                                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Mail className="w-5 h-5 text-primary" />
                                <span>contact@niravlekinwala.com</span>
                            </a>
                        </div>

                        <div className="pt-6 border-t border-border mt-2">
                            <Link
                                href="/resume.pdf" // Placeholder link
                                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                Download CV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
