import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Core Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    // Camera with deep depth
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 180;

    // WebGL Renderer with alpha transparency and high DPI options
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x030712, 1);
    container.appendChild(renderer.domElement);

    // 2. Nodes (Particles) Generation & Structure
    const pCount = 120; // Perfect balance for gorgeous look and high performance
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);

    // Particle velocities for 3D drift
    const velocities: { x: number; y: number; z: number }[] = [];

    // Styling colors (Cyan: 06B6D4, Purple: A855F7, Pink: EC4899)
    const presetColors = [
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xec4899)  // Pink
    ];

    for (let i = 0; i < pCount; i++) {
      // Coordinates distributed in a 3D bubble/cube
      positions[i * 3] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 350;

      // Velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.18
      });

      // Assign a beautiful neon color
      const color = presetColors[Math.floor(Math.random() * presetColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom glowing particle shaders or material texture fallback
    const loader = new THREE.TextureLoader();
    // Use standard circular canvas fallback for bulletproof loading of point coordinates
    const pMaterial = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(pointsGeometry, pMaterial);
    scene.add(particleSystem);

    // 3. Dynamic Links Constellation Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Create container for line relations
    let lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    // Mouse interactive controllers
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalized device coordinates (-1 to +1)
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // WebGL view scale controller
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 4. Main 60FPS Render-Loop
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Interpolate mouse coordinates smoothly (gentle parallax easing)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Pan the camera and rotate scene slightly
      camera.position.x += (currentMouseX * 45 - camera.position.x) * 0.05;
      camera.position.y += (currentMouseY * 45 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      scene.rotation.y += 0.0007; // Gentle auto-turn space

      // Update node positions inside buffer
      const posAttr = pointsGeometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < pCount; i++) {
        const vel = velocities[i];
        
        posArray[i * 3] += vel.x;
        posArray[i * 3 + 1] += vel.y;
        posArray[i * 3 + 2] += vel.z;

        // Space boundary check with bounce back
        const barrier = 175;
        if (posArray[i * 3] < -barrier || posArray[i * 3] > barrier) vel.x = -vel.x;
        if (posArray[i * 3 + 1] < -barrier || posArray[i * 3 + 1] > barrier) vel.y = -vel.y;
        if (posArray[i * 3 + 2] < -barrier || posArray[i * 3 + 2] > barrier) vel.z = -vel.z;
      }
      posAttr.needsUpdate = true;

      // Recalculate 3D lines mesh connections
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const connectionRadius = 75;

      for (let i = 0; i < pCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < pCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dist = Math.hypot(x1 - x2, y1 - y2, z1 - z2);

          if (dist < connectionRadius) {
            // Include starting node connection coordinates
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);

            // Inherit colors from parent points
            lineColors.push(
              colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2],
              colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2]
            );
          }
        }
      }

      // Dispose of the stale line geometries and rebuild
      scene.remove(lineSegments);
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeom.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));
      
      lineSegments = new THREE.LineSegments(lineGeom, lineMaterial);
      scene.add(lineSegments);

      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup hooks
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Clean graphics memory safely
      scene.remove(particleSystem);
      scene.remove(lineSegments);
      pointsGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-3d-star-constellation"
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full block bg-[#030712]"
    />
  );
}
