"use client";

import { createContext, useState, ReactNode } from "react";

type ThemeContextType = {
  appearance: string;
  setAppearance: (value: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState("dark"); // 'light' or 'dark'

  return (
    <ThemeContext.Provider value={{ appearance, setAppearance }}>
      {children}
    </ThemeContext.Provider>
  );
}
