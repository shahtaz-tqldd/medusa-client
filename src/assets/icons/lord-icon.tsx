"use client";

import { useEffect, useRef } from "react";

interface LordIconProps {
  icon: string;
  height?: number;
  width?: number;
  trigger?: string;
}

const LordIcon: React.FC<LordIconProps> = ({ icon = "", height = 60, width = 60, trigger = "hover" }) => {
  const iconRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.customElements) {
      if (!customElements.get("lord-icon")) {
        import("https://cdn.lordicon.com/lordicon.js");
      }
    }
  }, []);

  return (
    <lord-icon
      ref={iconRef}
      src={`https://cdn.lordicon.com/${icon}.json`}
      trigger={trigger}
      colors="primary:#9cf4a7,secondary:#30c9e8"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default LordIcon;
