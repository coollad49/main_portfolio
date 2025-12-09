import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { blogPosts } from "@/lib/data/blog";
import { ArrowRight, Clock, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
    return (
        <main className="relative min-h-screen bg-white dark:bg-neutral-950">
            <Navbar />

            <div className="pt-24 pb-12">
                <SectionWrapper id="blog-header" fullHeight={false}>
                    <SectionHeader
                        title="Blog & Insights"
                        subtitle="Thoughts on software engineering, AI, and building products that matter."
                    />
                </SectionWrapper>

                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.id}
                                className="group flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Meta */}
                                    <div className="flex items-center gap-3 mb-4 text-xs font-medium">
                                        <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                                            <Tag className="w-3 h-3" />
                                            {post.category}
                                        </span>
                                        <span className="text-neutral-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Author & Date */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                                {post.author.name.split(" ")[0]}
                                            </span>
                                        </div>
                                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
