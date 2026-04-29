"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import type { BlogPost } from "@/lib/data/blog";
import Link from "next/link";

interface BlogProps {
    posts: BlogPost[];
}

export function Blog({ posts }: BlogProps) {
    // Display only the first 3 posts on the homepage
    const recentPosts = posts.slice(0, 3);

    return (
        <SectionWrapper id="blog" className="bg-secondary" fullHeight={false}>
            <SectionHeader
                title="Blog & Insights"
                subtitle="Practical lessons on building better products and workflows"
            />

            <div className="grid md:grid-cols-3 gap-5">
                {recentPosts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <Link href={`/blog/${post.slug}`} className="block h-full">
                            <div className="h-full p-6 bg-background border border-border hover:border-muted-foreground transition-all duration-300 flex flex-col">
                                {/* Category & Meta */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-muted text-muted-foreground border border-border">
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-muted-foreground transition-colors">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-muted-foreground text-sm flex-grow mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Read More */}
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                                    Read more
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>

            {/* View All Link */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center mt-8"
            >
                <Link href="/blog">
                    <motion.button
                        className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-muted hover:border-muted-foreground transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View All Posts
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </Link>
            </motion.div>
        </SectionWrapper>
    );
}