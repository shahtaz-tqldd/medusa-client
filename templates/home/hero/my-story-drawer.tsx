import React, { useEffect, useRef } from "react";

// components
import AnimateDiv from "@/components/animation/animate-div";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Text, Title } from "@/components/ui/typography";

// icons
import { Code, Zap } from "lucide-react";

// data
export interface MyStoryDialogProps {
  isOpen: boolean;
  content: string;
  setIsOpen: (isOpen: boolean) => void;
}

const MyStoryDrawer: React.FC<MyStoryDialogProps> = ({
  isOpen,
  content,
  setIsOpen,
}) => {
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

  const handleClose = () => {
    if (historyPushed.current) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  };
  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <AnimateDiv className="space-y-6">
          <Title variant="lg">
            My Background story of Becoming a Software Developer
          </Title>

          <Text variant="lg" className="md:text-justify">
            <span
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n\n/g, "<br /><br />"),
              }}
            />
          </Text>
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
