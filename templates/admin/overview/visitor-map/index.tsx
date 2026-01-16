import React from "react";
import { Text, Title } from "@/components/ui/typography";
import WorldMap, { CountryData } from "./world-map";
import { MapPin } from "lucide-react";

interface VisitorMapProps {
  visitors: CountryData[];
}

const VisitorMap = ({ visitors }: VisitorMapProps) => {
  return (
    <div className="w-full dark:bg-white/5 bg-white rounded-2xl p-8">
      <div className="space-y-1">
        <Title variant="xs">Visitor Demography</Title>
        <Text
          variant="xs"
          className="flx gap-2 dark:!text-lime-400 !text-emerald-600"
        >
          <MapPin className="" size={14} />
          From {visitors.length} countries around the globe
        </Text>
      </div>
      <div className="px-6 pt-6">
        <WorldMap data={visitors} />
      </div>
    </div>
  );
};

export default VisitorMap;
