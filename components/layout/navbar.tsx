"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
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
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "py-3 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800"
                    : "py-5 bg-transparent"
            )}
        >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                {/* <motion.a
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("#home");
                    }}
                    className="group flex items-center gap-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-neutral-500 font-mono text-lg transition-colors group-hover:text-neutral-300">
                        {"<"}
                    </span>
                    <span className="font-bold text-lg tracking-tight text-white">
                        Lucas<span className="text-neutral-500">-</span>Adebayo
                        <span className="text-neutral-500 ml-1">|</span>
                        <span className="text-neutral-400 ml-1 font-medium">
                            Daniel
                        </span>
                    </span>
                    <span className="text-neutral-500 font-mono text-lg transition-colors group-hover:text-neutral-300">
                        {"/>"}
                    </span>
                </motion.a> */}

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 ml-auto">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                            }}
                            className={cn(
                                "text-sm font-medium transition-colors relative",
                                activeSection === item.href.replace("#", "")
                                    ? "text-white"
                                    : "text-neutral-400 hover:text-white"
                            )}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            {item.label}
                            {activeSection === item.href.replace("#", "") && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                                />
                            )}
                        </motion.a>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
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
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800"
                    >
                        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
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
                                        "text-lg font-medium py-2",
                                        activeSection === item.href.replace("#", "")
                                            ? "text-white"
                                            : "text-neutral-400"
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