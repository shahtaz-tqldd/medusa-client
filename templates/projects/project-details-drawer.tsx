import React, { useEffect, useRef, useState } from "react";

import { Check, Code2, Layers, Link, Sparkles } from "lucide-react";

import { colors } from "@/lib/colors";

import { LabelText, Text, Title } from "@/components/ui/typography";
import { GithubIcon } from "@/assets/icons/social-links";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import ImageSlider from "@/components/slider/img-slider";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchProjectById,
  ProjectDetailsProps,
} from "@/lib/api-service/project-action";

interface ProjectDetailsDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string | null;
  admin_view?: boolean;
}

const ProjectDetailsDrawer: React.FC<ProjectDetailsDrawerProps> = ({
  isOpen,
  setIsOpen,
  projectId,
  admin_view,
}) => {
  const [project, setProject] = useState<ProjectDetailsProps | null>(null);
  const [loading, setLoading] = useState(false);

  const historyPushed = useRef(false);

  // Handle modal open/close with browser history
  useEffect(() => {
    const handlePopState = () => {
      // Check if we're coming back from a modal state
      if (isOpen && historyPushed.current) {
        setIsOpen(false);
        historyPushed.current = false;
      }
    };

    if (isOpen && !historyPushed.current) {
      // Push a new state when modal opens
      window.history.pushState({ modal: true }, "");
      historyPushed.current = true;
    }

    // Always add the event listener when modal is open
    if (isOpen) {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, setIsOpen]);

  const handleClose = () => {
    if (historyPushed.current) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !projectId) return;

    const loadProject = async () => {
      setLoading(true);
      try {
        const res = await fetchProjectById(projectId, admin_view);
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [isOpen, projectId, admin_view]);

  if (!isOpen) return null;

  const {
    title,
    description,
    case_study,
    images,
    features,
    tech_stacks,
    type,
    links,
  } = project || {};

  const getColors = (pt: string) => {
    return colors[pt.toLocaleLowerCase() === "software" ? 1 : 2];
  };

  // Extract links by type
  const liveLink = links?.find((link) => link.type === "live")?.url;
  const githubLink = links?.find((link) => link.type === "github")?.url;

  // Extract image URLs from the images array
  const imageUrls = images?.map((img) => img.image_url) || [];

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <DrawerTitle hidden></DrawerTitle>
        {loading && <p className="p-6">Loading...</p>}
        {!loading && project && (
          <AnimateDiv className="space-y-10">
            <div className="space-y-4">
              <div className="w-fit">
                <TechBadge color={getColors(type || "default")}>
                  {type?.split("_").join(" ")}
                </TechBadge>
              </div>
              <Title variant="lg">{title}</Title>
              <div>
                {description && (
                  <Text variant="lg" className="md:text-justify">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: description.replace(/\n\n/g, "<br /><br />"),
                      }}
                    />
                  </Text>
                )}
              </div>
              <div className="space-y-4 mt-10">
                <LabelText icon={Sparkles} variant="sm">
                  Case Study
                </LabelText>
                {case_study && (
                  <Text variant="lg" className="md:text-justify">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: case_study.replace(/\n\n/g, "<br /><br />"),
                      }}
                    />
                  </Text>
                )}
              </div>
            </div>
            <ImageSlider
              images={imageUrls.reduce(
                (acc, url, index) => {
                  acc[index.toString()] = url;
                  return acc;
                },
                {} as Record<string, string | null>,
              )}
              name={title || "Untitled"}
            />

            <div className="space-y-4">
              <LabelText icon={Layers} variant="sm">
                Features
              </LabelText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-5">
                {features?.map((item, index) => (
                  <div key={index} className="flex gap-2.5">
                    <Check className="translate-y-1.5 h-4 w-4 text-emerald-500" />
                    <Text variant="lg" className="flex-1">
                      {item}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <LabelText icon={Code2} variant="sm">
                Tech Stacks
              </LabelText>
              <div className="flex flex-wrap gap-x-1 gap-y-2">
                {tech_stacks?.map((item, index) => (
                  <TechBadge key={index}>{item}</TechBadge>
                ))}
              </div>
            </div>

            <hr className="border-b-none border-t dark:border-t-white/20 border-blue-500/20 border-dashed mb-3" />
            <div className="flex gap-2.5">
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <Link size={14} />
                    <span>Live Link</span>
                  </Button>
                </a>
              )}
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <GithubIcon size={14} />
                    <span>Github Link</span>
                  </Button>
                </a>
              )}
            </div>
          </AnimateDiv>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDetailsDrawer;
