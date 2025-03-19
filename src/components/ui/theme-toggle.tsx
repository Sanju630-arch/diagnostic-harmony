
import { useEffect } from "react";

// This component now only forces dark mode without a toggle button
export function ThemeToggle() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Return null as we don't need a toggle button anymore
  return null;
}
