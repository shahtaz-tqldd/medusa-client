"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/lib/scroll-lock";
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

  useScrollLock(isOpen)
   
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
              className="absolute inset-0 bg-[#2b7fff] pointer-events-none center flex-col gap-4 text-8xl text-nowrap overflow-hidden uppercase"
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
              className="absolute inset-0 dark:bg-[#151b1d] bg-gray-50 pointer-events-auto medusa-scroll h-screen modal-content"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 md:top-10 right-5 md:right-10  text-red-500 hover:text-white tr z-[999] h-10 w-10 dark:bg-white/10 hover:dark:bg-red-500 bg-red-500/10 hover:bg-red-500 tr center rounded-full"
              >
                <X size={24} />
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
