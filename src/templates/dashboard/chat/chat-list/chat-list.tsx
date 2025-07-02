import React from "react";

interface ChatListProps{
    className: string;
}

const ChatList = ({className}: ChatListProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
        <div className="bg-white/5 p-3">
            <span>Chat List</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            <div className="p-3 rounded-lg bg-white/5 cursor-pointer hover:dark:bg-white/10 tr">
                <h2 className="text-sm font-medium">Hi, I want to talk about...</h2>
                <div className="flbx text-xs opacity-60">
                    <p className="">Dhaka, Bangladesh</p>
                    <p className="">1hr ago</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatList;
