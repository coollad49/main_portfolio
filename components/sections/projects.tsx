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
        <SectionWrapper id="projects" fullHeight={false} className="bg-neutral-950">
            <SectionHeader
                title="Selected Work"
                subtitle="Projects that demonstrate technical depth and problem-solving"
            />

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-2 mb-14"
            >
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                            "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border",
                            activeCategory === category.id
                                ? "bg-white text-neutral-900 border-white"
                                : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200"
                        )}
                    >
                        {category.label}
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
                    transition={{ duration: 0.3 }}
                >
                    {/* Featured Projects */}
                    {featuredProjects.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-5 mb-5">
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

                    {/* Other Projects */}
                    {otherProjects.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-10 text-sm text-neutral-600"
            >
                Showing {filteredProjects.length} of {projects.length} projects
            </motion.p>
        </SectionWrapper>
    );
}
