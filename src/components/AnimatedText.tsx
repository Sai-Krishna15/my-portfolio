import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}

export function AnimatedHeading({
  children,
  className = "",
  highlightWords = [],
  highlightColor = "text-sky-400",
}: AnimatedHeadingProps) {
  const words = children.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`font-display font-bold tracking-tight ${className}`}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${
              isHighlight ? highlightColor : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}

const ROLES = [
  "Full-Stack Software Engineer",
  "Knowledge Graph & DevAtlas Architect",
  "React.js & Node.js Specialist",
  "Real-Time Socket.IO & Distributed Systems",
  "SQL Query Optimization & Database Engineer",
];

export function TypewriterRole() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[currentRoleIndex];

    if (!isDeleting && displayText === fullText) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText === "") {
      const pauseBeforeNext = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 300);
      return () => clearTimeout(pauseBeforeNext);
    }

    const speed = isDeleting ? 28 : 55;
    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-300 font-medium min-h-[26px]">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
      <span className="text-sky-300 font-semibold">{displayText}</span>
      <span className="w-[2px] h-4 bg-sky-400 inline-block animate-pulse" />
    </div>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
