import Image from "next/image";
import { DynamicModelViewer, ErrorBoundary } from "./_model";

const HeroEve: React.FC = () => {
    const isBrowser = typeof window !== "undefined";
    return (
        <div className="w-2/5 h-full relative">
            <div className="relative z-10 h-[500px] w-full">
                {isBrowser && (
                    <ErrorBoundary>
                        <DynamicModelViewer modelPath="/robot.glb" />
                    </ErrorBoundary>
                )}
            </div>
            <div className="absolute translate-x-1/2 right-1/2 bottom-1/2 translate-y-1/2 z-0 h-[800px] w-[800px]">
            <Image
                src="/elipse_1.svg"
                height={800}
                width={800}
                alt="bg"
                className=""
            />
            </div>
        </div>
  );
}

export default HeroEve