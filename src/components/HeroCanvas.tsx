import { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  PerspectiveCamera,
  Sparkles,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

const palette = {
  primary: "#38bdf8",
  accent: "#f472b6",
  neutral: "#0f172a",
};

function GlowSphere() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.4) * 0.6;
    camera.position.y = Math.cos(t * 0.6) * 0.4;
    camera.position.z = 6 + Math.sin(t * 0.25) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.3}>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <MeshDistortMaterial
          color={palette.primary}
          emissive={palette.primary}
          emissiveIntensity={1.2}
          metalness={0.3}
          roughness={0.1}
          distort={0.35}
          speed={2.5}
        />
      </mesh>
    </Float>
  );
}

function Ribbon() {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.accent),
        metalness: 0.4,
        roughness: 0.2,
      }),
    []
  );

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh position={[0, -0.6, -0.4]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.12, 32, 128]} />
        <primitive object={material} />
      </mesh>
    </Float>
  );
}

function HaloParticles() {
  const [positions] = useState(() => {
    const pts = [];
    const count = 900;
    for (let i = 0; i < count; i++) {
      const radius = 2.3 + Math.random() * 0.4;
      const angle = (i / count) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.6;
      pts.push(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3,
        y,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3
      );
    }
    return new Float32Array(pts);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={palette.primary}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <planeGeometry args={[16, 16]} />
      <meshStandardMaterial
        color="#050b1d"
        metalness={0}
        roughness={0.95}
        envMapIntensity={0.05}
      />
    </mesh>
  );
}

function SceneText() {
  return (
    <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.2}>
      <Text
        position={[0, -2.4, 0]}
        fontSize={0.32}
        color="#cbd5f5"
        letterSpacing={0.04}
        anchorX="center"
        anchorY="middle"
      >
        Sai Krishna · Portfolio
      </Text>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <div className="hero-canvas">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 6], fov: 40 }}
      >
        <color attach="background" args={[palette.neutral]} />
        <fog attach="fog" args={[palette.neutral, 10, 22]} />
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.4} />
          <spotLight
            position={[5, 6, 6]}
            angle={0.4}
            penumbra={0.8}
            intensity={1.2}
            color={palette.primary}
            castShadow
          />
          <spotLight
            position={[-6, -4, -4]}
            angle={0.5}
            penumbra={1}
            intensity={1}
            color={palette.accent}
          />

          <GlowSphere />
          <Ribbon />
          <HaloParticles />
          <Sparkles
            count={80}
            scale={[6, 4, 6]}
            size={3}
            speed={0.4}
            color="#bae6fd"
            opacity={0.5}
          />
          <Floor />
          <SceneText />
        </Suspense>
      </Canvas>
    </div>
  );
}
