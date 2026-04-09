"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

/**
 * Camera-position-based wall ghost controller.
 *
 * Instead of raycasting (which misses corners at diagonal angles), we compare
 * the camera position against each wall's boundary plane.  Any wall whose
 * plane the camera is currently on the *outside* of gets faded to ghost
 * opacity.  Multiple walls are ghosted simultaneously at diagonal POVs.
 *
 * Walls opt-in by setting  userData.wallGroup on their mesh nodes (Room.tsx):
 *   "front"   – front wall (camera.z >  halfL)
 *   "back"    – back wall  (camera.z < -halfL)
 *   "right"   – right wall (camera.x >  halfW)
 *   "left"    – left wall  (camera.x < -halfW)
 *   "ceiling" – ceiling    (camera.y >  height)
 */

const GHOST_OPACITY = 0.06;
const LERP_SPEED    = 0.12;

const WallGhostController = () => {
  const { camera, scene } = useThree();
  const roomDims = useWorkspaceStore((s) => s.roomDims);
  const opacities = useRef<Record<string, number>>({});

  useFrame(() => {
    const halfW = roomDims.w / 2;
    const halfL = roomDims.l / 2;
    const h     = roomDims.h;

    // ── 1. Collect tagged wall meshes ────────────────────────────────────────
    const walls: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.userData.wallGroup) {
        walls.push(obj);
      }
    });
    if (walls.length === 0) return;

    // ── 2. Decide which groups to ghost based on camera position ─────────────
    const cx = camera.position.x;
    const cy = camera.position.y;
    const cz = camera.position.z;

    const shouldGhost: Record<string, boolean> = {
      front:   cz >  halfL,
      back:    cz < -halfL,
      right:   cx >  halfW,
      left:    cx < -halfW,
      ceiling: cy >  h,
    };

    // ── 3. Lerp opacity & apply to every mesh in each group ──────────────────
    const groups = Array.from(new Set(walls.map((m) => m.userData.wallGroup as string)));

    groups.forEach((group) => {
      const target = shouldGhost[group] ? GHOST_OPACITY : 1.0;
      const prev   = opacities.current[group] ?? 1.0;
      const next   = prev + (target - prev) * LERP_SPEED;
      opacities.current[group] = next;

      const isTransparent = next < 0.99;

      walls
        .filter((m) => m.userData.wallGroup === group)
        .forEach((mesh) => {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          // needsUpdate required when toggling transparent on/off (shader recompile)
          if (mat.transparent !== isTransparent) {
            mat.transparent = isTransparent;
            mat.needsUpdate = true;
          }
          mat.opacity    = next;
          // Disable depth writes while ghost so interior objects aren't z-culled
          mat.depthWrite = !isTransparent;
        });
    });
  });

  return null;
};

export default WallGhostController;
