import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import { getMailtoUrl, openMailbox } from "../utils/mailHelper";
import { FiMenu, FiX, FiArrowUpRight, FiMail } from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      const scrollPos = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-slate-950/90 border-white/15 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-slate-900/70 border-white/10 backdrop-blur-md shadow-lg"
          }`}
        >
          {/* Brand Mark */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center font-display font-bold text-xs group-hover:scale-105 transition-transform">
              SK
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-semibold text-xs sm:text-sm text-white group-hover:text-sky-300 transition-colors leading-tight">
                Sai Krishna
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden xs:inline leading-none">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/10 border border-white/15 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action CTAs + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <a
              href={getMailtoUrl(personalInfo.email)}
              onClick={(e) => {
                e.preventDefault();
                openMailbox(personalInfo.email);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <FiMail className="text-sky-400" />
              <span>Email</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-display font-semibold text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
            >
              <span>Hire Me</span>
              <FiArrowUpRight size={13} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Slide-Down Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-4 rounded-2xl border border-white/15 bg-slate-950/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Menu
                </span>
                <span className="text-[11px] font-mono text-sky-400">
                  Full-Stack Software Engineer
                </span>
              </div>

              <div className="flex flex-col gap-1 py-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-sky-300 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight className="text-slate-500 text-xs" />
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <a
                  href={getMailtoUrl(personalInfo.email)}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    openMailbox(personalInfo.email);
                  }}
                  className="flex-1 py-2 rounded-xl text-center text-xs font-mono text-slate-300 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {personalInfo.email}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
