import React, { Suspense, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  Stars,
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
} from "react-icons/si";
import type { IconType } from "react-icons";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface Skill {
  id: string;
  name: string;
  description: string;
  Icon: IconType;
  color: string;
  position: [number, number, number];
  size: [number, number, number];
}

const KEY_SIZE: [number, number, number] = [1.5, 1, 1.5];

const SKILLS: Skill[] = [
  // Row 1
  {
    id: "react",
    name: "React",
    description: "UI Development",
    Icon: SiReact,
    color: "#61DAFB",
    position: [-2.55, 0, -1.7],
    size: KEY_SIZE,
  },
  {
    id: "redux",
    name: "Redux",
    description: "State Management",
    Icon: SiRedux,
    color: "#764ABC",
    position: [-0.85, 0, -1.7],
    size: KEY_SIZE,
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Core Language",
    Icon: SiJavascript,
    color: "#F7DF1E",
    position: [0.85, 0, -1.7],
    size: KEY_SIZE,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "CSS Framework",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    position: [2.55, 0, -1.7],
    size: KEY_SIZE,
  },
  // Row 2
  {
    id: "nodejs",
    name: "Node.js",
    description: "Backend Runtime",
    Icon: SiNodedotjs,
    color: "#339933",
    position: [-2.55, 0, 0],
    size: KEY_SIZE,
  },
  {
    id: "express",
    name: "Express.js",
    description: "Node.js Framework",
    Icon: SiExpress,
    color: "#ffffff",
    position: [-0.85, 0, 0],
    size: KEY_SIZE,
  },
  {
    id: "python",
    name: "Python",
    description: "Versatile Language",
    Icon: SiPython,
    color: "#4169E1",
    position: [0.85, 0, 0],
    size: KEY_SIZE,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "NoSQL Database",
    Icon: SiMongodb,
    color: "#47A248",
    position: [2.55, 0, 0],
    size: KEY_SIZE,
  },
  // Row 3 (Centered)
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "SQL Database",
    Icon: SiPostgresql,
    color: "#4169E1",
    position: [-1.7, 0, 1.7],
    size: KEY_SIZE,
  },
  {
    id: "redis",
    name: "Redis",
    description: "In-memory Cache",
    Icon: SiRedis,
    color: "#DC382D",
    position: [0, 0, 1.7],
    size: KEY_SIZE,
  },
  {
    id: "space",
    name: "And More!",
    description: "DevOps, Testing, etc.",
    Icon: SiNodedotjs,
    color: "#888888",
    position: [1.7, 0, 1.7],
    size: KEY_SIZE,
  },
];

const KEY_RADIUS = 0.08;
const KEY_SMOOTHNESS = 10;
const KEY_DEPTH = 0.5;

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const SkillPopup: React.FC<{ name: string; description: string }> = ({
  name,
  description,
}) => {
  return (
    <Billboard>
      <Html position={[0, 1.5, 0]} transform center>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg shadow-lg px-4 py-2 text-white text-center whitespace-nowrap">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-cyan-200">{description}</p>
        </div>
      </Html>
    </Billboard>
  );
};

const CursorLight = () => {
  const lightRef = useRef<THREE.PointLight>(null!);
  const planeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!lightRef.current || !planeRef.current) return;

    const intersection = state.raycaster.intersectObject(planeRef.current);
    if (intersection[0]) {
      lightRef.current.position.copy(intersection[0].point);
      lightRef.current.position.y = 0.5;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={2} distance={5} color="#06B6D4" />
      <mesh ref={planeRef} rotation-x={-Math.PI / 2} visible={false}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};

type KeyProps = ThreeElements["group"] & {
  skill: Skill;
  isActive: boolean;
};

const Key: React.FC<KeyProps> = ({ skill, isActive, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const htmlRef = useRef<HTMLDivElement>(null!);

  const { size = [1, 1, 1] } = skill;

  const keyColor = useMemo(() => {
    const color = new THREE.Color();
    if (isActive) {
      color.set(skill.color);
    } else if (isHovered) {
      color.set(skill.color);
      color.multiplyScalar(1.2);
    } else {
      color.set(skill.color);
      color.multiplyScalar(0.7);
    }
    return color;
  }, [isHovered, isActive, skill.color]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const targetY = isActive || isHovered ? 0.1 : 0;
    const targetScale = isActive || isHovered ? 1.1 : 1;

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 8
    );
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8
    );

    if (htmlRef.current) {
      const iconScale = 1 + (groupRef.current.position.y / 0.1) * 0.1;
      htmlRef.current.style.transform = `scale(${iconScale})`;
    }
  });

  return (
    <group
      {...props}
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <RoundedBox
        ref={ref}
        args={[size[0] - 0.1, KEY_DEPTH, size[2] - 0.1]}
        radius={KEY_RADIUS}
        smoothness={KEY_SMOOTHNESS}
      >
        <meshStandardMaterial
          color={keyColor}
          roughness={0.3}
          metalness={0.4}
        />
      </RoundedBox>
      <Html
        ref={htmlRef}
        position={[0, KEY_DEPTH + 0.01, 0]}
        transform
        center
        occlude
        className="pointer-events-none select-none"
      >
        <skill.Icon
          style={{
            color: isActive || isHovered ? "#fff" : skill.color,
            fontSize: `${Math.min(size[0], size[2]) * 0.5}rem`,
            transition: "color 0.2s",
          }}
        />
      </Html>
      {isActive && (
        <SkillPopup name={skill.name} description={skill.description} />
      )}
    </group>
  );
};

// ============================================================================
// KEYBOARD COMPONENT
// ============================================================================

const Keyboard: React.FC<{
  activeSkill: Skill | null;
  onKeyClick: (skill: Skill | null) => void;
}> = ({ activeSkill, onKeyClick }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const handleKeyClick = useCallback(
    (skill: Skill) => {
      onKeyClick(skill);
    },
    [onKeyClick]
  );

  // use the stable function in useMemo deps
  const skillKeys = useMemo(
    () =>
      SKILLS.map((skill) => (
        <Key
          key={skill.id}
          skill={skill}
          position={skill.position}
          isActive={activeSkill?.id === skill.id}
          onClick={() => handleKeyClick(skill)}
        />
      )),
    [activeSkill, handleKeyClick]
  );

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      {skillKeys}
    </group>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function SkillCircuit() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <div className="w-full h-[800px] bg-black text-white">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 9]} fov={60} />
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={20}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />

          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.0} />

          <Environment preset="city" />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <CursorLight />

          <Keyboard activeSkill={activeSkill} onKeyClick={setActiveSkill} />
        </Suspense>
      </Canvas>
    </div>
  );
}
