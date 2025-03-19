
import { useEffect, useState } from "react";

// This component now forces light mode without a toggle button
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted when component mounts to prevent flickering
    setMounted(true);
    
    // Force light mode by removing dark class if present
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) return null;

  // Return null as we don't need a toggle button
  return null;
}
