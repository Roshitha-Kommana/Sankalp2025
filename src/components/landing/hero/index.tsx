"use client";
import { useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { LenisProvider } from "@/components/providers/LenisProvider";
import TextReveal from "../about";
import { Dela_Gothic_One } from "next/font/google";

const dela = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
});

// Extend Window interface to include duplicateIcons property
declare global {
  interface Window {
    duplicateIcons: HTMLElement[] | null;
  }
}

// ============================================================================
// HERO COMPONENT - Main Animation Container
// ============================================================================
// This component creates a complex scroll-triggered animation that:
// 1. Fades out the header logo and tagline
// 2. Animates icons from their initial positions to center
// 3. Scales and moves icons to final positions near text
// 4. Reveals text segments with staggered timing
// 5. Uses Lenis for smooth scrolling and GSAP for animations
// 6. Integrates scroll reveal animation after text completion
// ============================================================================

const Hero = () => {
  // ============================================================================
  // REFS - DOM Element References
  // ============================================================================

  const heroRef = useRef(null); // Main hero section container
  const heroHeaderRef = useRef(null); // Header with logo and tagline
  const animatedIconsRef = useRef<HTMLDivElement | null>(null); // Container for animated icons
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of individual icon elements
  const textSegmentRefs = useRef<(HTMLSpanElement | null)[]>([]); // Array of text segment elements
  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of placeholder elements

  // Color blocks refs
  const blocksRef = useRef<HTMLDivElement[]>([]);

  // ============================================================================
  // GSAP ANIMATION SETUP
  // ============================================================================
  // useGSAP hook ensures animations are properly cleaned up when component unmounts

  useGSAP(() => {
    // Early return if required DOM elements aren't available
    if (!heroRef.current || !heroHeaderRef.current)
      return;

    // ============================================================================
    // TEXT ANIMATION ORDER RANDOMIZATION
    // ============================================================================
    // Create an array to store text segments with their original indices
    const textAnimationOrder: {
      segment: HTMLSpanElement | null;
      originalIndex: number;
    }[] = [];
    textSegmentRefs.current.forEach((segment, index) => {
      if (segment) {
        textAnimationOrder.push({ segment, originalIndex: index });
      }
    });

    // Randomize the order of text segments for a more dynamic animation
    // This uses the Fisher-Yates shuffle algorithm
    for (let i = textAnimationOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [textAnimationOrder[i], textAnimationOrder[j]] = [
        textAnimationOrder[j],
        textAnimationOrder[i],
      ];
    }

    // ============================================================================
    // RESPONSIVE DESIGN CALCULATIONS
    // ============================================================================

    // Function to get responsive icon size
    const getResponsiveIconSize = () => {
      const width = window.innerWidth;
      if (width <= 480) return 25; // Small mobile
      if (width <= 1000) return 30; // Mobile
      if (width <= 1024) return 45; // Tablet
      return 60; // Desktop
    };

    // Get initial icon size
    let headerIconSize = getResponsiveIconSize();

    // Get the current size of the first icon to calculate scaling factor
    const firstIcon = iconRefs.current[0] as HTMLDivElement | null;
    const currentIconSize = firstIcon
      ? firstIcon.getBoundingClientRect().width
      : 1;

    // Calculate the exact scale factor needed to transform icons to header size
    let exactScale = headerIconSize / currentIconSize;

    // ============================================================================
    // RESIZE LISTENER - Handle responsive icon sizing
    // ============================================================================
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        headerIconSize = getResponsiveIconSize();
        const newCurrentIconSize = firstIcon
          ? firstIcon.getBoundingClientRect().width
          : 1;
        exactScale = headerIconSize / newCurrentIconSize;
      }, 100); // Debounce resize events
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // ============================================================================
    // MAIN SCROLL TRIGGER - Controls Entire Animation Sequence
    // ============================================================================
    // This ScrollTrigger creates a complex multi-phase animation that:
    // - Pins the hero section during animation
    // - Divides the animation into 4 main phases (0-30%, 30-60%, 60-75%, 75-100%)
    // - Handles icon movement, scaling, and text reveal

    ScrollTrigger.create({
      trigger: heroRef.current, // Element that triggers the animation
      start: "top top", // Start when top of hero reaches top of viewport
      markers: false,
      end: "+=400", // Minimal scroll distance for fastest transition
      pin: true, // Pin the hero section in place during animation
      pinSpacing: true, // Maintain spacing for pinned element
      scrub: 0, // Instant scroll effect

      // ============================================================================
      // ANIMATION UPDATE FUNCTION - Called on Every Scroll
      // ============================================================================
      // This function handles all animation phases based on scroll progress
      // Progress ranges from 0 (start) to 1 (end)

      onUpdate: () => {
        // Make all text segments always visible
        textSegmentRefs.current.forEach((segment) => {
          if (segment) segment.style.opacity = "1";
        });
      },
    });

    // ============================================================================
    // CLEANUP FUNCTION - Called When Component Unmounts
    // ============================================================================
    // This ensures proper cleanup of:
    // - Duplicate icons from DOM
    // - All ScrollTrigger instances
    // - Memory leaks prevention

    return () => {
      // Clear resize timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      // Remove duplicate icons from DOM if they exist
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((duplicate) => {
          if (duplicate.parentNode) {
            duplicate.parentNode.removeChild(duplicate);
          }
        });
        window.duplicateIcons = null;
      }

      // Remove resize listener
      window.removeEventListener("resize", handleResize);

      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Color blocks configuration for scroll reveal
  const rainbowBlocks = useMemo(
    () => [

      { color: "#c5ffc9", radius: "3rem 3rem 0 0" },
      { color: "#f9ffa5", radius: "3rem 3rem 0 0" }, 
      { color: "#feaac0", radius: "3rem 3rem 0 0" }, 
      { color: "#dcd0fe", radius: "3rem 3rem 0 0" }, 
      { color: "#d1ecff", radius: "3rem 3rem 0 0" }, 
    ],
    []
  );

  // ============================================================================
  // JSX RENDER - Component Structure
  // ============================================================================
  // The component structure includes:
  // - LenisProvider wrapper for smooth scrolling
  // - Hero section with animated elements
  // - Scroll reveal section with color blocks
  // - Dashboard section

  return (
    <LenisProvider>
      {/* ============================================================================
          HERO SECTION - Main Animation Container
          ============================================================================ */}
      <section
        ref={heroRef}
        className="hero host-grotesk relative w-screen min-h-0 p-2 flex items-center justify-center text-[#141414]"
      >
        {/* Top Center College Name */}
          <div className="absolute top-4 left-1/2 -translate-x-[48%] text-center z-50 w-max max-w-full px-2 mt-[0.375rem]">
            <h1
              className={`text-black text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide leading-tight ${dela.className}`}
            >
              Maharaj Vijayaram Gajapathi Raj College of Engineering(A)
            </h1>
            <div className="mt-1">
              <span className="block text-black font-thin text-xs sm:text-sm md:text-base lg:text-lg tracking-wide">Organised by CSE in collaboration with CSSD</span>
            </div>
          </div>




        {/* ============================================================================
            HERO HEADER - Logo and Tagline
            ============================================================================ */}
        <div
          ref={heroHeaderRef}
          className="hero-header absolute left-0 top-0 w-full h-full mt-[6.25rem]"
          style={{ height: '100%', width: '100%', zIndex: 10, backgroundColor: '#fcf5ef' }}
        >
          <img
            src="/assets/sankalp2025_.png"
            alt="Sankalp 2025 Logo"
            className="w-full h-full object-contain"
            style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', marginTop: '2rem' }}
          />
        </div>
        {/* Remove the animated text from the hero section and move it below */}
      </section>
      {/* Animated text container now below the hero section */}
  <div className="w-full flex justify-center items-center mt-8">
        <h1 className="hero-heading animated-text leading-none text-2xl md:text-4xl lg:text-5xl">
          <span className="text-segment text-2xl md:text-4xl lg:text-6xl" style={{opacity: 1}}>Dream. Design. Develop.</span>
          <span className="text-segment text-2xl md:text-4xl lg:text-6xl" style={{opacity: 1}}> 24 hours of nonstop innovation.</span>
          <span className="text-segment text-2xl md:text-4xl lg:text-6xl" style={{opacity: 1}}> Build with your team. Break limits.</span>
          <span className="text-segment text-2xl md:text-4xl lg:text-6xl" style={{opacity: 1}}> Solve challenges. Shape the future.</span>
          <span className="text-segment text-2xl md:text-4xl lg:text-6xl" style={{opacity: 1}}> Unleash creativity. Win ₹30,000.</span>
          <span className="text-segment text-2xl md:text-4xl lg:text-6xl" style={{opacity: 1}}> This is Sankalp.</span>
        </h1>
      </div>

      {/* ============================================================================
          OUTRO SECTION - Text Reveal Animation
          ============================================================================ */}
      <TextReveal />
    </LenisProvider>
  );
};

export default Hero;
