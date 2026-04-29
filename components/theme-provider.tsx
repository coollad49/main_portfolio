"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(theme);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResolvedTheme(theme);
    }, [theme, mounted]);

    const value: ThemeContextType = {
        theme,
        setTheme,
        resolvedTheme: mounted ? resolvedTheme : "light",
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
            theme: "light" as Theme,
            setTheme: () => { },
            resolvedTheme: "light" as const,
        };
    }
    return context;
}