"use client";

import React, { useState } from "react";
import Link from "next/link";

import ThemeToggle from "@/components/theme";
import EmailModal from "./email-modal";

import { HEADER_LINKS } from "./data";
import { Text } from "lucide-react";
import NavDrawer from "./nav-drawer";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="container flbx h-16 md:h-20 relative z-50 -mb-20">
      <Link href={"/"}>_shahtaz</Link>
      <div className="hidden md:flex items-center gap-10">
        <div className="flx gap-10 text-sm">
          {HEADER_LINKS?.map(({ title, link, icon: Icon, id }, index) => (
            <Link
              key={index}
              href={link}
              target={id === 1 ? "_blank" : "_self"}
              className="flx gap-2.5"
            >
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
      <button onClick={()=>setIsOpen(!isOpen)} className="block md:hidden">
        <Text size={16} className="scale-x-[-1]"/>
      </button>
      <NavDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Header;
