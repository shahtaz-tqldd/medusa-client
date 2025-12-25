import React from "react";
import { Mail, Phone } from "lucide-react";
import { SOCIAL_LINK } from "./_data";
import { hover_button_sm } from "@/lib/styles";
import { Text } from "../ui/typography";

const Footer = () => {
  return (
    <footer>
      <div className="container pb-6 pt-10 border-t dark:border-t-white/20 border-t-blue-500/20 border-dashed flex md:flex-row flex-col-reverse gap-6">
        <div>
          <Text variant="sm" className="max-w-md">
            This portfolio site has been designed with Figma, developed with
            Next JS, tailwind CSS, Framer motion & three js. The 3d robot at the
            top has been taken from Sketchfab.
          </Text>

          <Text variant="xs" className="mt-10">
            All rights reserved to Shahtaz &copy;{new Date().getFullYear()}
          </Text>
        </div>
        <div className="md:mx-auto space-y-3">
          <div>
            <h2 className="flx gap-2.5 ">
              <Mail size={14} className="text-gray-800 dark:text-slate-200" />
              <Text variant="sm">shahtaz67@gmail.com</Text>
            </h2>
          </div>
          <div>
            <h2 className="flx gap-2.5 ">
              <Phone size={14} className="text-gray-800 dark:text-slate-200" />
              <Text variant="sm">+880 1521 305 382</Text>
            </h2>
          </div>
          <div className="flx flex-wrap gap-x-4 gap-y-2 mt-10 -ml-2.5">
            {SOCIAL_LINK?.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                className={hover_button_sm}
              >
                <item.icon
                  size={16}
                  className="text-gray-800 dark:text-slate-200"
                />
                <Text variant="sm">{item.title}</Text>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
