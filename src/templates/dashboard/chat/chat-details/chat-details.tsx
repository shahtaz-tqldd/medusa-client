import React from "react";

interface ChatDetailsProps{
    className: string;
}

const ChatDetails = ({className}: ChatDetailsProps) => {
  return (
    <div className={`flex w-full ${className}`}>
        <div className="flex-1">Chat Window</div>
        <div className="m-4 rounded-xl w-[300px] bg-white/5 p-6">User Details</div>
    </div>
  );
};

export default ChatDetails;
