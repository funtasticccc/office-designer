"use client";

import { Suspense, useMemo, ReactNode } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface WorkspaceModelProps {
  modelPath: string;
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  autoAnchorBottom?: boolean;
  fallback?: ReactNode;
}

const GLBModel = ({
  modelPath,
  position,
  scale,
  rotation,
  autoAnchorBottom,
}: Omit<WorkspaceModelProps, "fallback">) => {
  const { scene } = useGLTF(modelPath);
  
  const { clone, bottom } = useMemo(() => {
    const cloned = scene.clone();
    if (!autoAnchorBottom) {
      return { clone: cloned, bottom: 0 };
    }
    const box = new THREE.Box3().setFromObject(cloned);
    const minY = isFinite(box.min.y) ? box.min.y : 0;
    return { clone: cloned, bottom: minY };
  }, [scene, autoAnchorBottom]);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <primitive
        object={clone}
        position={[0, -bottom, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
};

// Simple Error Boundary for Three.js components
import React, { Component, ErrorInfo } from "react";

class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Model load error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const WorkspaceModel = ({
  modelPath,
  position,
  scale,
  rotation,
  autoAnchorBottom,
  fallback,
}: WorkspaceModelProps) => {
  return (
    <ThreeErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || null}>
        <GLBModel
          modelPath={modelPath}
          position={position}
          scale={scale}
          rotation={rotation}
          autoAnchorBottom={autoAnchorBottom}
        />
      </Suspense>
    </ThreeErrorBoundary>
  );
};

export default WorkspaceModel;

