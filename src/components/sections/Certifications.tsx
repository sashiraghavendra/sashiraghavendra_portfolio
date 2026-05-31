import { motion } from "motion/react";
import { ExternalLink, Calendar, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Certifications() {
  const certifications = resumeData.certifications;

  return (
    <section id="certifications" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8 bg-slate-950/20">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            <span className="font-bold text-glow text-brand-cyan">Certifications</span>
          </h2>
          <div className="w-12 h-1 bg-brand-cyan rounded-full mt-2" />
        </div>

        {/* Combined Layout: Credentials Grid + Key Achievements block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Certifications Cards List (Left Column) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                animate={{
                  borderColor: [
                    "rgba(6, 182, 212, 0.15)",
                    "rgba(168, 85, 247, 0.55)",
                    "rgba(6, 182, 212, 0.75)",
                    "rgba(6, 182, 212, 0.15)"
                  ],
                  boxShadow: [
                    "0 0 0px rgba(6, 182, 212, 0)",
                    "0 0 15px rgba(168, 85, 247, 0.2)",
                    "0 0 25px rgba(6, 182, 212, 0.35)",
                    "0 0 0px rgba(6, 182, 212, 0)"
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.4
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  filter: "brightness(1.1)"
                }}
                className="glass-pane border rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Badge emblem */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-gray-300 uppercase flex items-center gap-1 font-semibold">
                      <Calendar size={10} />
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white tracking-tight leading-snug">
                     {cert.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-mono font-medium">
                    Issuer: <span className="text-gray-100 font-semibold">{cert.issuer}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end">
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-brand-cyan hover:text-white transition-colors duration-200"
                    >
                      <span>Verify</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

          {/* Highlights & Outstanding Milestones Sidebar (Right Column) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bento-style Achievements Card */}
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
                  "0 0 15px rgba(168, 85, 247, 0.2)",
                  "0 0 25px rgba(6, 182, 212, 0.35)",
                  "0 0 0px rgba(6, 182, 212, 0)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
              whileHover={{
                y: -4,
                scale: 1.01,
                filter: "brightness(1.1)"
              }}
              className="glass-pane border rounded-2xl p-6 bg-gradient-to-tr from-brand-cyan/[0.03] via-slate-950/80 to-transparent flex flex-col gap-5 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                  <Trophy size={16} />
                </div>
                <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase font-semibold">Key Highlights</span>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-brand-cyan" />
                    <span className="font-mono text-[10px] text-gray-200 uppercase tracking-wider font-bold">Full Academic Honors</span>
                  </div>
                  <p className="text-xs text-gray-300 font-normal">
                    Achieved a commendable cumulative score of 8.19 CGPA over B.Tech academic cycles.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-brand-purple" />
                    <span className="font-mono text-[10px] text-gray-200 uppercase tracking-wider font-bold">Infosys Springboard 6.0</span>
                  </div>
                  <p className="text-xs text-gray-300 font-normal">
                    Completed specialized backend developments for cryptocurrency analytics with full credits.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-brand-pink" />
                    <span className="font-mono text-[10px] text-gray-200 uppercase tracking-wider font-bold">Double Platform Honors</span>
                  </div>
                  <p className="text-xs text-gray-300 font-normal">
                    Earned authorized certs from both Coursera and the IBM SkillsBuild program.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-[9px] font-mono text-gray-300 uppercase tracking-widest leading-none font-semibold">
                Academic & Industry Approved
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
