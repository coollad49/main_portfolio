"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navItems.map((item) => item.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        if (isHomePage) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push("/" + href);
        }
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "py-4 bg-black/80 backdrop-blur-xl border-b border-neutral-900"
                    : "py-6 bg-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Minimalist Logo */}
                <motion.a
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("#home");
                    }}
                    className="flex flex-col group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="font-bold text-lg tracking-tighter text-white uppercase leading-none">
                        LAD
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase leading-none mt-1">
                        System
                    </span>
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                            }}
                            className={cn(
                                "text-xs font-mono uppercase tracking-widest transition-colors relative py-2",
                                activeSection === item.href.replace("#", "")
                                    ? "text-white"
                                    : "text-neutral-500 hover:text-neutral-300"
                            )}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            {item.label}
                            {activeSection === item.href.replace("#", "") && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white"
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-neutral-900"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={cn(
                                        "text-sm font-mono uppercase tracking-widest py-2 border-b border-neutral-900",
                                        activeSection === item.href.replace("#", "")
                                            ? "text-white"
                                            : "text-neutral-500"
                                    )}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}