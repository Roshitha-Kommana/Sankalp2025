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
const organizers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Aruna Srinivas",
    department: "Computer Science and Engineering (CSE)",
    role: "Professor & HOD",
    category: "organizer",
    image: "/arunamam.jpg",
  },
  {
    id: 2,
    name: "Dr. Anjana Devi B",
    department: "Information Technology (IT)",
    role: "Associate Professor & HOD",
    category: "organizer",
    image: "/it_hod.jpg",
  },
  {
    id: 3,
    name: "Dr. V. Jyothi",
    department: "Data Engineering (DE)",
    role: "Associate Professor & HOD",
    category: "organizer",
    image: "/de_hod.jpg",
  },
  {
    id: 4,
    name: "Dr. P. Rama Santosh Naidu",
    department: "Computer Science and Engineering (CSE)",
    role: "Distinguished Assistant Professor",
    category: "organizer",
    image: "/santoshsir_.jpg",
  },
];

// Team Members data
const teamMembers: TeamMember[] = [
  { id: 1, name: "Varshini", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/varshini1.jpg"},
  { id: 2, name: "Balaji Rao", department: "Computer Science and Engineering (CSE)", category: "team",image: "/balaji.jpg" },
  { id: 3, name: "Chaitanya Varma", department: "Computer Science and Engineering (CSE)", category: "team",image: "/chaitanya.jpg" },
  { id: 4, name: "Bhuvana", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/bhuvana.jpg"},
  { id: 5, name: "Renuka", department: "Computer Science and Engineering (CSE)", category: "team",image: "/renuka.jpg" },
  { id: 6, name: "Prashanti", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/prashantii.jpg"},
  { id: 7, name: "Usha", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/usha.jpg"},
  { id: 8, name: "Manoj", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/manoj.jpg"},
  { id: 9, name: "Satya Mahesh", department: "Computer Science and Engineering (CSE)", category: "team",image: "/satya_mahesh.jpg" },
  { id: 10, name: "Sai Charan", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/SaiCharan.jpg"},
  { id: 11, name: "Jaswanth", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/jaswanth_.jpg"},
  { id: 12, name: "Harsha", department: "Computer Science and Engineering (CSE)", category: "team",image: "/Harsha.jpg" },
  { id: 13, name: "Roshitha", department: "Computer Science and Engineering (CSE)", category: "team" ,image: "/Roshitha.jpg"},
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

        <div className="mx-auto">
          {/* Special Thanks Note */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4">
              <span className="inline-block px-4  py-1 bg-pink-300 rounded-2xl border-4 border-white">
                Special Thanks
              </span>
            </h2>
          </div>
          <div className="bg-[#fcf2e8] border-l-8 shadow-lg rounded-2xl p-8 text-center mb-16 max-w-xl mx-auto font-serif">
            <p className="text-lg md:text-xl text-[#444] mb-3 leading-relaxed font-serif">
              We extend our heartfelt gratitude to our respected <span className="font-bold text-[#141414]">Director P. S. Sitharama Raju garu</span> and <span className="font-bold text-[#141414]">Principal Dr. Y. M. C. Sekhar garu</span> for their constant support, guidance, and encouragement, which continues to inspire us as we move forward in conducting <span className="font-extrabold">SANKALP</span> successfully.
            </p>
          </div>

          {/* Organizer Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4">
                <span className="inline-block px-4 py-1 bg-pink-300 rounded-2xl border-4 border-white">
                  Organizers
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#ccc] max-w-2xl mx-auto">
                The guiding force behind Sankalp
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
