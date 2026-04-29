"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [resolvedTheme, setResolvedTheme] = useState<"dark">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.classList.remove("light");
        root.classList.add("dark");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResolvedTheme("dark");
    }, [theme, mounted]);

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
        return {
            theme: "dark" as Theme,
            setTheme: () => { },
            resolvedTheme: "dark" as const,
        };
    }
    return context;
}
