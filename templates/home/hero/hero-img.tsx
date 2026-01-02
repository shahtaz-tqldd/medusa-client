import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroImage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: "easeOut",
        }}
        className="h-full"
      >
        <div className="relative z-10 center p-4 md:min-h-[500px] mt-10 md:mt-0">
          <div
            className="h-auto md:h-[480px] w-full md:w-[480px] center relative z-10"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black calc(100% - 80px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black calc(100% - 80px), transparent 100%)",
            }}
          >
            <Image
              src="/hero.png"
              alt="Hero"
              width={500}
              height={500}
              className="object-cover mask-fade"
            />
          </div>
          <Image
            src="/elipse_1.svg"
            alt="Hero"
            width={720}
            height={720}
            className="scale-150 object-contain absolute top-0 left-1/2 -translate-x-1/2 z-0"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
