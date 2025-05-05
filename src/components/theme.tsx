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
      className="hover:bg-violet-600/5 dark:hover:bg-white/10 p-2 rounded-full tr"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <div className="flx text-orange-300">
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