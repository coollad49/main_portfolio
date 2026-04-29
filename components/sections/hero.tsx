"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowRight, MapPin, MessageCircle } from "lucide-react";
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
            className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-neutral-950"
        >
            {/* 3D Background */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Subtle radial gradient overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,10,0.8) 100%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="flex flex-col items-start"
                >
                    {/* Location badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800/60 border border-neutral-700/50 text-neutral-400 text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            Available for work
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800/60 border border-neutral-700/50 text-neutral-400 text-sm">
                            <MapPin className="w-3.5 h-3.5" />
                            Nigeria
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
                        style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
                    >
                        {personalInfo.name}
                    </motion.h1>

                    {/* Tagline + typing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-10"
                    >
                        <p className="text-lg md:text-xl text-neutral-300 mb-3 max-w-2xl">
                            {personalInfo.tagline}
                        </p>
                        <p className="text-sm md:text-base text-neutral-500 max-w-2xl mb-4">
                            I work with founders, teams, and schools to build products that reduce
                            repetitive work, improve operations, and ship with confidence.
                        </p>
                        <div className="h-8 flex items-center">
                            <span className="text-base md:text-lg font-medium text-neutral-300 font-mono">
                                <span className="text-neutral-500">{`>`}</span>{" "}
                                {displayText}
                                <span className="animate-pulse text-neutral-500">_</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="flex flex-col sm:flex-row items-start gap-4"
                    >
                        <motion.a
                            onClick={handleScrollToProjects}
                            href="#projects"
                            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-medium rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            See Client Work
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </motion.a>
                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <MessageCircle className="w-4 h-4" />
                            Start a Project
                        </motion.a>
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-medium rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800/60 hover:border-neutral-600 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download className="w-4 h-4" />
                            Download Resume
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom bar with scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 z-10"
            >
                <div className="max-w-5xl mx-auto px-6 pb-8 flex items-center justify-between">
                    {/* Social links */}
                    <div className="hidden sm:flex items-center gap-4">
                        {[
                            { label: "GitHub", href: socialLinks.github },
                            { label: "LinkedIn", href: socialLinks.linkedin },
                            { label: "Twitter", href: socialLinks.twitter },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Scroll indicator */}
                    <motion.button
                        onClick={handleScrollDown}
                        className="flex items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer group ml-auto"
                        aria-label="Scroll down"
                    >
                        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
