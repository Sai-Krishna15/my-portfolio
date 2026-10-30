import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import {
  FiExternalLink,
  FiShare2,
  FiZap,
  FiDatabase,
  FiCheck,
} from "react-icons/fi";

const TABS = [
  { id: "traversal", label: "Graph Traversal", icon: FiShare2 },
  { id: "metrics", label: "Performance", icon: FiZap },
  { id: "schema", label: "Entities", icon: FiDatabase },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function HeroDevAtlasCard() {
  const [activeTab, setActiveTab] = useState<TabId>("traversal");
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Auto-switch tabs every 3 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TABS.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex].id;
      });
      setProgressKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setProgressKey((k) => k + 1);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-lg mx-auto rounded-2xl glass-panel border border-white/10 bg-slate-900/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 hover:border-sky-500/30"
    >
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
          <span className="ml-2 font-mono text-[11px] text-slate-400">
            devatlas-knowledge-graph
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Render · Live</span>
        </div>
      </div>

      {/* Tabs with Smooth 3s Progress Indicator */}
      <div className="flex items-center gap-1 px-2.5 sm:px-3 pt-2 bg-slate-950/40 border-b border-white/5 text-xs font-mono">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 relative flex items-center justify-center gap-1.5 px-2 py-2 transition-all cursor-pointer rounded-t-lg text-[11px] sm:text-xs whitespace-nowrap ${
                isActive
                  ? "text-sky-300 bg-white/[0.04]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon size={12} className={isActive ? "text-sky-400" : "text-slate-400"} />
              <span>{tab.label}</span>

              {/* Active Tab Bottom Indicator & 3-Second Progress Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500/30 overflow-hidden">
                  {!isPaused && (
                    <motion.div
                      key={progressKey}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-full bg-sky-400"
                    />
                  )}
                  {isPaused && <div className="h-full w-full bg-sky-400" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area with Fixed Dimension Frame (Zero Screen Jumping on Tab Switches) */}
      <div className="relative w-full h-[265px] sm:h-[260px] overflow-hidden text-left">
        <AnimatePresence initial={false}>
          {activeTab === "traversal" && (
            <motion.div
              key="traversal"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-3.5 sm:inset-4 flex flex-col justify-between"
            >
              <div className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center justify-between pb-0.5">
                <span>Multi-Hop Traversal:</span>
                <span className="text-[10px] text-sky-400 font-mono">Auto-cycling</span>
              </div>

              {/* Step 1 */}
              <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-white font-medium">Developer Node</span>
                  <span className="text-slate-500">→</span>
                  <span className="text-sky-300 truncate">Sai Krishna</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0 ml-1">#1</span>
              </div>

              {/* Relationship edge 1 */}
              <div className="pl-4 sm:pl-5 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 sm:gap-2">
                <span className="text-sky-400">└──</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[10px]">
                  [ARCHITECTED_BY]
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">zero joins</span>
              </div>

              {/* Step 2 */}
              <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-white font-medium">Platform Node</span>
                  <span className="text-slate-500">→</span>
                  <span className="text-indigo-300 truncate">DevAtlas Engine</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0 ml-1">#2</span>
              </div>

              {/* Relationship edge 2 */}
              <div className="pl-4 sm:pl-5 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 sm:gap-2">
                <span className="text-indigo-400">└──</span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px]">
                  [TRAVERSES_TO]
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">shortest path</span>
              </div>

              {/* Step 3 */}
              <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-white font-medium">Tech Ecosystem</span>
                  <span className="text-slate-500">→</span>
                  <span className="text-emerald-300 truncate">React · Node · Redis</span>
                </div>
                <span className="text-[10px] text-emerald-400 shrink-0 ml-1">O(1)</span>
              </div>
            </motion.div>
          )}

          {activeTab === "metrics" && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-3.5 sm:inset-4 flex flex-col justify-between"
            >
              <div className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center justify-between pb-0.5">
                <span>Production Metrics:</span>
                <span className="text-[10px] text-emerald-400 font-mono">Live Benchmarks</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Join Reduction
                  </span>
                  <span className="text-base sm:text-lg font-display font-bold text-white">
                    100%
                  </span>
                  <span className="text-[10px] font-mono text-sky-400 block truncate">
                    Native pointers
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Query Speedup
                  </span>
                  <span className="text-base sm:text-lg font-display font-bold text-white">
                    50-60%
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 block truncate">
                    Index & cache
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Active Users
                  </span>
                  <span className="text-base sm:text-lg font-display font-bold text-white">
                    5,000+
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">
                    Real-time feeds
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-slate-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Sync Cron
                  </span>
                  <span className="text-base sm:text-lg font-display font-bold text-white">
                    5 min
                  </span>
                  <span className="text-[10px] font-mono text-sky-400 block truncate">
                    10+ sources
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "schema" && (
            <motion.div
              key="schema"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-3.5 sm:inset-4 flex flex-col justify-between"
            >
              <div className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center justify-between pb-0.5">
                <span>Modeled Graph Entities:</span>
                <span className="text-[10px] text-sky-400 font-mono">Normalized Nodes</span>
              </div>

              {[
                { entity: "Developers", desc: "Commits, expertise & paths" },
                { entity: "Technologies", desc: "Adoption & dependency stats" },
                { entity: "Repositories", desc: "Architecture & ownership" },
                { entity: "Organizations", desc: "Cross-functional clusters" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-2 sm:p-2.5 rounded-lg bg-slate-950/70 border border-white/5 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <FiCheck className="text-sky-400 text-xs shrink-0" />
                    <span className="text-white font-medium">{item.entity}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate ml-2">{item.desc}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Launch Bar */}
      <div className="px-5 py-3 border-t border-white/10 bg-slate-950 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 truncate max-w-[240px]">
          knowledge-graph-1-892j.onrender.com
        </span>

        <a
          href={personalInfo.devAtlasLive}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[11px] font-mono transition-colors"
        >
          <span>Launch Live</span>
          <FiExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}
