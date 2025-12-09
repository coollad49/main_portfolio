"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { stats } from "@/lib/data/experience";

export function About() {
    return (
        <SectionWrapper id="about">
            <SectionHeader
                title="About Me"
                subtitle="Building solutions that make a real difference"
            />

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Avatar / Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* Gradient Ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-600 dark:from-neutral-600 dark:to-neutral-800 animate-pulse" />

                        {/* Avatar Container */}
                        <div className="absolute inset-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
                            <Image
                                src="/me.jpg"
                                alt="Lucas-Adebayo Daniel"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-neutral-300/50 dark:bg-neutral-700/50 blur-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-neutral-400/30 dark:bg-neutral-600/30 blur-xl"
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                        Hi, I&apos;m Daniel! 👋
                    </h3>

                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                        <p>
                            I&apos;m a{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">
                                Full-Stack Developer
                            </span>{" "}
                            and{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">
                                AI Engineer
                            </span>{" "}
                            from Nigeria, passionate about building intelligent solutions that
                            solve real-world problems.
                        </p>

                        <p>
                            My journey started with a simple belief: if there&apos;s a tedious
                            process that can be automated, it should be. This mindset has led
                            me to build everything from{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">
                                AI-powered exam graders
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">
                                school management systems
                            </span>
                            .
                        </p>

                        <p>
                            I specialize in combining modern web technologies with AI
                            capabilities to create products that are not just functional, but
                            genuinely useful. Whether it&apos;s integrating LLMs, building RAG
                            pipelines, or crafting beautiful interfaces — I love every part of
                            the development process.
                        </p>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="text-center p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs mt-1 text-neutral-500 dark:text-neutral-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
