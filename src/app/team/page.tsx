"use client";

import React, { useRef, useState } from "react";
import Navbar from "@/components/global/nav";
import TeamCard from "@/components/ui/TeamCard";
import VariableProximity from "@/components/ui/VariableProximity";

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  phone?: string; // <-- optional now
  department: string;
  role?: string; // for organizer designation
  category: "organizer" | "team";
  image?: string;
}

// Organizer data
// Organizer data
const organizers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Aruna Srinivas",
    department: "CSE",
    role: "Professor & HOD",
    category: "organizer",
    image: "/arunamam.jpg"
  },
  {
    id: 2,
    name: "K. Sobha Rani",
    department: "CSE",
    role: "Professor(TP)",
    category: "organizer",
    image: "/sobharani.jpg" // <-- place this in your public folder
  },
  {
    id: 3,
    name: "Dr. P. Rama Santosh Naidu",
    phone: "+91 90001 80181",
    department: "CSE",
    role: "Distinguished Assistant Professor",
    category: "organizer",
    image: "/santoshsir_.jpg"
  },
];


// Team Members data
const teamMembers: TeamMember[] = [
  { id: 1, name: "Varshini", phone: "+91 93925 82944", department: "CSE", category: "team" ,image: "/varshini1.jpg"},
  { id: 2, name: "Balaji Rao", phone: "+91 94904 00535", department: "CSE", category: "team",image: "/balaji.jpg" },
  { id: 3, name: "Chaitanya Varma", phone: "+91 80967 24666", department: "CSE", category: "team",image: "/chaitanya.jpg" },
  { id: 4, name: "Bhuvana", phone: "+91 86392 77804", department: "CSE", category: "team" ,image: "/bhuvana.jpg"},
  { id: 5, name: "Renuka", phone: "+91 99666 70197", department: "CSE", category: "team",image: "/renuka.jpg" },
  { id: 6, name: "Prashanti", phone: "+91 98714 23404", department: "CSE", category: "team" ,image: "/prashantii.jpg"},
  { id: 7, name: "Usha", phone: "+91 63058 45616", department: "CSE", category: "team" ,image: "/usha.jpg"},
  { id: 8, name: "Manoj", phone: "+91 91546 76764", department: "CSE", category: "team" ,image: "/manoj.jpg"},
  { id: 9, name: "Satya Mahesh", phone: "+91 94942 52900", department: "CSE", category: "team",image: "/satya_mahesh.jpg" },
  { id: 10, name: "Sai Charan", phone: "+91 62815 01174", department: "CSE", category: "team" ,image: "/SaiCharan.jpg"},
  { id: 11, name: "Jaswanth", phone: "+91 62815 01476", department: "CSE", category: "team" ,image: "/jaswanth_.jpg"},
  { id: 12, name: "Harsha", phone: "+91 81796 33582", department: "CSE", category: "team",image: "/Harsha.jpg" },
  { id: 13, name: "Roshitha", phone: "+91 63026 80957", department: "CSE", category: "team" ,image: "/Roshitha.jpg"},
];

const TeamPage = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] text-[#fcf2e8] pb-20 px-6">
        {/* Header Section */}
        <div
          ref={containerRef}
          className="text-center h-screen mb-16 flex flex-col items-center justify-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-[#fcf2e8] mb-6">
            <VariableProximity
              label="Meet The Team"
              fromFontVariationSettings="wght 200"
              toFontVariationSettings="wght 900"
              radius={400}
              containerRef={containerRef}
            />
          </h1>
          <p className="text-xl md:text-2xl text-[#ccc] max-w-3xl mx-auto">
            The passionate individuals behind Sankalp Hackathon.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Organizer Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4">
                <span className="inline-block px-4 py-1 bg-pink-300 rounded-2xl border-4 border-white">
                  Organizer
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#ccc] max-w-2xl mx-auto">
                The guiding force behind Sankalp
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {organizers.map((member) => (
                <TeamCard
                  key={`organizer-${member.id}`}
                  member={member}
                  onMouseEnter={setHoveredMember}
                  onMouseLeave={() => setHoveredMember(null)}
                />
              ))}
            </div>
          </div>

          {/* Team Members Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4">
                <span className="inline-block px-4 py-1 bg-pink-300 rounded-2xl border-4 border-white">
                  Team Members
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#ccc] max-w-2xl mx-auto">
                Dedicated students making Sankalp a success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamCard
                  key={`team-${member.id}`}
                  member={member}
                  onMouseEnter={setHoveredMember}
                  onMouseLeave={() => setHoveredMember(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
