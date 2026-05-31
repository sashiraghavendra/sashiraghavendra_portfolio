import Header from "./components/Header";
import ParticleBackground from "./components/ParticleBackground";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import { ArrowUp, Heart } from "lucide-react";
import { resumeData } from "./data/resume";

export default function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 3D Constellation Mesh Background */}
      <ParticleBackground />

      {/* Cybernetic Preloader */}
      <LoadingScreen />

      {/* Navigation Headers */}
      <Header />

      {/* Main Single-Page Dynamic Workspace Container */}
      <main id="main-content" className="relative z-10">
        
        {/* Intro */}
        <Hero />

        {/* Identity Profile (01) */}
        <About />

        {/* Capabilities Mesh (02) */}
        <Skills />

        {/* Selected Works (03) */}
        <Projects />

        {/* Industry Path (04) */}
        <Experience />

        {/* Academic Profile (05) */}
        <Education />

        {/* Credentials & Certifications (06) */}
        <Certifications />

        {/* Gateway Contact Form (07) */}
        <Contact />

      </main>

      {/* Styled Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030712]/90 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <p className="font-display font-medium text-sm text-gray-200">
               Desha Sashi Raghavendra Kumar Portfolio
            </p>
            <p className="text-xs text-gray-300 font-mono tracking-widest uppercase font-semibold">
              B.Tech Software Developer
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick jump up button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-900 border border-white/10 text-gray-200 hover:text-brand-cyan hover:border-brand-cyan transition-all duration-300 shadow-lg cursor-pointer clickable"
              title="Return to top level"
            >
              <ArrowUp size={14} className="animate-pulse" />
            </button>
          </div>

        </div>
      </footer>
    </>
  );
}
