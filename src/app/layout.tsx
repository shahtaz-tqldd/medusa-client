import Script from "next/script";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";

import "@/assets/styles/global.css";
import "@/assets/styles/layout.css";

const feetgree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahtaz Rahman | Full-Stack Web Developer Portfolio",
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={feetgree.className} cz-shortcut-listen="false">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
