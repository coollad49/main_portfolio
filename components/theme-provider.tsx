"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("system");
    const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        const getSystemTheme = (): "dark" | "light" => {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        };

        const applyTheme = (t: Theme) => {
            const resolved = t === "system" ? getSystemTheme() : t;
            setResolvedTheme(resolved);

            root.classList.remove("light", "dark");
            root.classList.add(resolved);
            localStorage.setItem("theme", t);
        };

        applyTheme(theme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, mounted]);

    // Provide context even before mounting (with defaults)
    const value: ThemeContextType = {
        theme,
        setTheme,
        resolvedTheme: mounted ? resolvedTheme : "dark",
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // Return safe defaults during SSR or when not wrapped in provider
        return {
            theme: "system" as Theme,
            setTheme: () => { },
            resolvedTheme: "dark" as "dark" | "light",
        };
    }
    return context;
}
