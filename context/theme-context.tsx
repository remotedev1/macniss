"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void };
type ThemeProviderProps = { children: ReactNode; defaultTheme?: Theme; storageKey?: string };

const ThemeProviderContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    setThemeState(storedTheme || defaultTheme);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (nextTheme: Theme) => {
      const systemTheme: Exclude<Theme, "system"> = mediaQuery.matches ? "dark" : "light";
      const effectiveTheme = nextTheme === "system" ? systemTheme : nextTheme;
      root.classList.remove("light", "dark");
      root.classList.add(effectiveTheme);
    };
    const handleSystemChange = () => theme === "system" && applyTheme("system");
    applyTheme(theme);
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return <ThemeProviderContext.Provider value={{ theme, setTheme }}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
