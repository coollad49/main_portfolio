import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // Example: disallow a private path
        },
        sitemap: 'https://lucasbuilds.tech/sitemap.xml', // Replace with your actual domain
    };
}
