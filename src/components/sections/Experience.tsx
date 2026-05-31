import { motion } from "motion/react";
import { Calendar, Award, CheckCircle } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Experience() {
  const experiences = resumeData.internships;

  return (
    <section id="experience" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8 bg-slate-950/20">
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Work <span className="font-bold text-glow-purple text-brand-purple">Experience</span>
          </h2>
          <div className="w-12 h-1 bg-brand-purple rounded-full mt-2" />
        </div>

        {/* Timeline Structure */}
        <div className="relative max-w-4xl mr-auto pl-6 sm:pl-8 border-l border-white/10 space-y-12 py-4">
          
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Orb Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#030712] border border-brand-purple flex items-center justify-center text-brand-purple group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white group-hover:shadow-[0_0_15px_#a855f7] transition-all duration-300">
                <Award size={12} className="sm:size-14" />
              </div>

              {/* Card wrapper with interactive colorful animated border highlight */}
              <motion.div
                animate={{
                  borderColor: [
                    "rgba(168, 85, 247, 0.15)",
                    "rgba(6, 182, 212, 0.55)",
                    "rgba(168, 85, 247, 0.75)",
                    "rgba(168, 85, 247, 0.15)"
                  ],
                  boxShadow: [
                    "0 0 0px rgba(168, 85, 247, 0)",
                    "0 0 15px rgba(6, 182, 212, 0.2)",
                    "0 0 25px rgba(168, 85, 247, 0.35)",
                    "0 0 0px rgba(168, 85, 247, 0)"
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  filter: "brightness(1.1)"
                }}
                className="glass-pane border rounded-2xl p-6 sm:p-8 transition-all duration-300 space-y-4"
              >
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div>
                    <span className="font-mono text-xs text-brand-purple tracking-widest uppercase font-semibold">
                      {exp.role}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      {exp.company}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-xs font-mono text-gray-300">
                    <Calendar size={12} />
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                </div>

                {/* Sub-project banner */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-slate-950/60 border border-white/5">
                  <p className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase font-semibold">Assigned Project Theme:</p>
                  <h4 className="font-display text-sm sm:text-base font-semibold text-white mt-1">
                    {exp.projectTitle}
                  </h4>
                </div>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-mono text-gray-300 uppercase tracking-widest font-semibold">Core Responsibilities & Learning Steps:</p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {exp.achievements.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-gray-200 leading-relaxed font-normal">
                        <CheckCircle size={14} className="text-brand-purple/60 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack technologies used */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest font-semibold mr-2">Featured Tech:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-brand-purple/5 border border-brand-purple/10 font-mono text-[10px] text-brand-purple/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </motion.div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
