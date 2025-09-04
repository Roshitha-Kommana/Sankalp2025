"use client";

import React from "react";
import Navbar from "@/components/global/nav";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  badge: string;
  title: string;
  index: number;

  content: React.ReactNode;
  cta?: { label: string; onClick?: () => void; href?: string };
}

const badgeColors = [
  "#c5efff", // 1st card
  "#ddd1ff", // 2nd card
  "#c5efff", // 3rd card
  "#faffa5", // 4th card
  "#d1ecff", // 5th card
  "#ffc5dd", // 6th card (if needed)
];

const Card = ({ badge, title, content, cta, index }: CardProps) => {
  const badgeBg = badgeColors[index - 1] || "#c6fe69"; // fallback color
  return (
    <div
      className="card relative h-full text-[#141414] w-full"
      id={`card-${index + 1}`}
    >
      <div className="info-card-inner relative will-change-transform w-full h-full p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-xl">
        {/* Badge and PPT Template button row, with button at right end */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
          <Badge
            className="inline-block text-[#141414] px-3 py-1.5 rounded-full text-sm sm:text-base md:text-lg font-semibold border-1 border-[#141414]"
            style={{ backgroundColor: badgeBg }}
          >
            {badge}
          </Badge>
          {/* Show PPT Template button only for Round 1, aligned right */}
          {badge === "Round 1" && (
            <a
              href="/assets/round1ppt.pptx"
              download
              className="font-extrabold text-black text-base px-3 py-1 rounded-full border border-[#00C853] bg-white hover:bg-[#00C853] hover:text-white transition-colors duration-200"
              style={{letterSpacing: '1px', textDecoration: 'none', display: 'inline-block'}}>
              PPT Template
            </a>
          )}
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-6">
          {title}
        </h3>

        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-left mb-2 md:mb-4">
          {content}
        </div>
        {cta && (
          <div className="w-full flex justify-center md:justify-start">
            {cta.href ? (
              <a
                href={cta.href}
                className="inline-block mt-2 px-6 py-2 bg-[#141414] text-[#c6fe69] rounded-full font-semibold text-base transition-colors hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#c6fe69] text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta.label}
              </a>
            ) : (
              <button
                onClick={cta.onClick}
                className="inline-block mt-2 px-6 py-2 bg-[#141414] text-[#c6fe69] rounded-full font-semibold text-base transition-colors hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#c6fe69] text-center"
              >
                {cta.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function TimelinePage() {
  const data = [
    {
      title: "8th September 2025",
      content: (
        <Card
          index={1}
          badge="Round 1"
          title="Online Submission (via Google Forms)"
          content={
          <>
            <b>Starts:</b> 8th September 2025, 9:00 AM IST
            <br />
            <b>Ends:</b> 10th September 2025, 11:59 PM IST
            <br />
            <b>Where:</b> Google Forms 
            <br />
            <br />
            Time to show off what your team&apos;s made of. Submit a short,
            punchy PPT {"{"}max 6-7 slides{"}"} showcasing a past project you&apos;re
            proud of.
            <br />
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Quick team intro</li>
              <li>What the project does (and why it&apos;s cool)</li>
              <li>What tech you used</li>
              <li>Some screenshots or links if you&apos;ve got &apos;em</li>
            </ul>
            <br />
            <b>Heads up:</b> This project is just for screening, You
            can&apos;t reuse it later in Round 2.
            <br />
            <b>Entry Fee For Round 1:</b> None. It&apos;s free to
            shoot your shot.
            <br />
            <br />
            <span className="text-black-300 font-semibold">
              💡 Note: If you don&apos;t have past experience, feel free to
              showcase your best ideas instead!
            </span>
            <br />
          </>
        }

          //cta={{
          //  label: "Submit on Google Forms",
          //  href: "https://forms.gle/FiBkTbkz63U89HDWA",
          //}}
        />
      ),
    },
    {
      title: "10th September 2025",
      content: (
        <Card
          index={3}
          badge="Deadline"
          title="Submission Deadline"
          content={
            <>
              <b>Deadline:</b> 10th September 2025, 11:59 PM IST
              <br />
              This is your final call to upload your Round 1 submission.
              <br />
              Late entries? Not a chance. Set a reminder.
            </>
          }
        />
      ),
    },
    {
      title: "12th September 2025",
      content: (
        <Card
          index={2}
          badge="Approval"
          title="First Batch Approval"
          content={
            <>
              <b>Date:</b> 12th September 2025
              <br />
              First batch of selected teams will be announced on this day.
              <br />
              If you made the cut, you'll be added to a
              dedicated group for all further updates and event prep info.
              <br />
            </>
          }
        />
      ),
    },
    
    {
      title: "16th September 2025",
        content: (
          <Card
            index={4}
            badge="Payment Deadline"
            title="Final Payment Deadline"
            content={
              <>
                <b>Deadline:</b> 16th September 2025
                <br />
                This is the final date to complete your payment.
                <br />
                Make sure to finish the process before the deadline to secure your participation in Round 2.
                <br />
                Payment details and full prep kit will be shared with registered teams.
              </>
            }
          />
        ),
    },
    {
      title: "20th September 2025",
      content: (
        <Card
          index={5}
          badge="Round 2"
          title="Offline Hackathon (Finale)"
          content={
            <>
              <b>Starts:</b> 20th September 2025, 1:00 PM IST
              <br />
              <b>Ends:</b> 21st September 2025, 11:00 AM IST
              <br />
              <b>Venue:</b> MVGR College of Engineering - CSE Department
              <br />
              <br />It&apos;s a 24-hour
              build-from-scratch hackathon — no past projects, no shortcuts.
              <br />
              Fresh idea. Real code. Full chaos.
              <br />
              <b>Note:</b> You <i>cannot</i> reuse Round 1 Project, we&apos;re
              looking for fresh heat.
              <br />
              <b>Entry Fee:</b> ₹299 per member (only if selected)
            </>
          }
        />
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="relative w-full min-h-screen bg-[#141414]"
        style={{ scrollBehavior: "smooth" }}
      >
        <Timeline data={data} />
      </div>
    </>
  );
}
