import React from "react";
import TextReveal from "@/components/landing/about";
import { Dela_Gothic_One } from "next/font/google";



const dela = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400", // only one weight available
});

const MobileHero = () => {
  return (
    <>
      <section className="hero host-grotesk relative w-screen min-h-screen p-6 flex flex-col items-center justify-center text-[#141414] overflow-hidden border-[24px] border-[#141414]">
        {/* Logos - Centered */}
        <div className="flex flex-col items-center justify-center gap-6 mb-10">
          <img
            className="hackwave-img w-48 md:w-64 -mt-8"
            src="/assets/SANKALP.png"
            alt="Sankalp Logo"
          />
          <img
            className="hackwave-img w-40 md:w-56"
            src="/assets/illust.png"
            alt="Mascot"
          />
          {/* INTERNAL HACKATHON - Bold, after mascot image */}
          <p
            className={`font-extrabold text-lg md:text-xl text-black tracking-wide uppercase ${dela.className}`}
            style={{ letterSpacing: "0.08em" }}
          >
            INTERNAL HACKATHON
          </p>
        </div>

        {/* Info Row */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl gap-10 text-center md:text-left">
          {/* Left - Hackathon Dates */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xl md:text-2xl font-semibold">
              24 Hours <span className="font-extrabold">Hackathon</span>
            </p>
            <p className="text-base md:text-lg text-gray-600">from</p>
            <p className="text-2xl md:text-3xl font-bold">Sept 20-21, 2025</p>
          </div>

          {/* Right - Prizepool */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-2xl md:text-3xl font-bold">₹30K Prizepool</p>
          </div>

          {/* Middle - College Info */}
          <div className="flex flex-col items-center text-center">
            <p
              className={`text-2xl md:text-3xl font-bold tracking-wide text-gray-900 ${dela.className}`}
            >
              MVGR College of Engineering(A)
            </p>
            <span className="block text-black font-thin text-base md:text-lg tracking-wide mt-1">Organised by CSE in collaboration with CSSD</span>
          </div>
        </div> {/* ✅ closing the flex container */}
      </section>
      <TextReveal />
    </>
  );
};

export default MobileHero;
