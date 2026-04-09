"use client";

import * as THREE from "three";
import { useMemo } from "react";

// ── Palette ──────────────────────────────────────────────────────────────────
const WALL_COLOR      = "#c8c8c8";   // medium gray
const FLOOR_COLOR     = "#d4d4d4";   // light neutral floor
const FLOOR_DARK      = "#c8c8c8";   // alternating plank stripe
const GLASS_COLOR     = "#c8dce8";   // window glass
const SKY_GLOW        = "#ddeef7";   // window sky
const CURTAIN_COLOR   = "#7a7a8a";   // dark charcoal curtain
const CURTAIN_ROD     = "#b0a090";   // warm metal rod

const THICKNESS = 0.22; // wall thickness
const PLANK_COUNT = 10;

// Window definition (on left wall, z-axis)
const WIN_OFFSET  = 0.8;  // units from back wall
const WIN_Z_LEN   = 2.4;  // width of window
const WIN_Y_BOT   = 0.8;  // sill height

// ── Helper: accordion-pleat curtain panel ────────────────────────────────────
const CurtainPanel = ({
  x,
  yTop,
  yBot,
  zFrom,
  zTo,
  color,
  wallGroup,
}: {
  x: number;
  yTop: number;
  yBot: number;
  zFrom: number;
  zTo: number;
  color: string;
  wallGroup?: string;
}) => {
  const N = 8;
  const foldZ  = (zTo - zFrom) / N;
  const h      = yTop - yBot;
  const cy     = yBot + h / 2;
  const DEPTH  = 0.055;

  return (
    <group>
      {Array.from({ length: N }, (_, i) => {
        const zc   = zFrom + i * foldZ + foldZ / 2;
        const xOff = i % 2 === 0 ? 0 : DEPTH;
        return (
          <mesh
            key={i}
            position={[x + xOff, cy, zc]}
            castShadow
            receiveShadow
            userData={wallGroup ? { wallGroup } : {}}
          >
            <boxGeometry args={[DEPTH + 0.01, h, foldZ - 0.004]} />
            <meshStandardMaterial color={color} roughness={0.97} metalness={0} />
          </mesh>
        );
      })}
    </group>
  );
};

// ── Room ──────────────────────────────────────────────────────────────────────
const Room = ({
  width  = 8,
  length = 6.5,
  height = 4,
}: {
  width: number;
  length: number;
  height: number;
}) => {
  const plankW = width / PLANK_COUNT;
  const halfW  = width  / 2;
  const halfL  = length / 2;
  const T      = THICKNESS;

  const wallSolid = useMemo(() => new THREE.MeshStandardMaterial({ color: WALL_COLOR, roughness: 0.9, metalness: 0, side: THREE.DoubleSide }), []);

  // Window bounds on left wall
  const winZ0     = -halfL + WIN_OFFSET;
  const winZ1     = winZ0 + WIN_Z_LEN;
  const winY1     = height - 0.35;
  const winH      = winY1 - WIN_Y_BOT;
  const winCenterZ = (winZ0 + winZ1) / 2;
  const winCenterY = (WIN_Y_BOT + winY1) / 2;

  // Left-wall section lengths (around window cutout)
  const behindLen = winZ0 - (-halfL);   // wall from back to window start
  const frontLen  = halfL - winZ1;      // wall from window end to front

  // Curtain panel extents (smaller panels to leave glass exposed in the center)
  const curtainW = 0.65; // Fixed smaller width for each curtain
  const cLeftZ0  = winZ0 - 0.1;
  const cLeftZ1  = winZ0 + curtainW;
  const cRightZ0 = winZ1 - curtainW;
  const cRightZ1 = winZ1 + 0.1;
  const cYTop    = height - 0.1;

  return (
    <group>

      {/* ── Floor — planks ── */}
      {Array.from({ length: PLANK_COUNT }, (_, i) => (
        <mesh
          key={`plank-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[i * plankW - halfW + plankW / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[plankW - 0.01, length]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? FLOOR_COLOR : FLOOR_DARK}
            roughness={0.85}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Grout lines */}
      {Array.from({ length: PLANK_COUNT - 1 }, (_, i) => (
        <mesh
          key={`grout-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[i * plankW - halfW + plankW, 0.001, 0]}
          receiveShadow
        >
          <planeGeometry args={[0.008, length]} />
          <meshStandardMaterial color="#bbbbbb" roughness={1} />
        </mesh>
      ))}

      {/* ── Back wall ── */}
      <mesh
        position={[0, height / 2, -halfL - T / 2]}
        receiveShadow
        castShadow
        userData={{ wallGroup: "back" }}
      >
        <boxGeometry args={[width + T * 2, height, T]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} metalness={0} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Front wall (ghosts when camera is in front of the room) ── */}
      <mesh
        position={[0, height / 2, halfL + T / 2]}
        receiveShadow
        castShadow
        userData={{ wallGroup: "front" }}
      >
        <boxGeometry args={[width + T * 2, height, T]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} metalness={0} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh
        material={wallSolid}
        position={[halfW + T / 2, height / 2, 0]}
        receiveShadow
        castShadow
        userData={{ wallGroup: "right" }}
      >
        <boxGeometry args={[T, height, length]} />
      </mesh>

      {/* ── Left wall — 4 sections around window cutout ── */}

      {/* Bottom strip (full length) */}
      <mesh position={[-halfW - T / 2, WIN_Y_BOT / 2, 0]} userData={{ wallGroup: "left" }}>
        <boxGeometry args={[T, WIN_Y_BOT, length]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Top strip (full length) */}
      <mesh position={[-halfW - T / 2, winY1 + (height - winY1) / 2, 0]} userData={{ wallGroup: "left" }}>
        <boxGeometry args={[T, height - winY1, length]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Back-side pillar (behind window, between back wall and window start) */}
      {behindLen > 0.001 && (
        <mesh
          position={[-halfW - T / 2, winCenterY, -halfL + behindLen / 2]}
          userData={{ wallGroup: "left" }}
        >
          <boxGeometry args={[T, winH, behindLen]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Front-side pillar (in front of window, between window end and open front) */}
      {frontLen > 0.001 && (
        <mesh
          position={[-halfW - T / 2, winCenterY, winZ1 + frontLen / 2]}
          userData={{ wallGroup: "left" }}
        >
          <boxGeometry args={[T, winH, frontLen]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* ── Window glass ── */}
      <mesh position={[-halfW + 0.01, winCenterY, winCenterZ]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[WIN_Z_LEN, winH]} />
        <meshPhysicalMaterial
          color={GLASS_COLOR}
          transparent
          opacity={0.3}
          roughness={0.04}
          metalness={0}
        />
      </mesh>

      {/* Sky glow behind glass */}
      <mesh position={[-halfW - 0.05, winCenterY, winCenterZ]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[WIN_Z_LEN, winH]} />
        <meshBasicMaterial color={SKY_GLOW} side={THREE.FrontSide} />
      </mesh>

      {/* Window sill */}
      <mesh position={[-halfW - T / 2, WIN_Y_BOT - 0.04, winCenterZ]}>
        <boxGeometry args={[T + 0.14, 0.06, WIN_Z_LEN + 0.08]} />
        <meshStandardMaterial color="#d4cfc8" roughness={0.55} metalness={0} />
      </mesh>

      {/* ── Curtain rod ── */}
      <mesh
        position={[-halfW + 0.07, cYTop - 0.02, winCenterZ]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ wallGroup: "left" }}
      >
        <cylinderGeometry args={[0.022, 0.022, WIN_Z_LEN + 0.6, 12]} />
        <meshStandardMaterial color={CURTAIN_ROD} metalness={0.45} roughness={0.4} />
      </mesh>

      {/* Rod finials */}
      {[winZ0 - 0.22, winZ1 + 0.22].map((z, i) => (
        <mesh key={`fin-${i}`} position={[-halfW + 0.07, cYTop - 0.02, z]} userData={{ wallGroup: "left" }}>
          <sphereGeometry args={[0.035, 10, 8]} />
          <meshStandardMaterial color={CURTAIN_ROD} metalness={0.5} roughness={0.35} />
        </mesh>
      ))}

      {/* ── Curtain panels ── */}
      <CurtainPanel
        x={-halfW + 0.03}
        yTop={cYTop}
        yBot={0.04}
        zFrom={cLeftZ0}
        zTo={cLeftZ1}
        color={CURTAIN_COLOR}
        wallGroup="left"
      />
      <CurtainPanel
        x={-halfW + 0.03}
        yTop={cYTop}
        yBot={0.04}
        zFrom={cRightZ0}
        zTo={cRightZ1}
        color={CURTAIN_COLOR}
        wallGroup="left"
      />

      {/* ── Ceiling ── */}
      <mesh
        position={[0, height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
        userData={{ wallGroup: "ceiling" }}
      >
        <planeGeometry args={[width + T * 2, length + T * 2]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} metalness={0} side={THREE.DoubleSide} />
      </mesh>

    </group>
  );
};

export default Room;
