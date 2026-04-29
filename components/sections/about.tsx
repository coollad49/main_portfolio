"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "../layout/section-wrapper";
import { stats } from "@/lib/data/experience";
import { ArrowRight } from "lucide-react";

export function About() {
    return (
        <SectionWrapper id="about" className="bg-secondary text-foreground">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4"
                    >
                        01 // About
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none"
                    >
                        Precision
                        <br />
                        Engineering.
                    </motion.h3>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-sm text-sm text-muted-foreground font-mono leading-relaxed"
                >
                    HOW I TURN COMPLEX PROBLEMS INTO PRACTICAL, SCALABLE PRODUCTS WITH ZERO COMPROMISES.
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                {/* Visual / Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="lg:col-span-5 relative"
                >
                    <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden group">
                        <Image
                            src="/me.png"
                            alt="Lucas-Adebayo Daniel"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            priority
                        />
                        {/* Overlay elements */}
                        <div className="absolute inset-0 border border-border pointer-events-none" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-4">
                            <div className="w-8 h-[1px] bg-foreground" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-foreground">
                                System Arch.
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="lg:col-span-7 flex flex-col justify-between h-full"
                >
                    <div className="space-y-8 text-muted-foreground text-base md:text-lg leading-relaxed font-light mb-16">
                        <p className="text-xl md:text-3xl text-foreground font-medium tracking-tight leading-snug">
                            I am a product-minded engineer who helps teams ship useful software and AI features faster, with less operational friction.
                        </p>

                        <p>
                            I focus on one thing: identifying where teams lose time, then building systems that make that work faster, simpler, and more reliable. That includes everything from automated grading workflows to school finance and operations platforms.
                        </p>

                        <p>
                            Clients usually come to me when a process is too manual, too slow, or too error-prone. I design and build end-to-end solutions that improve day-to-day execution while still being maintainable for the team long term.
                        </p>
                    </div>

                    {/* Architectural Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                className="bg-background p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l first:border-l-0 border-border"
                            >
                                <div className="text-3xl lg:text-4xl font-mono text-foreground mb-4 tracking-tighter">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                                    {stat.label}
                                    <ArrowRight className="w-3 h-3 text-muted-foreground/40" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
