import React, { useEffect, useState } from "react";
import Image from "next/image";

import HadronModal from "@/components/ui/hadron-modal";

import { ArrowLeft, ArrowRight, CircleCheck, Dot } from "lucide-react";

import type { Project } from "./types";
import type { MetaProps } from "./types";
import { projects } from "./data";
import { colors } from "@/lib/colors";

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

  const { name, description, img, screens, featureList, techs, projectType } = project;

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
      <div className="space-y-5 max-w-4xl mx-auto py-12">
        <p
          className={`pt-2 pb-1.5 px-4 rounded-full text-sm w-fit ${getColors(projectType)}`}
        >
          {projectType}
        </p>
        <h2 className="text-4xl leading-[48px]">{name}</h2>
        <p className="opacity-75 leading-relaxed">{description}</p>
        <div className="grid grid-cols-2 gap-6">
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
          <h2 className="text-2xl mt-12">Features</h2>
          <div className="grid grid-cols-2 gap-y-2 gap-x-5 opacity-75 mt-4">
            {featureList.map((item, index) => (
              <div key={index} className="flx gap-2">
                <CircleCheck className="h-4 w-4" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl mt-12 mb-4">Tech Stacks</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 -ml-2">
            {techs.map((item, index) => (
              <div key={index} className="flx text-sm text-orange-300">
                <Dot />
                {item}
              </div>
            ))}
          </div>
        </div>
        <hr className="border-b-none border-t border-t-white/20 border-dashed" />
        <div className="flbx">
          <button onClick={handlePrev} className="flx gap-2">
            <ArrowLeft className="h-4 w-4" />
            <h2>Previous</h2>
          </button>
          <button onClick={handleNext} className="flx gap-2">
            <h2>Next</h2>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </HadronModal>
  );
};

export default ProjectModal;
