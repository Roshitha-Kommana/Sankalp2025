"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VariableProximityProps {
  text: string;
  className?: string;
  textColor?: string;
}

export default function VariableProximity({ text, className = "", textColor }: VariableProximityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [letterWeights, setLetterWeights] = useState<number[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const letters = containerRef.current.querySelectorAll(".letter");
      const weights = Array.from(letters).map((letter) => {
        const rect = letter.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
        
        const distance = Math.sqrt(
          Math.pow(mousePos.x - letterCenterX, 2) + 
          Math.pow(mousePos.y - letterCenterY, 2)
        );
        
        const maxDistance = 180;
        const proximity = Math.max(0, 1 - distance / maxDistance);
        // Smooth easing function
        const eased = 1 - Math.pow(1 - proximity, 3);
        return 400 + (eased * 500); // 400 to 900 font weight
      });
      
      setLetterWeights(weights);
    }
  }, [mousePos]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="letter inline-block"
          style={{
            fontWeight: letterWeights[index] || 400,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            fontFeatureSettings: '"kern" 1',
            letterSpacing: "normal",
            width: "auto",
            minWidth: "0.5ch",
            textAlign: "center",
            color: textColor || "inherit",
          }}
          animate={{
            fontWeight: letterWeights[index] || 400,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
