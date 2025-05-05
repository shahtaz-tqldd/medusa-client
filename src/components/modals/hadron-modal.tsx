"use client";

import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface HadronModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const HadronModal: React.FC<HadronModalProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflowY = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      const timeout = setTimeout(() => {
        document.body.style.overflowY = "auto";
      }, 700);

      return () => clearTimeout(timeout); // cancel timeout if component unmounts early
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#151b1d] pointer-events-auto"
              onClick={handleCloseModal}
            />

            {/* Yellow Slide */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "-100%", opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-yellow-400 pointer-events-none center flex-col gap-4 text-7xl overflow-hidden"
            >
              <h2 className="opacity-30">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-40">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-50">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-60">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-70">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-60">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-50">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-40">I BET YOU ARE A GOOD SOUL</h2>
              <h2 className="opacity-30">I BET YOU ARE A GOOD SOUL</h2>
            </motion.div>

            {/* Final Content Slide */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#151b1d] text-white pointer-events-auto overflow-y-auto"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-10 right-10 text-white hover:text-red-400 transition"
              >
                <X size={40} strokeWidth={1} />
              </button>

              <motion.div
                initial={{ scale: 0.99, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.75, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HadronModal;
