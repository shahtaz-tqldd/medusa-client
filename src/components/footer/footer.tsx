import React from "react";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/assets/icons/icons";
import { Mail, Phone,  } from "lucide-react";

const Footer = () => {
  const linkedInUrl = "https://linkedin.com/in/shahtazrahman/"
  const instaUrl = "https://instagram.com/shahtazrahman/"
  const xUrl = "https://x.com/shahtaz67/"
  return (
    <footer>
      <div className="container pb-6 pt-10 border-t dark:border-t-white/20 border-t-purple-500/20 border-dashed flex">
        <div>
          {/* <h2 className="uppercase tracking-wider">Credits</h2> */}
          <p className="opacity-60 text-sm max-w-md">
            This portfolio site has been designed with Figma, developed with
            Next JS, tailwind CSS, Framer motion & three js. The 3d robot at the
            top has been taken from Sketchfab.
          </p>
          <p className="text-xs mt-10 opacity-50">
            All rights reserved to Shahtaz &copy;{new Date().getFullYear()}
          </p>
        </div>
        <div className="mx-auto space-y-3">
          <div>
            <h2 className="flx gap-2.5 ">
              <Mail size={14} className="text-gray-900 dark:text-white" />
              <span className="text-sm opacity-60">shahtaz67@gmail.com</span>
            </h2>
          </div>
          <div>
            <h2 className="flx gap-2.5 ">
              <Phone size={14} className="text-gray-900 dark:text-white" />
              <span className="text-sm opacity-60">+880 1521 305 382</span>
            </h2>
          </div>
          <div className="flx gap-4 mt-10 -ml-4">
            <a href={linkedInUrl} target="_blank" className="flx gap-2.5 mb-1 dark:hover:bg-white/10 hover:bg-orange-500/10 pr-4 pl-3 pt-1 pb-1.5 rounded-full tr">
              <LinkedInIcon
                size={16}
                className="text-gray-900 dark:text-white"
              />
              <span className="text-sm opacity-60 mt-1.5 block">LinkedIn</span>
            </a>
            <a href={instaUrl} target="_blank" className="flx gap-2.5 dark:hover:bg-white/10 hover:bg-orange-500/10 pr-4 pl-3 py-1.5 rounded-full tr">
              <InstagramIcon
                size={16}
                className="text-gray-900 dark:text-white"
              />
              <span className="text-sm opacity-60 mt-0.5 block">Instagram</span>
            </a>
            <a href={xUrl} target="_blank" className="flx gap-2.5 dark:hover:bg-white/10 hover:bg-orange-500/10 pr-4 pl-3 py-[5px] rounded-full tr">
              <XIcon size={16} className="text-gray-900 dark:text-white" />
              <span className="text-sm opacity-60 mt-1 block">X</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
