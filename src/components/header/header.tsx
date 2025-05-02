import React from "react";
import Link from "next/link";

import Button from "@/components/buttons/primary-button";
import ThemeToggle from "@/components/theme";

import { Mail } from "lucide-react";
import { HEADER_LINKS } from "./data";

const Header: React.FC = () => {
  return (
    <nav className="container flbx h-20 absolute left-1/2 -translate-x-1/2 z-10">
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
          <Button icon={Mail} variant="secondary">
            Send Email
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Header;
