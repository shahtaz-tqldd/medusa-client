import { Figtree } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/themes/theme-provider";

import "@/assets/styles/layout.css";
import "@/assets/styles/global.css";

import type { Metadata } from "next";

const feetgree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahtaz Rahman | Software Developer Portfolio",
  description:
    "Shahtaz Rahman is a Full-Stack Software Developer specializing in modern web development. Proficient in React, Next.js, Node.js, and Django, he builds responsive, high-performance applications with clean, scalable code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={feetgree.className} cz-shortcut-listen="false">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
