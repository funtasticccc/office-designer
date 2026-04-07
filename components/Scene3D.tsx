"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
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
      {/* Sky sphere — BackSide renders the inner surface from every direction,
          guaranteed no black patches regardless of camera angle. */}
      <mesh>
        <sphereGeometry args={[40, 32, 16]} />
        <meshBasicMaterial color="#f2ece0" side={THREE.BackSide} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.65} color="#fff5e8" />
      <directionalLight
        position={[3, 7, 4]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      {/* Soft bounce from the left wall */}
      <directionalLight position={[-5, 3, 1]} intensity={0.25} color="#ffe8d0" />
      {/* Cool fill from front-right (simulates ceiling bounce) */}
      <directionalLight position={[4, 5, 6]} intensity={0.2} color="#e8f0ff" />

      {/* Warm window light — left window position */}
      <pointLight position={[-1.5, 3, -2]} intensity={1.2} color="#fff0d8" distance={8} decay={2} />
      {/* Secondary warm fill from right window */}
      <pointLight position={[2.4, 3.5, -2]} intensity={0.6} color="#ffecc8" distance={6} decay={2} />

      {/* Environment for PBR reflections — no background, just lighting */}
      <Environment preset="apartment" background={false} />

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

      {/* Camera controls — constrained to stay inside the room */}
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={7}
        minPolarAngle={Math.PI / 2.7}   // ~66° from zenith — camera stays below ceiling (y=4)
        maxPolarAngle={Math.PI / 2.15}  // stays above floor level
        minAzimuthAngle={-Math.PI * 0.5}
        maxAzimuthAngle={Math.PI * 0.5}
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default Scene3D;
