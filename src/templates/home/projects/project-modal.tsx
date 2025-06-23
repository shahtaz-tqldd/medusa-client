import React, { useEffect, useState } from "react";
import Image from "next/image";

import HadronModal from "@/components/ui/hadron-modal";

import { ChevronLeft, ChevronRight, CircleCheck, Code2, Dot, Layers, Link } from "lucide-react";

import type { Project } from "./_types";
import type { MetaProps } from "./_types";
import { projects } from "./_demo_data";
import { colors } from "@/lib/colors";
import LabelText from "@/components/text/label-text";
import BodyText from "@/components/text/body-text";
import { GithubIcon } from "@/assets/icons/icons";

interface ProjectModalProps {
  meta: MetaProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMeta: (meta: MetaProps) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  meta,
  setMeta,
  isOpen,
  setIsOpen,
}) => {
  const [project, setProject] = useState<Project | null>(null);

  // Update project whenever meta.currentId changes
  useEffect(() => {
    if (meta?.currentId) {
      const found = projects.find((p) => p.id === meta.currentId) || null;
      setProject(found);
    }
  }, [meta]);

  // Avoid rendering modal content if project is not loaded
  if (!project) return null;

  const { name, description, img, screens, featureList, techs, projectType, liveLink, githubLink } = project;

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

  const getColors = (pt : string)=>{
    return colors[pt.toLocaleLowerCase()==="software"? 1 : 2]
  }

  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="space-y-10 max-w-4xl mx-auto md:py-12 py-6 px-3">
        <div className="space-y-4">
          <p
            className={`pt-2 pb-1.5 px-4 rounded-full text-sm w-fit ${getColors(projectType)}`}
          >
            {projectType}
          </p>
          <h2 className="text-2xl md:text-4xl leading-[32px] md:leading-[48px]">{name}</h2>
          <BodyText className="text-lg">{description}</BodyText>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Image
            src={img}
            className="h-80 w-full object-cover rounded-2xl"
            alt={name}
          />
          {screens?.[0] && (
            <Image
              src={screens[0]}
              className="h-80 object-cover rounded-2xl"
              alt={`${name} screen`}
              width={600}
              height={400}
            />
          )}
        </div>
        <div>
          <LabelText icon={Layers} className="text-lg">Features</LabelText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-5 opacity-75 mt-4">
            {featureList.map((item, index) => (
              <div key={index} className="flx gap-2">
                <CircleCheck className="h-4 w-4" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <LabelText icon={Code2} className="text-lg">Tech Stacks</LabelText>
          <div className="flex flex-wrap gap-x-4 gap-y-2 -ml-2 mt-4">
            {techs.map((item, index) => (
              <div key={index} className="flx text-sm text-blue-600 dark:text-blue-400">
                <Dot />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flx gap-8">

        {
          liveLink && (
            <a href={liveLink} target="__blank" className="py-2 pl-3 pr-4 rounded-full hover:dark:bg-white/10 hover:bg-blue-500/10 tr">
              <LabelText icon={Link}>Live Link</LabelText>
            </a>
          )
        }
        {
          githubLink && (
            <a href={githubLink} target="__blank" className="py-2 pl-3 pr-4 rounded-full hover:dark:bg-white/10 hover:bg-blue-500/10 tr">
              <LabelText icon={GithubIcon}>Github Link</LabelText>
            </a>
          )
        }
        </div>

        <hr className="border-b-none border-t dark:border-t-white/20 border-blue-500/20 border-dashed mb-3" />
        <div className="flbx">
          <button onClick={handlePrev} className="flx gap-2 py-2 pl-3 pr-4 rounded-full hover:dark:bg-white/10 hover:bg-blue-500/10 tr">
            <ChevronLeft className="h-4 w-4" />
            <h2>Previous</h2>
          </button>
          <button onClick={handleNext} className="flx gap-2 py-2 pl-4 pr-3 rounded-full hover:dark:bg-white/10 hover:bg-blue-500/10 tr">
            <h2>Next</h2>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </HadronModal>
  );
};

export default ProjectModal;
