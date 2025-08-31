"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";



interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-[#141414] font-sans md:px-10" ref={containerRef}>
      {/* Hero Section with Large Centered Heading */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight">
            Sankalp Timeline
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mt-8 leading-relaxed">
            Follow our journey from registration to the ultimate hackathon
            experience.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              },
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1 + 0.1,
                  },
                }}
                viewport={{ once: true }}
              >
                <div className="h-4 w-4 rounded-full bg-[#ff6ec7] border border-[#ff6ec7] p-2" />
              </motion.div>
              <motion.h3
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1 + 0.2,
                  },
                }}
                viewport={{ once: true }}
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1 + 0.3,
                },
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h3>
              {item.content}
            </motion.div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-pink-200/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-[#ff6ec7] via-[#ff1493] to-[#ff69b4] rounded-full shadow-lg shadow-[#ff6ec7]/50"
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};
