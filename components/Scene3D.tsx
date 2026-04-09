"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import Room from "./Room";
import WorkspaceItems from "./WorkspaceItems";
import WallGhostController from "./WallGhostController";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const Scene3D = () => {
  const roomDims = useWorkspaceStore((s) => s.roomDims);

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
        <meshBasicMaterial color="#c2c2c2" side={THREE.BackSide} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.7} color="#f0f0f0" />
      <directionalLight
        position={[3, 8, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      {/* Fill from above (open ceiling — sky fill) */}
      <directionalLight position={[0, 10, 0]} intensity={0.35} color="#e8eeff" />
      {/* Soft fill from front */}
      <directionalLight position={[4, 4, 7]} intensity={0.2} color="#ffffff" />

      {/* Left-wall window light */}
      <pointLight position={[-3, 2.5, -1.5]} intensity={1.4} color="#ddeeff" distance={10} decay={2} />

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
        <Room width={roomDims.w} length={roomDims.l} height={roomDims.h} />

        {/* Dynamic workspace items */}
        <WorkspaceItems />
      </Suspense>

      {/* Ghost whichever wall is blocking the camera's view of the room interior */}
      <WallGhostController />

      {/* Camera controls — full 360° horizontal orbit */}
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0.8, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default Scene3D;
