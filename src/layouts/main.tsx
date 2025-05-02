import ChatUi from "@/components/chat-ui/chat-ui";
import Header from "@/components/header/header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <ChatUi />
    </React.Fragment>
  );
};

export default Layout;
