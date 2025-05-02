import { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  useAnimations,
  Center,
  Html,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import { Component } from "react";

// Error Boundary
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
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
function Model({ url }) {
  const groupRef = useRef();
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
  }, [actions]);

  if (!scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
        <Html position={[0, 1.5, 0]} center>
          <div
            style={{
              color: "white",
              background: "rgba(0,0,0,0.7)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Error loading model
          </div>
        </Html>
      </mesh>
    );
  }

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} position={[0, 0, 0]} dispose={null} />
    </group>
  );
}

// ModelViewer Component
function ModelViewer({ modelPath }) {
  const containerRef = useRef();
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px", position: "relative" }}
      onContextMenu={(e) => e.preventDefault()}
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
              <div
                style={{
                  color: "white",
                  background: "rgba(0,0,0,0.7)",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Loading model...
              </div>
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
        />
      </Canvas>
    </div>
  );
}

// Dynamic Import
const DynamicModelViewer = dynamic(() => Promise.resolve(ModelViewer), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center">
      Initializing 3D viewer...
    </div>
  ),
});

// Usage
const isBrowser = typeof window !== "undefined";
export default function HeroModel() {
  return (
    <div className="w-2/5 relative z-10">
      {isBrowser && (
        <ErrorBoundary>
          <DynamicModelViewer modelPath="/robot.glb" />
        </ErrorBoundary>
      )}
    </div>
  );
}
