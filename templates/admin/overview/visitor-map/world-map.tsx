"use client";
import React, { useState } from "react";
import Image from "next/image";
import { country } from "@/lib/country";

export interface CountryData {
  country: string;
  visitor_count: number;
}

interface WorldMapProps {
  data: CountryData[];
  darkMode?: boolean;
}

const WorldMap: React.FC<WorldMapProps> = ({ data, darkMode = false }) => {
  const [imgSize, setImgSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const convertToImageCoords = (lat: number, lng: number) => {
    if (!imgSize) return { x: 0, y: 0 };

    const x = ((lng + 180) / 360) * imgSize.width;
    const y = ((90 - lat) / 180) * imgSize.height;

    return { x, y };
  };

  const handleMouseEnter = (country: string, event: React.MouseEvent) => {
    setHoveredCountry(country);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  const dataMap = new Map(data.map((d) => [d.country, d.visitor_count]));

  const countriesWithData = country.filter((coord) => dataMap.has(coord.name));

  return (
    <div className={`relative w-full`}>
      <div className="relative">
        <Image
          src="/wm.png"
          alt="world map"
          width={1200}
          height={600}
          className="w-full h-auto invert-65 dark:invert-25"
          onLoadingComplete={(img) => {
            setImgSize({
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          }}
        />

        {imgSize && (
          <svg
            viewBox={`0 0 ${imgSize.width} ${imgSize.height}`}
            className="absolute inset-0 top-10 -translate-x-8 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Country pins */}
            {countriesWithData.map((coord) => {
              const pos = convertToImageCoords(coord.lat, coord.lng);
              return (
                <g
                  key={coord.name}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseEnter={(e) => handleMouseEnter(coord.name, e)}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="8"
                    className="fill-lime-400 opacity-30"
                  >
                    <animate
                      attributeName="r"
                      values="8;12;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    d="M 0,-12 C -3,-12 -5,-10 -5,-7 C -5,-4 0,0 0,0 C 0,0 5,-4 5,-7 C 5,-10 3,-12 0,-12 Z"
                    className="fill-lime-400 drop-shadow-lg"
                  />
                  <circle cx="0" cy="-7" r="2" className="fill-white" />
                </g>
              );
            })}
          </svg>
        )}

        {/* Tooltip */}
        {hoveredCountry && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 60}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow-xl ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="font-semibold text-sm text-black">
                {hoveredCountry}
              </div>
              <div className="text-sm text-emerald-600">
                {dataMap.get(hoveredCountry)?.toLocaleString()} visitors
              </div>
            </div>
            <div
              className={`w-3 h-3 absolute left-1/2 -bottom-1 transform -translate-x-1/2 rotate-45 ${
                darkMode
                  ? "bg-gray-800 border-r border-b border-gray-700"
                  : "bg-white border-r border-b border-gray-200"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
