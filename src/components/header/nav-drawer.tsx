import React from "react";
import Link from "next/link";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { 
  X, 
  Home, 
  FileText, 
  FolderOpen, 
  Briefcase, 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Download,
  ExternalLink
} from "lucide-react";
import SwithDarkMode from "../darkmode/dashbord-dark";
import BodyText from "../text/body-text";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface QuickLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?:number }>;
  external?: boolean;
}

interface NavDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const navLinks: NavLink[] = [
    { href: '/', label: 'Homepage', icon: <Home size={18} /> },
    { href: '/blogs', label: 'Blogs', icon: <FileText size={18} /> },
    { href: '/projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { href: '/experiences', label: 'Work Experiences', icon: <Briefcase size={18} /> },
    { href: '/about', label: 'About Me', icon: <User size={18} /> },
    { href: '/contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const quickLinks: QuickLink[] = [
    { href: 'https://github.com', label: 'GitHub', icon: Github, external: true },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin, external: true },
    { href: 'https://twitter.com', label: 'Twitter', icon: Twitter, external: true },
    { href: '/resume.pdf', label: 'Resume', icon: Download },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="min-w-[100%] h-full border-l-transparent backdrop-blur-3xl bg-white/95 dark:bg-gray-900/95">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl text-gray-900 dark:text-white">
                Navigation
              </h2>
              <BodyText>Explore my digital space</BodyText>
              
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close navigation"
            >
              <X size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 px-6 py-8">
            <nav className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Main Pages
              </h3>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                >
                  <div className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

              {/* Dark Mode */}
            <div className="mt-10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    Dark Mode
                </h3>
                <SwithDarkMode />

            </div>

            {/* Quick Links Section */}
            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Quick Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {quickLinks.map((item, index) => (
                     <Link
                        key={index}
                        href={item.href}
                        onClick={handleLinkClick}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="flx gap-2 dark:bg-white/10 bg-blue-500/10 py-1.5 px-2.5 rounded-full tr"
                    >
                        <item.icon
                        size={16}
                        className="text-gray-900 dark:text-white"
                        />
                        <span className="text-sm opacity-60">{item.label}</span>
                    </Link>
                ))}
              </div>
            </div>

          
          </div>

          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 Shahtaz Rahman
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Built with Next.js & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;