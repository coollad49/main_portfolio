"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/utils";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
    () => import("../3d/hero-scene").then((mod) => mod.HeroScene),
    { ssr: false }
);

export function Hero() {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const role = personalInfo.roles[currentRole];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (displayText.length < role.length) {
                        setDisplayText(role.slice(0, displayText.length + 1));
                    } else {
                        setTimeout(() => setIsDeleting(true), 2500);
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
            isDeleting ? 40 : 90
        );

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRole, mounted]);

    const handleScrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleScrollDown = () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="relative h-[100dvh] flex flex-col overflow-hidden bg-background"
        >
            {/* 3D Background */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Architectural Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none grid-pattern opacity-30 z-[1]" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex flex-col items-start"
                >
                    {/* Top Status Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-6 mb-8 md:mb-10"
                    >
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                            </span>
                            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                Available for work
                            </span>
                        </div>
                        <span className="w-8 h-[1px] bg-border" />
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                            Based in Nigeria
                        </span>
                    </motion.div>

                    {/* Massive Name */}
                    <div className="flex flex-col mb-6 md:mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[110px] font-bold text-foreground uppercase leading-[0.85] tracking-tighter"
                        >
                            Lucas-Adebayo
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[110px] font-bold text-muted-foreground uppercase leading-[0.85] tracking-tighter"
                        >
                            Daniel
                        </motion.h1>
                    </div>

                    {/* Tagline + typing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl mb-10 md:mb-12"
                    >
                        <div className="h-7 md:h-8 flex items-center mb-4 md:mb-6">
                            <span className="text-xs md:text-sm font-mono text-muted-foreground tracking-widest uppercase">
                                <span className="text-muted-foreground/50 mr-4">{`//`}</span>
                                {displayText}
                                <span className="animate-pulse text-foreground ml-1">_</span>
                            </span>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                            Engineered solutions for founders, teams, and schools. Reducing repetitive work, optimizing operations, and shipping with absolute precision.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center gap-4 md:gap-6"
                    >
                        <button
                            onClick={handleScrollToProjects}
                            className="btn btn-primary group w-full sm:w-auto"
                        >
                            <span className="mr-4">View Projects</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <a
                            href="/resume.pdf"
                            download
                            className="btn btn-outline group w-full sm:w-auto"
                        >
                            <span className="mr-4">Resume</span>
                            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-0 left-0 right-0 z-10 border-t border-border bg-background/50 backdrop-blur-md"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
                    {/* Social links */}
                    <div className="flex items-center gap-6 md:gap-8">
                        {[
                            { label: "GH", href: socialLinks.github },
                            { label: "IN", href: socialLinks.linkedin },
                            { label: "X", href: socialLinks.twitter },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Scroll indicator */}
                    <button
                        onClick={handleScrollDown}
                        className="flex items-center gap-3 md:gap-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                        aria-label="Scroll down"
                    >
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] hidden sm:block">Scroll</span>
                        <div className="w-5 h-8 md:w-6 md:h-10 border border-border rounded-full flex justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1.5 md:h-2 bg-muted-foreground rounded-full"
                            />
                        </div>
                    </button>
                </div>
            </motion.div>
        </section>
    );
}