"use client";

import React, { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";

interface AnimatedTitleProps {
  label: string;
  subtitle?: string;
}

export default function AnimatedTitle({ label, subtitle }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="text-center h-screen flex flex-col items-center justify-center mb-10 md:mb-16"
    >
      <h1 className="text-6xl md:text-8xl lg:text-9xl text-[#fcf2e8] mb-6">
        <VariableProximity
          label={label}
          fromFontVariationSettings="wght 200"
          toFontVariationSettings="wght 900"
          radius={400}
          containerRef={containerRef}
        />
      </h1>
      {subtitle && (
        <p className="text-lg md:text-2xl text-[#ccc] max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}


