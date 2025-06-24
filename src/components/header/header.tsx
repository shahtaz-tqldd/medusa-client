"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

import Button from "../buttons/primary-button";
import EmailModal from "./email-modal";
import NavDrawer from "./nav-drawer";
import ThemeToggle from "@/components/theme";
import LordIcon from "@/assets/icons/lord-icon";

import { HEADER_LINKS } from "./_data";
import { Text } from "lucide-react";
import { hover_button } from "@/lib/styles";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { theme } = useTheme();

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
          <div className="hidden md:flex items-center gap-10">
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
            <div className="flx gap-1.5">
              <Button
                variant="rubix"
                onClick={() => setIsOpenModal(!isOpenModal)}
              >
                <LordIcon
                  icon="wpsdctqb"
                  height={18}
                  width={18}
                  primary={theme === "dark" ? "#222" : "#fff"}
                  target="button"
                />
                Send Email
              </Button>

              <ThemeToggle />
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden"
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
      {isOpenModal && (
        <EmailModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}
    </>
  );
};

export default Header;
