import React from "react";
import ChatUi from "@/components/chat-ui/chat-ui";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
      {/* <ChatUi /> */}
    </React.Fragment>
  );
};

export default Layout;
