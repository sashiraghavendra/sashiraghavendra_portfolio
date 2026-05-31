import { motion } from "motion/react";
import { Github, ExternalLink, Server } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Projects() {
  const proj = {
    title: resumeData.projects[0].title,
    role: "Academic Full-Stack Architect",
    description: resumeData.projects[0].description,
    achievements: resumeData.projects[0].achievements,
    technologies: resumeData.projects[0].technologies,
    githubUrl: resumeData.projects[0].githubUrl,
    liveUrl: resumeData.projects[0].liveUrl
  };

  return (
    <section id="projects" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      {/* Glow highlight background */}
      <div className="absolute top-1/4 right-5 w-[250px] h-[250px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Engineering <span className="font-bold text-brand-cyan">Projects</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full mt-2" />
        </div>

        {/* Project Showcase Timeline Structure */}
        <div className="relative max-w-4xl mr-auto pl-6 sm:pl-8 border-l border-white/10 space-y-12 py-4">
          <div className="relative group">
            
            {/* Timeline Orb Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#030712] border border-brand-cyan flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-white group-hover:shadow-[0_0_15px_#06b6d4] transition-all duration-300">
              <Server size={12} className="sm:size-14" />
            </div>

            <motion.div
              animate={{
                borderColor: [
                  "rgba(6, 182, 212, 0.15)",
                  "rgba(168, 85, 247, 0.55)",
                  "rgba(6, 182, 212, 0.75)",
                  "rgba(6, 182, 212, 0.15)"
                ],
                boxShadow: [
                  "0 0 0px rgba(6, 182, 212, 0)",
                  "0 0 15px rgba(168, 85, 247, 0.25)",
                  "0 0 25px rgba(6, 182, 212, 0.45)",
                  "0 0 0px rgba(6, 182, 212, 0)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                y: -5, 
                scale: 1.01,
                filter: "brightness(1.15)"
              }}
              className="glass-pane border bg-slate-950/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300"
            >
            <div className="space-y-4">
              
              {/* Title */}
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">
                {proj.title}
              </h3>

              <p className="text-gray-200 font-normal text-sm leading-relaxed">
                {proj.description}
              </p>

              {/* Bullet Achievements from resume */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-xs font-mono text-gray-300 uppercase tracking-widest font-semibold">Core Achievements:</p>
                <ul className="space-y-2">
                  {proj.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-gray-200 font-normal leading-normal">
                      <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-brand-cyan" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {proj.technologies.map((tech, tIdx) => {
                  const getTechTheme = (name: string) => {
                    const norm = name.toLowerCase();
                    if (norm.includes("java") || norm.includes("spring")) {
                      return {
                        borderColors: ["rgba(168, 85, 247, 0.2)", "rgba(168, 85, 247, 0.9)", "rgba(59, 130, 246, 0.7)", "rgba(168, 85, 247, 0.2)"],
                        glowShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 10px rgba(168,85,247,0.4)", "0 0 0px rgba(168,85,247,0)"],
                        glowText: "text-brand-purple font-bold",
                        dotClass: "bg-brand-purple shadow-[0_0_8px_rgba(168,85,247,0.9)]"
                      };
                    } else if (norm.includes("sql") || norm.includes("db") || norm.includes("jdbc")) {
                      return {
                        borderColors: ["rgba(6, 182, 212, 0.2)", "rgba(6, 182, 212, 0.9)", "rgba(16, 185, 129, 0.7)", "rgba(6, 182, 212, 0.2)"],
                        glowShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 10px rgba(6,182,212,0.4)", "0 0 0px rgba(6,182,212,0)"],
                        glowText: "text-brand-cyan font-bold",
                        dotClass: "bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                      };
                    } else {
                      // HTML, CSS, front-end
                      return {
                        borderColors: ["rgba(244, 63, 94, 0.2)", "rgba(244, 63, 94, 0.9)", "rgba(236, 72, 153, 0.7)", "rgba(244, 63, 94, 0.2)"],
                        glowShadow: ["0 0 0px rgba(244,63,94,0)", "0 0 10px rgba(244,63,94,0.4)", "0 0 0px rgba(244,63,94,0)"],
                        glowText: "text-brand-pink font-bold",
                        dotClass: "bg-brand-pink shadow-[0_0_8px_rgba(244,63,94,0.9)]"
                      };
                    }
                  };

                  const theme = getTechTheme(tech);

                  return (
                    <motion.span
                      key={tIdx}
                      animate={{
                        borderColor: theme.borderColors,
                        boxShadow: theme.glowShadow
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: tIdx * 0.25
                      }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: "rgba(15, 23, 42, 0.7)",
                        filter: "brightness(1.2)"
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border text-[11px] font-mono text-white transition-all duration-200 cursor-pointer"
                    >
                      <span className={`w-1 h-1 rounded-full ${theme.dotClass} animate-pulse`} />
                      <span className={theme.glowText}>{tech}</span>
                    </motion.span>
                  );
                })}
              </div>
            </div>

            {/* Git actions / footer container */}
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium tracking-widest text-gray-300 uppercase flex items-center gap-1">
                <Server size={10} />
                {proj.role}
              </span>

              <div className="flex items-center gap-3">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:border-brand-cyan transition-all duration-200 clickable"
                    title="View GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:border-brand-purple transition-all duration-200 clickable"
                    title="Open Live Deployment"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
