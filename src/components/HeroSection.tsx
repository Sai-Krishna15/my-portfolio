import { motion } from "framer-motion";
import { HeroDevAtlasCard } from "./HeroDevAtlasCard";
import { HeroNegativeMaskHeader } from "./HeroNegativeMaskHeader";
import { TypewriterRole } from "./AnimatedText";
import { SectionParallaxWatermark } from "./SectionParallaxWatermark";
import { personalInfo } from "../data/portfolioData";
import { getMailtoUrl, openMailbox } from "../utils/mailHelper";
import {
  FiArrowDown,
  FiMail,
  FiLinkedin,
  FiMapPin,
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
} from "react-icons/si";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Parallax Outline Typography */}
      <SectionParallaxWatermark
        text="ARCHITECT"
        tag="FULL-STACK & GRAPH SYSTEMS"
        direction="left-to-right"
        topOffset="top-8 sm:top-14"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Column: Profile, Value Proposition & Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 text-left z-10">
          {/* Header Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md w-fit max-w-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-mono text-xs font-medium text-slate-200">
              Mohan Mani Sai Krishna Siginamsetty
            </span>
          </motion.div>

          {/* Hero Negative Mask Header & Subtitle */}
          <div>
            <HeroNegativeMaskHeader />
            <div className="mt-3">
              <TypewriterRole />
            </div>
          </div>

          {/* Value Proposition Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Creator of <strong className="text-white">DevAtlas</strong> (Developer Knowledge Graph Platform). Experienced in architecting SaaS analytics with 50–60% SQL query optimization, scaling Socket.IO feeds for 5,000+ active users, and designing multi-hop graph traversal systems.
          </motion.p>

          {/* Contact Details Quick Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400"
          >
            <a
              href={getMailtoUrl(personalInfo.email)}
              onClick={(e) => {
                e.preventDefault();
                openMailbox(personalInfo.email);
              }}
              className="flex items-center gap-1.5 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer group"
              title="Click to open mailbox"
            >
              <FiMail className="text-sky-400 group-hover:scale-110 transition-transform" />
              <span>{personalInfo.email}</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <FiMapPin className="text-indigo-400" /> {personalInfo.location}
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
          >
            <a
              href={personalInfo.devAtlasLive}
              target="_blank"
              rel="noreferrer"
              className="group px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-display font-semibold text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2"
            >
              Explore DevAtlas Live <FiExternalLink className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#projects"
              className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/25 bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white font-display text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Production Work</span>
              <FiArrowDown size={14} />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-white/10 hover:border-white/25 bg-slate-900/60 text-slate-300 hover:text-white transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Clean DevAtlas Architecture Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 w-full flex items-center justify-center"
        >
          <HeroDevAtlasCard />
        </motion.div>
      </div>

      {/* Verified Stack Marquee Bar */}
      <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <FiShare2 className="text-sky-400" /> Core Engineering Stack:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { name: "React.js", icon: SiReact },
            { name: "Node.js", icon: SiNodedotjs },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Redis", icon: SiRedis },
            { name: "Socket.IO", icon: SiSocketdotio },
            { name: "Tailwind CSS", icon: SiTailwindcss },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300"
              >
                <Icon className="text-sky-400 text-xs" />
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
