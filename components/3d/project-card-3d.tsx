"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
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

    const categoryLabels: Record<string, { label: string; color: string }> = {
        "ai-ml": { label: "AI / ML", color: "#a855f7" },
        fullstack: { label: "Full-Stack", color: "#3b82f6" },
        tools: { label: "Tools", color: "#22c55e" },
        data: { label: "Data Science", color: "#f97316" },
    };

    const cat = categoryLabels[project.category] || {
        label: "Other",
        color: "#6b7280",
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
            className="group cursor-pointer"
        >
            <div
                className="relative h-full rounded-2xl p-6 transition-all duration-300"
                style={{
                    backgroundColor: "#171717",
                    border: isHovered ? "1px solid #525252" : "1px solid #404040",
                    boxShadow: isHovered
                        ? "0 20px 40px -12px rgba(0,0,0,0.5)"
                        : "0 4px 12px rgba(0,0,0,0.2)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Content */}
                <div
                    className="relative z-10"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {/* Category badge */}
                    <span
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
                        style={{
                            backgroundColor: `${cat.color}20`,
                            color: cat.color,
                            border: `1px solid ${cat.color}40`,
                        }}
                    >
                        {cat.label}
                    </span>

                    {/* Featured badge */}
                    {project.featured && (
                        <span
                            className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full"
                            style={{
                                backgroundColor: "#fafafa",
                                color: "#171717",
                            }}
                        >
                            Featured
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-white transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm mb-4 line-clamp-3 text-neutral-400">
                        {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-md"
                                style={{
                                    backgroundColor: "#262626",
                                    color: "#a3a3a3",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span
                                className="px-2 py-1 text-xs rounded-md"
                                style={{
                                    backgroundColor: "#262626",
                                    color: "#737373",
                                }}
                            >
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm transition-colors hover:text-white text-neutral-400"
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
                                className="flex items-center gap-1 text-sm transition-colors hover:text-white text-neutral-400"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live
                            </a>
                        )}
                    </div>
                </div>

                {/* Bottom gradient line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(90deg, ${cat.color}50, ${cat.color}, ${cat.color}50)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />
            </div>
        </motion.div>
    );
}
