import React, { useState, useMemo } from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";
import TitleText from "@/components/text/title-text";

// data
import type { SkillModalProps } from "./_types";
import { geDuration } from "@/lib/date";
import { Clock, Search, X } from "lucide-react";

const SkillModal: React.FC<SkillModalProps> = ({ data, isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    setSearchTerm("");
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative">
        <div className="flbx md:flex-row flex-col -translate-y-5">
          <HeroText>Skills</HeroText>

          {/* Search bar */}
          <div className="relative md:w-[360px] w-4/5 translate-y-2">
            <input
              type="text"
              placeholder="Search by tech stack name"
              className="py-2 px-9 w-full rounded-full border dark:border-white/20 border-black/10 outline-none"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-4 opacity-50" />
            {searchTerm && (
              <button
                onClick={handleButtonClick}
                className="absolute top-1/2 -translate-y-1/2 right-3"
              >
                <X className="h-4 w-4 opacity-50" />
              </button>
            )}
          </div>
        </div>

        {/* Skill list */}
        <div className="mt-6 space-y-4">
          {filteredData?.length === 0 ? (
            <p className="text-center opacity-70">No skills found.</p>
          ) : (
            filteredData?.map((item, index) => (
              <div
                key={index}
                className="dark:bg-white/3 bg-blue-500/5 rounded-2xl p-6"
              >
                <TitleText icon={item.icon}>{item.name}</TitleText>
                <div className="flbx">
                  <p className="flx gap-2 text-sm opacity-70">
                    <Clock size={14} />
                    {geDuration(item.startDate)} of experience
                  </p>
                  <div className="w-40 flx gap-2">
                    <div className="w-full flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black/80 dark:bg-white transition-all duration-500"
                        style={{ width: item.progress }}
                      />
                    </div>
                    <h2 className="w-10 text-sm text-end">{item.progress}</h2>
                  </div>
                </div>
                <BodyText className="mt-5">{item.description}</BodyText>
              </div>
            ))
          )}
        </div>
      </div>
    </HadronModal>
  );
};

export default SkillModal;
