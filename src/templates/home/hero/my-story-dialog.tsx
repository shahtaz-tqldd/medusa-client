import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";

// icons
import { Code, Zap } from "lucide-react";

// data
import { MY_STORY } from "./_demo_data";
import type { MyStoryDialogProps } from "./_types";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import AnimateIn from "@/components/animation/animate-in";

const MyStoryDialog: React.FC<MyStoryDialogProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="min-w-[100%] h-full bg-[#ededed] dark:bg-[#171717]">
        <div className="max-w-2xl mx-auto pt-6 md:pt-10 pb-12">
          <AnimateIn
            index={0}
            className="text-2xl md:text-4xl font-semibold leading-[135%]"
          >
            My Somewhat Simple Story of Becoming a Software Developer
          </AnimateIn>

          <div className="space-y-6 md:space-y-10 mt-8 md:mt-12">
            {MY_STORY.map((item, index) => (
              <AnimateIn key={index} index={0} className="space-y-6">
                <BodyText className="text-lg md:text-xl">
                  {item.content}
                </BodyText>
              </AnimateIn>
            ))}
          </div>

          <div className="absolute top-20 left-8 opacity-5">
            <Zap
              size={200}
              strokeWidth={0.5}
              className="text-yellow-400 animate-pulse"
            />
          </div>

          <div className="absolute bottom-20 right-8 opacity-5">
            <Code
              size={200}
              strokeWidth={0.5}
              className="text-blue-400 animate-pulse"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MyStoryDialog;
