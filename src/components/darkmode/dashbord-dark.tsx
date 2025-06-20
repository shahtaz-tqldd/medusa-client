import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function SwithDarkMode() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <label htmlFor="dark-mode">{theme === "dark" ? "Let there be Light" : "Just get Dark"}</label>
    </div>
  );
}
