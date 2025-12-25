"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { ArrowRight, Link } from "lucide-react";

import type { Project } from "./_types";
import { Title } from "@/components/ui/typography";

interface ProjectCardProps {
  handleSetProject: (id: string) => void;
  data: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  handleSetProject,
  index,
}) => {
  const { id, name, images, type, live_link } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const handleSeeLiveLink = (url: string) => {
    window.open(url, "_blank");
  };
  const hover_button =
    "flx gap-2.5 hover:dark:bg-white/10 hover:bg-blue-500/10 py-2 pr-4 pl-3 rounded-full tr";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group cursor-pointer"
      onClick={() => handleSetProject(id)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.1 }}
        className="h-72 w-full overflow-hidden rounded-3xl"
      >
        <Image
          src={images?.main}
          className="h-full w-full object-cover rounded-3xl"
          alt={name}
          height={400}
          width={600}
        />
      </motion.div>

      <motion.h2
        className={`text-xs mt-4 px-3 py-1.5 w-fit rounded-full ${
          type === "Web App"
            ? "text-orange-400 bg-orange-400/10"
            : "text-emerald-400 bg-emerald-400/10"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
      >
        {type}
      </motion.h2>

      <motion.div
        className="px-1"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
      >
        <Title variant="sm">{name}</Title>

        <motion.div
          className="mt-6 text-sm flx gap-2"
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
        >
          <button className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/15 hover:text-blue-400 tr font-semibold flx gap-2 pl-3 pr-3.5 py-2 rounded-full tr">
            <ArrowRight className="h-4 w-4 -rotate-45" />
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSeeLiveLink(live_link || "");
            }}
            className={hover_button}
          >
            <Link className="h-4 w-4" />
            Live Link
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ProjectCard;
