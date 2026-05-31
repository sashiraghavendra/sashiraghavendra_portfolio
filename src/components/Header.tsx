import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { resumeData } from "../data/resume";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link tracker
      const sections = ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Hero", href: "#hero", id: "hero" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Certifications", href: "#certifications", id: "certifications" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/5 bg-[#030712]/80 backdrop-blur-md py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with monospace elements */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-cyan/20 group-hover:rotate-6 transition-transform duration-300">
            <Terminal size={16} />
          </div>
          <span className="font-display font-medium text-lg tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:text-brand-cyan transition-colors duration-200">
            Sashi
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono tracking-wider uppercase transition-all duration-300 ${
                activeSection === item.id
                  ? "text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action button - Resume Download */}
        <div className="hidden lg:flex items-center">
          <a
            href="https://drive.google.com/file/d/1fkRzPU0iCpf_JrNLUIDNb7WArj3HgtzZ/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-purple/30 bg-brand-purple/5 text-xs font-mono font-medium text-brand-purple tracking-widest uppercase hover:bg-brand-purple hover:text-white hover:border-brand-purple shadow-sm shadow-brand-purple/10 hover:shadow-brand-purple/30 transition-all duration-300"
          >
            <span>Resume</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu triggers */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors clickable"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="lg:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-[#030712] border-t border-white/5 z-40 flex flex-col justify-between p-6">
          <nav className="flex flex-col gap-3 py-4">
            {menuItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-4 rounded-xl text-sm font-display font-medium flex items-center justify-between transition-colors ${
                  activeSection === item.id
                    ? "text-brand-cyan bg-brand-cyan/5 border-l-4 border-brand-cyan"
                    : "text-gray-300 hover:text-white"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-gray-600">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pb-8">
            <a
              href="https://drive.google.com/file/d/1fkRzPU0iCpf_JrNLUIDNb7WArj3HgtzZ/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-mono text-xs font-medium tracking-widest uppercase text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-brand-purple/20"
            >
              <span>Download Resume</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
