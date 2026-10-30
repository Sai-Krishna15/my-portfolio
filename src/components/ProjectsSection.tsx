import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, type ProjectItem } from "../data/portfolioData";
import { AnimatedHeading, ScrollReveal } from "./AnimatedText";
import { SectionParallaxWatermark } from "./SectionParallaxWatermark";
import {
  FiCheckCircle,
  FiTrendingUp,
  FiLayers,
  FiBriefcase,
  FiCalendar,
  FiExternalLink,
  FiShare2,
} from "react-icons/fi";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiSocketdotio,
  SiOpenai,
  SiPython,
  SiRedux,
  SiExpo,
} from "react-icons/si";

// Map tech names to icons
const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  "Tailwind CSS": SiTailwindcss,
  "Socket.IO": SiSocketdotio,
  "OpenAI API": SiOpenai,
  "Python": SiPython,
  "React Native": SiReact,
  "Redux": SiRedux,
  "Expo": SiExpo,
  "Shadcn UI": SiReact,
  "TypeORM": SiPostgresql,
  "React Query": SiReact,
  "Graph Database": FiShare2,
};

// 3D Tilt Project Card with Adaptive Mobile Scaling
function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 3;
    const rotY = (x / (rect.width / 2)) * 3;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.25 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.4s ease-out",
      }}
      className={`glass-panel p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between group relative ${
        project.id === "devatlas"
          ? "border-sky-400/30 bg-slate-900/70"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      <div>
        {/* Top Header: Badge, Category & Live Link */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                project.id === "devatlas" ? "bg-sky-400 animate-ping" : "bg-indigo-400"
              }`}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
              {project.category}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">
              {project.badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <FiCalendar size={12} />
            <span>{project.period}</span>
          </div>
        </div>

        {/* Title & Organization */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-sky-300 transition-colors">
            {project.title}
          </h3>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-mono transition-all w-fit shrink-0"
            >
              <span>Live Platform</span>
              <FiExternalLink size={12} />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <FiBriefcase className="text-sky-400" />
          <span>{project.organization}</span>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Use Case / Why Graph DB Banner for DevAtlas */}
        {project.useCase && (
          <div className="mb-4 p-3 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-slate-300 space-y-1">
            <div className="font-mono text-indigo-300 font-semibold flex items-center gap-1.5">
              <FiShare2 size={13} /> Architecture & Use Case:
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {project.useCase}
            </p>
          </div>
        )}

        {/* Quantifiable Impact Metrics Banner */}
        <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center gap-2.5">
          <FiTrendingUp className="text-sky-400 text-base shrink-0" />
          <span className="font-mono text-xs font-semibold text-slate-200">
            {project.metrics}
          </span>
        </div>

        {/* Key Architectural Accomplishments */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
            Engineered Highlights:
          </span>
          {project.highlights.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <FiCheckCircle className="text-sky-400 shrink-0 mt-0.5" size={13} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Pills & Action Footer */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, i) => {
            const TechIcon = techIconMap[tech] || FiLayers;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/80 border border-white/10 text-slate-300"
              >
                <TechIcon className="text-sky-400 text-xs" />
                {tech}
              </span>
            );
          })}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-200 transition-colors"
          >
            Launch on Render ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Platforms", shortLabel: "All" },
    { id: "Knowledge Graph", label: "DevAtlas (Graph)", shortLabel: "DevAtlas" },
    { id: "Full-Stack SaaS", label: "SaaS Analytics", shortLabel: "SaaS" },
    { id: "Social & Messaging", label: "Real-Time Chat", shortLabel: "Chat" },
    { id: "Mobile & Real-Time", label: "Mobile Apps", shortLabel: "Mobile" },
    { id: "AI Integration", label: "AI Integration", shortLabel: "AI" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Background Parallax Outline Typography */}
      <SectionParallaxWatermark
        text="SYSTEMS"
        tag="PRODUCTION PLATFORMS"
        direction="left-to-right"
        topOffset="top-4 sm:top-8"
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 max-w-2xl mx-auto px-4">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/70 text-slate-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Production Engineering
          </div>
        </ScrollReveal>

        <AnimatedHeading
          className="text-3xl sm:text-4xl text-white mb-2"
          highlightWords={["Production", "Systems"]}
          highlightColor="text-sky-400"
        >
          Featured Production Systems
        </AnimatedHeading>

        <ScrollReveal delay={0.15}>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            From developer knowledge graph traversals to high-concurrency SaaS analytics and real-time chat engines.
          </p>
        </ScrollReveal>
      </div>

      {/* Filter Pills: 100% Fluid Responsive Floating Pills (Wraps gracefully on mobile, single centered row on desktop) */}
      <div
        role="tablist"
        aria-label="Project Categories"
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mt-6 mb-8 sm:mb-10 px-3"
      >
        {categories.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border border-solid ${
                isActive
                  ? "border-[#2a63e4] bg-[#0b3a99] text-white shadow-[0_0_15px_rgba(42,99,228,0.35)]"
                  : "border-[#1b2a4a] bg-slate-950/80 text-slate-300 hover:border-[#2a63e4] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
