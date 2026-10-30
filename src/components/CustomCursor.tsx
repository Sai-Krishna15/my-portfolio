import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch fine pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, [role='button'], [data-cursor='hover'], .interactive-hover"
        )
      ) {
        setIsHovered(true);
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, [role='button'], [data-cursor='hover'], .interactive-hover"
        )
      ) {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mouseout", handlePointerOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/50 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 54 : 32,
          height: isHovered ? 54 : 32,
          backgroundColor: isHovered
            ? "rgba(56, 189, 248, 0.12)"
            : "rgba(56, 189, 248, 0.03)",
          borderColor: isHovered
            ? "rgba(192, 132, 252, 0.8)"
            : "rgba(56, 189, 248, 0.4)",
          boxShadow: isHovered
            ? "0 0 20px rgba(192, 132, 252, 0.4)"
            : "0 0 10px rgba(56, 189, 248, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-300 rounded-full pointer-events-none shadow-[0_0_8px_#38bdf8]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />
    </div>
  );
}
