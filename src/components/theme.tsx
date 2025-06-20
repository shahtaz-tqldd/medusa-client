"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="hover:bg-blue-500/5 dark:hover:bg-white/5 p-2 rounded-full tr"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <div className="flx text-blue-400">
          <Sun className="h-5 w-5" />
        </div>
      ) : (
        <div className="flx text-nui">
          <Moon className="h-5 w-5" />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;