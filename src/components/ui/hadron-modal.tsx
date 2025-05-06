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
      document.documentElement.classList.add("hadron-modal-open");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      const timeout = setTimeout(() => {
        document.documentElement.classList.remove("hadron-modal-open");
      }, 500);

      return () => clearTimeout(timeout);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const opacities = ["text-white/5", "text-white/10", "text-white/15", "text-white/20", "text-white/15", "text-white/10", "text-white/5"];

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
              className="absolute inset-0 bg-[#ffb86a] pointer-events-none center flex-col gap-4 text-8xl text-nowrap overflow-hidden uppercase"
            >
              {opacities.map((opacity, index) => (
                <h2 key={index} className={opacity}>
                  software development is fun
                </h2>
              ))}
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
                className="absolute top-10 right-10 text-white hover:text-orange-500 tr"
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
