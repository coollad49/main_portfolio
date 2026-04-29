"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Check, Copy, ArrowRight } from "lucide-react";
import { SectionWrapper } from "../layout/section-wrapper";
import { socialLinks } from "@/lib/utils";
import { cn } from "@/lib/utils";

const socials = [
    { icon: Github, href: socialLinks.github, label: "GITHUB" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LINKEDIN" },
    { icon: Twitter, href: socialLinks.twitter, label: "TWITTER" },
];

export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const copyEmail = async () => {
        await navigator.clipboard.writeText(socialLinks.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <SectionWrapper id="contact" className="bg-black text-white relative">
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 pointer-events-none grid-pattern opacity-30" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4"
                        >
                            05 // Initiation
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none"
                        >
                            Establish
                            <br />
                            Contact.
                        </motion.h3>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-sm text-sm text-neutral-400 font-mono leading-relaxed"
                    >
                        READY TO BUILD SYSTEMS THAT ACCELERATE YOUR GROWTH. INITIATE SECURE COMMS.
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex flex-col h-full"
                    >
                        <p className="text-xl md:text-3xl text-white font-medium tracking-tight leading-snug mb-12">
                            Whether you need a full-stack developer, an AI solution, or precise technical execution—reach out.
                        </p>

                        <div className="space-y-12">
                            {/* Email Block */}
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">Direct Comms</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={copyEmail}
                                        className="group relative flex items-center gap-4 text-xl md:text-2xl font-bold tracking-tight hover:text-neutral-300 transition-colors"
                                    >
                                        <span>{socialLinks.email}</span>
                                        <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-white transition-colors bg-neutral-950">
                                            {copied ? (
                                                <Check className="w-4 h-4 text-white" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                                {copied && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs font-mono text-neutral-400 mt-4"
                                    >
                                        &gt; COPIED TO CLIPBOARD
                                    </motion.p>
                                )}
                            </div>

                            {/* Social Links Block */}
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">Network</p>
                                <div className="flex gap-4">
                                    {socials.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center w-16 h-16 bg-neutral-950 border border-neutral-800 hover:border-white transition-colors duration-300 relative overflow-hidden"
                                            aria-label={social.label}
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                            <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-black relative z-10 transition-colors duration-500" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="bg-neutral-950 p-8 md:p-12 border border-neutral-800 relative group"
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                                    Name / Callsign
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-white placeholder:text-neutral-700 focus:border-white focus:outline-none transition-colors font-mono text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                                    Return Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-white placeholder:text-neutral-700 focus:border-white focus:outline-none transition-colors font-mono text-sm"
                                    placeholder="system@domain.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                                    Payload
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-white placeholder:text-neutral-700 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                                    placeholder="Describe your requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full btn btn-primary flex justify-between items-center group",
                                    isSubmitting && "opacity-50 cursor-wait"
                                )}
                            >
                                <span>
                                    {isSubmitting ? "TRANSMITTING..." : isSubmitted ? "RECEIVED" : "TRANSMIT MESSAGE"}
                                </span>
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                                    />
                                ) : isSubmitted ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
