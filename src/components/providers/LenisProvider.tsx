"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Set lagSmoothing to 0 (no smoothing, matches your script.js)
    gsap.ticker.lagSmoothing(0);

    // Wait for Lenis to be available
    const checkLenis = () => {
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        // Attach ScrollTrigger update to Lenis scroll event
        lenis.on("scroll", ScrollTrigger.update);

        // Also attach to the global window object for debugging
        if (typeof window !== "undefined") {
          (window as any).ScrollTrigger = ScrollTrigger;
          (window as any).gsap = gsap;
        }

        return true;
      }
      return false;
    };

    // Try immediately
    if (!checkLenis()) {
      // If not available, try again after a short delay
      const timer = setTimeout(() => {
        checkLenis();
      }, 100);

      return () => clearTimeout(timer);
    }

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};
