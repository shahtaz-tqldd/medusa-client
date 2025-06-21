import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { LucideIcon } from "lucide-react";

type DropdownItem = {
  title: string;
  handleClick: () => void;
  icon?: LucideIcon;
};

interface EllipsisDropdownProps {
  items: DropdownItem[];
}

const EllipsisDropdown: React.FC<EllipsisDropdownProps> = ({ items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="h-8 w-8 center rounded-full bg-blue-500/5 dark:bg-white/5 dark:hover:bg-white/10 hover:bg-blue-600/10 tr">
          <Ellipsis size={16} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        className="dark:bg-[#121212]/80 bg-gray-50 backdrop-blur-2xl border dark:border-white/20 border-blue-600/10 rounded-xl p-2 flex flex-col gap-1"
      >
        {items?.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="opacity-75 dark:hover:bg-white/10 hover:bg-blue-500/10 tr gap-2 cursor-pointer"
            onClick={item.handleClick}
          >
            {item.icon && <item.icon size={14} />}
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EllipsisDropdown;
