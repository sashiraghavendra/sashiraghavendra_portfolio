import { motion } from "motion/react";
import { Code2, Laptop, Sparkles } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code2 size={16} className="text-brand-cyan" />,
      glowColor: "cyan",
      skills: resumeData.skills.programmingLanguages,
      description: "Primary languages used for writing object-oriented backends, queries, and responsive structures."
    },
    {
      title: "Tools & Platforms",
      icon: <Laptop size={16} className="text-brand-pink" />,
      glowColor: "pink",
      skills: Array.from(new Set(resumeData.skills.toolsAndPlatforms)),
      description: "Development environments, API clients, and code version control environments."
    },
    {
      title: "Soft Skills & Methods",
      icon: <Sparkles size={16} className="text-brand-purple" />,
      glowColor: "purple",
      skills: resumeData.skills.softSkills,
      description: "Professional workplace soft skills that ensure smooth, reliable project collaborations."
    }
  ];

  const getCategoryTheme = (glowColor: string) => {
    switch (glowColor) {
      case "cyan":
        return {
          borderColors: [
            "rgba(6, 182, 212, 0.15)",
            "rgba(16, 185, 129, 0.5)",
            "rgba(6, 182, 212, 0.7)",
            "rgba(6, 182, 212, 0.15)"
          ],
          glowShadow: [
            "0 0 0px rgba(6, 182, 212, 0)",
            "0 0 10px rgba(16, 185, 129, 0.15)",
            "0 0 16px rgba(6, 182, 212, 0.45)",
            "0 0 0px rgba(6, 182, 212, 0)"
          ],
          dotClass: "bg-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.95)]",
          glowText: "text-brand-cyan",
          bgHover: "hover:bg-brand-cyan/10"
        };
      case "pink":
        return {
          borderColors: [
            "rgba(244, 63, 94, 0.15)",
            "rgba(168, 85, 247, 0.5)",
            "rgba(244, 63, 94, 0.7)",
            "rgba(244, 63, 94, 0.15)"
          ],
          glowShadow: [
            "0 0 0px rgba(244, 63, 94, 0)",
            "0 0 10px rgba(168, 85, 247, 0.15)",
            "0 0 16px rgba(244, 63, 94, 0.45)",
            "0 0 0px rgba(244, 63, 94, 0)"
          ],
          dotClass: "bg-brand-pink shadow-[0_0_10px_rgba(244,63,94,0.95)]",
          glowText: "text-brand-pink",
          bgHover: "hover:bg-brand-pink/10"
        };
      case "purple":
      default:
        return {
          borderColors: [
            "rgba(168, 85, 247, 0.15)",
            "rgba(59, 130, 246, 0.5)",
            "rgba(168, 85, 247, 0.7)",
            "rgba(168, 85, 247, 0.15)"
          ],
          glowShadow: [
            "0 0 0px rgba(168, 85, 247, 0)",
            "0 0 10px rgba(59, 130, 246, 0.15)",
            "0 0 16px rgba(168, 85, 247, 0.45)",
            "0 0 0px rgba(168, 85, 247, 0)"
          ],
          dotClass: "bg-brand-purple shadow-[0_0_10px_rgba(168,85,247,0.95)]",
          glowText: "text-brand-purple",
          bgHover: "hover:bg-brand-purple/10"
        };
    }
  };

  return (
    <section id="skills" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-[200px] h-[200px] bg-brand-pink/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Technical <span className="font-bold text-brand-cyan">Skills</span>
          </h2>
          <p className="text-gray-300 font-mono text-xs max-w-md mx-auto mt-2">
            Verified skills compiled from academic records and project milestones
          </p>
          <div className="w-12 h-0.5 bg-brand-cyan/40 rounded-full mt-2" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const theme = getCategoryTheme(cat.glowColor);
            const glowBorder = 
              cat.glowColor === "cyan" 
                ? "hover:border-brand-cyan/30" 
                : cat.glowColor === "purple"
                ? "hover:border-brand-purple/30"
                : "hover:border-brand-pink/30";

            return (
              <motion.div
                key={idx}
                animate={{
                  borderColor: theme.borderColors,
                  boxShadow: theme.glowShadow
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.7
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  filter: "brightness(1.1)"
                }}
                className="glass-pane border bg-slate-950/20 rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Category Title Card */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                      {cat.icon}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-gray-200 font-normal text-xs leading-relaxed">
                    {cat.description}
                  </p>
                  
                  {/* Skills Container adjusted to fit width based on text */}
                  <div className="flex flex-wrap gap-2.5 pt-4">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.div
                        key={sIdx}
                        animate={{
                          borderColor: theme.borderColors,
                          boxShadow: theme.glowShadow
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: sIdx * 0.2
                        }}
                        whileHover={{
                          scale: 1.03,
                          filter: "brightness(1.15)",
                          backgroundColor: "rgba(15, 23, 42, 0.6)"
                        }}
                        className={`inline-flex items-center px-3.5 py-2.5 rounded-xl bg-slate-950/40 border text-left ${theme.bgHover} transition-all duration-300 cursor-pointer`}
                      >
                        <span className="text-xs font-mono text-white font-semibold flex items-center gap-2 whitespace-nowrap">
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.dotClass} animate-pulse`} />
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
