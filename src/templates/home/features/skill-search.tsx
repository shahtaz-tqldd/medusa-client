import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SkillSearch: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsInputVisible((prev) => !prev);
  };

  const inputVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="mt-12">
      <h2 className="opacity-60 mb-6">Looking for any particular skillset?</h2>
      
    <div className="flex">
        <AnimatePresence>
            {isInputVisible && (
            <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <input
                    type="text"
                    placeholder="Search by tech stack name"
                    className="py-2 px-4 w-[320px] rounded-full border dark:border-white/20 border-black/10 outline-none"
                />
            </motion.div>
            )}
        </AnimatePresence>
        {!isInputVisible && 
            <button
                className="py-2 px-4 dark:bg-white rounded-full text-violet-900 text-sm font-medium"
                onClick={handleButtonClick}
            >
                Search Skills
            </button>
        }
      </div>
    </div>
  );
};

export default SkillSearch;