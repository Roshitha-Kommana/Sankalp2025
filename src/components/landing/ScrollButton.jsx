"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToContent}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                     flex items-center gap-2 px-6 py-3 
                     bg-black text-white text-sm font-medium 
                     rounded-full shadow-lg hover:opacity-80 transition"
        >
          <span>Scroll Down</span>
          <ChevronDown size={18} />
        </button>
      )}
    </>
  );
};

export default ScrollButton;
