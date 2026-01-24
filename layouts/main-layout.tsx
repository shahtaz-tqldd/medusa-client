import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatAssistant from "@/components/chat";
import VisitorInitializer from "@/components/visitor-initializer";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component - now a Server Component for better performance.
 * Visitor tracking is handled by a separate client component.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatAssistant />
      <VisitorInitializer />
    </>
  );
};

export default MainLayout;

