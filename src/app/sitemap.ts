import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/blog';
import { getSortedProjectsData } from '@/lib/projects';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getSortedPostsData();
    const projects = getSortedProjectsData();
    const baseUrl = 'https://niravlekinwala.github.io';

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
    }));

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.date),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
        ...postUrls,
        ...projectUrls,
    ];
}
