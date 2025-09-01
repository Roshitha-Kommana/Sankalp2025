import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

const hoverBgColors = [
  "#c5ffc9", // pastel green
  "#f9ffa5", // pastel yellow
  "#feaac0", // pastel pink
  "#dcd0fe", // pastel lavender
];

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [colorIndex, setColorIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const deadline = new Date("2025-09-07T23:59:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    setColorIndex((prev) => (prev + 1) % hoverBgColors.length);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="bg-white rounded-lg px-4 py-3 shadow-md min-w-[55px] text-center font-mono font-extrabold text-lg md:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-xs md:text-base font-semibold text-gray-700">
        {label}
      </span>
    </div>
  );

  const Timer = () => (
    <div className="flex justify-center items-center gap-x-3 sm:gap-x-6 text-gray-900">
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-3xl md:text-5xl font-extrabold flex items-center">
        :
      </span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-3xl md:text-5xl font-extrabold flex items-center">
        :
      </span>
      <TimeBlock value={timeLeft.minutes} label="Minutes" />
      <span className="text-3xl md:text-5xl font-extrabold flex items-center">
        :
      </span>
      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  );

  return (
    <>
      <div
        className="
          w-11/12
          max-w-4xl
          mx-auto
          bg-[#dcd0fe]
          rounded-2xl md:rounded-3xl
          shadow-2xl
          border border-gray-300
          overflow-hidden
          flex flex-col
          p-3 sm:p-5
          mt-15 md:mt-15
        "
      >
        {/* Heading */}
        <h2 className="text-2xl md:text-5xl mt-5 sm:pt-5 font-extrabold text-gray-900 mb-10 tracking-tight text-center">
          Hurry Up! Time is Running Out ⏳
        </h2>

        {/* Timer */}
        <Timer />

        {/* Register Button */}
        <a
          href="https://forms.gle/FiBkTbkz63U89HDWA"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: hovered ? hoverBgColors[colorIndex] : "transparent",
          }}
          className="mt-10 self-center inline-block px-6 py-3 text-black font-semibold text-base md:text-lg rounded-md border-2 border-gray-900 transition-colors duration-200 cursor-pointer"
        >
          Register Now
        </a>

        {/* Note */}
        <p className="mt-4 text-gray-800 font-semibold text-sm md:text-base flex justify-center items-center gap-2 text-center">
          👀 Be among the first 100 and grab your exclusive, super-cool swags! 😜
        </p>
      </div>
      {/* Important Note Card OUTSIDE the countdown box */}
      <NoteCard>
        <span className="block font-bold mb-1">Remember</span>
        Registration is free for Round 1.<br />
        If shortlisted, the team must pay ₹299 per member (e.g. a team of 4 members should pay 4×299 = ₹1196). Payment should be made as a single transaction for the whole team.<br />
        Only team leaders should fill the form and join the WhatsApp group.<br />
        No restrictions on team formation – members may belong to different departments or academic years.<br />
        All participants should bring their own laptop and chargers.
      </NoteCard>
    </>
  );
};

export default Countdown;
