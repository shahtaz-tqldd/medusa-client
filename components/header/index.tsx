"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

// components
import EmailDrawer from "./email-drawer";
import NavDrawer from "./nav-drawer";
import ThemeToggle from "@/components/themes/theme-toggle";
import { Text } from "lucide-react";
import { Button } from "../ui/button";

// icons
import LordIcon from "@/assets/icons/lord-icons";
import { HEADER_LINKS } from "./_data";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { theme } = useTheme();
  const hover_button =
    "flx gap-2 dark:hover:bg-white/10 hover:bg-blue-500/10 py-2.5 px-4 rounded-full font-medium tr";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled from top
      setIsScrolled(currentScrollY > 50);

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled
            ? "dark:bg-black/80 bg-blue-500/10 backdrop-blur-md"
            : "bg-transparent"
        }
        `}
      >
        <div className="container flbx h-16 md:h-20 px-6 lg:px-8">
          <Link href={"/"}>_shahtaz</Link>
          <div className="hidden md:flex items-center gap-8">
            <div className="flx gap-5 text-sm">
              {HEADER_LINKS?.map(({ title, link, icon: Icon, id }, index) => (
                <Link
                  key={index}
                  href={link}
                  target={id === 1 ? "_blank" : "_self"}
                  className={hover_button}
                >
                  <Icon size={16} />
                  <span className="block">{title}</span>
                </Link>
              ))}
            </div>
            <div className="flx gap-1.5 -ml-4">
              <Link href="https://calendly.com/shahtaz67" target="__blank">
                <Button>
                  <LordIcon
                    icon="uoljexdg"
                    height={18}
                    width={18}
                    primary={theme === "dark" ? "#222" : "#fff"}
                    target="button"
                  />
                  Schedule a Call
                </Button>
              </Link>

              <ThemeToggle />
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center dark:bg-white/5 bg-blue-500/10 rounded-full"
          >
            <Text size={16} className="scale-x-[-1]" />
          </button>
        </div>
        <NavDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsEmailModalOpen={setIsOpenModal}
        />
      </nav>

      <EmailDrawer isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
};

export default Header;
