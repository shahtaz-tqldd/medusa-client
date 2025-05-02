"use client";

import { useEffect, useRef } from "react";

const LordIcon = () => {
  const iconRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.customElements) {
      // Ensure lord-icon is registered
      if (!customElements.get("lord-icon")) {
        import("https://cdn.lordicon.com/lordicon.js");
      }
    }
  }, []);

  return (
    <lord-icon
      ref={iconRef}
      src="https://cdn.lordicon.com/ggmzvoah.json"
      trigger="loop"
      colors="primary:#9cf4a7,secondary:#30c9e8"
      style={{ width: "180px", height: "180px" }}
    />
  );
};

export default LordIcon;
