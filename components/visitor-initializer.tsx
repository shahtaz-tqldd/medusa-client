"use client";

import { useEffect } from "react";
import { VisitorService } from "@/lib/visitor";

/**
 * Minimal client component for visitor tracking side effects.
 * Extracted from MainLayout to allow the layout to be a Server Component.
 */
export default function VisitorInitializer() {
  useEffect(() => {
    VisitorService.initialize();
  }, []);

  return null;
}
