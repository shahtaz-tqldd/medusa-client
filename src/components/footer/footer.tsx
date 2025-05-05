import React from "react";
import { GithubIcon, LinkedInIcon } from "@/assets/icons/icons";
import { Instagram, Mail, Phone } from "lucide-react";
const Footer = () => {
  return (
    <footer>
      <div className="container py-8 border-t dark:border-t-white/20 border-t-purple-500/20 border-dashed flex">
        <div>
          {/* <h2 className="uppercase tracking-wider">Credits</h2> */}
          <p className="opacity-60 text-sm max-w-md">
            This portfolio site has been designed with Figma, developed with
            Next JS, tailwind CSS, Framer motion & three js. The 3d robot at the
            top has been taken from Sketchfab.
          </p>
          <p className="text-xs mt-4 opacity-50">
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
          <div className="flx gap-8 mt-10">
            <h2 className="flx gap-2.5 ">
              <GithubIcon size={14} className="text-gray-900 dark:text-white" />
              <span className="text-sm opacity-60">Github</span>
            </h2>
            <h2 className="flx gap-2.5 ">
              <LinkedInIcon
                size={14}
                className="text-gray-900 dark:text-white"
              />
              <span className="text-sm opacity-60">LinkedIn</span>
            </h2>
            <h2 className="flx gap-2.5 ">
              <Instagram
                size={14}
                className="text-gray-900 dark:text-white"
              />
              <span className="text-sm opacity-60">Instagram</span>
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
