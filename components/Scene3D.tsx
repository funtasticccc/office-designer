"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import Room from "./Room";
import WorkspaceItems from "./WorkspaceItems";

const Scene3D = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{
        fov: 45,
        position: [3, 3, 5],
        near: 0.1,
        far: 100,
      }}
      style={{ width: "100%", height: "100%" }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
    >
      <color attach="background" args={["#fff8f0"]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} />

      {/* Warm fill light from window side */}
      <pointLight position={[4, 3, -2]} intensity={0.5} color="#ffecd2" />

      {/* Environment for PBR reflections */}
      <Environment preset="apartment" />

      {/* Contact shadows on floor */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      <Suspense fallback={null}>
        {/* Room shell */}
        <Room />

        {/* Dynamic workspace items */}
        <WorkspaceItems />
      </Suspense>

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        enablePan={true}
        minDistance={2}
        maxDistance={12}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1} // Now capped just before or at the floor level
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default Scene3D;
