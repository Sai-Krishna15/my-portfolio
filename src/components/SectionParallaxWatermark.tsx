import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SectionParallaxWatermarkProps {
  /** The large watermark word (e.g. "PROFILE", "SKILLS", "SYSTEMS", "CAREER", "CONNECT") */
  text: string;
  /** Direction of horizontal glide during scroll */
  direction?: "left-to-right" | "right-to-left";
  /** Optional vertical offset class (e.g. top-4, top-8) */
  topOffset?: string;
  /** Optional secondary subtitle or tag */
  tag?: string;
}

export function SectionParallaxWatermark({
  text,
  direction = "left-to-right",
  topOffset = "top-4 sm:top-8",
  tag,
}: SectionParallaxWatermarkProps) {
  // Each section has its own isolated container ref that spans the full height of that section
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking is scoped strictly to this individual section's entry and exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out scroll progress with useSpring for ultra-silky fluid motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Each section starts fresh at progress=0 (when entering) and ends at progress=1 (when leaving)
  const xTransform = useTransform(
    smoothProgress,
    [0, 1],
    direction === "left-to-right" ? ["-120px", "120px"] : ["120px", "-120px"]
  );

  // Subtle opacity curve: enters softly when this section appears, peaks during center reading area, exits softly
  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.12, 0.7, 0.7, 0.12]
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
    >
      <div className={`absolute ${topOffset} left-0 right-0 w-full flex flex-col items-center justify-center`}>
        <motion.div
          style={{ x: xTransform, opacity: opacityTransform }}
          className="flex flex-col items-center justify-center whitespace-nowrap will-change-transform"
        >
          {tag && (
            <span className="text-[8px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-sky-400/40 mb-1">
              {tag}
            </span>
          )}
          <span
            className="text-5xl sm:text-6xl md:text-[9rem] lg:text-[11rem] font-black uppercase tracking-[0.1em] leading-none select-none"
            style={{
              WebkitTextStroke: "1.5px rgba(56, 189, 248, 0.15)",
              color: "transparent",
              textShadow: "0 0 50px rgba(42, 99, 228, 0.08)",
            }}
          >
            {text}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
