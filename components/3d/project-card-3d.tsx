"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

interface ProjectCard3DProps {
    project: Project;
    index: number;
}

export function ProjectCard3D({ project, index }: ProjectCard3DProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXValue = (mouseY / (rect.height / 2)) * -8;
        const rotateYValue = (mouseX / (rect.width / 2)) * 8;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    const categoryColors: Record<string, string> = {
        "ai-ml":
            "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
        fullstack:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
        tools:
            "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
        data: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
            }}
            className="group cursor-pointer h-full"
        >
            <div
                className={cn(
                    "relative h-full rounded-2xl p-6 transition-all duration-300",
                    "bg-white dark:bg-neutral-900",
                    "border border-neutral-200 dark:border-neutral-800",
                    isHovered
                        ? "shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/50 border-neutral-300 dark:border-neutral-700"
                        : "shadow-sm"
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Content */}
                <div
                    className="relative z-10 flex flex-col h-full"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <span
                            className={cn(
                                "inline-block px-3 py-1 text-xs font-medium rounded-full border",
                                categoryColors[project.category]
                            )}
                        >
                            {project.category === "ai-ml"
                                ? "AI / ML"
                                : project.category === "fullstack"
                                    ? "Full-Stack"
                                    : project.category === "tools"
                                        ? "Tools"
                                        : "Data Science"}
                        </span>

                        {project.featured && (
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm mb-4 line-clamp-3 text-neutral-600 dark:text-neutral-400 flex-grow">
                        {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Code
                            </a>
                        )}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live
                            </a>
                        )}
                    </div>
                </div>

                {/* Bottom gradient line */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                        "bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-600 to-transparent"
                    )}
                />
            </div>
        </motion.div>
    );
}
