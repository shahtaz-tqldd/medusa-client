"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check, Code } from "lucide-react";
import Image from "next/image";

import { Text, Title } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import ExpertiseDetailsDrawer from "./expertise-details-drawer";
import { ExpertiseProps } from "@/lib/api-service/expertise";

const Expertise = ({ expertises }: { expertises: ExpertiseProps[] }) => {
  const hasExpertise = expertises.length > 0;

  const [selectedId, setSelectedId] = useState<string | null>(
    hasExpertise ? expertises[0].id : null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedExpertise, setSelectedExpertise] =
    useState<ExpertiseProps | null>(null);

  const currentExpertise = expertises.find((e) => e.id === selectedId) ?? null;

  const openDrawer = () => {
    if (!currentExpertise) return;
    setSelectedExpertise(currentExpertise);
    setDrawerOpen(true);
  };

  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const textInView = useInView(textRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  return (
    <section className="container pt-8 pb-8 md:pt-0 md:pb-20">
      <Title variant="lg">Expertise</Title>

      {!hasExpertise && (
        <Text variant="sm" className="max-w-sm mt-8">
          Expertise information hasn’t been added yet. Once expertise is
          available, it will appear here.
        </Text>
      )}

      {hasExpertise && currentExpertise && (
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          {/* LEFT */}
          <div>
            {/* Tabs */}
            <div className="flex gap-6 border-b dark:border-white/5 border-gray-200 mb-8">
              {expertises.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition ${
                    selectedId === item.id
                      ? "border-gray-900 dark:border-white text-gray-900 dark:text-white"
                      : "border-transparent text-gray-400 dark:text-gray-300/80"
                  }`}
                >
                  <Code size={18} />
                  {item.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                ref={textRef}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                exit={{ opacity: 0, x: 20 }}
              >
                <Text variant="lg">{currentExpertise.description}</Text>

                <div className="mt-6 space-y-2 max-w-md">
                  {currentExpertise.features.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <Check className="mt-1.5 text-emerald-500" size={14} />
                      <Text variant="lg" className="flex-1">
                        {feature}
                      </Text>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={openDrawer}
                  size="lg"
                  variant="secondary"
                  className="mt-8 md:mt-12"
                >
                  <ArrowRight className="-rotate-45" size={16} />
                  View Details
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                ref={imageRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  imageInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-h-[480px] h-full"
              >
                <Image
                  src={currentExpertise.featured_image}
                  alt={currentExpertise.name}
                  width={800}
                  height={520}
                  className="rounded-2xl object-cover w-full h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      <ExpertiseDetailsDrawer
        data={selectedExpertise}
        isOpen={drawerOpen}
        setIsOpen={setDrawerOpen}
      />
    </section>
  );
};

export default Expertise;
