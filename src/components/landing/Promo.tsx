import React, { useState, useEffect } from "react";

const Promo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (

    <div className="w-full mt-8 md:mt-12">
      {/* ✅ Heading above the card */}
      <h2 className="w-full text-center text-white 
        text-2xl sm:text-3xl md:text-4xl 
        font-extrabold 
        leading-snug 
        mb-6">
        Official Promo
      </h2>



      <div
        className="
          w-11/12
          max-w-4xl
          mx-auto
          bg-[#0f0f0f]
          rounded-2xl md:rounded-3xl
          shadow-2xl
          border border-gray-800
          overflow-hidden
          flex flex-col
          p-3 sm:p-4 md:p-6
          mt-8 md:mt-12 sm:mt-10  /* 👈 added margin-top for spacing */
        "
      >
        
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-700 text-sm">
        <div className="flex items-center gap-2 text-[#ccc]">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#feaac0" }} />
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f9ffa5" }} />
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#c5ffc9" }} />
          <span className="ml-2 font-medium text-xs sm:text-sm">Sankalp • Promo</span>
        </div>
        <div className="text-xs text-[#999]">HD • Auto-play • Loop</div>
      </div>

      {/* Video */}
      <div className="w-full">
        <video
          src="/promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-t border-gray-700 bg-[#0f0f0f] text-xs text-[#bdbdbd]">
        <p className="text-[10px] sm:text-xs">Dream. Design. Develop. — See you at MVGR.</p>
        <span className="mt-1 md:mt-0 text-[#8a8a8a] text-[10px] sm:text-xs">#HackWithSankalp</span>
      </div>
    </div>
    </div>
  );
};

export default Promo;
