import Image from "next/image";
import { DynamicModelViewer, ErrorBoundary } from "@/components/3d-models/model-render";

const HeroEve: React.FC = () => {
  const isBrowser = typeof window !== "undefined";
  return (
    <div className="w-full md:w-2/5 h-full relative mt-20 md:mt-12">
      <div className="relative z-[1] h-[300px] md:h-[500px] w-full pointer-events-none">
        {isBrowser && (
          <ErrorBoundary>
            <DynamicModelViewer modelPath="/robot2.glb" />
          </ErrorBoundary>
        )}
      </div>
      <div className="absolute translate-x-1/2 right-1/2 bottom-1/2 translate-y-1/2 z-0 h-[600px] md:h-[800px] w-[600px] md:w-[800px] pointer-events-none">
        <Image
          src="/elipse_1.svg"
          height={800}
          width={800}
          alt="bg"
          className=""
        />
      </div>
      <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <img
          src="./loader.gif"
          height={80}
          width={80}
          alt="loader"
          className="opacity-60"
        />
      </span>
    </div>
  );
};

export default HeroEve;
