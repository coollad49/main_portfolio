"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { stats } from "@/lib/data/experience";

export function About() {
    return (
        <SectionWrapper id="about" className="bg-neutral-900">
            <SectionHeader
                title="About"
                subtitle="The craft behind the code"
            />

            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                {/* Avatar / Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="lg:col-span-2 flex justify-center lg:justify-start"
                >
                    <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-full lg:h-auto lg:aspect-square max-w-sm">
                        {/* Subtle ring */}
                        <div className="absolute inset-0 rounded-2xl border border-neutral-700/50" />
                        <div className="absolute -inset-3 rounded-2xl border border-neutral-800/30" />

                        {/* Avatar Container */}
                        <div className="absolute inset-0 rounded-2xl bg-neutral-800 overflow-hidden">
                            <Image
                                src="/me.jpg"
                                alt="Lucas-Adebayo Daniel"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                    className="lg:col-span-3"
                >
                    <div className="space-y-5 text-neutral-400 leading-relaxed">
                        <p className="text-lg text-neutral-200">
                            I&apos;m a{" "}
                            <span className="text-white font-medium">
                                Full-Stack Developer
                            </span>{" "}
                            and{" "}
                            <span className="text-white font-medium">
                                AI Engineer
                            </span>{" "}
                            from Nigeria, passionate about building intelligent solutions that
                            solve real-world problems.
                        </p>

                        <p>
                            My journey started with a simple belief: if there&apos;s a tedious
                            process that can be automated, it should be. This mindset has led
                            me to build everything from{" "}
                            <span className="text-neutral-300">
                                AI-powered exam graders
                            </span>{" "}
                            to{" "}
                            <span className="text-neutral-300">
                                school management systems
                            </span>
                            .
                        </p>

                        <p>
                            I specialize in combining modern web technologies with AI
                            capabilities to create products that are not just functional, but
                            genuinely useful. Whether it&apos;s integrating LLMs, building RAG
                            pipelines, or crafting beautiful interfaces, I love every part of
                            the development process.
                        </p>
                    </div>

                    {/* Stats - inline, not cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-10 pt-8 border-t border-neutral-800"
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm mt-1 text-neutral-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
