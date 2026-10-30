import { useEffect } from "react";
import Lenis from "lenis";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { KineticStackTicker } from "./components/KineticStackTicker";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
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
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Subtle Background 3D Space Atmosphere */}
      <BackgroundCanvas />

      {/* Sleek Custom Cursor for non-touch screens */}
      <CustomCursor />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 0: Hero with DevAtlas Showcase */}
        <HeroSection />

        {/* Ambient Kinetic Marquee Ticker */}
        <KineticStackTicker />

        {/* Section 1: Executive Profile & Bento Grid with Metrics */}
        <AboutSection />

        {/* Section 2: Technical Skills Deck & Matrix */}
        <SkillsSection />

        {/* Section 3: Real Production Projects */}
        <ProjectsSection />

        {/* Section 4: Professional Experience */}
        <ExperienceSection />

        {/* Section 5: Direct Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
