import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export function getSortedPostsData(): BlogPost[] {
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                content,
                title: data.title || "Untitled",
                date: data.date || new Date().toISOString(),
                description: data.description || "",
            };
        });

    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): BlogPost | null {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        description: data.description || "",
    };
}
