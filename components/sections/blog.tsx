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
        <SectionWrapper id="blog" fullHeight={false}>
            <SectionHeader
                title="Blog & Insights"
                subtitle="Thoughts on development, AI, and building products"
            />

            <div className="grid md:grid-cols-3 gap-6">
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
                            <div className="h-full p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 card-hover flex flex-col">
                                {/* Category & Meta */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm flex-grow mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Read More */}
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:gap-2 transition-all">
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
                        className="btn btn-outline flex items-center gap-2 mx-auto"
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
