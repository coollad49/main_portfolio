import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getBlogPost, getBlogPosts } from "@/lib/data/blog";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPost(params.slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            url: `https://lucasbuilds.tech/blog/${post.slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="relative min-h-screen bg-background">
            <Navbar />

            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-6 text-sm font-medium">
                            <span className="px-3 py-1 bg-muted text-muted-foreground flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5" />
                                {post.category}
                            </span>
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                            {post.title}
                        </h1>

                        {post.image && (
                            <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-3 pt-6 border-t border-border">
                            <div className="relative w-10 h-10 overflow-hidden bg-muted">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-medium text-foreground">
                                    {post.author.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Author
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <MarkdownRenderer content={post.content} />
                </div>
            </article>

            <Footer />
        </main>
    );
}