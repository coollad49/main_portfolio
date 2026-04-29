import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lucasbuilds.tech'; 

    const blogPosts = getBlogPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date().toISOString(), // Consider using post.date if available and reliable
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        // Add other static pages here if any, e.g.:
        // {
        //     url: `${baseUrl}/about`,
        //     lastModified: new Date().toISOString(),
        //     changeFrequency: 'monthly',
        //     priority: 0.7,
        // },
        // {
        //     url: `${baseUrl}/projects`,
        //     lastModified: new Date().toISOString(),
        //     changeFrequency: 'weekly',
        //     priority: 0.8,
        // },
        ...blogPosts,
    ];
}
