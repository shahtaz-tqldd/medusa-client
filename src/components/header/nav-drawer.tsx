import React from "react";
import Link from "next/link";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import SwithDarkMode from "../darkmode/dashbord-dark";
import BodyText from "../text/body-text";

import { SOCIAL_LINK } from "../footer/data";
import { DRAWER_NAV_LINKS } from "./_data";

import { X, Mail } from "lucide-react";
import type { NavDrawerProps } from "./_types";
import { hover_button_sm } from "@/lib/styles";

const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  setIsOpen,
  setIsEmailModalOpen,
}) => {
  const navLinks = [...DRAWER_NAV_LINKS];
  navLinks.push({
    label: "Contact",
    icon: Mail,
    handleClick: () => setIsEmailModalOpen(true),
  });

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="min-w-[100%] h-full border-l-transparent backdrop-blur-3xl bg-[#ededed] dark:bg-[#171717]">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl text-gray-900 dark:text-white">
                Navigation
              </h2>
              <BodyText>Explore my digital space</BodyText>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close navigation"
            >
              <X size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 px-6 py-8">
            <nav className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Main Pages
              </h3>
              {navLinks.map((link, index) =>
                link.href ? (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <BodyText className="flx gap-3">
                      <link.icon size={18} />
                      {link.label}
                    </BodyText>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      if (link.handleClick) link.handleClick(true);
                      handleLinkClick();
                    }}
                    className="w-full text-left flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <BodyText className="flx gap-3">
                      <link.icon size={18} />
                      {link.label}
                    </BodyText>
                  </button>
                )
              )}
            </nav>

            {/* Dark Mode */}
            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Dark Mode
              </h3>
              <SwithDarkMode />
            </div>

            {/* Quick Links Section */}
            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Quick Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINK.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    onClick={handleLinkClick}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={hover_button_sm}
                  >
                    <item.icon
                      size={16}
                      className="text-gray-900 dark:text-white"
                    />
                    <span className="text-sm opacity-60">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 Shahtaz Rahman
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Built with Next.js & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
