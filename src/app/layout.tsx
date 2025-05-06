import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

import "@/assets/styles/global.css";
import "@/assets/styles/layout.css";

import { Figtree } from "next/font/google";

const feetgree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahtaz Rahman",
  description:
    "This is a portfolio website of Shahtaz Rahman. Who is a software developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={feetgree.className} cz-shortcut-listen="false">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
