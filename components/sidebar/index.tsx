"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./_data";
import SwithDarkMode from "../themes/switch-theme";

interface SidebarProps {
  className: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();

  const isActive = (link: string) => {
    return link === pathname;
  };
  return (
    <div className={`flex flex-col justify-between p-10 ${className}`}>
      <div>
        <Link href={"/"}>_shahtaz</Link>
        <div className="space-y-1 mt-10">
          {NAV_ITEMS?.map((item, index) => (
            <Link
              href={item.link}
              className={`flex items-center gap-3 py-2 px-3 font-medium rounded-lg tr ${
                isActive(item.link)
                  ? "bg-emerald-500/10 dark:bg-lime-500/10 dark:text-lime-400 text-emerald-700"
                  : "opacity-60 hover:opacity-100"
              }`}
              key={index}
            >
              <item.icon size={18} />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <SwithDarkMode />
    </div>
  );
};

export default Sidebar;
