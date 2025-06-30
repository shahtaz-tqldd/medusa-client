"use client";

import React, { useEffect } from "react";
import ChatUi from "@/components/chat-ui/chat-ui";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

import { initializeVisitor } from "@/lib/visitor-service";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    initializeVisitor();
  }, []);
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
      <ChatUi />
    </React.Fragment>
  );
};

export default Layout;
