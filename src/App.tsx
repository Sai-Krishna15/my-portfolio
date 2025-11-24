import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Lenis from "lenis";
import { HeroCanvas } from "./components/HeroCanvas";
import SkillCircuit from "./components/SkillCircuit";
import { CustomCursor } from "./components/CustomCursor";
import { TextReveal } from "./components/TextReveal";
import { Magnetic } from "./components/Magnetic";
import "./App.css";

const skillHighlights = [
  {
    title: "Front of the stack",
    items: ["React 19 + TypeScript", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    title: "Backbone",
    items: ["Node & Express", "MongoDB · PostgreSQL", "Redis caching"],
  },
  {
    title: "Engineering craft",
    items: ["Scalable arch", "API design", "DX and tooling"],
  },
];

const experience = [
  {
    role: "Software Engineer",
    company: "reelOn Technologies · Product Team",
    period: "June 2025 — August 2025",
    summary:
      "Built a new onboarding flow for the product using React and TypeScript, and integrated it with the existing backend.",
  },
  {
    role: "Software Developer",
    company: "hyperspace Retail Labs · Product Team",
    period: "Feb 2024 — Mar 2025",
    summary:
      "Shipped realtime collaboration features and optimized rendering pipelines for complex analytics dashboards",
  },
];

const contactLinks = [
  { label: "Email", href: "mailto:saikrishna152002@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohanmanisaikrishna",
  },
  { label: "GitHub", href: "https://github.com/Sai-Krishna15" },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="page">
      <CustomCursor />
      <header className="nav">
        <Magnetic>
          <a href="#hero" className="logo-mark">
            SK
          </a>
        </Magnetic>
        <nav className="nav-links">
          <Magnetic>
            <a href="#about">About</a>
          </Magnetic>
          <Magnetic>
            <a href="#skills">Skills</a>
          </Magnetic>
          <Magnetic>
            <a href="#experience">Experience</a>
          </Magnetic>
          <Magnetic>
            <a href="#contact">Contact</a>
          </Magnetic>
        </nav>
        <Magnetic>
          <a className="nav-cta" href="#contact">
            Let’s talk
          </a>
        </Magnetic>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-copy">
            <motion.span
              className="hero-tag"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Software Engineer · MERN Specialist
            </motion.span>

            <div className="overflow-hidden">
              <TextReveal className="hero-heading" delay={0.3}>
                Sai Krishna builds immersive product experiences.
              </TextReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p className="hero-subtext">
                Crafting performant interfaces and human-centric journeys for
                modern web platforms. 3D experiments, delightful details, and
                measurable impact — all in one portfolio.
              </p>
            </motion.div>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Magnetic>
                <a href="#experience" className="btn btn-primary">
                  View experience
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  Collaborate
                </a>
              </Magnetic>
            </motion.div>
          </div>
          <HeroCanvas />
        </section>

        <motion.section
          id="about"
          className="section about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-label">About</div>
          <div className="section-content">
            <TextReveal className="section-heading" delay={0.1}>
              A quick snapshot.
            </TextReveal>
            <p>
              Sai Krishna is a software engineer with 1.5 years of
              product-focused experience. From crafting elegant UI flows to
              orchestrating robust service integrations, every build leans into
              clarity, scalability, and momentum. This space holds room for your
              story — drop in the wins, the learnings, the spark that drives
              your craft.
            </p>
            <p>
              Swap this copy with your own origin story, design philosophy, or
              mission statement. Keep it sharp, honest, and geared toward the
              opportunities you want to attract.
            </p>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="section skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-label">Skills</div>
          <div className="">
            <div className="skills-grid">
              {skillHighlights.map((skillGroup) => (
                <div
                  key={skillGroup.title}
                  className="skill-card"
                  data-cursor="hover"
                >
                  <span className="skill-pill">{skillGroup.title}</span>
                  <ul>
                    {skillGroup.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <SkillCircuit />
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="section experience"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-label">Experience</div>
          <div className="timeline">
            {experience.map((item) => (
              <article key={item.company} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-meta">
                  <h3>{item.role}</h3>
                  <span>{item.company}</span>
                  <time>{item.period}</time>
                </div>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="section contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-label">Contact</div>
          <div className="contact-card">
            <TextReveal className="section-heading" delay={0.1}>
              Let’s build what’s next.
            </TextReveal>
            <p>
              Drop your preferred links and call-to-action here. Whether it’s a
              collaboration, new role, or simply a hello — make it easy to reach
              out.
            </p>
            <div className="contact-links">
              {contactLinks.map((link) => (
                <Magnetic key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} Sai Krishna · Crafted with curiosity.
        </span>
        <Magnetic>
          <a href="#hero">Back to top</a>
        </Magnetic>
      </footer>
    </div>
  );
}

export default App;
