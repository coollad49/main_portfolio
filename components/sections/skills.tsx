"use client";

import { motion } from "framer-motion";
import { Layout, Server, Brain, Wrench, type LucideIcon } from "lucide-react";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { skillCategories } from "@/lib/data/skills";

const iconMap: Record<string, LucideIcon> = {
    Layout,
    Server,
    Brain,
    Wrench,
};

export function Skills() {
    return (
        <SectionWrapper id="skills" className="bg-neutral-950">
            <SectionHeader
                title="Skills & Tech Stack"
                subtitle="Technologies I use to bring ideas to life"
            />

            <div className="grid md:grid-cols-2 gap-5">
                {skillCategories.map((category, categoryIndex) => {
                    const IconComponent = iconMap[category.icon] || Layout;

                    return (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-6 rounded-2xl transition-all duration-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700">
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-xl bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
                                        <IconComponent className="w-6 h-6 text-neutral-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills Grid */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.span
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: categoryIndex * 0.1 + skillIndex * 0.03,
                                            }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="px-4 py-2 text-sm font-medium rounded-lg cursor-default transition-all duration-200 bg-neutral-800 text-neutral-300 border border-transparent hover:border-neutral-600 hover:bg-neutral-700"
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Additional Skills Note */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 text-sm text-neutral-500"
            >
                ...and always learning more! Currently exploring advanced LLM
                orchestration and edge computing.
            </motion.p>
        </SectionWrapper>
    );
}
