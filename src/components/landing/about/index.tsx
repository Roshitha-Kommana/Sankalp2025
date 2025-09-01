"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const TextReveal: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const animeTextContainersRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // Cache DOM elements after mount
    ctaRef.current = document.querySelector(".cta");
    aboutRef.current = document.querySelector(".about");
    animeTextContainersRef.current = document.querySelectorAll(
      ".anime-text-container"
    );

    // Only run if DOM is ready and containers exist
    if (
      !animeTextContainersRef.current ||
      animeTextContainersRef.current.length === 0
    )
      return;

    // TEXT PROCESSING: Split text into word elements and highlight keywords
    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    const keywords = [
      "brightest",
      "developers",
      "builders",
      "ship",
      "collaborative",
      "breakthrough",
      "solutions",
      "leaders",
    ];
    animeTextParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent || "";
      const words = text.split(/\s+/);
      paragraph.innerHTML = "";
      words.forEach((word, i) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          wordContainer.className = "word";
          const wordText = document.createElement("span");
          wordText.textContent = word;
          const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
          if (keywords.includes(normalizedWord)) {
            wordContainer.classList.add("keyword-wrapper");
            wordText.classList.add("keyword", normalizedWord);
          }
          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);
          if (i < words.length - 1) {
            paragraph.appendChild(document.createTextNode(" "));
          }
        }
      });
    });

    // ANIMATION CONFIGURATION
    const wordHighlightBgColor = "60, 60, 60";
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: "100%" });
    }

    // SCROLL TRIGGER SETUP
    animeTextContainersRef.current.forEach((container, index) => {
  const isMobile = window.innerWidth < 768;
  // Slower animation for all devices
  const scrollMultiplier = 1.5;
      ScrollTrigger.create({
        trigger: container,
        pin: container,
        start: "top top",
        end: `+=${window.innerHeight * scrollMultiplier}`,
        pinSpacing: true,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          const words = Array.from(
            container.querySelectorAll(".anime-text .word")
          );
          const totalWords = words.length;
          const cta = ctaRef.current;

          // CTA below viewport during text reveal phase
          if (progress <= 0.7 && cta) {
            gsap.set(cta, { y: "100%" });
          }

          // WORD REVEAL ANIMATION (0% - 70%)
          if (progress <= 0.7) {
            const progressTarget = 0.7;
            const revealProgress = Math.min(1, progress / progressTarget);
            const overlapWords = isMobile ? 8 : 15;
            const totalAnimationLength = 1 + overlapWords / totalWords;
            words.forEach((word, index) => {
              const wordText = word.querySelector("span") as HTMLElement | null;
              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;
              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                );
              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;
              const duration = adjustedEnd - adjustedStart;
              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;
              (word as HTMLElement).style.opacity = wordProgress.toString();
              const backgroundFadeStart =
                wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
              const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
              (
                word as HTMLElement
              ).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;
              if (wordText) {
                const textRevealThreshold = 0.9;
                const textRevealProgress =
                  wordProgress >= textRevealThreshold
                    ? (wordProgress - textRevealThreshold) /
                      (1 - textRevealThreshold)
                    : 0;
                wordText.style.opacity = Math.pow(
                  textRevealProgress,
                  0.5
                ).toString();
              }
            });
          } else {
            // REVERSE ANIMATION (70% - 100%)
            const reverseProgress = (progress - 0.7) / 0.3;
            const reverseOverlapWords = isMobile ? 3 : 5;
            words.forEach((word, index) => {
              const wordText = word.querySelector("span") as HTMLElement | null;
              (word as HTMLElement).style.opacity = "1";
              const targetTextOpacity = 1;
              const reverseWordStart = index / totalWords;
              const reverseWordEnd =
                reverseWordStart + reverseOverlapWords / totalWords;
              const reverseTimelineScale =
                1 /
                Math.max(
                  1,
                  (totalWords - 1) / totalWords +
                    reverseOverlapWords / totalWords
                );
              const reverseAdjustedStart =
                reverseWordStart * reverseTimelineScale;
              const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
              const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;
              const reverseWordProgress =
                reverseProgress <= reverseAdjustedStart
                  ? 0
                  : reverseProgress >= reverseAdjustedEnd
                  ? 1
                  : (reverseProgress - reverseAdjustedStart) / reverseDuration;
              if (wordText) {
                if (reverseWordProgress > 0) {
                  wordText.style.opacity = (
                    targetTextOpacity *
                    (1 - reverseWordProgress)
                  ).toString();
                  (
                    word as HTMLElement
                  ).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
                } else {
                  wordText.style.opacity = targetTextOpacity.toString();
                  (
                    word as HTMLElement
                  ).style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
                }
              }
            });
            // CTA MOVEMENT - Move CTA div from below to center
            const cta = ctaRef.current;
            if (cta) {
              const startY = 100;
              const endY = 0;
              const currentY = startY + (endY - startY) * reverseProgress;
              gsap.set(cta, { y: `${currentY}%` });
            }
          }
        },
      });
    });

    // Cleanup: kill all ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={aboutRef}
  className="about anime-text-container bg-[#141414] text-black relative w-full h-full min-h-[90vh] lg:min-h-[100vh] p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden"
      >
  <div className="w-full h-full flex flex-col justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-dashed border-[rgb(60,60,60)] p-4 sm:p-6 md:p-8 mt-0 -mt-8 md:mt-16 lg:mt-40 lg:mb-60">
          <h1 className="text-white mb-2 sm:mb-8 md:mb-12 lg:mb-16 font-black leading-tight px-2 mt-8 lg:mt-32 text-[clamp(1.5rem,2vw,1.6rem)] sm:text-[clamp(1.2rem,1.5vw,1.8rem)] md:text-[clamp(1.3rem,2.9vw,3.5rem)]">
            About{" "}
            <span className="inline-block px-2 sm:px-3 md:px-4 lg:px-6 bg-pink-300 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 sm:border-3 md:border-4 lg:border-6">
              Sankalp
            </span>
          </h1>
          <div className="text-white anime-text w-full max-w-[80vw] sm:max-w-[75vw] md:max-w-[65vw] lg:max-w-[50vw] xl:max-w-[55vw] space-y-3 sm:space-y-4 md:space-y-6 text-[0.3rem] sm:text-[clamp(0.5rem,1.2vw,0.85rem)] md:text-[clamp(0.6rem,1.4vw,0.95rem)] lg:text-[clamp(0.7rem,1.6vw,1.05rem)] xl:text-[clamp(0.8rem,1.8vw,1.4rem)]">
            <p className="text-center md:text-justify font-black leading-relaxed px-2 sm:px-8 md:px-12">
              Organized by the CSE Department in collaboration with CSSD, <b>Sankalp</b> is a 24-hour offline hackathon
              designed to bring together brilliant minds ready to innovate, collaborate, 
              and showcase their technical skills. It’s more than just coding—it’s about 
              building impactful solutions under real-world constraints.
            </p>
            <p className="text-center md:text-justify font-black leading-relaxed px-2 sm:px-8 md:px-12">
              With a prize pool of ₹30,000, exclusive swags, and an environment filled with 
              creativity and teamwork, Sankalp provides the perfect stage for aspiring developers 
              to push boundaries, solve meaningful challenges, and leave their mark in tech.
            </p>
          </div>
        </div>

        <div
          ref={ctaRef}
            className="absolute cta top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              flex items-center justify-center 
              w-[90%] sm:w-[80%] md:w-[70%] 
              h-auto 
              rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg"


        >
          <div className="w-full h-full mx-auto flex flex-col justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-xl bg-[#f9ffa5] p-4 sm:p-6 md:p-8 -mt-16 md:mt-0 lg:mt-30 lg:mb-30">
            <h1 className=" w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[90vw] text-[#141414] font-black leading-relaxed px-2 sm:px-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-[clamp(1.8rem,3vw,3rem)] sm:text-[clamp(1.2rem,2vw,1.6rem)] md:text-[clamp(2.5rem,4vw,4.5rem)]">
              Playground for bold ideas and creative interfaces.
            </h1>
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-[clamp(1.8rem,2vw,4.1rem)] sm:text-[clamp(1rem,1.8vw,1.3rem)] md:text-[clamp(1rem,1.7vw,2rem)] text-[#141414] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">200+</h2>
                <p className="font-medium ">Participants</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">24</h2>
                <p className="font-medium">Hours</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">∞</h2>
                <p className="font-medium">Ideas & Possibilities</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">₹30K</h2>
                <p className="font-medium">Prize Pool</p>
              </div>
            </div>
            <div className="w-full text-center">
              <p className="text-[#141414] font-bold text-[clamp(1.3rem,3vw,2.6rem)] sm:text-[clamp(1.1rem,3.8vw,6.3rem)] md:text-[clamp(1.4rem,3.2vw,2rem)] ">
                September 20-21, 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TextReveal;
