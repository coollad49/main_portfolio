"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { ProjectCard3D } from "../3d/project-card-3d";
import { projects, categories } from "@/lib/data/projects";

export function Projects() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <SectionWrapper id="projects" fullHeight={false}>
            <SectionHeader
                title="Featured Projects"
                subtitle="A selection of projects that showcase my problem-solving approach"
            />

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-2 mb-12"
            >
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
                        style={{
                            backgroundColor:
                                activeCategory === category.id ? "#fafafa" : "#262626",
                            color: activeCategory === category.id ? "#171717" : "#a3a3a3",
                            border:
                                activeCategory === category.id
                                    ? "1px solid #fafafa"
                                    : "1px solid #404040",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {category.label}
                    </motion.button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <ProjectCard3D project={project} index={index} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Projects Count */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8 text-sm"
                style={{ color: "#737373" }}
            >
                Showing {filteredProjects.length} of {projects.length} projects
            </motion.p>
        </SectionWrapper>
    );
}
