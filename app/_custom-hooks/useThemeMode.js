"use client";

import { useTheme } from "next-themes";

export function useThemeMode() {
  const { theme, setTheme } = useTheme();

  const setMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return [setMode];
}
