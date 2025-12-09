"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    company: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Daniel delivered a comprehensive bursary management system that transformed how we handle student finances. His attention to detail and understanding of our needs was exceptional.",
        name: "School Administrator",
        role: "Bursary Department",
        company: "Daglore Model International School",
    },
    {
        id: 2,
        quote: "His ability to integrate AI into practical solutions is remarkable. The exam grading system he built showed real innovation in how we approach educational technology.",
        name: "Fellowship Mentor",
        role: "Program Lead",
        company: "Headstarter AI",
    },
    {
        id: 3,
        quote: "The logbook generator saved me hours of tedious documentation. It's exactly what every engineering student needs during their industrial training.",
        name: "Computer Science Student",
        role: "SIWES Intern",
        company: "Nigerian University",
    },
];

export function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, next]);

    return (
        <SectionWrapper id="testimonials" className="bg-neutral-50 dark:bg-neutral-900/50" fullHeight={false}>
            <SectionHeader
                title="What People Say"
                subtitle="Feedback from collaborators and users"
            />

            <div
                className="max-w-3xl mx-auto relative"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-0 md:left-8">
                    <Quote className="w-16 h-16 text-neutral-200 dark:text-neutral-800 fill-neutral-200 dark:fill-neutral-800" />
                </div>

                {/* Testimonial Content */}
                <div className="relative min-h-[280px] flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="text-center px-8 md:px-16"
                        >
                            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
                                &ldquo;{testimonials[current].quote}&rdquo;
                            </p>

                            <div>
                                <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-xl font-bold text-neutral-600 dark:text-neutral-300">
                                        {testimonials[current].name.charAt(0)}
                                    </span>
                                </div>
                                <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {testimonials[current].role} at {testimonials[current].company}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <motion.button
                        onClick={prev}
                        className="p-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    current === index
                                        ? "w-8 bg-neutral-900 dark:bg-white"
                                        : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                                )}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    <motion.button
                        onClick={next}
                        className="p-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </SectionWrapper>
    );
}
