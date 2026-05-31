import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Education() {
  const eduList = resumeData.education;

  return (
    <section id="education" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] bg-brand-pink/5 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Education <span className="font-bold text-glow-pink text-brand-pink">Background</span>
          </h2>
          <div className="w-12 h-1 bg-brand-pink rounded-full mt-2" />
        </div>

        {/* Education Timeline/List */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Institution Card (Left Span) */}
          <div className="md:col-span-8 space-y-6">
            {eduList.map((edu, idx) => (
              <motion.div
                key={idx}
                animate={{
                  borderColor: [
                    "rgba(244, 63, 94, 0.15)",
                    "rgba(168, 85, 247, 0.55)",
                    "rgba(244, 63, 94, 0.75)",
                    "rgba(244, 63, 94, 0.15)"
                  ],
                  boxShadow: [
                    "0 0 0px rgba(244, 63, 94, 0)",
                    "0 0 15px rgba(168, 85, 247, 0.2)",
                    "0 0 25px rgba(244, 63, 94, 0.35)",
                    "0 0 0px rgba(244, 63, 94, 0)"
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.5
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  filter: "brightness(1.1)"
                }}
                className="glass-pane border rounded-2xl p-6 sm:p-8 relative overflow-hidden group transition-all duration-300"
              >
                {/* Back glowing pattern */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-brand-pink/5 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-brand-pink tracking-widest uppercase font-semibold">
                      {edu.degree}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-gray-300 font-mono tracking-wider font-semibold">
                      📍 {edu.location}, India
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-xs font-mono text-gray-300">
                    <Calendar size={12} />
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Academic Achievements / Bento Highlights (Right Span) */}
          <div className="md:col-span-4 space-y-6">
            
            {/* GPA Bento display */}
            <motion.div
              animate={{
                borderColor: [
                  "rgba(244, 63, 94, 0.15)",
                  "rgba(168, 85, 247, 0.55)",
                  "rgba(244, 63, 94, 0.75)",
                  "rgba(244, 63, 94, 0.15)"
                ],
                boxShadow: [
                  "0 0 0px rgba(244, 63, 94, 0)",
                  "0 0 15px rgba(168, 85, 247, 0.2)",
                  "0 0 25px rgba(244, 63, 94, 0.35)",
                  "0 0 0px rgba(244, 63, 94, 0)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
              whileHover={{
                y: -4,
                scale: 1.01,
                filter: "brightness(1.1)"
              }}
              className="glass-pane border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 bg-gradient-to-br from-purple-950/20 to-slate-950/20"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-brand-pink tracking-widest uppercase">Academic Standard</span>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-300 uppercase tracking-widest font-mono font-semibold">Consolidated CGPA</p>
                  <p className="text-5xl font-mono font-bold tracking-tight text-white flex items-baseline gap-1">
                    8.19 <span className="text-xs text-gray-300 font-normal">/ 10</span>
                  </p>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
