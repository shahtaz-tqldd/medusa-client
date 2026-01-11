"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import ChatAssistant from "@/components/chat";
import { VisitorService } from "@/lib/visitor";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    VisitorService.initialize();
  }, []);

  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
      <ChatAssistant />
    </React.Fragment>
  );
};

export default MainLayout;
