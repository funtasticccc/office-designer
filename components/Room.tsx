"use client";

import { useRef } from "react";
import * as THREE from "three";

const Room = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* ── Floor ── */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#e8d5c4"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* ── Back wall ── */}
      <mesh position={[0, 2, -2]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#fef9f0" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh
        position={[-4, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#f5ebe0" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Window on back wall (right side) ── */}
      <group position={[2, 2.2, -1.98]}>
        {/* Window frame */}
        <mesh>
          <boxGeometry args={[1.6, 1.8, 0.06]} />
          <meshStandardMaterial color="#c9b896" roughness={0.5} />
        </mesh>

        {/* Window glass - sky/tropical gradient */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.4, 1.6]} />
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.6} />
        </mesh>

        {/* Window crossbar horizontal */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[1.4, 0.04, 0.03]} />
          <meshStandardMaterial color="#c9b896" roughness={0.5} />
        </mesh>

        {/* Window crossbar vertical */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[0.04, 1.6, 0.03]} />
          <meshStandardMaterial color="#c9b896" roughness={0.5} />
        </mesh>

        {/* Palm silhouette (simple cylinders and spheres) */}
        <group position={[0.3, -0.2, -0.01]}>
          {/* Trunk */}
          <mesh position={[0, -0.3, 0]} rotation={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.03, 0.04, 0.8, 8]} />
            <meshBasicMaterial color="#4a7c59" transparent opacity={0.35} />
          </mesh>
          {/* Leaves */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((angle * Math.PI) / 180) * 0.15,
                0.15,
                Math.sin((angle * Math.PI) / 180) * 0.02,
              ]}
              rotation={[0, 0, ((angle - 90) * Math.PI) / 180]}
            >
              <planeGeometry args={[0.25, 0.06]} />
              <meshBasicMaterial
                color="#4a7c59"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── Baseboard ── */}
      <mesh position={[0, 0.05, -1.97]}>
        <boxGeometry args={[8, 0.1, 0.04]} />
        <meshStandardMaterial color="#d4bc94" roughness={0.7} />
      </mesh>
    </group>
  );
};

export default Room;
