"use client";

import * as THREE from "three";

// ── Palette ──────────────────────────────────────────────────────────────────
const WALL_COLOR    = "#f7f0e4";   // warm linen
const WALL_SIDE_COLOR = "#f2ebe0"; // very slightly warmer side walls
const CEILING_COLOR = "#f9f5ee";   // near-white ceiling
const FLOOR_COLOR   = "#c9956d";   // honey-oak wood (base)
const FLOOR_DARK    = "#c08b63";   // alternating plank stripe
const BASEBOARD_COLOR = "#d9c9a8"; // light tan trim
const FRAME_COLOR   = "#b8966a";   // natural wood frame
const GLASS_COLOR   = "#93cfe8";   // sky blue
const SKY_GLOW      = "#d4ecf7";   // soft window glow

const Room = () => {
  // Plank widths — 10 strips across 8 units, each 0.8 wide
  const PLANK_COUNT = 10;
  const PLANK_W     = 0.8;

  return (
    <group>

      {/* ── Floor — honey oak planks ── */}
      {Array.from({ length: PLANK_COUNT }, (_, i) => (
        <mesh
          key={`plank-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[i * PLANK_W - (PLANK_COUNT * PLANK_W) / 2 + PLANK_W / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[PLANK_W - 0.01, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? FLOOR_COLOR : FLOOR_DARK}
            roughness={0.82}
            metalness={0.02}
          />
        </mesh>
      ))}

      {/* Thin grout lines between planks */}
      {Array.from({ length: PLANK_COUNT - 1 }, (_, i) => (
        <mesh
          key={`grout-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[i * PLANK_W - (PLANK_COUNT * PLANK_W) / 2 + PLANK_W, 0.001, 0]}
          receiveShadow
        >
          <planeGeometry args={[0.012, 8]} />
          <meshStandardMaterial color="#a8784e" roughness={1} />
        </mesh>
      ))}

      {/* ── Back wall ── */}
      <mesh position={[0, 2, -2.5]} receiveShadow castShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.92} metalness={0} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh position={[-4, 2, 0.75]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[6.5, 5]} />
        <meshStandardMaterial color={WALL_SIDE_COLOR} roughness={0.92} metalness={0} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh position={[4, 2, 0.75]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <planeGeometry args={[6.5, 5]} />
        <meshStandardMaterial color={WALL_SIDE_COLOR} roughness={0.92} metalness={0} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0.75]}>
        <planeGeometry args={[8, 6.5]} />
        <meshStandardMaterial color={CEILING_COLOR} roughness={1} metalness={0} />
      </mesh>

      {/* ── Baseboard — back wall ── */}
      <mesh position={[0, 0.055, -2.47]}>
        <boxGeometry args={[8, 0.11, 0.04]} />
        <meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.7} />
      </mesh>

      {/* ── Baseboard — left wall ── */}
      <mesh position={[-3.97, 0.055, 0.75]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6.5, 0.11, 0.04]} />
        <meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.7} />
      </mesh>

      {/* ── Baseboard — right wall ── */}
      <mesh position={[3.97, 0.055, 0.75]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[6.5, 0.11, 0.04]} />
        <meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.7} />
      </mesh>

      {/* ═══ Window — back wall, left of center ═══ */}
      <group position={[-1.5, 2.3, -2.46]}>

        {/* Sky glow behind window */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.0, 2.2]} />
          <meshBasicMaterial color={SKY_GLOW} />
        </mesh>

        {/* Outer frame */}
        <mesh>
          <boxGeometry args={[2.1, 2.3, 0.06]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.45} metalness={0.05} />
        </mesh>

        {/* Glass pane — 4 panes (2×2) */}
        {[[-0.49, 0.52], [0.49, 0.52], [-0.49, -0.52], [0.49, -0.52]].map(([px, py], i) => (
          <mesh key={i} position={[px, py, 0.04]}>
            <planeGeometry args={[0.88, 0.96]} />
            <meshPhysicalMaterial
              color={GLASS_COLOR}
              transparent
              opacity={0.55}
              roughness={0.05}
              metalness={0}
              envMapIntensity={0.5}
            />
          </mesh>
        ))}

        {/* Horizontal mullion */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2.0, 0.045, 0.04]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.45} />
        </mesh>

        {/* Vertical mullion */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.045, 2.2, 0.04]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.45} />
        </mesh>

        {/* Tropical silhouette — palm trunk */}
        <mesh position={[0.55, -0.55, 0.01]} rotation={[0, 0, 0.08]}>
          <cylinderGeometry args={[0.025, 0.04, 1.2, 8]} />
          <meshBasicMaterial color="#3d6b4f" transparent opacity={0.25} />
        </mesh>

        {/* Palm leaves */}
        {[0, 55, 115, 175, 240, 300].map((deg, i) => (
          <mesh
            key={i}
            position={[
              0.55 + Math.cos((deg * Math.PI) / 180) * 0.22,
              0.22 + Math.sin(Math.abs((deg - 90) * Math.PI) / 180) * 0.1,
              0.01,
            ]}
            rotation={[0, 0, ((deg - 90) * Math.PI) / 180]}
          >
            <planeGeometry args={[0.38, 0.07]} />
            <meshBasicMaterial
              color="#3d6b4f"
              transparent
              opacity={0.22}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* ── Second smaller window — right side of back wall ── */}
      <group position={[2.4, 2.5, -2.46]}>
        {/* Sky glow */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[1.1, 1.4]} />
          <meshBasicMaterial color={SKY_GLOW} />
        </mesh>

        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.2, 1.5, 0.06]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.45} />
        </mesh>

        {/* Single pane glass */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.08, 1.38]} />
          <meshPhysicalMaterial
            color={GLASS_COLOR}
            transparent
            opacity={0.5}
            roughness={0.05}
          />
        </mesh>

        {/* Cross */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.1, 0.04, 0.03]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.04, 1.42, 0.03]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.45} />
        </mesh>
      </group>

      {/* ── Ceiling light recess (simple shallow box) ── */}
      <mesh position={[0, 3.95, 0.5]}>
        <boxGeometry args={[1.2, 0.04, 0.6]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.9} />
      </mesh>

      {/* Subtle wall shadow/depth trim — top of back wall (crown) */}
      <mesh position={[0, 3.95, -2.47]}>
        <boxGeometry args={[8, 0.08, 0.06]} />
        <meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.7} />
      </mesh>

    </group>
  );
};

export default Room;
