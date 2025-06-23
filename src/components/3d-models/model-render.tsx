import { useEffect, useRef, Suspense, Component, ReactNode } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  useAnimations,
  Center,
  Html,
} from "@react-three/drei";


// Error Boundary
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
          Failed to load 3D model. Please check the file path or try again.
        </div>
      );
    }
    return this.props.children;
  }
}

// Model Component
interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const groupRef = useRef(null);
  const { scene, animations = [] } = useGLTF(url);
  const { actions = {} } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      if (firstAction && typeof firstAction.play === "function") {
        firstAction.play();
      }
    }

    return () => {
      if (actions && Object.keys(actions).length > 0) {
        Object.values(actions).forEach((action) => {
          if (action && typeof action.stop === "function") {
            action.stop();
          }
        });
      }
    };
  }, []);

  if (!scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
        <Html position={[0, 1.5, 0]} center>
          Error loading model
        </Html>
      </mesh>
    );
  }

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={4.5} position={[0, 0, 0]} dispose={null} />
    </group>
  );
}

// ModelViewer Component
interface ModelViewerProps {
  modelPath: string;
}

function ModelViewer({ modelPath }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 1000 }}
        style={{ touchAction: "none" }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense
          fallback={
            <Html center>
              {/* <span className="model-loader"></span> */}
            </Html>
          }
        >
          <Center>
            <Model url={modelPath} />
          </Center>
          <Environment preset="dawn" />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
          minDistance={1}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          makeDefault
          zoom0={100}
        />
      </Canvas>
    </div>
  );
}

// Dynamic Import
export const DynamicModelViewer = dynamic(() => Promise.resolve(ModelViewer), { ssr: false });
