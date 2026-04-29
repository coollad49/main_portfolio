"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/section-wrapper";
import { experiences } from "@/lib/data/experience";

export function Experience() {
    return (
        <SectionWrapper id="experience" className="bg-secondary text-foreground">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4"
                    >
                        04 // Career
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none"
                    >
                        Operational
                        <br />
                        History.
                    </motion.h3>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-sm text-sm text-muted-foreground font-mono leading-relaxed"
                >
                    A TIMELINE OF ENGINEERING ROLES, PROJECTS, AND CONSTANT ITERATION.
                </motion.div>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="border-l border-border ml-4 md:ml-[140px] pl-8 md:pl-16 relative space-y-16">
                    {experiences.map((exp) => {
                        return (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="relative group"
                            >
                                {/* Timeline Node */}
                                <div className="absolute -left-[53px] md:-left-[85px] top-1 w-6 h-6 bg-background border border-border flex items-center justify-center group-hover:border-foreground transition-colors duration-500">
                                    <div className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-foreground transition-colors duration-500" />
                                </div>

                                {/* Period (Desktop - Absolute Left) */}
                                <div className="hidden md:block absolute -left-[240px] top-1 w-[100px] text-right">
                                    <span className="text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Content */}
                                <div>
                                    {/* Period (Mobile only) */}
                                    <div className="md:hidden mb-4">
                                        <span className="text-xs font-mono uppercase tracking-[0.1em] text-muted-foreground">
                                            {exp.period}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                            {exp.title}
                                        </h3>
                                        <span className="text-border hidden sm:block">—</span>
                                        <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground hidden sm:block">
                                            {exp.company}
                                        </span>
                                    </div>
                                    
                                    <div className="sm:hidden mb-6 text-sm font-mono tracking-widest uppercase text-muted-foreground">
                                        {exp.company}
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl font-light">
                                        {exp.description}
                                    </p>

                                    {exp.highlights && exp.highlights.length > 0 && (
                                        <ul className="space-y-3">
                                            {exp.highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground">
                                                    <span className="text-border font-mono mt-0.5">{`>`}</span>
                                                    <span className="leading-relaxed">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}