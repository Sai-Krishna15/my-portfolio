import { motion } from "framer-motion";
import { experienceData } from "../data/portfolioData";
import { AnimatedHeading, ScrollReveal } from "./AnimatedText";
import { SectionParallaxWatermark } from "./SectionParallaxWatermark";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Background Parallax Outline Typography */}
      <SectionParallaxWatermark
        text="CAREER"
        tag="PROFESSIONAL TIMELINE"
        direction="right-to-left"
        topOffset="top-4 sm:top-8"
      />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-slate-900/70 text-slate-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Work Experience
          </div>
        </ScrollReveal>

        <AnimatedHeading
          className="text-3xl sm:text-4xl text-white max-w-2xl mb-2"
          highlightWords={["Engineering", "Roles"]}
          highlightColor="text-sky-400"
        >
          Professional Engineering Roles
        </AnimatedHeading>

        <ScrollReveal delay={0.15}>
          <p className="text-slate-400 max-w-xl text-xs sm:text-sm leading-relaxed">
            Demonstrated track record shipping real-time messaging, data analytics dashboards, and mobile applications in product engineering teams.
          </p>
        </ScrollReveal>
      </div>

      {/* Experience Cards Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Glowing Line */}
        <div className="absolute top-4 left-3 sm:left-4.5 bottom-4 w-0.5 bg-gradient-to-b from-sky-400 via-indigo-500 to-transparent" />

        <div className="space-y-6 sm:space-y-8">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-3 sm:left-4.5 top-2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(56,189,248,0.6)] z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-300 absolute inset-0 m-auto" />
              </div>

              {/* Content Card */}
              <div className="glass-panel p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-xl">
                {/* Header: Role, Company, Period & Location */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-3 mb-3 border-b border-white/10">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-sky-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-sky-400 font-mono mt-0.5">
                      <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                        <FiBriefcase className="text-sky-400" /> {exp.company}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <FiUsers size={12} /> {exp.team}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      <FiCalendar size={12} /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <FiMapPin size={11} className="text-indigo-400" /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {exp.summary}
                </p>

                {/* Accomplishments Bullet Points */}
                <div className="space-y-2 mb-4">
                  {exp.points.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <FiCheckCircle className="text-sky-400 shrink-0 mt-0.5" size={13} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills Footer */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/80 border border-white/10 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
