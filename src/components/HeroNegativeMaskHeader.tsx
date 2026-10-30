import { useState, useRef, useEffect } from "react";

export function HeroNegativeMaskHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 260, y: 70 });
  const [isHovered, setIsHovered] = useState(false);
  const [ambientX, setAmbientX] = useState(30);

  // Smooth ambient scanning motion when not hovered
  useEffect(() => {
    if (isHovered) return;
    let frame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      // Oscillate smoothly between 20% and 80% over 4.5 seconds
      const progress = (Math.sin(elapsed / 700) + 1) / 2;
      setAmbientX(20 + progress * 60);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const maskStyle = isHovered
    ? `radial-gradient(circle 190px at ${pos.x}px ${pos.y}px, black 35%, transparent 100%)`
    : `radial-gradient(circle 240px at ${ambientX}% 50%, black 30%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative select-none cursor-default py-1"
    >
      {/* Interactive Backlight Glow Orb behind the mask */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl blur-2xl transition-opacity duration-300 opacity-40"
        style={{
          background: isHovered
            ? `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, rgba(56, 189, 248, 0.35), rgba(129, 140, 248, 0.2), transparent 70%)`
            : `radial-gradient(circle 280px at ${ambientX}% 50%, rgba(56, 189, 248, 0.25), rgba(129, 140, 248, 0.12), transparent 70%)`,
        }}
      />

      {/* Layer 1: Base Ghosted Substrate (High contrast against the mask reveal) */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-700/80 tracking-tight leading-[1.08] break-words transition-colors duration-300">
        Transforming complex data into{" "}
        <span className="text-slate-600 font-bold">real-time systems</span> &{" "}
        <span className="text-slate-600 font-bold">knowledge graphs</span>.
      </h1>

      {/* Layer 2: True Negative Mask Reveal Layer (Luminous, brilliant text revealed strictly inside the mask spotlight) */}
      <h1
        aria-hidden="true"
        className="absolute inset-0 text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08] break-words pointer-events-none select-none transition-all"
        style={{
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        Transforming complex data into{" "}
        <span className="text-sky-400 font-extrabold drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
          real-time systems
        </span>{" "}
        &{" "}
        <span className="text-indigo-300 font-extrabold drop-shadow-[0_0_25px_rgba(129,140,248,0.6)]">
          knowledge graphs
        </span>
        .
      </h1>
    </div>
  );
}
