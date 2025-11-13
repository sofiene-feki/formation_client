import React from "react";
import { useAppTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
