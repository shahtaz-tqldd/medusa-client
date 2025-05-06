import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FeatureProps } from "./types";

interface FeatureDrawerProps {
  data: FeatureProps | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FeatureDrawer: React.FC<FeatureDrawerProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="min-w-[680px] p-6 border-l-white/20">
        <div className="flx gap-2.5 mb-4">
          {data?.icon && <data.icon className="h-6 w-6" strokeWidth={1.5} />}
          <DrawerTitle className="text-2xl text-white">
            {data?.title}
          </DrawerTitle>
        </div>
        <p className="mt-4 opacity-75">{data?.text}</p>
      </DrawerContent>
    </Drawer>
  );
};

export default FeatureDrawer;
