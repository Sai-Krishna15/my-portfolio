import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import { AnimatedHeading, ScrollReveal } from "./AnimatedText";
import { SectionParallaxWatermark } from "./SectionParallaxWatermark";
import {
  FiZap,
  FiLayers,
  FiCode,
  FiCpu,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

const pillars = [
  {
    icon: FiZap,
    title: "Graph & Relational Data Architecture",
    desc: "Architecting developer knowledge graphs (DevAtlas) with zero-join multi-hop traversals, and optimizing PostgreSQL queries by 50–60%.",
  },
  {
    icon: FiLayers,
    title: "Real-Time & Streaming Systems",
    desc: "Architecting low-latency WebSocket communication via Socket.IO for chat and live interactive collaboration across 5,000+ users.",
  },
  {
    icon: FiCode,
    title: "Frontend State & Performance",
    desc: "Eliminating redundant re-renders and network calls using React Query caching, normalized Redux, and Shadcn UI.",
  },
];

export function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Background Parallax Outline Typography */}
      <SectionParallaxWatermark
        text="PROFILE"
        tag="FULL-STACK ARCHITECTURE"
        direction="left-to-right"
        topOffset="top-4 sm:top-8"
      />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/70 text-slate-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Executive Profile
          </div>
        </ScrollReveal>

        <AnimatedHeading
          className="text-3xl sm:text-4xl text-white max-w-2xl leading-tight"
          highlightWords={["ownership", "measurable", "performance"]}
          highlightColor="text-sky-400"
        >
          Engineering scalable products with end-to-end ownership & measurable performance.
        </AnimatedHeading>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* Card 1: Biography / Executive Summary (2 cols on lg) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between border-white/10 relative overflow-hidden"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                <FiCode size={18} />
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white">
                Background & Philosophy
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm mb-3">
              I am a Software Engineer specialized in React.js and Node.js with hands-on experience delivering production software for developer knowledge graph exploration (DevAtlas), high-concurrency real-time messaging, multi-tenant analytics dashboards, and AI-integrated applications.
            </p>
            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              I am comfortable taking features end-to-end — from component architecture, clean state management, and responsive layouts to API design, database indexing, and query response time optimization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-white/10 text-xs font-mono text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              <FiCheckCircle className="text-sky-400" /> React.js & Node.js
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              <FiCheckCircle className="text-sky-400" /> PostgreSQL & Redis
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              <FiCheckCircle className="text-sky-400" /> Socket.IO & Real-Time
            </span>
          </div>
        </motion.div>

        {/* Card 2: Core Architecture Focus (1 col) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between border-white/10 relative group hover:border-sky-400/30 transition-colors"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 group-hover:scale-105 transition-transform">
                <FiCpu size={18} />
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                Architecture Focus
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white font-mono">Knowledge Graphs:</strong> Pointer adjacency & multi-hop traversals
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white font-mono">SQL Optimization:</strong> 50–60% execution speedup via indexes
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white font-mono">Real-Time Streams:</strong> Socket.IO & Redis sub-50ms latency
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Specialization</span>
            <span className="text-sky-400 font-semibold">Production Systems</span>
          </div>
        </motion.div>

        {/* Card 3: Location & Availability (1 col) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between border-white/10 relative"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FiMapPin size={18} />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Hyderabad, IN
              </span>
            </div>

            <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-1">
              Location & Mobility
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-2">
              {personalInfo.location}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Seeking full-time Software Engineer positions. Available for on-site, hybrid, or remote opportunities.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Work Mode:</span>
            <span className="text-emerald-400 font-medium">Full-Time</span>
          </div>
        </motion.div>

        {/* Card 4: Metrics Row (Spans full width 4 cols) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {personalInfo.metrics.map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col items-center text-center justify-center"
            >
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-1 tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-slate-300 font-semibold mb-0.5">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                {metric.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card 5: Engineering Pillars (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col gap-2.5 group"
              >
                <div className="p-2.5 w-fit rounded-xl bg-white/5 border border-white/10 text-sky-400 group-hover:border-sky-400/40 group-hover:bg-sky-500/10 transition-colors">
                  <Icon size={18} />
                </div>
                <h4 className="font-display font-semibold text-base text-white">
                  {pillar.title}
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
