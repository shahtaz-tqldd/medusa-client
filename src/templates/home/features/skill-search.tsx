"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/buttons/primary-button";
import BodyText from "@/components/text/body-text";

// icons
import { Search, ShieldX, X } from "lucide-react";

// data
import { skills } from "./_demo-data";
import LordIcon from "@/assets/icons/lord-icon";
import { useTheme } from "next-themes";

const SkillSearch: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleButtonClick = () => {
    setIsInputVisible((prev) => !prev);
    setSearchTerm(""); // clear on toggle
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSkills = skills.filter(
    (skill) =>
      searchTerm.length >= 2 &&
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll when search results appear
  useEffect(() => {
    if (searchTerm.length > 2 && searchContainerRef.current) {
      // Small delay to ensure the dropdown has rendered
      setTimeout(() => {
        searchContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
  }, [searchTerm, filteredSkills.length]);

  const inputVariants = {
    hidden: { opacity: 0, width: 0, x: -20 },
    visible: {
      opacity: 1,
      width: "320px",
      x: 0,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 },
    },
    exit: { opacity: 0, width: 0, x: -20, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="mt-20 hidden md:block" ref={searchContainerRef}>
      <BodyText>Looking for any particular skillset?</BodyText>

      <div className="flex w-full relative h-10 mt-6">
        <AnimatePresence mode="sync">
          {isInputVisible ? (
            <motion.div
              key="search-input"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-[360px]"
            >
              <input
                type="text"
                placeholder="Search by tech stack name"
                className="py-2 px-9 w-[360px] rounded-full border dark:border-white/20 border-black/10 outline-none"
                autoFocus
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-4 opacity-50" />
              <button
                onClick={handleButtonClick}
                className="absolute top-1/2 -translate-y-1/2 -right-7"
              >
                <X className="h-4 w-4 opacity-50" />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {searchTerm && searchTerm.length > 2 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-[360px] bg-white dark:bg-[#222] border border-dashed border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg"
                  >
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill) => (
                        <li
                          key={skill.name}
                          className={`p-4 dark:border-b-white/20 border-black/10 ${
                            filteredSkills.length > 1 ? "border-b" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon (if you want it) */}
                            {skill.icon && (
                              <skill.icon className="w-5 h-5 text-primary" />
                            )}

                            <div>
                              <h3 className="font-semibold text-lg">
                                {skill.name}
                              </h3>
                              <p className="text-sm opacity-70">
                                {skill.experience} experience
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="flx gap-2 mt-3">
                            <div className="w-full flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-black/80 dark:bg-white transition-all duration-500"
                                style={{ width: skill.progress }}
                              />
                            </div>
                            <h2 className="w-10 text-sm text-end">
                              {skill.progress}
                            </h2>
                          </div>

                          {/* Description */}
                          <BodyText className="text-sm mt-4">
                            {skill.description}
                          </BodyText>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm opacity-60 h-40 center flex-col gap-3">
                        <ShieldX />
                        Sorry, No results found!
                      </li>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.button
              key="search-button"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleButtonClick}
            >
              <Button variant="rubix" role="presentation" className="pr-4 pl-3 gap-1.5">
                <LordIcon
                  icon="zhtsepgu"
                  height={17}
                  width={17}
                  primary={theme === "dark" ? "#222" : "#fff"}
                  target="button"
                />
                Search Skills
              </Button>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillSearch;
