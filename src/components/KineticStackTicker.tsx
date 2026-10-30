import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiZap, FiShare2, FiActivity, FiServer, FiLayers } from "react-icons/fi";

const TICKER_ITEMS = [
  { text: "DEVATLAS KNOWLEDGE GRAPH", icon: FiShare2, color: "text-sky-400" },
  { text: "ZERO-JOIN MULTI-HOP TRAVERSALS", icon: FiZap, color: "text-amber-400" },
  { text: "5,000+ REAL-TIME WEBSOCKET FEEDS", icon: FiActivity, color: "text-emerald-400" },
  { text: "50–60% SQL QUERY SPEEDUP", icon: FiServer, color: "text-indigo-400" },
  { text: "REDIS IN-MEMORY ACCELERATION", icon: FiLayers, color: "text-rose-400" },
  { text: "FULL-STACK GRAPH SYSTEMS", icon: FiZap, color: "text-cyan-400" },
];

export function KineticStackTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll parallax offset adds a tactile speed boost as user scrolls past
  const xOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 overflow-hidden border-y border-white/[0.06] bg-slate-950/40 select-none my-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <motion.div
        style={{ x: xOffset }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {/* Double the list for seamless continuous strip */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <Icon className={`${item.color} text-xs`} />
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-slate-400 uppercase font-medium hover:text-white transition-colors">
                {item.text}
              </span>
              <span className="text-slate-700 text-xs">•</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
