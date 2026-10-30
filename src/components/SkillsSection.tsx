import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsCategories, type SkillCategory } from "../data/portfolioData";
import { AnimatedHeading, ScrollReveal } from "./AnimatedText";
import { SectionParallaxWatermark } from "./SectionParallaxWatermark";
import {
  FiLayers,
  FiServer,
  FiSmartphone,
  FiCloud,
  FiCheckCircle,
  FiShare2,
  FiZap,
} from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiSocketdotio,
  SiPython,
  SiExpo,
  SiOpenai,
  SiAmazonwebservices,
  SiGit,
  SiPostman,
  SiJira,
} from "react-icons/si";

// Map skill IDs to icons
const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  "react-query": SiReact,
  redux: SiRedux,
  "html-css": SiHtml5,
  shadcn: SiReact,
  node: SiNodedotjs,
  express: SiExpress,
  postgres: SiPostgresql,
  redis: SiRedis,
  "socket-io": SiSocketdotio,
  typeorm: SiPostgresql,
  "rest-apis": FiServer,
  "graph-db": FiShare2,
  "react-native": SiReact,
  expo: SiExpo,
  openai: SiOpenai,
  python: SiPython,
  render: FiCloud,
  aws: SiAmazonwebservices,
  git: SiGit,
  postman: SiPostman,
  jira: SiJira,
};

export function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory: SkillCategory = skillsCategories[activeCategoryIndex];
  const [selectedSkillId, setSelectedSkillId] = useState<string>(activeCategory.skills[0].id);

  // Measure radar container for responsive orbital radius
  const radarRef = useRef<HTMLDivElement>(null);
  const [radarWidth, setRadarWidth] = useState(480);

  useEffect(() => {
    if (!radarRef.current) return;
    const updateSize = () => {
      if (radarRef.current) {
        setRadarWidth(radarRef.current.clientWidth || 360);
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(radarRef.current);
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Compute adaptive orbital radius so nodes never overflow on mobile
  const radius = Math.max(70, Math.min(radarWidth / 2 - 55, 140));

  // Find currently selected skill
  const currentSkill =
    activeCategory.skills.find((s) => s.id === selectedSkillId) ||
    activeCategory.skills[0];

  const categoryIcons = [FiLayers, FiServer, FiSmartphone, FiCloud];

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Background Parallax Outline Typography */}
      <SectionParallaxWatermark
        text="SKILLS"
        tag="CAPABILITIES & STACK"
        direction="right-to-left"
        topOffset="top-4 sm:top-8"
      />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 max-w-2xl mx-auto px-4">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/70 text-slate-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Technology Radar
          </div>
        </ScrollReveal>

        <AnimatedHeading
          className="text-3xl sm:text-4xl text-white mb-2"
          highlightWords={["Skill", "Ecosystem"]}
          highlightColor="text-sky-400"
        >
          Engineering Skill Ecosystem
        </AnimatedHeading>

        <ScrollReveal delay={0.15}>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Production competencies across frontend architectures, real-time messaging, database query tuning, and knowledge graphs.
          </p>
        </ScrollReveal>
      </div>

      {/* Domain Navigation Tabs: 100% Fluid Responsive Floating Pills (Wraps gracefully on mobile, single centered row on desktop) */}
      <div
        role="tablist"
        aria-label="Skill Categories"
        className="flex flex-wrap items-center overflow-x-auto justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto mt-6 mb-8 sm:mb-10 px-3"
      >
        {skillsCategories.map((cat, idx) => {
          const Icon = categoryIcons[idx] || FiLayers;
          const isActive = activeCategoryIndex === idx;
          return (
            <button
              key={cat.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveCategoryIndex(idx);
                setSelectedSkillId(cat.skills[0].id);
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border border-solid ${
                isActive
                  ? "border-[#2a63e4] bg-[#0b3a99] text-white shadow-[0_0_15px_rgba(42,99,228,0.35)]"
                  : "border-[#1b2a4a] bg-slate-950/80 text-slate-300 hover:border-[#2a63e4] hover:text-white"
              }`}
            >
              <Icon size={14} className={isActive ? "text-sky-300 shrink-0" : "text-slate-400 shrink-0"} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Dual Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Spatial Technology Orbit (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div
            ref={radarRef}
            className="relative w-full aspect-square max-w-[440px] mx-auto rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-4 sm:p-6 flex items-center justify-center overflow-hidden"
          >
            {/* Concentric Orbital Rings */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[86%] h-[86%] rounded-full border border-white/[0.04]" />
              <div className="w-[62%] h-[62%] rounded-full border border-white/[0.05]" />
              <div className="w-[38%] h-[38%] rounded-full border border-white/[0.06]" />
            </div>

            {/* Center Core: Active Category Emblem */}
            <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl glass-panel border border-sky-500/30 flex flex-col items-center justify-center text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping mb-1" />
              <span className="text-[9px] font-mono text-sky-300 uppercase font-semibold">
                ACTIVE
              </span>
              <span className="text-[8px] font-mono text-slate-400 leading-tight">
                {activeCategory.title.split(" ")[0]}
              </span>
            </div>

            {/* Orbiting Technology Nodes with Responsive Radius */}
            {activeCategory.skills.map((skill, index) => {
              const count = activeCategory.skills.length;
              const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = skill.id === currentSkill.id;
              const Icon = skillIcons[skill.id] || FiZap;

              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  className="absolute left-1/2 top-1/2 z-20 cursor-pointer group"
                >
                  <div
                    className={`relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center justify-center ${
                      isSelected
                        ? "bg-slate-900 border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-110"
                        : "bg-slate-950/85 border border-white/10 hover:border-sky-400/50 hover:scale-105"
                    }`}
                  >
                    <Icon
                      className={`text-lg transition-colors ${
                        isSelected
                          ? "text-sky-300"
                          : "text-slate-400 group-hover:text-sky-300"
                      }`}
                    />
                  </div>

                  {/* Skill Label Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-center whitespace-nowrap pointer-events-none">
                    <span
                      className={`text-[9px] sm:text-[11px] font-mono block transition-colors ${
                        isSelected
                          ? "text-white font-semibold"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-2.5 text-[11px] font-mono text-slate-500">
            [Click any node to inspect implementation telemetry]
          </div>
        </div>

        {/* Right Column: Deep Specimen Architecture Telemetry Card (5 cols) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl relative overflow-hidden"
            >
              {/* Header: Skill Name, Brand Icon & Mastery Score */}
              <div className="flex items-start justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                    {(() => {
                      const Icon = skillIcons[currentSkill.id] || FiZap;
                      return <Icon className="text-xl" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                      {currentSkill.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {activeCategory.title}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-display font-bold text-white block">
                    {currentSkill.proficiencyScore}%
                  </span>
                  <span className="text-[10px] font-mono text-sky-400 uppercase">
                    {currentSkill.level}
                  </span>
                </div>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentSkill.proficiencyScore}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-sky-400 rounded-full"
                />
              </div>

              {/* Engineering Scope & Practical Note */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Architecture Scope:
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  {currentSkill.note}
                </p>
              </div>

              {/* Production Provenance: Platforms Shipped With This Tech */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Shipped in Platforms:
                </span>
                <div className="space-y-1">
                  {currentSkill.usedIn.map((platform, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-mono text-slate-300"
                    >
                      <FiCheckCircle className="text-sky-400 shrink-0" size={12} />
                      <span>{platform}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Companion Tech Connections */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                  Interconnected With:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentSkill.connections.map((conn) => (
                    <span
                      key={conn}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900/80 border border-white/10 text-slate-400"
                    >
                      #{conn}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Verified Skills Ticker Tape Marquee */}
      <div className="mt-8 sm:mt-10 pt-5 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <FiShare2 className="text-sky-400" /> Technology Constellation
          </span>
          <span className="text-xs font-mono text-slate-400">
            20+ Verified Competencies
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {skillsCategories.flatMap((c) => c.skills).map((s) => {
            const Icon = skillIcons[s.id] || FiZap;
            return (
              <button
                key={s.id}
                onClick={() => {
                  const catIdx = skillsCategories.findIndex((c) =>
                    c.skills.some((sk) => sk.id === s.id)
                  );
                  if (catIdx !== -1) setActiveCategoryIndex(catIdx);
                  setSelectedSkillId(s.id);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  s.id === currentSkill.id
                    ? "bg-sky-500/20 border-sky-400 text-white"
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                }`}
              >
                <Icon className="text-sky-400 text-xs" />
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
