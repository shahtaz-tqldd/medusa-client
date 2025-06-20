import React from "react";

export default function FadingGrid(){
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Solid grid pattern */}
          <pattern
            id="grid"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 5 0 L 0 0 0 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          </pattern>

          {/* Gradient mask for edge fading */}
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fadeGradient)" />
          </mask>

          <radialGradient id="fadeGradient" cx="28%" cy="50%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="70%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#fadeMask)"
          className="text-black/10 dark:text-white/10"
        />
      </svg>
    </div>
  );
};
