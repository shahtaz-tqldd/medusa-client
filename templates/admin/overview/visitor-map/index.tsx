import { Title } from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

const VisitorMap = () => {
  return (
    <div className="w-full dark:bg-white/5 bg-white rounded-2xl p-8">
      <Title variant="xs">Visitor Demography</Title>
      <Image
        src="/world_map.png"
        className="w-full mt-8"
        height={600}
        width={800}
        alt="World Map"
      />
    </div>
  );
};

export default VisitorMap;
