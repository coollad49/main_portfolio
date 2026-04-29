"use client";

import { motion } from "framer-motion";
import { Layout, Server, Brain, Wrench, type LucideIcon } from "lucide-react";
import { SectionWrapper } from "../layout/section-wrapper";
import { skillCategories } from "@/lib/data/skills";

const iconMap: Record<string, LucideIcon> = {
    Layout,
    Server,
    Brain,
    Wrench,
};

export function Skills() {
    return (
        <SectionWrapper id="skills" className="bg-secondary text-foreground">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4"
                    >
                        02 // Capabilities
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none"
                    >
                        Technical
                        <br />
                        Arsenal.
                    </motion.h3>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-sm text-sm text-muted-foreground font-mono leading-relaxed"
                >
                    TOOLS CHOSEN FOR PERFORMANCE, RELIABILITY, AND BUSINESS IMPACT.
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border/50">
                {skillCategories.map((category, categoryIndex) => {
                    const IconComponent = iconMap[category.icon] || Layout;

                    return (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="bg-background p-8 md:p-12 relative group"
                        >
                            {/* Number Indicator */}
                            <div className="absolute top-8 right-8 text-border font-mono text-4xl font-bold tracking-tighter group-hover:text-muted-foreground transition-colors">
                                0{categoryIndex + 1}
                            </div>

                            <div className="mb-12">
                                <IconComponent className="w-8 h-8 text-foreground mb-6" strokeWidth={1} />
                                <h3 className="text-2xl font-bold tracking-tight text-foreground uppercase">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                        }}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="w-1.5 h-1.5 bg-border rounded-full" />
                                        <span className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground uppercase group-hover:text-foreground transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}