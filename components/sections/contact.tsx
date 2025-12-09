"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, Twitter, Check, Copy } from "lucide-react";
import { SectionWrapper, SectionHeader } from "../layout/section-wrapper";
import { socialLinks } from "@/lib/utils";
import { cn } from "@/lib/utils";

const socials = [
    { icon: Github, href: socialLinks.github, label: "GitHub", color: "hover:text-neutral-900 dark:hover:text-white" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter", color: "hover:text-sky-500" },
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
        <SectionWrapper id="contact" className="bg-neutral-50 dark:bg-neutral-900/50">
            <SectionHeader
                title="Get In Touch"
                subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
            />

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                        I&apos;m always open to discussing new projects, creative ideas, or
                        opportunities to be part of your vision. Whether you need a full-stack
                        developer, an AI solution, or just technical advice — reach out!
                    </p>

                    {/* Email */}
                    <div className="mb-8">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                            Email me at
                        </p>
                        <button
                            onClick={copyEmail}
                            className="flex items-center gap-2 text-lg font-medium hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group"
                        >
                            <Mail className="w-5 h-5" />
                            {socialLinks.email}
                            <span className="text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </span>
                        </button>
                        {copied && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-green-500 mt-1"
                            >
                                Copied to clipboard!
                            </motion.p>
                        )}
                    </div>

                    {/* Social Links */}
                    <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                            Or find me on
                        </p>
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
                                        "text-neutral-600 dark:text-neutral-400 transition-all duration-200",
                                        social.color
                                    )}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full btn btn-primary",
                                isSubmitting && "opacity-70 cursor-not-allowed"
                            )}
                            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                    />
                                    Sending...
                                </span>
                            ) : isSubmitted ? (
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    Message Sent!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </span>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
