import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { blogPosts } from "@/lib/data/blog";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="relative min-h-screen bg-white dark:bg-neutral-950">
            <Navbar />

            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-6 text-sm font-medium">
                            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5" />
                                {post.category}
                            </span>
                            <span className="text-neutral-500 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                            <span className="text-neutral-500 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-white leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-medium text-neutral-900 dark:text-white">
                                    {post.author.name}
                                </div>
                                <div className="text-xs text-neutral-500">
                                    Author
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        {post.content.split("\n").map((paragraph, index) => (
                            <p key={index} className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
