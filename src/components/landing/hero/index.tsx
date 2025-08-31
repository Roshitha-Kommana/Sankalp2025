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
    if (!heroRef.current || !heroHeaderRef.current || !animatedIconsRef.current)
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
      end: `+=${window.innerHeight * 5}px`, // Extended scroll space for both text and color blocks
      pin: true, // Pin the hero section in place during animation
      pinSpacing: true, // Maintain spacing for pinned element
      scrub: 0.3, // Smooth scrubbing effect (0.3 second delay)

      // ============================================================================
      // ANIMATION UPDATE FUNCTION - Called on Every Scroll
      // ============================================================================
      // This function handles all animation phases based on scroll progress
      // Progress ranges from 0 (start) to 1 (end)

      onUpdate: (self) => {
        const progress = self.progress; // Current scroll progress (0 to 1)

        // ============================================================================
        // PHASE 1: INITIAL ANIMATION (0% - 30% progress)
        // ============================================================================
        // This phase handles:
        // - Header fade out and movement
        // - Icon container positioning
        // - Individual icon staggered entrance

        if (progress <= 0.3) {
          // Hide all text segments during this phase
          textSegmentRefs.current.forEach((segment) => {
            if (segment) gsap.set(segment, { opacity: 0 });
          });

          // Calculate progress within this phase (0 to 1)
          const moveProgress = progress / 0.3;
          // Calculate how much the icon container should move up
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          // ============================================================================
          // SUB-PHASE 1A: HEADER FADE OUT (0% - 15% progress)
          // ============================================================================

          if (progress <= 0.15) {
            // Calculate progress within this sub-phase (0 to 1)
            const headerProgress = progress / 0.15;
            // Move header up and fade it out
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;

            gsap.set(heroHeaderRef.current, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            // Keep header hidden after 15% progress
            gsap.set(heroHeaderRef.current, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }

          // ============================================================================
          // SUB-PHASE 1B: ICON CONTAINER CLEANUP AND POSITIONING
          // ============================================================================

          // Remove any existing duplicate icons from previous animations
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate);
              }
            });
            window.duplicateIcons = null;
          }

          // Position the icon container and make it visible
          gsap.set(animatedIconsRef.current, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          });

          // ============================================================================
          // SUB-PHASE 1C: INDIVIDUAL ICON STAGGERED ANIMATION
          // ============================================================================

          // Animate each icon with a staggered delay for smooth entrance
          iconRefs.current.forEach((icon, index) => {
            if (!icon) return;

            // Create staggered timing for each icon (0.1s delay between each)
            const staggerDelay = index * 0.1;
            const iconStart = staggerDelay;
            const iconEnd = staggerDelay + 0.5;

            // Calculate progress for this specific icon
            const iconProgress = gsap.utils.mapRange(
              iconStart,
              iconEnd,
              0,
              1,
              moveProgress
            );
            // Clamp progress between 0 and 1
            const clampedProgress = Math.max(0, Math.min(1, iconProgress));

            // Calculate individual Y position for each icon
            const startOffset = -containerMoveY;
            const individualY = startOffset * (1 - clampedProgress);

            // Apply position to individual icon
            gsap.set(icon, {
              x: 0,
              y: individualY,
            });
          });
          // ============================================================================
          // PHASE 2: ICON SCALING AND CENTERING (30% - 60% progress)
          // ============================================================================
          // This phase handles:
          // - Icon container scaling and centering
          // - Background color transition
          // - Individual icon position reset
        } else if (progress <= 0.6) {
          // Keep text segments hidden during scaling phase
          textSegmentRefs.current.forEach((segment) => {
            if (segment) gsap.set(segment, { opacity: 0 });
          });

          // Calculate progress within this phase (0 to 1)
          const scaleProgress = (progress - 0.3) / 0.3;

          // Keep header hidden

          gsap.set(heroHeaderRef.current, {
            transform: "translate(-50%, calc(-50% + -50px))",
            opacity: 0,
          });

          // ============================================================================
          // SUB-PHASE 2A: BACKGROUND COLOR TRANSITION
          // ============================================================================

          // Transition background from light to dark at 50% of this phase
          if (heroRef.current) {
            (heroRef.current as HTMLElement).style.backgroundColor =
              scaleProgress >= 0.5 ? "#141414" : "#fcf2e8";
          }

          // ============================================================================
          // SUB-PHASE 2B: ICON CONTAINER CLEANUP
          // ============================================================================

          // Remove any existing duplicate icons
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate);
              }
            });
            window.duplicateIcons = null;
          }

          // ============================================================================
          // SUB-PHASE 2C: ICON CONTAINER SCALING AND CENTERING
          // ============================================================================

          // Animate icon container scaling and centering
          if (animatedIconsRef.current) {
            // Calculate target center position (center of viewport)
            const targetCenterY = window.innerHeight / 2;
            const targetCenterX = window.innerWidth / 2;

            // Get current container position
            const containerRect =
              animatedIconsRef.current.getBoundingClientRect();
            const currentCenterX = containerRect.left + containerRect.width / 2;
            const currentCenterY = containerRect.top + containerRect.height / 2;

            // Calculate how much to move to reach center
            const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
            const deltaY = (targetCenterY - currentCenterY) * scaleProgress;

            // Base Y position from previous phase
            const baseY = -window.innerHeight * 0.3;

            // Calculate current scale (interpolate from 1 to exactScale)
            // This will scale the icons to match the duplicate size
            const currentScale = 1 + (exactScale - 1) * scaleProgress;

            // Apply scaling and centering to icon container
            gsap.set(animatedIconsRef.current, {
              x: deltaX,
              y: baseY + deltaY,
              scale: currentScale,
              opacity: 1,
            });
            // Reset individual icon positions to center of container
            iconRefs.current.forEach((icon) => {
              if (icon) gsap.set(icon, { x: 0, y: 0 });
            });
          }
          // ============================================================================
          // PHASE 3: ICON MOVEMENT TO FINAL POSITIONS (60% - 75% progress)
          // ============================================================================
          // This phase handles:
          // - Moving icons to their final positions near text
          // - Creating duplicate icons for final placement
          // - Preparing for text reveal
        } else if (progress <= 0.75) {
          // Keep text segments hidden during icon movement
          // textSegmentRefs.current.forEach((segment) => {
          //   if (segment) gsap.set(segment, { opacity: 0 });
          // });

          // Calculate progress within this phase (0 to 1)
          const moveProgress = (progress - 0.6) / 0.15;

          // Keep header hidden
          gsap.set(heroHeaderRef.current, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });

          // Set dark background
          if (heroRef.current) {
            (heroRef.current as HTMLElement).style.backgroundColor = "#141414";
          }

          // ============================================================================
          // SUB-PHASE 3A: ICON CONTAINER FINAL POSITIONING
          // ============================================================================

          // Move icon container to final position and fade it out
          if (animatedIconsRef.current) {
            // Calculate final center position
            const targetCenterY = window.innerHeight / 2;
            const targetCenterX = window.innerWidth / 2;

            // Get current container position
            const containerRect = (
              animatedIconsRef.current as HTMLDivElement
            ).getBoundingClientRect();
            const currentCenterX = containerRect.left + containerRect.width / 2;
            const currentCenterY = containerRect.top + containerRect.height / 2;

            // Calculate final movement to center
            const deltaX = targetCenterX - currentCenterX;
            const deltaY = targetCenterY - currentCenterY;

            // Base Y position from previous phases
            const baseY = -window.innerHeight * 0.3;

            // Move container to final position and fade it out
            gsap.set(animatedIconsRef.current, {
              x: deltaX,
              y: baseY + deltaY,
              scale: exactScale,
              opacity: 0,
            });
          }

          // Reset individual icon positions
          iconRefs.current.forEach((icon) => {
            if (icon) gsap.set(icon, { x: 0, y: 0 });
          });

          // ============================================================================
          // SUB-PHASE 3B: CREATE DUPLICATE ICONS FOR FINAL POSITIONS
          // ============================================================================

          // Create duplicate icons only once (they will move to text positions)
          if (!window.duplicateIcons) {
            window.duplicateIcons = [];
            iconRefs.current.forEach((icon) => {
              if (!icon) return;

              // Clone each icon and position it absolutely
              const duplicate = icon.cloneNode(true) as HTMLElement;
              duplicate.className = "duplicate-icon";
              duplicate.style.position = "absolute";
              duplicate.style.zIndex = "10"; // Lower z-index to appear below color blocks

              // Set responsive icon size (fixed size for duplicates)
              duplicate.style.width = headerIconSize + "px";
              duplicate.style.height = headerIconSize + "px";

              // Add to document body for absolute positioning
              document.body.appendChild(duplicate);
              (window.duplicateIcons as HTMLElement[]).push(duplicate);
            });
          }

          // ============================================================================
          // SUB-PHASE 3C: ANIMATE DUPLICATE ICONS TO TEXT POSITIONS
          // ============================================================================

          // Move duplicate icons to their final positions near text segments
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < placeholderRefs.current.length) {
                // Get starting position (current icon position)
                const icon = iconRefs.current[index];
                const placeholder = placeholderRefs.current[index];
                if (!icon || !placeholder) return;

                const iconRect = icon.getBoundingClientRect();
                const startCenterX = iconRect.left + iconRect.width / 2;
                const startCenterY = iconRect.top + iconRect.height / 2;
                const startPageX = startCenterX + window.pageXOffset;
                const startPageY = startCenterY + window.pageYOffset;

                // Get target position (placeholder position)
                const targetRect = placeholder.getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                // Calculate total movement needed
                const moveX = targetPageX - startPageX;
                const moveY = targetPageY - startPageY;

                // Split animation into two parts: vertical then horizontal
                let currentX = 0;
                let currentY = 0;

                if (moveProgress <= 0.5) {
                  // First half: move vertically
                  const verticalProgress = moveProgress / 0.5;
                  currentY = moveY * verticalProgress;
                } else {
                  // Second half: move horizontally
                  const horizontalProgress = (moveProgress - 0.5) / 0.5;
                  currentY = moveY; // Keep vertical position
                  currentX = moveX * horizontalProgress;
                }

                // Calculate final position
                const finalPageX = startPageX + currentX;
                const finalPageY = startPageY + currentY;

                // Apply position to duplicate icon
                (duplicate as HTMLElement).style.left =
                  finalPageX - headerIconSize / 2 + "px";
                (duplicate as HTMLElement).style.top =
                  finalPageY - headerIconSize / 2 + "px";
                (duplicate as HTMLElement).style.opacity = "1";
                (duplicate as HTMLElement).style.display = "flex";
              }
            });
          }
          // ============================================================================
          // PHASE 4: TEXT REVEAL ANIMATION (75% - 100% progress)
          // ============================================================================
          // This phase handles:
          // - Finalizing duplicate icon positions
          // - Staggered text segment reveal
          // - Completion of the animation sequence
        } else {
          // Keep header hidden and move it further up
          gsap.set(heroHeaderRef.current, {
            transform: `translate(-50%, calc(-50% + -100px))`,
            opacity: 0,
          });

          // Keep dark background
          if (heroRef.current) {
            (heroRef.current as HTMLElement).style.backgroundColor = "#141414";
          }

          // Hide the original animated icons container
          if (animatedIconsRef.current) {
            gsap.set(animatedIconsRef.current, { opacity: 0 });
          }

          // ============================================================================
          // SUB-PHASE 4A: FINALIZE DUPLICATE ICON POSITIONS
          // ============================================================================

          // Ensure duplicate icons are in their final positions
          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < placeholderRefs.current.length) {
                // Get final target position
                const placeholder = placeholderRefs.current[index];
                if (!placeholder) return;

                const targetRect = placeholder.getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                // Position duplicate icon at final location
                const dupElem = duplicate as HTMLElement;
                dupElem.style.left = targetPageX - headerIconSize / 2 + "px";
                dupElem.style.top = targetPageY - headerIconSize / 2 + "px";
                dupElem.style.opacity = "1";
                dupElem.style.display = "flex";
              }
            });
          }

          // ============================================================================
          // SUB-PHASE 4B: STAGGERED TEXT SEGMENT REVEAL
          // ============================================================================

          // Animate text segments in randomized order with staggered timing
          textAnimationOrder.forEach((item, index) => {
            if (!item.segment) return;

            // Calculate timing for each text segment (0.03s delay between each)
            const segmentStart = 0.75 + index * 0.03;
            const segmentEnd = segmentStart + 0.015;

            // Calculate progress for this specific text segment
            const segmentProgress = gsap.utils.mapRange(
              segmentStart,
              segmentEnd,
              0,
              1,
              progress
            );

            // Clamp progress between 0 and 1
            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

            // Apply opacity to text segment
            gsap.set(item.segment, { opacity: clampedProgress });
          });

          // ============================================================================
          // PHASE 5: COLOR BLOCKS ANIMATION (75% - 100% progress)
          // ============================================================================
          // This phase handles the color blocks sliding down after text animation

          // Start color blocks animation after text is fully revealed
          if (progress > 0.9) {
            const colorBlockProgress = (progress - 0.9) / 0.1; // Use remaining 10% for color blocks (slower)
            const clampedColorProgress = Math.max(
              0,
              Math.min(1, colorBlockProgress)
            );

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
                clampedColorProgress
              );
              const clampedProgress = Math.max(0, Math.min(1, blockProgress));
              const startY = window.innerHeight * 1.5;
              const endY = -window.innerHeight * 0.5;
              const currentY = startY + (endY - startY) * clampedProgress;
              // Opacity: 0 until color block animation starts, then 1
              const opacity = clampedColorProgress > 0 ? 1 : 0;
              gsap.set(block, {
                y: currentY,
                opacity,
              });
            });

            // Fade out duplicate icons as color blocks come down
            if (window.duplicateIcons) {
              window.duplicateIcons.forEach((duplicate) => {
                if (duplicate) {
                  const fadeOutOpacity = 1 - clampedColorProgress;
                  (duplicate as HTMLElement).style.opacity =
                    fadeOutOpacity.toString();
                }
              });
            }
          } else {
            // Keep color blocks hidden during text animation
            blocksRef.current.forEach((block) => {
              if (block) gsap.set(block, { opacity: 0 });
            });

            // Keep duplicate icons fully visible during text animation
            if (window.duplicateIcons) {
              window.duplicateIcons.forEach((duplicate) => {
                if (duplicate) {
                  (duplicate as HTMLElement).style.opacity = "1";
                }
              });
            }
          }
        }
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
        className="hero host-grotesk relative w-screen  min-h-screen p-6 flex items-center justify-center text-[#141414] overflow-hidden"
      >
        {/* Top Center College Name */}
          <div className="absolute top-4 left-1/2 -translate-x-[48%] text-center z-50 w-max max-w-full px-2 mt-5">
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
          className="hero-header absolute left-1/2 top-1/2 flex items-center justify-center w-full"
          style={{ transform: "translate(-50%, -30%)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-8xl px-4 md:px-8 gap-8 md:gap-0">
            {/* Left - SankalpLogo */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-1">
              <img
                className="hackwave-img w-48 md:w-64 lg:w-80"
                src="/assets/SANKALP_.png"
                alt="Sankalp Logo"
              />
            </div>

            {/* Right - Hackathon Info */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right order-2 md:order-2">
              <img
                className="right-img w-57 md:w-70 lg:w-90"
                src="/assets/right_image.png"
                alt=" Sankalp Logo"
              />
              {/* <div className="space-y-4">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#141414]">
                  24 Hours
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-normal text-gray-600">
                  of pure innovation
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#141414]">
                  September 20-21, 2025
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-xl md:text-2xl font-bold text-[#141414]">
                    ₹30K Prizepool
                  </p>
                </div>
              </div> */
            }
            </div>
          </div>
        </div>

        {/* ============================================================================
            ANIMATED ICONS CONTAINER - Icons that move and scale during scroll
            ============================================================================ */}
        <div ref={animatedIconsRef} className="animated-icons">
          {[1, 2, 3, 4, 5].map((i, idx) => (
            <div
              className={`animated-icon icon-${i}`}
              key={i}
              ref={(el) => {
                iconRefs.current[idx] = el;
              }}
            >
              <img
                src={`/icons/icon_${i}.svg`}
                alt={`Icon ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* ============================================================================
            ANIMATED TEXT CONTAINER - Text segments that fade in with icons (Sankalp)
            ============================================================================ */}
        <h1 className="hero-heading animated-text leading-none text-2xl md:text-4xl lg:text-5xl">
          {/* Placeholder icons that will be replaced by animated icons during scroll */}
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[0] = el;
            }}
          ></div>
          <span
            className="text-segment text-2xl md:text-4xl lg:text-6xl"
            ref={(el) => {
              textSegmentRefs.current[0] = el;
            }}
          >
            Dream. Design. Develop.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[1] = el;
            }}
          ></div>
          <span
            className="text-segment text-2xl md:text-4xl lg:text-6xl"
            ref={(el) => {
              textSegmentRefs.current[1] = el;
            }}
          >
            24 hours of nonstop innovation.
          </span>
          <span
            className="text-segment text-2xl md:text-4xl lg:text-6xl"
            ref={(el) => {
              textSegmentRefs.current[2] = el;
            }}
          >
            Build with your team. Break limits.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[2] = el;
            }}
          ></div>
          <span
            className="text-segment text-2xl md:text-4xl lg:text-6xl"
            ref={(el) => {
              textSegmentRefs.current[3] = el;
            }}
          >
            Solve challenges. Shape the future.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[3] = el;
            }}
          ></div>
          <span
            className="text-segment text-2xl md:text-4xl lg:text-6xl"
            ref={(el) => {
              textSegmentRefs.current[4] = el;
            }}
          >
            Unleash creativity. Win ₹30,000.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[4] = el;
            }}
          ></div>
          <span
            className="text-segment text-2xl md:text-4xl lg:text-6xl"
            ref={(el) => {
              textSegmentRefs.current[5] = el;
            }}
          >
            This is Sankalp.
          </span>
        </h1>


        {/* ============================================================================
            COLOR BLOCKS - Animated color blocks that reveal after text animation
            ============================================================================ */}
        <div
          className="absolute top-0 left-0 w-full h-full z-50 flex"
          style={{ willChange: "transform" }}
        >
          {rainbowBlocks.map(({ color, radius }, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) blocksRef.current[i] = el;
              }}
              className="flex-1 z-50 h-[150vh] border-2 border-black"
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

      {/* ============================================================================
          OUTRO SECTION - Text Reveal Animation
          ============================================================================ */}
      <TextReveal />
    </LenisProvider>
  );
};

export default Hero;
