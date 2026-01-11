"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { X, PenLine, Plus } from "lucide-react";
import { Text, Title } from "@/components/ui/typography";
import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { colors } from "@/lib/colors";
import DeleteDialog from "@/components/dialog/delete-dialog";
import { SkillsProps } from "@/lib/api-service/skills";
import { updateSkills } from "@/lib/api-service/skill-action";

type SkillItem = { name: string };

type SkillGroups = {
  "Language & Frameworks": SkillItem[];
  "Tools & Database": SkillItem[];
  "Other Competency": SkillItem[];
};

export const mapApiSkillsToGroups = (data: SkillsProps): SkillGroups => ({
  "Language & Frameworks": data.language_and_frameworks.map((s) => ({
    name: s,
  })),
  "Tools & Database": data.tools_and_database.map((s) => ({ name: s })),
  "Other Competency": data.other_competency.map((s) => ({ name: s })),
});

interface TechBadgeProps {
  children: React.ReactNode;
  color: string;
  onRemove: () => void;
}

const TechBadge: React.FC<TechBadgeProps> = ({ children, color, onRemove }) => (
  <div
    className={`pl-4 pr-2.5 py-2 rounded-full text-sm font-medium 
    flex items-center gap-2 group ${color}
    transition-all duration-200`}
  >
    <span>{children}</span>

    <button
      onClick={onRemove}
      className="
        overflow-hidden
        max-w-0
        opacity-0
        transition-all duration-200
        group-hover:max-w-[20px]
        group-hover:opacity-100
        flex items-center justify-center
      "
      aria-label="Remove"
    >
      <X size={14} className="text-red-500" />
    </button>
  </div>
);

interface EditableSectionProps {
  title: string;
  content: string;
  fieldName: keyof SkillsProps;
  onSave: (value: string) => Promise<void> | void;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  content,
  fieldName,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { [fieldName]: content },
  });

  const { ref, ...registerProps } = register(fieldName);

  const resizeTextarea = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    if (isEditing) {
      setValue(fieldName, content);
      setTimeout(resizeTextarea, 0);
    }
  }, [isEditing, content, fieldName, setValue]);

  const onSubmitHandler = async (data: Record<string, any>) => {
    await onSave(data[fieldName] as string);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset({ [fieldName]: content });
    setIsEditing(false);
  };

  return (
    <div className="border dark:border-white/15 border-gray-200 rounded-xl overflow-hidden bg-white dark:bg-transparent">
      <div className="py-3 px-6 dark:bg-black bg-emerald-600/10 flex items-center justify-between">
        <Title variant="xs">{title}</Title>

        {!isEditing ? (
          <IconButton onClick={() => setIsEditing(true)} icon={PenLine} />
        ) : (
          <div className="space-x-2">
            <Button onClick={handleCancel} size="sm" variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmitHandler)} size="sm">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="py-4 px-6">
        {isEditing ? (
          <textarea
            {...registerProps}
            ref={(el) => {
              ref(el);
              textareaRef.current = el;
            }}
            onInput={resizeTextarea}
            className="
              w-full
              border-none
              resize-none
              focus:outline-none
              overflow-hidden
              transition-[height] duration-150
            "
          />
        ) : (
          <Text variant="sm">
            <span
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n\n/g, "<br /><br />"),
              }}
            />
          </Text>
        )}
      </div>
    </div>
  );
};

interface FocusAreaManagerProps {
  areas: string[];
  onUpdate: (areas: string[]) => Promise<void>;
}

// Focus Area Manager
const FocusAreaManager: React.FC<FocusAreaManagerProps> = ({
  areas,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [focusAreas, setFocusAreas] = useState(areas);

  const handleSave = async () => {
    await onUpdate(focusAreas);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFocusAreas(areas);
    setIsEditing(false);
  };

  const updateArea = (index: number, value: string) => {
    const newAreas = [...focusAreas];
    newAreas[index] = value;
    setFocusAreas(newAreas);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Title variant="xs">Key Focus Areas</Title>
        {!isEditing ? (
          <IconButton onClick={() => setIsEditing(true)} icon={PenLine} />
        ) : (
          <div className="space-x-2">
            <Button onClick={handleCancel} size="sm" variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {focusAreas.map((area, index) => (
              <Input
                key={index}
                type="text"
                value={area}
                onChange={(e) => updateArea(index, e.target.value)}
                placeholder={`Focus area ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {focusAreas.map((area, index) => (
            <Text variant="lg" key={index} className="!text-emerald-600 dark:!text-lime-400">
              {area}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
};

// Skill Group Manager
const GROUP_FIELD_MAP: Record<string, keyof SkillsProps> = {
  "Language & Frameworks": "language_and_frameworks",
  "Tools & Database": "tools_and_database",
  "Other Competency": "other_competency",
};

interface SkillGroupManagerProps {
  groupName: keyof typeof GROUP_FIELD_MAP;
  skills: { name: string }[];
  color: string;
  onUpdate: (skills: string[]) => Promise<void>;
}

const SkillGroupManager: React.FC<SkillGroupManagerProps> = ({
  groupName,
  skills,
  color,
  onUpdate,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [pendingSkills, setPendingSkills] = useState<string[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      setPendingSkills([...pendingSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSaveSkills = async () => {
    const updated = [...skills.map((s) => s.name), ...pendingSkills];

    await onUpdate(updated);

    setPendingSkills([]);
    setNewSkill("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setPendingSkills([]);
    setNewSkill("");
    setIsAdding(false);
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkillToDelete(skillName);
  };

  const confirmRemove = async () => {
    if (!skillToDelete) return;

    const updatedSkills = skills
      .map((s) => s.name)
      .filter((name) => name !== skillToDelete);

    await onUpdate(updatedSkills);
    setSkillToDelete(null);
  };

  const removePendingSkill = (index: number) => {
    setPendingSkills(pendingSkills.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="space-y-6">
        <Title variant="xs">{groupName}</Title>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <TechBadge
              key={idx}
              color={color}
              onRemove={() => handleRemoveSkill(skill.name)}
            >
              {skill.name}
            </TechBadge>
          ))}
          {pendingSkills.map((skill, idx) => (
            <TechBadge
              key={`pending-${idx}`}
              color={color}
              onRemove={() => removePendingSkill(idx)}
            >
              {skill}
            </TechBadge>
          ))}
        </div>

        {isAdding && (
          <div className="flex gap-4">
            <Input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type skill name and press Enter..."
              autoFocus
            />
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleSaveSkills}
                disabled={pendingSkills.length === 0}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} variant="ghost">
            <Plus size={14} />
            Add Skill
          </Button>
        )}
      </div>

      <DeleteDialog
        open={!!skillToDelete}
        setOpen={(open) => !open && setSkillToDelete(null)}
        onConfirm={confirmRemove}
        isLoading={false}
      />
    </>
  );
};

// Main Component
const SkillsExpertisePage = ({ data }: { data: SkillsProps }) => {
  const [headline, setHeadline] = useState(data.title);
  const [expertise, setExpertise] = useState(data.expertise);
  const [story, setStory] = useState(data.my_story);
  const [focusAreas, setFocusAreas] = useState(data.key_focus_areas);
  const [skillGroups, setSkillGroups] = useState<SkillGroups>(
    mapApiSkillsToGroups(data)
  );

  const saveField = async (field: keyof SkillsProps, value: string) => {
    await updateSkills({ [field]: value });
  };

  const updateFocusAreas = async (areas: string[]) => {
    await updateSkills({ key_focus_areas: areas });
    setFocusAreas(areas);
  };

  const updateSkillGroup = async (
    group: keyof typeof GROUP_FIELD_MAP,
    skills: string[]
  ) => {
    const field = GROUP_FIELD_MAP[group];
    await updateSkills({ [field]: skills });

    setSkillGroups((prev) => ({
      ...prev,
      [group]: skills.map((s) => ({ name: s })),
    }));
  };

  return (
    <div className="space-y-12">
      <div>
        <Title>Skills & Expertise</Title>
        <Text variant="sm">
          Update your skills and expertise on a regular basis
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-6">
          <EditableSection
            title="Headline"
            content={headline}
            fieldName="title"
            onSave={async (val) => {
              await saveField("title", val);
              setHeadline(val);
            }}
          />
          <EditableSection
            title="Expertise"
            content={expertise}
            fieldName="expertise"
            onSave={async (val) => {
              await saveField("expertise", val);
              setExpertise(val);
            }}
          />
          <EditableSection
            title="My Story"
            content={story}
            fieldName="my_story"
            onSave={async (val) => {
              await saveField("my_story", val);
              setStory(val);
            }}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <FocusAreaManager areas={focusAreas} onUpdate={updateFocusAreas} />

          <hr className="border-gray-300 dark:border-white/10" />

          {Object.entries(skillGroups).map(([group, items], i) => (
            <SkillGroupManager
              key={i}
              groupName={group as keyof typeof GROUP_FIELD_MAP}
              skills={items}
              color={colors[i]}
              onUpdate={(skills) =>
                updateSkillGroup(group as keyof typeof GROUP_FIELD_MAP, skills)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsExpertisePage;
