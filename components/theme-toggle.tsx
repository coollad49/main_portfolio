"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";

export function ThemeToggle() {
    return (
        <motion.div
            className="p-2 rounded-full bg-neutral-800/60 border border-neutral-700/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Dark mode"
        >
            <Moon className="w-5 h-5 text-neutral-400" />
        </motion.div>
    );
}