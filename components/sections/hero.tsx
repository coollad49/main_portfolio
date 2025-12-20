"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import { personalInfo } from "@/lib/utils";
import dynamic from "next/dynamic";

// Lazy load 3D scene for performance
const HeroScene = dynamic(
    () => import("../3d/hero-scene").then((mod) => mod.HeroScene),
    { ssr: false }
);

export function Hero() {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const role = personalInfo.roles[currentRole];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (displayText.length < role.length) {
                        setDisplayText(role.slice(0, displayText.length + 1));
                    } else {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    if (displayText.length > 0) {
                        setDisplayText(displayText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setCurrentRole((prev) => (prev + 1) % personalInfo.roles.length);
                    }
                }
            },
            isDeleting ? 50 : 100
        );

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRole]);

    const handleScrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleScrollDown = () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white/80 dark:bg-neutral-950/80"
        >
            {/* 3D Background */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-20" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg mb-4 text-neutral-600 dark:text-neutral-400"
                    >
                        Hello, I&apos;m
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight text-neutral-900 dark:text-white"
                    >
                        {personalInfo.name.split("-").map((part, i) => (
                            <span key={i}>
                                {part}
                                {i === 0 && <br className="md:hidden" />}
                                {i === 0 && <span className="hidden md:inline">-</span>}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl mb-2 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400"
                    >
                        {personalInfo.tagline}
                    </motion.p>

                    {/* Typing Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="h-8 mb-8"
                    >
                        <span className="text-lg md:text-xl font-medium text-neutral-900 dark:text-white">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.button
                            onClick={handleScrollToProjects}
                            className="btn btn-primary group flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View My Work
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="btn btn-outline group flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download className="w-4 h-4" />
                            Download Resume
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleScrollDown}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Scroll down"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.button>
        </section>
    );
}
