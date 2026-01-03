"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
    } else {
      setTimeout(() => setIsAuthenticated(true), 0);
    }
  }, [router]);

  if (isAuthenticated === null) return null; // prevent flicker

  return (
    <div className="h-screen w-screen flex dark:bg-[#141514] bg-gray-100/80 ">
      <Sidebar className="max-w-[280px] w-full h-screen border-r dark:border-r-white/10 border-r-gray-200" />
      <main className="flex-1 medusa-scroll p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
