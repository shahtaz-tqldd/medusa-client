import React from "react";

// components
import AnimateIn from "@/components/animation/animate-in";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Text } from "@/components/ui/typography";

// icons
import { Code, Zap } from "lucide-react";

// data
import { MY_STORY } from "./_data";
import type { MyStoryDialogProps } from "./_types";

const MyStoryDrawer: React.FC<MyStoryDialogProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <AnimateIn
          index={0}
          className="text-2xl md:text-4xl font-medium leading-[135%]"
        >
          My Background story of Becoming a Software Developer
        </AnimateIn>

        <div className="space-y-6 md:space-y-10 mt-8 md:mt-12">
          {MY_STORY.map((item, index) => (
            <AnimateIn key={index} index={0} className="space-y-6">
              <Text className="md:text-justify" variant="lg">{item.content}</Text>
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
      </DrawerContent>
    </Drawer>
  );
};

export default MyStoryDrawer;
