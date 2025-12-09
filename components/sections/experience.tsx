"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { experiences } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

const typeIcons = {
    work: Briefcase,
    education: GraduationCap,
    project: Code,
};

export function Experience() {
    return (
        <SectionWrapper id="experience">
            <SectionHeader
                title="Experience"
                subtitle="My journey in software development"
            />

            <div className="max-w-3xl mx-auto">
                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 md:-translate-x-1/2" />

                    {experiences.map((exp, index) => {
                        const IconComponent = typeIcons[exp.type];
                        const isLeft = index % 2 === 0;

                        return (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={cn(
                                    "relative mb-12 last:mb-0",
                                    "pl-20 md:pl-0",
                                    "md:flex md:items-start",
                                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                )}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border-4 border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-sm z-10 relative"
                                    >
                                        <IconComponent className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div
                                    className={cn(
                                        "md:w-[calc(50%-2rem)]",
                                        isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                                    )}
                                >
                                    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 card-hover shadow-sm">
                                        {/* Period */}
                                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                            {exp.period}
                                        </span>

                                        {/* Title & Company */}
                                        <h3 className="text-xl font-bold mt-1 mb-1 text-neutral-900 dark:text-white">
                                            {exp.title}
                                        </h3>
                                        <p className="font-medium mb-3 text-neutral-600 dark:text-neutral-300">
                                            {exp.company}
                                        </p>

                                        {/* Description */}
                                        <p className="text-sm mb-4 text-neutral-600 dark:text-neutral-400">
                                            {exp.description}
                                        </p>

                                        {/* Highlights */}
                                        {exp.highlights && (
                                            <ul
                                                className={cn("space-y-2", isLeft && "md:text-right")}
                                            >
                                                {exp.highlights.map((highlight, i) => (
                                                    <li
                                                        key={i}
                                                        className={cn(
                                                            "text-sm flex items-start gap-2 text-neutral-500 dark:text-neutral-400",
                                                            isLeft && "md:flex-row-reverse"
                                                        )}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
