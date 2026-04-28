"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { socialLinks } from "@/lib/utils";

const socials = [
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-neutral-800 bg-neutral-950">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <p className="text-2xl font-bold mb-1 text-white">
                            LAD<span className="text-neutral-500">.</span>
                        </p>
                        <p className="text-sm text-neutral-500">
                            Building intelligent solutions
                        </p>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-4"
                    >
                        {socials.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:border-neutral-700 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 pt-8 border-t border-neutral-800 text-center"
                >
                    <p className="text-sm text-neutral-500 flex items-center justify-center gap-1">
                        © {currentYear} Lucas-Adebayo Daniel. Made with
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        in Nigeria
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
