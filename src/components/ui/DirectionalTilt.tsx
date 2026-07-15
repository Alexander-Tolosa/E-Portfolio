"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface DirectionalTiltProps {
  children: React.ReactNode;
  className?: string;
  maxRotateX?: number;
  maxRotateY?: number;
  perspective?: number;
}

export function DirectionalTilt({
  children,
  className = "",
  maxRotateX = 18,
  maxRotateY = 18,
  perspective = 800,
}: DirectionalTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position normalized relative to center: [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Hover state motion value (0 = resting, 1 = hovered)
  const isHovered = useMotionValue(0);

  // Springs for smooth movement and rotation transitions
  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });
  const hoverSpring = useSpring(isHovered, { stiffness: 120, damping: 15 });

  // Transform normalized mouse coordinates to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotateX, -maxRotateX]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotateY, maxRotateY]);

  // Scale: lifts up to 1.04 when hovered
  const scale = useTransform(hoverSpring, [0, 1], [1, 1.04]);

  // Dynamic box shadow offsets: shifts shadow opposite to cursor to enhance depth
  const shadowX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [25, -25]);
  const shadowBlur = useTransform(hoverSpring, [0, 1], [15, 40]);
  const shadowOpacity = useTransform(hoverSpring, [0, 1], [0.25, 0.45]);
  const shadowGlow = useTransform(hoverSpring, [0, 1], [0, 0.2]); // Indigo glow overlay

  // Create standard box-shadow template
  const boxShadow = useMotionTemplate`
    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}),
    0 0 35px rgba(99, 102, 241, ${shadowGlow})
  `;

  // Glare: vibrant dual-color spotlight (Cyan at core, Indigo at boundary)
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useTransform(hoverSpring, [0, 1], [0, 1]);
  
  const glareBg = useMotionTemplate`radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(6, 182, 212, 0.35) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 80%)`;

  // Handle mouse movement inside the container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of element
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Normalize coordinates between -0.5 and 0.5
    x.set(mouseX / width);
    y.set(mouseY / height);
    
    // Set hovered to active
    isHovered.set(1);
  };

  // Reset rotation and position when mouse leaves the element
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    isHovered.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: perspective,
        rotateX,
        rotateY,
        scale,
        boxShadow,
      }}
      className={`relative select-none transition-shadow duration-300 ${className}`}
    >
      {/* Dynamic Cursor Spotlight / Glare overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
        style={{
          background: glareBg,
          opacity: glareOpacity,
        }}
      />
      {/* Content wrapper with preserve-3d to enable 3D depth for child elements */}
      <div 
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }} 
        className="w-full h-full rounded-[inherit]"
      >
        {children}
      </div>
    </motion.div>
  );
}
