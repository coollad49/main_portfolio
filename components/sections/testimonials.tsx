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
        <SectionWrapper id="testimonials" className="bg-neutral-950" fullHeight={false}>
            <SectionHeader
                title="What People Say"
                subtitle="Feedback from collaborators and users"
            />

            <div
                className="max-w-4xl mx-auto relative px-4"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Main Card */}
                <div className="relative bg-neutral-900 rounded-2xl p-8 md:p-12 border border-neutral-800">

                    {/* Decorative Quote Icon */}
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-10">
                        <Quote className="w-12 h-12 md:w-16 md:h-16 text-neutral-500 fill-current" />
                    </div>

                    {/* Testimonial Content */}
                    <div className="relative min-h-[240px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="text-center max-w-2xl mx-auto"
                            >
                                <p className="text-xl md:text-2xl font-medium text-neutral-100 leading-relaxed mb-8">
                                    &ldquo;{testimonials[current].quote}&rdquo;
                                </p>

                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-neutral-800 mb-4 flex items-center justify-center border border-neutral-700">
                                        <span className="text-lg font-bold text-white">
                                            {testimonials[current].name.charAt(0)}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-lg text-white">
                                        {testimonials[current].name}
                                    </h4>
                                    <p className="text-neutral-400 text-sm font-medium">
                                        {testimonials[current].role}
                                        <span className="mx-1.5 opacity-50">•</span>
                                        <span className="text-neutral-500">
                                            {testimonials[current].company}
                                        </span>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8 md:px-12">
                    {/* Prev Button */}
                    <motion.button
                        onClick={prev}
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>

                    {/* Dots */}
                    <div className="flex gap-2.5">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    current === index
                                        ? "w-8 bg-white"
                                        : "w-2 bg-neutral-700 hover:bg-neutral-600"
                                )}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Next Button */}
                    <motion.button
                        onClick={next}
                        className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </SectionWrapper>
    );
}
