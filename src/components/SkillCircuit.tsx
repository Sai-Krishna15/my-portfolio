import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  Float,
  Line,
  PerspectiveCamera,
  Text,
  useCursor,
} from "@react-three/drei";
import * as THREE from "three";
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiDocker,
  SiGit,
  SiNextdotjs,
} from "react-icons/si";
import type { IconType } from "react-icons";

// ============================================================================
// TYPES & DATA
// ============================================================================

interface SkillNode {
  id: string;
  name: string;
  Icon: IconType;
  color: string;
  position: [number, number, number];
  connections: string[]; // IDs of other nodes to connect to
}

const SKILLS: SkillNode[] = [
  {
    id: "react",
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    position: [-2, 1, 0],
    connections: ["redux", "nextjs", "tailwind", "javascript"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#ffffff",
    position: [-3, -1, 1],
    connections: ["react", "typescript"],
  },
  {
    id: "redux",
    name: "Redux",
    Icon: SiRedux,
    color: "#764ABC",
    position: [-1, 2.5, -1],
    connections: ["react"],
  },
  {
    id: "tailwind",
    name: "Tailwind",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    position: [-0.5, 0.5, 1.5],
    connections: ["react"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    position: [0, 0, 0], // Center
    connections: ["react", "node", "typescript"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    position: [1, -1.5, 0.5],
    connections: ["javascript", "nextjs", "node"],
  },
  {
    id: "node",
    name: "Node.js",
    Icon: SiNodedotjs,
    color: "#339933",
    position: [2, 1, -0.5],
    connections: ["javascript", "express", "mongo", "postgres"],
  },
  {
    id: "express",
    name: "Express",
    Icon: SiExpress,
    color: "#ffffff",
    position: [3, 2.5, 1],
    connections: ["node"],
  },
  {
    id: "mongo",
    name: "MongoDB",
    Icon: SiMongodb,
    color: "#47A248",
    position: [3.5, -0.5, -1],
    connections: ["node"],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#4169E1",
    position: [2, -2.5, -1.5],
    connections: ["node", "redis"],
  },
  {
    id: "redis",
    name: "Redis",
    Icon: SiRedis,
    color: "#DC382D",
    position: [0.5, -3, 1],
    connections: ["postgres"],
  },
  {
    id: "python",
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
    position: [-2.5, -3, -1],
    connections: [],
  },
  {
    id: "docker",
    name: "Docker",
    Icon: SiDocker,
    color: "#2496ED",
    position: [4, 0.5, 2],
    connections: ["node", "postgres"],
  },
  {
    id: "git",
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
    position: [-4, 2, -2],
    connections: [],
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const ConnectionLines = ({
  skills,
  hoveredId,
}: {
  skills: SkillNode[];
  hoveredId: string | null;
}) => {
  const lines = useMemo(() => {
    const l: React.ReactNode[] = [];
    const processed = new Set<string>();

    skills.forEach((skill) => {
      skill.connections.forEach((targetId) => {
        const target = skills.find((s) => s.id === targetId);
        if (target) {
          const key = [skill.id, target.id].sort().join("-");
          if (!processed.has(key)) {
            processed.add(key);
            const isActive =
              hoveredId === skill.id || hoveredId === target.id;

            l.push(
              <Line
                key={key}
                points={[skill.position, target.position]}
                color={isActive ? "#fff" : "#334155"}
                lineWidth={isActive ? 2 : 1}
                transparent
                opacity={isActive ? 0.6 : 0.2}
              />
            );
          }
        }
      });
    });
    return l;
  }, [skills, hoveredId]);

  return <>{lines}</>;
};

const Node = ({
  skill,
  hoveredId,
  setHoveredId,
}: {
  skill: SkillNode;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) => {
  const isHovered = hoveredId === skill.id;
  const isNeighbor =
    hoveredId &&
    (skill.connections.includes(hoveredId) ||
      SKILLS.find((s) => s.id === hoveredId)?.connections.includes(skill.id));

  const isActive = isHovered || isNeighbor;

  useCursor(isHovered);

  return (
    <group position={skill.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Icon Billboard */}
        <Billboard position={[0, 0.6, 0]}>
          <Text
            fontSize={0.3}
            color={isActive ? "#fff" : "#94a3b8"}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000"
          >
            {skill.name}
          </Text>
        </Billboard>

        {/* Node Sphere */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredId(skill.id);
          }}
          onPointerOut={() => setHoveredId(null)}
        >
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isActive ? 2 : 0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Glow Halo */}
        {isActive && (
          <mesh scale={1.5}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.15}
              depthWrite={false}
            />
          </mesh>
        )}
      </Float>
    </group>
  );
};

const Constellation = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_state, delta) => {
    // Slow rotation of the entire constellation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ConnectionLines skills={SKILLS} hoveredId={hoveredId} />
      {SKILLS.map((skill) => (
        <Node
          key={skill.id}
          skill={skill}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      ))}
    </group>
  );
};

export default function SkillCircuit() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 10, 25]} />

          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />

          <Constellation />

          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Overlay Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-sm pointer-events-none">
        Hover nodes to explore connections
      </div>
    </div>
  );
}
