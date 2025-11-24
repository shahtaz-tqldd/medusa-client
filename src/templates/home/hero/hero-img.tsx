import {
  DjangoIcon,
  DockerIcon,
  FastAPIIcon,
  NodeIcon,
  PostgresIcon,
  ReactIcon,
} from "@/assets/icons/tech-stacks";
import Image from "next/image";
import { useState, useEffect } from "react";

const TechIcon = ({
  icon,
  style,
  delay,
}: {
  icon: React.ReactNode;
  style: React.CSSProperties;
  delay: number;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-1200 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={style}
    >
      <div className="md:opacity-15 opacity-0">{icon}</div>
    </div>
  );
};

export default function HeroImage() {
  const techIcons = [
    {
      icon: <ReactIcon />,
      style: { top: "50%", left: "80%" }, // right side
      delay: 100,
    },
    {
      icon: <DjangoIcon />,
      style: { top: "25%", left: "0%" }, // bottom-right
      delay: 200,
    },
    {
      icon: <FastAPIIcon />,
      style: { top: "25%", right: "0%" }, // bottom-left
      delay: 300,
    },
    {
      icon: <NodeIcon />,
      style: { top: "50%", left: "10%" }, // left side
      delay: 400,
    },
    {
      icon: <DockerIcon />,
      style: { top: "5%", left: "20%" }, // top-left
      delay: 500,
    },
    {
      icon: <PostgresIcon />,
      style: { top: "5%", right: "20%" }, // top-right
      delay: 600,
    },
  ];

  return (
    <div className="relative center p-4 md:min-h-[500px] mt-10 md:mt-0">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float:nth-child(2) { animation-delay: 0.5s; }
        .animate-float:nth-child(3) { animation-delay: 1s; }
        .animate-float:nth-child(4) { animation-delay: 1.5s; }
        .animate-float:nth-child(5) { animation-delay: 2s; }
      `}</style>

      {/* Tech icons floating behind */}
      {techIcons.map((item, index) => (
        <TechIcon
          key={index}
          icon={item.icon}
          style={item.style}
          delay={item.delay}
        />
      ))}

      {/* Main image container */}
      <div className="relative h-auto md:h-[480px] w-full md:w-[480px] z-10">
        {/* Placeholder for hero image */}
        <div
          className="w-full h-full center"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black calc(100% - 80px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black calc(100% - 80px), transparent 100%)",
          }}
        >
          <Image
            src="/hero.png"
            alt="Hero"
            width={500}
            height={500}
            className="object-cover mask-fade"
          />
        </div>
      </div>
    </div>
  );
}
