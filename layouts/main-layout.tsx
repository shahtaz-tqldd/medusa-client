"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { initializeVisitor } from "@/lib/visitor-service";
import ChatAssistant from "@/components/chat";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    initializeVisitor();
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
