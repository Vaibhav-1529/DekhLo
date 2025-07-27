//@ts-nocheck
'use client';
import { useState, createContext, useContext } from "react";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

// Create context
export const ThemeContext = createContext();

export default function RootLayout({ children }) {
  const [appearance, setAppearance] = useState("dark"); // 'light' or 'dark'

  return (
    <html lang="en">
      <body >
        {/* <Theme appearance={appearance} accentColor="blu"> */}
          <ThemeContext.Provider value={{ appearance:appearance, setAppearance:setAppearance }}>
            {children}
          </ThemeContext.Provider>
        {/* </Theme> */}
      </body>
    </html>
  );
}
