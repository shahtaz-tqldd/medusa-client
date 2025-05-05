"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/buttons/primary-button";

import { Search, X } from "lucide-react";

const SkillSearch: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsInputVisible((prev) => !prev);
  };

  const inputVariants = {
    hidden: {
      opacity: 0,
      width: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      width: "320px",
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      width: 0,
      x: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="mt-12">
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
              />
              <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-4 opacity-50" />
              <button
                onClick={handleButtonClick}
                className="absolute top-1/2 -translate-y-1/2 -right-7"
              >
                <X className="h-4 w-4 opacity-50" />
              </button>
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
