"use client";

import React, { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  // Apply theme class to the html element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme);
  }, [theme]);

  return <>{children}</>;
}
