import React from "react";
import { Button } from "../ui/button";
import { Text } from "../ui/typography";
import { Mail, Phone } from "lucide-react";
import { SOCIAL_LINK } from "./_data";

const Footer = () => {
  return (
    <footer>
      <div className="container pb-6 pt-10 border-t dark:border-t-white/20 border-t-blue-500/20 border-dashed flex md:flex-row flex-col-reverse gap-6">
        <div className="space-y-6 md:space-y-12">
          <Text variant="xs" className="max-w-md text-center md:text-left">
            Built with Next.js, TypeScript, Framer motion, ShadCn, Django (REST
            Framework), PostgreSQL and Google Gemini in Chatbot Agent.
          </Text>

          <Text variant="xs" className="text-center md:text-left">
            All rights reserved to Shahtaz &copy;{new Date().getFullYear()}
          </Text>
        </div>
        <div className="md:mx-auto">
          <div className="space-y-6 md:space-y-10">
            <div className="grid grid-cols-2 md:gap-32 gap-4">
              <div className="space-y-2.5">
                <div>
                  <h2 className="flx gap-2.5 ">
                    <Mail
                      size={14}
                      className="text-gray-800 dark:text-slate-200"
                    />
                    <Text variant="sm">shahtaz67@gmail.com</Text>
                  </h2>
                </div>
                <div>
                  <h2 className="flx gap-2.5 ">
                    <Phone
                      size={14}
                      className="text-gray-800 dark:text-slate-200"
                    />
                    <Text variant="sm">+880 1521 305 382</Text>
                  </h2>
                </div>
              </div>
              <div className="flex">
                <Text variant="sm">Dhaka, Bangladesh</Text>
              </div>
            </div>
            <div className="justify-center md:justify-start flx flex-wrap gap-x-3 gap-y-2">
              {SOCIAL_LINK?.map((item, index) => (
                <a key={index} href={item.url} target="_blank">
                  <Button size="sm" variant="ghost">
                    <item.icon size={14} />
                    {item.title}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
