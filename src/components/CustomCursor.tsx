import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -100, y: -100, active: false });
  const isHovering = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number, burst = false) => {
      const colors = isHovering.current
        ? ["#f472b6", "#c084fc", "#818cf8"] // Pink/Purple/Indigo for hover
        : ["#38bdf8", "#22d3ee", "#818cf8"]; // Cyan/Blue for normal

      const speed = burst ? 4 : 1;
      const angle = Math.random() * Math.PI * 2;

      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * speed + Math.cos(angle) * (burst ? 2 : 0),
        vy: (Math.random() - 0.5) * speed + Math.sin(angle) * (burst ? 2 : 0),
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: Math.random() * 0.5 + 0.5,
      });
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles at mouse position
      if (mouse.current.active) {
        // Create more particles when hovering for a "swarm" effect
        const count = isHovering.current ? 4 : 1;
        for (let i = 0; i < count; i++) {
          createParticle(
            mouse.current.x + (Math.random() - 0.5) * 10,
            mouse.current.y + (Math.random() - 0.5) * 10
          );
        }
      }

      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];

        p.life -= 0.02;
        p.x += p.vx;
        p.y += p.vy;

        // Physics: slight drag and gravity-like pull towards mouse if hovering
        p.vx *= 0.95;
        p.vy *= 0.95;

        if (isHovering.current && mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.vx += dx * 0.005;
            p.vy += dy * 0.005;
          }
        }

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .btn, [data-cursor='hover']")) {
        isHovering.current = true;
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .btn, [data-cursor='hover']")) {
        isHovering.current = false;
      }
    };

    const handleMouseDown = () => {
      // Burst effect
      for (let i = 0; i < 20; i++) {
        createParticle(mouse.current.x, mouse.current.y, true);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mouseout", handlePointerOut);
    window.addEventListener("mousedown", handleMouseDown);

    resize();
    update();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
