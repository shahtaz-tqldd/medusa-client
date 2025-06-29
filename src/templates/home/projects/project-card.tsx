"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { HeaderText } from "@/components/text/title-text";
import { Dot } from "lucide-react";

import type { Project } from "./_types";

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
  const { id, name, images, type, tags } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

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
        className={`text-sm mt-4 pl-1 uppercase ${
          type === "Web App" ? "text-orange-400" : "text-emerald-400"
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
        <HeaderText className="mt-2.5">{name}</HeaderText>

        <motion.div
          className="mt-6 text-sm flx"
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 0.6, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
        >
          {tags?.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-nowrap">{item}</span>
              {index < tags.length - 1 && <Dot />}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ProjectCard;
