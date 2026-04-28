"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
    featured?: boolean;
}

const categoryColors: Record<string, string> = {
    "ai-ml": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    fullstack: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    tools: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    data: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const categoryLabels: Record<string, string> = {
    "ai-ml": "AI / ML",
    fullstack: "Full-Stack",
    tools: "Tools",
    data: "Data Science",
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 1, 0.5, 1],
            }}
            className={cn(
                "group relative flex flex-col rounded-2xl overflow-hidden",
                "bg-neutral-900 border border-neutral-800",
                "transition-all duration-300",
                isHovered
                    ? "border-neutral-700 shadow-lg shadow-neutral-950/50"
                    : "border-neutral-800/80",
                featured && "md:col-span-2 md:flex-row"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image */}
            <div
                className={cn(
                    "relative overflow-hidden bg-neutral-950",
                    featured ? "md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[320px]" : "aspect-[16/10]"
                )}
            >
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-500 ease-out",
                            isHovered && "scale-105"
                        )}
                        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

                {/* Featured badge */}
                {project.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/10">
                        Featured
                    </span>
                )}

                {/* Category badge */}
                <span
                    className={cn(
                        "absolute top-3 right-3 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border",
                        categoryColors[project.category]
                    )}
                >
                    {categoryLabels[project.category]}
                </span>
            </div>

            {/* Content */}
            <div
                className={cn(
                    "flex flex-col flex-grow p-5 md:p-6",
                    featured && "md:w-1/2 md:justify-center"
                )}
            >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {project.title}
                </h3>

                <p className="text-sm text-neutral-400 mb-4 line-clamp-2 flex-grow">
                    {project.shortDescription}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 5).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-medium rounded-md bg-neutral-800 text-neutral-400 border border-neutral-700/50"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 5 && (
                        <span className="px-2 py-0.5 text-xs text-neutral-500">
                            +{project.techStack.length - 5}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                                project.live
                                    ? "border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600"
                                    : "border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600"
                            )}
                        >
                            <Github className="w-3.5 h-3.5" />
                            Code
                        </a>
                    )}
                    {!project.live && !project.github && (
                        <span className="text-xs text-neutral-600 italic">
                            Private project
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
