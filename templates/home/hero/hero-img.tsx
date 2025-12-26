import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroImage() {
  return (
    <div className="relative center p-4 md:min-h-[500px] mt-10 md:mt-0">
      {/* Main image container */}
      <div className="relative z-10">
        {/* Placeholder for hero image */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full"
          >
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
          </motion.div>
        </AnimatePresence>
        <Image
          src="/elipse_1.svg"
          alt="Hero"
          width={720}
          height={720}
          className="scale-150 object-contain absolute top-0 left-1/2 -translate-x-1/2 z-0"
        />
      </div>
    </div>
  );
}
