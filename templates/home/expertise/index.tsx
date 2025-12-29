"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { Text, Title } from "@/components/ui/typography";

import { expertiseData } from "./_data";
import type { ExpertiseArea } from "./_types";
import ExpertiseDetailsDrawer from "./expertise-details-drawer";

const Expertise = () => {
  const [selectedId, setSelectedId] = useState<string>(expertiseData[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<ExpertiseArea | null>(
    null
  );

  const currentExpertise =
    expertiseData.find((e) => e.id === selectedId) ?? expertiseData[0];

  const openDrawer = () => {
    setSelectedFeature(currentExpertise);
    setDrawerOpen(true);
  };

  const ref = useRef<HTMLDivElement | null>(null);
  // Attach ref to the motion div that you want to observe
  const isInView = useInView(ref, { once: true, margin: "-10% 10px" });

  return (
    <section className="container py-12 md:py-20">
      <Title variant="lg">Expertise</Title>

      <div className="grid md:grid-cols-2 gap-12 mt-8">
        {/* LEFT */}
        <div>
          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/5 mb-8">
            {expertiseData.map((item) => {
              const TabIcon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition ${
                    selectedId === item.id
                      ? "border-white"
                      : "border-transparent text-gray-300/80"
                  }`}
                >
                  <TabIcon size={18} />
                  {item.title}
                  <span className="md:block hidden">Development</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              exit={{ opacity: 0, x: 20 }}
              ref={ref}
            >
              <Text variant="lg">{currentExpertise.description}</Text>

              <div className="mt-6 space-y-2 max-w-md">
                {currentExpertise.keyPoints.map((point) => (
                  <div key={point} className="flex gap-3">
                    <Check className="mt-1.5 text-emerald-500" size={14} />
                    <Text variant="sm" className="flex-1">{point}</Text>
                  </div>
                ))}
              </div>

              <button
                onClick={openDrawer}
                className="mt-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
              >
                <ArrowRight className="-rotate-45" size={16} />
                View Details
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full"
              ref={ref}
            >
              <Image
                src={currentExpertise.img}
                alt={currentExpertise.title}
                width={800}
                height={520}
                className="rounded-2xl object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ExpertiseDetailsDrawer
        data={selectedFeature}
        isOpen={drawerOpen}
        setIsOpen={setDrawerOpen}
      />
    </section>
  );
};

export default Expertise;
