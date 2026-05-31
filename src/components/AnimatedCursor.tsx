import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Detect mobile touch devices first
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target
      ) return;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple].slice(-4));
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Smoother trailing physics for the outer halo
  useEffect(() => {
    if (!isVisible) return;

    let animationId: number;
    const renderTrail = () => {
      setTrail((prev) => {
        // Linear interpolation for smooth lag trail
        const ease = 0.16; // smooth factor
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      animationId = requestAnimationFrame(renderTrail);
    };

    animationId = requestAnimationFrame(renderTrail);
    return () => cancelAnimationFrame(animationId);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Click ripple squares */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1, scale: 0.2, rotate: 0 }}
            animate={{ opacity: 0, scale: 2.2, rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9997] border border-brand-cyan/60 bg-brand-cyan/2 w-10 h-10 rounded-sm"
            style={{ left: ripple.x, top: ripple.y }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>

      {/* Center vector crosshair/plus symbol instead of circular dot */}
      <svg
        id="cursor-dot"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] select-none text-brand-cyan transition-transform duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${hovered ? "scale(1.4) rotate(45deg)" : "scale(1) rotate(0deg)"}`,
        }}
      >
        <line x1="6" y1="0.5" x2="6" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0.5" y1="6" x2="11.5" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Trailing tech corner-bracket box instead of circular halo */}
      <div
        id="cursor-halo"
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9998] select-none mix-blend-screen transition-all duration-300 pointer-events-none"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: hovered ? "42px" : "26px",
          height: hovered ? "42px" : "26px",
          transform: `translate(-50%, -50%) ${hovered ? "rotate(90deg)" : "rotate(0deg)"}`,
          filter: hovered ? "drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))" : "drop-shadow(0 0 3px rgba(168, 85, 247, 0.35))",
        }}
      >
        {/* Top-Left Corner Bracket */}
        <div 
          className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 rounded-tl-sm transition-colors duration-300" 
          style={{ borderColor: hovered ? "#06b6d4" : "#a855f7" }} 
        />
        {/* Top-Right Corner Bracket */}
        <div 
          className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 rounded-tr-sm transition-colors duration-300" 
          style={{ borderColor: hovered ? "#06b6d4" : "#a855f7" }} 
        />
        {/* Bottom-Left Corner Bracket */}
        <div 
          className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 rounded-bl-sm transition-colors duration-300" 
          style={{ borderColor: hovered ? "#06b6d4" : "#a855f7" }} 
        />
        {/* Bottom-Right Corner Bracket */}
        <div 
          className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 rounded-br-sm transition-colors duration-300" 
          style={{ borderColor: hovered ? "#06b6d4" : "#a855f7" }} 
        />
      </div>
    </>
  );
}
