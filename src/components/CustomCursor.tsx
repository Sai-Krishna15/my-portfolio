import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const outlineX = useMotionValue(-100);
  const outlineY = useMotionValue(-100);

  const cursorSpring = { stiffness: 400, damping: 40, mass: 0.8 };
  const outlineSpring = { stiffness: 120, damping: 18, mass: 1.2 };

  const cursorXSpring = useSpring(cursorX, cursorSpring);
  const cursorYSpring = useSpring(cursorY, cursorSpring);
  const outlineXSpring = useSpring(outlineX, outlineSpring);
  const outlineYSpring = useSpring(outlineY, outlineSpring);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerState = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;
      setEnabled(matches);
    };

    updatePointerState();
    mediaQuery.addEventListener("change", updatePointerState);
    return () => {
      mediaQuery.removeEventListener("change", updatePointerState);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove(
        "custom-cursor-ready",
        "cursor-active",
        "cursor-hover",
        "cursor-pressed"
      );
      return;
    }

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      outlineX.set(event.clientX);
      outlineY.set(event.clientY);
    };

    const handleEnter = () => document.body.classList.add("cursor-active");
    const handleLeave = () => document.body.classList.remove("cursor-active");

    const handlePointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const interactiveSelector = "a, button, .btn, [data-cursor='hover']";
      const isInteractive = !!event.target.closest(interactiveSelector);
      document.body.classList.toggle("cursor-hover", isInteractive);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const interactiveSelector = "a, button, .btn, [data-cursor='hover']";
      if (event.target.closest(interactiveSelector)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    const handleMouseDown = () => document.body.classList.add("cursor-pressed");
    const handleMouseUp = () =>
      document.body.classList.remove("cursor-pressed");

    document.body.classList.add("custom-cursor-ready");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.classList.remove(
        "custom-cursor-ready",
        "cursor-active",
        "cursor-hover",
        "cursor-pressed"
      );
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, enabled, outlineX, outlineY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
        transition={{ type: "spring" }}
      />
      <motion.div
        className="cursor-outline"
        style={{ translateX: outlineXSpring, translateY: outlineYSpring }}
        transition={{ type: "spring" }}
      />
    </>
  );
}
