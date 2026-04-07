"use client";

interface FallbackModelProps {
  type: "desk" | "chair" | "monitor" | "accessory";
  position: [number, number, number];
  rotation?: [number, number, number];
}

const FallbackModel = ({ type, position, rotation = [0, 0, 0] }: FallbackModelProps) => {
  switch (type) {
    case "desk":
      return (
        <group position={position} rotation={rotation}>
          {/* Desktop surface - slightly beveled look with two layers */}
          <mesh position={[0, 1.02, 0]} castShadow>
            <boxGeometry args={[1.6, 0.06, 0.8]} />
            <meshStandardMaterial color="#E6B38A" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.98, 0]}>
            <boxGeometry args={[1.62, 0.02, 0.82]} />
            <meshStandardMaterial color="#C6936A" />
          </mesh>

          {/* Left leg - modern T-style */}
          <group position={[-0.65, 0, 0]}>
            <mesh position={[0, 0.48, 0]} castShadow>
              <boxGeometry args={[0.08, 0.96, 0.05]} />
              <meshStandardMaterial color="#333" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[0.12, 0.04, 0.6]} />
              <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
            </mesh>
          </group>

          {/* Right leg - modern T-style */}
          <group position={[0.65, 0, 0]}>
            <mesh position={[0, 0.48, 0]} castShadow>
              <boxGeometry args={[0.08, 0.96, 0.05]} />
              <meshStandardMaterial color="#333" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[0.12, 0.04, 0.6]} />
              <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
            </mesh>
          </group>

          {/* Cable management tray / Under-desk bar */}
          <mesh position={[0, 0.9, -0.2]}>
            <boxGeometry args={[1.2, 0.04, 0.1]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        </group>
      );

    case "chair":
      return (
        <group position={position} rotation={rotation}>
          {/* Seat - contoured look */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[0.48, 0.08, 0.48]} />
            <meshStandardMaterial color="#222" roughness={0.8} />
          </mesh>

          {/* Backrest - mesh look */}
          <group position={[0, 0.95, -0.25]} rotation={[-0.1, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.45, 0.7, 0.04]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
            </mesh>
            {/* Header / Lumbar detail */}
            <mesh position={[0, 0.4, 0.02]}>
              <boxGeometry args={[0.3, 0.15, 0.05]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>

          {/* Armrests */}
          {[-0.28, 0.28].map((x, i) => (
            <group key={i} position={[x, 0.7, 0]}>
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.03, 0.2, 0.03]} />
                <meshStandardMaterial color="#444" metalness={0.5} />
              </mesh>
              <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[0.08, 0.03, 0.25]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
              </mesh>
            </group>
          ))}

          {/* Support Cylinder */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
            <meshStandardMaterial color="#666" metalness={0.8} />
          </mesh>

          {/* 5-Star Base */}
          <group position={[0, 0.05, 0]}>
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
                <mesh position={[0.15, 0, 0]}>
                  <boxGeometry args={[0.3, 0.03, 0.06]} />
                  <meshStandardMaterial color="#333" metalness={0.5} />
                </mesh>
                <mesh position={[0.3, -0.02, 0]}>
                  <sphereGeometry args={[0.03, 8, 8]} />
                  <meshStandardMaterial color="#111" />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      );

    case "monitor":
      return (
        <group position={position} rotation={rotation}>
          {/* Bezel / Cabinet */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.6, 0.36, 0.04]} />
            <meshStandardMaterial color="#111" roughness={0.4} />
          </mesh>

          {/* Screen area (glowing a bit) */}
          <mesh position={[0, 0.18, 0.021]}>
            <planeGeometry args={[0.56, 0.32]} />
            <meshStandardMaterial
              color="#2a3a4a"
              emissive="#1a2a3a"
              emissiveIntensity={0.2}
              roughness={0.1}
            />
          </mesh>

          {/* Stand Neck */}
          <mesh position={[0, -0.05, -0.03]}>
            <boxGeometry args={[0.06, 0.25, 0.04]} />
            <meshStandardMaterial color="#444" metalness={0.6} />
          </mesh>

          {/* Stand Base */}
          <mesh position={[0, -0.15, 0.05]}>
            <boxGeometry args={[0.25, 0.02, 0.2]} />
            <meshStandardMaterial color="#333" metalness={0.5} />
          </mesh>
        </group>
      );

    case "accessory":
      return (
        <group position={position} rotation={rotation}>
          {/* Simple generic box placeholder */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#ccc" />
          </mesh>
        </group>
      );


    default:
      return null;
  }
};

export default FallbackModel;
