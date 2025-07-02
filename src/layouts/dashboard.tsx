"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/navbar/sidebar";

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
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) return null; // prevent flicker

  return (
    <div className="h-screen w-screen flex">
      <Sidebar className="max-w-[260px] w-full h-screen" />
      <main className="flex-1 dark:bg-white/5 bg-blue-200/20 m-5 p-8 pt-5 rounded-xl h-[calc(100vh-40px)] medusa-scroll">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
