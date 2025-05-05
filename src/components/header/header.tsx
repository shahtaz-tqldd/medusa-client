"use client";

import React, { useState } from "react";
import Link from "next/link";

import Button from "@/components/buttons/primary-button";
import ThemeToggle from "@/components/theme";
import SendEmailDrawer from "./send-email";

import { Mail } from "lucide-react";
import { HEADER_LINKS } from "./data";

const Header: React.FC = () => {
  const [isEmailDrawerOpen, setIsEmailDrawerOpen] = useState(false);
  return (
    <nav className="container flbx h-20 relative z-50 -mb-20">
      <h2>_shahtaz</h2>
      <div className="flx gap-10">
        <div className="flx gap-8 text-sm">
          {HEADER_LINKS?.map(({ title, link, icon: Icon }, index) => (
            <Link key={index} href={link} className="flx gap-2">
              <Icon className="h-4 w-4" />
              {title}
            </Link>
          ))}
        </div>
        <div className="flx gap-2">
          <Button
            icon={Mail}
            variant="rubix"
            onClick={() => setIsEmailDrawerOpen(!isEmailDrawerOpen)}
          >
            Send Email
          </Button>
          <ThemeToggle />
        </div>
      </div>
      {isEmailDrawerOpen && (
        <SendEmailDrawer
          isOpen={isEmailDrawerOpen}
          setIsOpen={setIsEmailDrawerOpen}
        />
      )}
    </nav>
  );
};

export default Header;
