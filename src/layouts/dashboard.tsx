import React from "react";
import Sidebar from "@/components/navbar/sidebar";
import ThemeToggle from "@/components/theme";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-scren w-screen flex">
      <Sidebar className="max-w-[240px] w-full h-screen" />
      <main className="flex-1 dark:bg-white/5 bg-blue-200/20 m-5 p-5 rounded-xl h-[calc(100vh-40px)] medusa-scroll">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
