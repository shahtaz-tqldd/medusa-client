import React, { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/lib/scroll-lock";
import { ArrowLeft } from "lucide-react";

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
  useScrollLock(isOpen);
  const historyPushed = useRef(false);

  // Handle modal open/close with browser history
  useEffect(() => {
    const handlePopState = () => {
      // Check if we're coming back from a modal state
      if (isOpen && historyPushed.current) {
        setIsOpen(false);
        historyPushed.current = false;
      }
    };

    if (isOpen && !historyPushed.current) {
      // Push a new state when modal opens
      window.history.pushState({ modal: true }, "");
      historyPushed.current = true;
    }

    // Always add the event listener when modal is open
    if (isOpen) {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, setIsOpen]);

  const handleCloseModal = () => {
    // If we pushed a history state, go back to remove it
    if (historyPushed.current) {
      window.history.back();
      // The popstate event will handle closing the modal
    } else {
      // Fallback if somehow no history was pushed
      setIsOpen(false);
    }
  };

  const opacities = [
    "text-white/5",
    "text-white/10",
    "text-white/15",
    "text-white/20",
    "text-white/15",
    "text-white/10",
    "text-white/5",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#151b1d] pointer-events-auto"
              onClick={handleCloseModal}
            />

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

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 dark:bg-[#151b1d] bg-gray-50 pointer-events-auto medusa-scroll h-screen modal-content"
            >
              <button
                onClick={handleCloseModal}
                className="sticky top-5 md:top-8 left-5 md:left-10 tr z-[999] h-10 w-10 dark:bg-white/90 hover:dark:bg-white hover:dark:text-black bg-black/80 text-slate-200 dark:text-black hover:text-white hover:bg-black tr center rounded-full"
              >
                <ArrowLeft size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.99, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.75, ease: "easeInOut" }}
                className="max-w-4xl mx-auto pb-6 md:pb-12 px-3"
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