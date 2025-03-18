
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if user has a theme preference in local storage
    const storedTheme = localStorage.getItem("theme");
    
    // Check for system preference if no stored preference
    if (!storedTheme) {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemPreference);
      localStorage.setItem("theme", systemPreference);
    } else {
      setTheme(storedTheme as "light" | "dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Store the preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="rounded-xl bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-medium shadow-md">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </TooltipContent>
    </Tooltip>
  );
}
