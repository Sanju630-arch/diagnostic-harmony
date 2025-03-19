
import { useEffect, useState } from "react";

// This component now forces dark mode without a toggle button
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted when component mounts to prevent flickering
    setMounted(true);
    
    // Force dark mode
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) return null;

  // Return null as we don't need a toggle button anymore
  return null;
}
