"use client";

import React from "react";
import Link from "next/link";

import ThemeToggle from "@/components/theme";
import EmailModal from "./email-modal";

import { HEADER_LINKS } from "./data";

const Header: React.FC = () => {
  return (
    <nav className="container flbx h-20 relative z-50 -mb-20">
      <Link href={"/"}>_shahtaz</Link>
      <div className="flx gap-10">
        <div className="flx gap-10 text-sm">
          {HEADER_LINKS?.map(({ title, link, icon: Icon }, index) => (
            <Link key={index} href={link} className="flx gap-2.5">
              <Icon size={16} />
              <span className="block">{title}</span>
            </Link>
          ))}
        </div>
        <div className="flx gap-2">
          <EmailModal />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Header;
