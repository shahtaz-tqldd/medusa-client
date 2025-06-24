import React from "react";
import BodyText from "../text/body-text";
import { Mail, Phone } from "lucide-react";
import { SOCIAL_LINK } from "./data";
import { hover_button_sm } from "@/lib/styles";

const Footer = () => {
  return (
    <footer>
      <div className="container pb-6 pt-10 border-t dark:border-t-white/20 border-t-blue-500/20 border-dashed flex md:flex-row flex-col-reverse gap-6">
        <div>
          <BodyText className="text-sm max-w-md">
            This portfolio site has been designed with Figma, developed with
            Next JS, tailwind CSS, Framer motion & three js. The 3d robot at the
            top has been taken from Sketchfab.
          </BodyText>

          <p className="text-xs mt-10 opacity-50">
            All rights reserved to Shahtaz &copy;{new Date().getFullYear()}
          </p>
        </div>
        <div className="md:mx-auto space-y-3">
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
          <div className="flx gap-4 mt-10 -ml-2.5">
            {SOCIAL_LINK?.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                className={hover_button_sm}
              >
                <item.icon
                  size={16}
                  className="text-gray-900 dark:text-white"
                />
                <span className="text-sm opacity-60">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
