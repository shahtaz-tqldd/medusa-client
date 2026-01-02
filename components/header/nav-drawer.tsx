import React from "react";
import Link from "next/link";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import SwithDarkMode from "@/components/themes/switch-theme";

import { Mail } from "lucide-react";
import { Text, Title } from "../ui/typography";

// data and types
import { DRAWER_NAV_LINKS } from "./_data";
import { SOCIAL_LINK } from "@/components/footer/_data";
import type { NavDrawerProps } from "./_types";

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

  const hover_button_sm =
    "flx gap-2 dark:hover:bg-white/10 hover:bg-blue-500/10 py-1.5 px-2.5 rounded-full tr";

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="flex flex-col h-full overflow-y-auto -mt-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 px-2 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <Title variant="sm">Navigation</Title>
              <Text variant="sm">Explore my digital space</Text>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 px-2 py-6">
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
                    <Text className="flx gap-3">
                      <link.icon size={18} />
                      {link.label}
                    </Text>
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
                    <Text className="flx gap-3">
                      <link.icon size={18} />
                      {link.label}
                    </Text>
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
