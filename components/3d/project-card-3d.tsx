"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
    featured?: boolean;
}

const categoryLabels: Record<string, string> = {
    "ai-ml": "AI / ML",
    fullstack: "Full-Stack",
    tools: "Tools",
    data: "Data Science",
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Format index to be like "01", "02", etc.
    const formattedIndex = (index + 1).toString().padStart(2, "0");

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.7,
                delay: (index % 3) * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={cn(
                "group relative flex flex-col bg-background border border-border/60",
                "transition-colors duration-500 hover:bg-muted/40 hover:border-muted-foreground",
                "rounded-none",
                featured ? "md:col-span-2 p-8 md:p-12" : "p-6 md:p-8"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Top Header: Index & Category */}
            <div className="flex justify-between items-start mb-12 md:mb-16">
                <span className="text-muted-foreground font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
                    {formattedIndex} <span className="mx-2 text-border">—</span> {categoryLabels[project.category]}
                </span>
                <div className="overflow-hidden relative w-6 h-6">
                    <ArrowRight 
                        className={cn(
                            "absolute inset-0 w-6 h-6 text-muted-foreground transition-all duration-500 ease-out transform",
                            isHovered ? "translate-x-full -translate-y-full opacity-0" : "translate-x-0 translate-y-0 opacity-100"
                        )} 
                    />
                    <ArrowRight 
                        className={cn(
                            "absolute inset-0 w-6 h-6 text-foreground transition-all duration-500 ease-out transform -rotate-45",
                            isHovered ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-full translate-y-full opacity-0"
                        )} 
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <h3 
                    className={cn(
                        "font-bold text-foreground mb-6 tracking-tight transition-colors duration-300",
                        featured ? "text-3xl md:text-5xl leading-tight" : "text-2xl md:text-3xl leading-snug"
                    )}
                >
                    {project.title}
                </h3>

                <p 
                    className={cn(
                        "text-muted-foreground leading-relaxed max-w-3xl",
                        featured ? "text-base md:text-lg mb-12" : "text-sm md:text-base mb-10 line-clamp-3"
                    )}
                >
                    {featured ? project.description : project.shortDescription}
                </p>
            </div>

            {/* Bottom Footer: Tech Stack & Links */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 border-t border-border/50">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-2xl">
                    {project.techStack.map((tech, i) => (
                        <div key={tech} className="flex items-center gap-4">
                            <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                {tech}
                            </span>
                            {i < project.techStack.length - 1 && (
                                <span className="w-1 h-1 bg-border" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 shrink-0">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span>Code</span>
                            <Github className="w-4 h-4 transition-transform group-hover/link:scale-110" />
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                        >
                            <span>Live Demo</span>
                            <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                    )}
                    {!project.live && !project.github && (
                        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">
                            Internal
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}