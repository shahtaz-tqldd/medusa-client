import React, { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Code2,
  Dot,
  Layers,
  Link,
} from "lucide-react";

import type { Project } from "./_types";
import { colors } from "@/lib/colors";

import { LabelText, Text } from "@/components/ui/typography";
import { GithubIcon } from "@/assets/icons/social-links";
import { hover_button } from "@/lib/styles";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { MetaProps } from "../home/project-list/_types";
import { projects } from "./_data";
import ImageSlider from "@/components/slider/img-slider";

interface ProjectDetailsDrawerProps {
  meta: MetaProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMeta: (meta: MetaProps) => void;
}

const ProjectDetailsDrawer: React.FC<ProjectDetailsDrawerProps> = ({
  meta,
  setMeta,
  isOpen,
  setIsOpen,
}) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (meta?.currentId) {
      const found = projects.find((p) => p.id === meta.currentId) || null;
      if (found) {
        setTimeout(() => setProject(found), 0);
      }
    }
  }, [meta]);

  // Avoid rendering modal content if project is not loaded
  if (!project) return null;

  const {
    name,
    description,
    images,
    features,
    tech_stacks,
    type,
    live_link,
    github_link,
  } = project;

  const handleNext = () => {
    const nextId =
      parseInt(meta.currentId) === projects.length
        ? 1
        : parseInt(meta.currentId) + 1;
    const nextProject = projects.find((p) => p.id === String(nextId));
    if (nextProject) {
      setProject(nextProject);
      setMeta({
        currentId: String(nextId),
        nextId: String(nextId === projects.length ? 1 : nextId + 1),
        prevId: String(nextId === 1 ? projects.length : nextId - 1),
      });
    }
  };

  const handlePrev = () => {
    const prevId =
      parseInt(meta.currentId) === 1
        ? projects.length
        : parseInt(meta.currentId) - 1;
    const prevProject = projects.find((p) => p.id === String(prevId));
    if (prevProject) {
      setProject(prevProject);
      setMeta({
        currentId: String(prevId),
        nextId: String(prevId === projects.length ? 1 : prevId + 1),
        prevId: String(prevId === 1 ? projects.length : prevId - 1),
      });
    }
  };

  const getColors = (pt: string) => {
    return colors[pt.toLocaleLowerCase() === "software" ? 1 : 2];
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="space-y-4">
          <p
            className={`pt-2 pb-1.5 px-4 rounded-full text-sm w-fit ${getColors(
              type
            )}`}
          >
            {type}
          </p>
          <h2 className="text-2xl md:text-4xl leading-[32px] md:leading-[48px]">
            {name}
          </h2>
          <Text>{description}</Text>
        </div>
        <ImageSlider images={images} name={name} />

        <div>
          <LabelText icon={Layers} className="text-lg">
            Features
          </LabelText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-5 opacity-75 mt-4">
            {features?.map((item, index) => (
              <div key={index} className="flex gap-2.5">
                <CircleCheck className="translate-y-1.5 h-4 w-4" />
                <p className="flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <LabelText icon={Code2} className="text-lg">
            Tech Stacks
          </LabelText>
          <div className="flex flex-wrap gap-x-4 gap-y-2 -ml-2 mt-4">
            {tech_stacks.map((item, index) => (
              <div
                key={index}
                className="flx gap-1 text-base text-blue-600 dark:text-blue-400"
              >
                <Dot />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flx gap-5">
          {live_link && (
            <a href={live_link} target="__blank" className={hover_button}>
              <Link size={16} />
              <span>Live Link</span>
            </a>
          )}
          {github_link && (
            <a href={github_link} target="__blank" className={hover_button}>
              <GithubIcon size={16} />
              <span>Github Link</span>
            </a>
          )}
        </div>

        <hr className="border-b-none border-t dark:border-t-white/20 border-blue-500/20 border-dashed mb-3" />
        <div className="flbx">
          <button onClick={handlePrev} className={hover_button}>
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            className={hover_button}
            style={{ paddingRight: "12px", paddingLeft: "16px" }}
          >
            <h2>Next</h2>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDetailsDrawer;
