import { Magnetic } from "./Magnetic";
import { personalInfo } from "../data/portfolioData";
import { getMailtoUrl, openMailbox } from "../utils/mailHelper";
import {
  FiArrowUp,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUpRight,
  FiShare2,
} from "react-icons/fi";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      handle: "in/mohanmanisaikrishna",
      url: personalInfo.linkedin,
      icon: FiLinkedin,
      accent: "hover:border-[#0A66C2]/60 hover:shadow-[0_0_25px_rgba(10,102,194,0.35)]",
      badgeColor: "bg-[#0A66C2]/15 text-[#38bdf8] border-[#0A66C2]/30",
      iconColor: "text-[#38bdf8]",
    },
    {
      name: "GitHub",
      handle: "@Sai-Krishna15",
      url: personalInfo.github,
      icon: FiGithub,
      accent: "hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(192,132,252,0.35)]",
      badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      name: "Direct Email",
      handle: personalInfo.email,
      url: getMailtoUrl(personalInfo.email),
      isEmail: true,
      icon: FiMail,
      accent: "hover:border-sky-400/60 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]",
      badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      iconColor: "text-sky-400",
    },
  ];

  return (
    <footer className="relative pt-16 pb-12 px-4 sm:px-8 border-t border-white/10 bg-[#030712]/95 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Header: Status & Availability */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                Software Engineering & Architecture
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Let’s Connect & Collaborate
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Reach out directly via LinkedIn, GitHub, or email. Open to high-impact engineering teams worldwide.
            </p>
          </div>

          <a
            href={personalInfo.devAtlasLive}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-sky-500/30 hover:border-sky-400 text-xs font-mono text-sky-300 hover:text-white transition-all shadow-glow shrink-0"
          >
            <FiShare2 />
            <span>Explore DevAtlas Live</span>
            <FiArrowUpRight size={13} />
          </a>
        </div>

        {/* High-End Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Magnetic key={item.name} strength={15}>
                <a
                  href={item.url}
                  target={item.url.startsWith("http") ? "_blank" : undefined}
                  rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                  onClick={(e) => {
                    if (item.isEmail) {
                      e.preventDefault();
                      openMailbox(personalInfo.email);
                    }
                  }}
                  className={`group relative p-5 rounded-2xl glass-panel border border-white/10 transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer ${item.accent}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${item.badgeColor} ${item.iconColor} transition-transform group-hover:scale-110`}>
                        <Icon size={18} />
                      </div>
                      <span className="font-display font-semibold text-sm text-white group-hover:text-sky-300 transition-colors">
                        {item.name}
                      </span>
                    </div>

                    <FiArrowUpRight className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div className="pt-2 border-t border-white/5 font-mono text-[11px] text-slate-400 group-hover:text-slate-200 truncate transition-colors">
                    {item.handle}
                  </div>
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Bottom Bar: Copyright, Degree & Smooth Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-slate-300 font-semibold">
              © {new Date().getFullYear()} {personalInfo.fullName}
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>Software Engineer · Full-Stack Systems</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>{personalInfo.location}</span>
          </div>

          <Magnetic strength={20}>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-cyan-400/50 bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all cursor-pointer shadow-sm"
            >
              <span>Back to Top</span>
              <FiArrowUp className="transition-transform group-hover:-translate-y-1" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
