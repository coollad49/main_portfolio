"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { ProjectCard } from "../3d/project-card-3d";
import { projects, categories } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    const featuredProjects = filteredProjects.filter((p) => p.featured);
    const otherProjects = filteredProjects.filter((p) => !p.featured);

    return (
        <SectionWrapper id="projects" fullHeight={false} className="bg-black text-white">
            <SectionHeader
                title="Selected Work"
                subtitle="Engineered for performance. Designed with precision."
            />

            {/* Category Filters - Minimalist Porsche Style */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 md:mb-24"
            >
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                            "relative pb-2 text-xs md:text-sm font-mono uppercase tracking-[0.15em] transition-colors duration-300",
                            activeCategory === category.id
                                ? "text-white"
                                : "text-neutral-600 hover:text-neutral-300"
                        )}
                    >
                        {category.label}
                        {activeCategory === category.id && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Featured Projects - Single Column, expansive */}
                    {featuredProjects.length > 0 && (
                        <div className="grid grid-cols-1 gap-8 mb-8">
                            {featuredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    featured
                                />
                            ))}
                        </div>
                    )}

                    {/* Other Projects - 2 Column Grid */}
                    {otherProjects.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-8">
                            {otherProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index + featuredProjects.length}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Projects Count */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 md:mt-32 pt-8 border-t border-neutral-800/50 flex justify-between items-center"
            >
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">
                    Portfolio / {new Date().getFullYear()}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {String(filteredProjects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
            </motion.div>
        </SectionWrapper>
    );
}
