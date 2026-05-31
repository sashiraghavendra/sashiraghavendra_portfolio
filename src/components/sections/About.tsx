import { motion } from "motion/react";
import { BookOpen, MapPin, Award } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function About() {
  const yearsPassed = new Date().getFullYear() - 2022; // Years in development or college

  return (
    <section id="about" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            About <span className="font-bold text-glow-purple text-brand-purple">Sashi</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full mt-2" />
        </div>

        {/* Bento Grid Concept */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Story (Left Box) */}
          <motion.div
            animate={{
              borderColor: [
                "rgba(168, 85, 247, 0.15)",
                "rgba(244, 63, 94, 0.55)",
                "rgba(168, 85, 247, 0.75)",
                "rgba(168, 85, 247, 0.15)"
              ],
              boxShadow: [
                "0 0 0px rgba(168, 85, 247, 0)",
                "0 0 15px rgba(244, 63, 94, 0.2)",
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
            className="md:col-span-8 glass-pane border rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">THE DEVELOPER JOURNEY</span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Building practical software solutions with Java, MySQL, HTML, and CSS
              </h3>
              <p className="text-gray-200 font-normal leading-relaxed text-sm sm:text-base">
                I am Desha Sashi Raghavendra Kumar, a Computer Science and Engineering graduate with a strong foundation in Java, MySQL, HTML, and CSS. I focus on building structured, user-friendly, and database-driven applications while continuously improving my backend development and problem-solving skills.
              </p>
              <p className="text-gray-200 font-normal leading-relaxed text-sm">
                During my academic and internship journey, I contributed to team-based projects such as a cryptocurrency portfolio management system and a university ERP portal. These experiences helped me understand real-world software development, including REST API workflows, database design, authentication, dashboards, third-party API integration, testing, and collaboration in a project team.
              </p>
            </div>

            {/* Minor stats segment */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono">
              <div className="space-y-1">
                <p className="text-2xl font-bold font-display text-brand-cyan">CGPA</p>
                <p className="text-xs text-gray-300 uppercase tracking-widest font-medium">8.19 Metric</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold font-display text-brand-purple">2026</p>
                <p className="text-xs text-gray-300 uppercase tracking-widest font-medium">Graduation Year</p>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold font-display text-brand-pink">2+</p>
                <p className="text-xs text-gray-300 uppercase tracking-widest font-medium">Core Languages</p>
              </div>
            </div>
          </motion.div>

          {/* Location & Contact Details (Top Right Box) */}
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
              delay: 0.3
            }}
            whileHover={{
              y: -4,
              scale: 1.01,
              filter: "brightness(1.1)"
            }}
            className="md:col-span-4 glass-pane border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 bg-gradient-to-br from-indigo-950/20 to-slate-950/20"
          >
            <div className="space-y-6">
              <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">Coordinates</span>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-brand-cyan">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-300 uppercase tracking-widest font-semibold">Location</p>
                    <p className="text-sm font-medium text-gray-200">{resumeData.personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/10 border border-brand-purple/20 rounded-lg text-brand-purple">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-300 uppercase tracking-widest font-semibold">Institute</p>
                    <p className="text-sm font-medium text-gray-200 truncate max-w-[200px]" title={resumeData.education[0].institution}>
                      Kalasalingam Academy
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-pink/10 border border-brand-pink/20 rounded-lg text-brand-pink">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-300 uppercase tracking-widest font-semibold">Qualification</p>
                    <p className="text-sm font-medium text-gray-200">B.Tech (CSE)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 font-mono text-xs text-gray-200 space-y-1">
              <p>📍 Nandyal, Andhra Pradesh</p>
              <p>💻 Open to relocations & remote work</p>
            </div>
          </motion.div>

          {/* Education Snippet Card (Bottom Left Box in grid) */}
          <motion.div
            animate={{
              borderColor: [
                "rgba(244, 63, 94, 0.15)",
                "rgba(6, 182, 212, 0.55)",
                "rgba(244, 63, 94, 0.75)",
                "rgba(244, 63, 94, 0.15)"
              ],
              boxShadow: [
                "0 0 0px rgba(244, 63, 94, 0)",
                "0 0 15px rgba(6, 182, 212, 0.2)",
                "0 0 25px rgba(244, 63, 94, 0.35)",
                "0 0 0px rgba(244, 63, 94, 0)"
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
            className="md:col-span-12 glass-pane border rounded-2xl p-6 transition-all duration-300"
          >
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-xs text-brand-pink tracking-widest uppercase">Education Focus</span>
                <h4 className="font-display font-medium text-lg text-white">
                  B.Tech in Computer Science & Engineering
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed font-normal">
                  Focused extensively on Object-Oriented Programming (Java), Relational Database Management Systems (SQL), Web Technologies, and structured data structures. Maintained high standards of analytical academic performance leading to an overall CGPA metric of 8.19.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-4 border-t border-white/5 text-gray-300">
                <span>Kalasalingam Academy (2022 - 2026)</span>
                <span className="text-brand-pink">CGPA: 8.19</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
