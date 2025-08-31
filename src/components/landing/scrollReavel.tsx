"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  const TextContainerRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: TextContainerRef.current,
        start: "top top",
        // markers: true, // Remove markers for production
        end: `+=${window.innerHeight * 5}px`, // 5 viewport heights of scroll space
        pin: true, // Pin the section in place
        pinSpacing: true,
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          blocksRef.current.forEach((block, i) => {
            if (!block) return;
            // Staggered Y movement
            const blockStart = i * 0.1;
            const blockEnd = blockStart + 0.6;
            const blockProgress = gsap.utils.mapRange(
              blockStart,
              blockEnd,
              0,
              1,
              progress
            );
            const clampedProgress = Math.max(0, Math.min(1, blockProgress));
            const startY = window.innerHeight * 1.5;
            const endY = -window.innerHeight * 0.5;
            const currentY = startY + (endY - startY) * clampedProgress;
            // Opacity: 0 until pin section, then 1
            const opacity = progress > 0 ? 1 : 0;
            gsap.set(block, {
              y: currentY,
              opacity,
            });
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Color blocks configuration
  const rainbowBlocks = [
    { color: "#FF6A00", radius: "3rem 3rem 0 0" }, // Orange
    { color: "#A58BFF", radius: "3rem 3rem 0 0" }, // Purple
    { color: "#C8FF66", radius: "3rem 3rem 0 0" }, // Green
  ];

  return (
    <div className="overflow-hidden">
      {/* Pinned section */}
      <section
        ref={TextContainerRef}
        className="relative h-screen bg-[#fffaf0] text-black flex items-center justify-center px-6 text-center font-bold text-2xl sm:text-4xl"
      >
        {/* Text content */}
        <div className="relative">
          <p>This section is pinned!</p>
          <p>Scroll to see the effect</p>
        </div>

        {/* Color blocks - cover the entire screen */}
        <div className="absolute top-0 left-0 w-full h-full z-10 flex">
          {rainbowBlocks.map(({ color, radius }, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) blocksRef.current[i] = el;
              }}
              className="flex-1 h-[150vh] border-2 border-black"
              aria-hidden="true"
              style={{
                backgroundColor: color,
                borderTopLeftRadius: radius.split(" ")[0],
                borderTopRightRadius: radius.split(" ")[1],
                opacity: 0, // initial opacity
                transition: "opacity 0.3s cubic-bezier(.7,.2,.3,1)",
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </section>

      {/* Section below */}
      <section className="h-screen bg-black text-white flex items-center justify-center text-2xl sm:text-4xl">
        <p>Welcome to your dashboard</p>
      </section>
    </div>
  );
}
