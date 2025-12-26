import React from "react";
import { Dot, Mail, Phone } from "lucide-react";
import { SOCIAL_LINK } from "./_data";
import { hover_button_sm } from "@/lib/styles";
import { Text } from "../ui/typography";
import AnimateIn from "../animation/animate-in";

const Footer = () => {
  return (
    <footer>
      <div className="container pb-6 pt-10 border-t dark:border-t-white/20 border-t-blue-500/20 border-dashed flex md:flex-row flex-col-reverse gap-6">
        <div>
          <AnimateIn index={0}>
            <Text variant="xs" className="max-w-md">
              Built with Next.js and TypeScript on the frontend, using the
              shadcn UI library. Powered by a Django + PostgreSQL backend, with
              a chatbot integrated via the Gemini API.
            </Text>
          </AnimateIn>
          <AnimateIn index={0.2}>
            <Text variant="xs" className="mt-10">
              All rights reserved to Shahtaz &copy;{new Date().getFullYear()}
            </Text>
          </AnimateIn>
        </div>
        <div className="md:mx-auto">
          <AnimateIn index={0}>
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
                <Dot className="text-emerald-500 -ml-4 -mt-2" size={40} />
                <div>
                  <Text variant="sm">Dhanmondi, 1209</Text>
                  <Text variant="sm">Dhaka, Bangladesh</Text>
                </div>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn index={0.2}>
            <div className="flx flex-wrap gap-x-3 gap-y-2 mt-12 -ml-2.5">
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
          </AnimateIn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
