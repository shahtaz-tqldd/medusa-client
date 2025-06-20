"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/buttons/primary-button";
import { Search, X } from "lucide-react";
import { skills } from "./_demo-data";

const SkillSearch: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    <div className="mt-20">
      <h2 className="opacity-75 mb-5">Looking for any particular skillset?</h2>

      <div className="flex w-full relative h-10">
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
                    className="absolute z-[999999] top-full mt-2 w-[360px] bg-white dark:bg-[#222] border border-dashed border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg"
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
                          <p className="text-xs opacity-70 mt-3 line-clamp-3">
                            {skill.description}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 center text-sm opacity-60 h-40">
                        Sorry! No skill has found what are you typing, maybe I
                        have not learned the skill you are trying to find, but I
                        am a fast learner! Feel free to remind me
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
              <Button variant="rubix" role="presentation" className="px-4">
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
