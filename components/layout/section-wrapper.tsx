"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    className?: string;
    fullHeight?: boolean;
}

export function SectionWrapper({
    children,
    id,
    className,
    fullHeight = true,
}: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative py-20 md:py-32 px-6 bg-white dark:bg-neutral-950 transition-colors duration-300",
                fullHeight && "min-h-screen flex items-center",
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto"
            >
                {children}
            </motion.div>
        </section>
    );
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
}

export function SectionHeader({
    title,
    subtitle,
    align = "center",
}: SectionHeaderProps) {
    return (
        <div
            className={cn("mb-12 md:mb-16", align === "center" && "text-center")}
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white"
                style={{ letterSpacing: "-0.02em" }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                        "text-lg max-w-xl text-neutral-600 dark:text-neutral-400",
                        align === "center" && "mx-auto"
                    )}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
