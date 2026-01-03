import React from "react";

// components
import AnimateDiv from "@/components/animation/animate-div";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Text, Title } from "@/components/ui/typography";

// icons
import { Code, Zap } from "lucide-react";

// data
import { MY_STORY } from "./_data";
import type { MyStoryDialogProps } from "./_types";

const MyStoryDrawer: React.FC<MyStoryDialogProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <AnimateDiv className="space-y-6">
          <Title variant="lg">
            My Background story of Becoming a Software Developer
          </Title>
          {MY_STORY.map((item, index) => (
            <Text key={index} className="md:text-justify" variant="lg">
              {item.content}
            </Text>
          ))}
        </AnimateDiv>

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
