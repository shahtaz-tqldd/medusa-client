"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface CountryData {
  country: string;
  visitor_count: number;
}

interface CountryCoordinates {
  name: string;
  lat: number;
  lng: number;
}

interface WorldMapProps {
  data: CountryData[];
  darkMode?: boolean;
}

const countryCoordinates: CountryCoordinates[] = [
  { name: "USA", lat: 37.0902, lng: -95.7129 },
  { name: "Canada", lat: 56.1304, lng: -106.3468 },
  { name: "Bangladesh", lat: 23.685, lng: 90.3563 },
  { name: "Mexico", lat: 23.6345, lng: -102.5528 },
  { name: "Brazil", lat: -14.235, lng: -51.9253 },
  { name: "Argentina", lat: -38.4161, lng: -63.6167 },
  { name: "UK", lat: 55.3781, lng: -3.436 },
  { name: "France", lat: 46.2276, lng: 2.2137 },
  { name: "Germany", lat: 51.1657, lng: 10.4515 },
  { name: "Spain", lat: 40.4637, lng: -3.7492 },
  { name: "Italy", lat: 41.8719, lng: 12.5674 },
  { name: "Russia", lat: 61.524, lng: 105.3188 },
  { name: "China", lat: 35.8617, lng: 104.1954 },
  { name: "Japan", lat: 36.2048, lng: 138.2529 },
  { name: "India", lat: 20.5937, lng: 78.9629 },
  { name: "Australia", lat: -25.2744, lng: 133.7751 },
  { name: "South Korea", lat: 35.9078, lng: 127.7669 },
  { name: "Indonesia", lat: -0.7893, lng: 113.9213 },
  { name: "Thailand", lat: 15.87, lng: 100.9925 },
  { name: "Vietnam", lat: 14.0583, lng: 108.2772 },
  { name: "Malaysia", lat: 4.2105, lng: 101.9758 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Philippines", lat: 12.8797, lng: 121.774 },
  { name: "Turkey", lat: 38.9637, lng: 35.2433 },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { name: "UAE", lat: 23.4241, lng: 53.8478 },
  { name: "Egypt", lat: 26.8206, lng: 30.8025 },
  { name: "South Africa", lat: -30.5595, lng: 22.9375 },
  { name: "Nigeria", lat: 9.082, lng: 8.6753 },
  { name: "Kenya", lat: -0.0236, lng: 37.9062 },
  { name: "Poland", lat: 51.9194, lng: 19.1451 },
  { name: "Netherlands", lat: 52.1326, lng: 5.2913 },
  { name: "Belgium", lat: 50.5039, lng: 4.4699 },
  { name: "Sweden", lat: 60.1282, lng: 18.6435 },
  { name: "Norway", lat: 60.472, lng: 8.4689 },
  { name: "Denmark", lat: 56.2639, lng: 9.5018 },
  { name: "Switzerland", lat: 46.8182, lng: 8.2275 },
  { name: "Austria", lat: 47.5162, lng: 14.5501 },
  { name: "Greece", lat: 39.0742, lng: 21.8243 },
  { name: "Portugal", lat: 39.3999, lng: -8.2245 },
  { name: "New Zealand", lat: -40.9006, lng: 174.886 },
];

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

  const countriesWithData = countryCoordinates.filter((coord) =>
    dataMap.has(coord.name)
  );

  return (
    <div className={`relative w-full`}>
      <div className="relative">
        <Image
          src="/wm.png"
          alt="world map"
          width={1200}
          height={600}
          className="w-full h-auto invert-80 dark:invert-15"
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
                    className="fill-orange-500 opacity-30"
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
                    className="fill-orange-600 drop-shadow-lg"
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
              <div className="text-sm text-orange-500">
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
