import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { getBlogPosts } from "@/lib/data/blog";
import { Clock, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
    const blogPosts = getBlogPosts();

    return (
        <main className="relative min-h-screen bg-background">
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
                                className="group flex flex-col h-full bg-card border border-border overflow-hidden hover:border-muted-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Meta */}
                                    <div className="flex items-center gap-3 mb-4 text-xs font-medium">
                                        <span className="px-2.5 py-1 bg-muted text-muted-foreground flex items-center gap-1.5">
                                            <Tag className="w-3 h-3" />
                                            {post.category}
                                        </span>
                                        <span className="text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-muted-foreground transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Author & Date */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-6 h-6 overflow-hidden bg-muted">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-foreground">
                                                {post.author.name.split(" ")[0]}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
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