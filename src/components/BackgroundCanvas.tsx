import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random number generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function Particles({ count = 180 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color("#64748b"), // slate
      new THREE.Color("#38bdf8"), // sky
      new THREE.Color("#818cf8"), // indigo
    ];

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);
      const r4 = pseudoRandom(i * 3 + 4);

      pos[i * 3] = (r1 - 0.5) * 35;
      pos[i * 3 + 1] = (r2 - 0.5) * 35;
      pos[i * 3 + 2] = (r3 - 0.5) * 20;

      const c = colorChoices[Math.floor(r4 * colorChoices.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.015;
    points.current.rotation.x += delta * 0.008;

    // Smooth subtle mouse parallax
    const targetX = (state.pointer.x * 1.5 - points.current.position.x) * 0.02;
    const targetY = (state.pointer.y * 1.5 - points.current.position.y) * 0.02;
    points.current.position.x += targetX;
    points.current.position.y += targetY;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Particles count={180} />
      </Canvas>
    </div>
  );
}
