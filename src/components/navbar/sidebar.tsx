"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./data";
import SwithDarkMode from "../darkmode/dashbord-dark";

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
      <div className="space-y-5 mt-10">
        {NAV_ITEMS?.map((item, index) => (
          <Link
            href={item.link}
            className={`flex items-center gap-3 tr ${
              isActive(item.link)
                ? "opacity-100"
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
