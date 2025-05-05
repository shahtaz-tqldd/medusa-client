import Image from "next/image";
import { DynamicModelViewer, ErrorBoundary } from "./_model";

const HeroEve: React.FC = () => {
    const isBrowser = typeof window !== "undefined";
    return (
        <div className="w-2/5 h-full relative">
            <div className="relative z-[1] h-[500px] w-full pointer-events-none">
                {isBrowser && (
                    <ErrorBoundary>
                        <DynamicModelViewer modelPath="/robot2.glb" />
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