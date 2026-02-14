import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "projects");

export interface ProjectPost {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    content: string;
    date: string; // Used for sorting
}

export function getSortedProjectsData(): ProjectPost[] {
    // Check if projects directory exists
    if (!fs.existsSync(projectsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjects = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                content,
                title: data.title || "Untitled",
                description: data.description || "",
                tags: data.tags || [],
                date: data.date || new Date().toISOString(),
            };
        });

    return allProjects.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectData(slug: string): ProjectPost | null {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        title: data.title || "Untitled",
        description: data.description || "",
        tags: data.tags || [],
        date: data.date || new Date().toISOString(),
    };
}
