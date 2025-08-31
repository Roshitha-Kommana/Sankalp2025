"use client";

import { useState, useEffect } from "react";
import ResponsiveHero from "@/components/landing/responsive-hero";
import Promo from "@/components/landing/Promo";
import Countdown from "@/components/landing/Countdown";
import InfoCard from "@/components/landing/info-card";
import FAQSection from "@/components/landing/faq";
import Loader from "@/components/ui/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[10000] bg-white flex items-center justify-center"
          style={{ opacity: loading ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <Loader />
        </div>
      )}

      <div
        className="bg-[#141414] min-h-screen w-screen overflow-x-clip"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.9s ease" }}
      >
        <ResponsiveHero />
        <Promo />
        <Countdown />
        <InfoCard />
        <FAQSection />
      </div>
    </>
  );
}
