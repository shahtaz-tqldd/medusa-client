import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container py-6 border-t dark:border-t-white/20 border-t-purple-500/20 border-dashe flex">
        <div>
          <h2 className="uppercase tracking-wider">Credits</h2>
          <p className="opacity-60 text-sm max-w-md mt-2">
            This portfolio site has been designed with Figma, developed with
            Next JS, tailwind CSS, Framer motion & three js. The 3d robot at the
            top has been taken from Sketchfab.
          </p>
          <p className="text-xs mt-4 opacity-50">
            All rights reserved to Shahtaz &copy;{new Date().getFullYear()}
          </p>
        </div>
        <div className="mx-auto space-y-4">
          <h2>Github</h2>
          <h2>LinkedIn</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
