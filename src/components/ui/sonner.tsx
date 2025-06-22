"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme = "system" } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      position="bottom-left"
      toastOptions={{
        classNames: {
          toast:
            "border shadow-md backdrop-blur-sm",
        },
      }}
      className="toaster group"
      style={
        {
          "--normal-bg": isDark ? "#fff" : "#222",
          "--normal-text": isDark ? "#222" : "#fff",
          
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
