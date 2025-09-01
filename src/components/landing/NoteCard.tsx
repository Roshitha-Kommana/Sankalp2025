import React from "react";

const NoteCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-green-100 text-black p-8 rounded-2xl shadow-xl mt-12 text-base md:text-lg font-semibold font-sans text-center w-11/12 max-w-4xl mx-auto">
  <span className="block text-2xl sm:text-3xl md:text-4xl font-black mb-4 font-sans">Remember</span>
    <ul className="list-disc list-inside text-left inline-block">
  <li>Registration is <span className='font-bold text-green-700'>free</span> for Round 1.</li>
  <li>If shortlisted, the team must pay <span className='font-bold text-white bg-black px-1 rounded'>₹299</span> per member <span className='italic'>(e.g. a team of 4 members should pay 4×299 = <span className='font-bold'>₹1196</span>)</span>. Payment should be made as a single transaction for the whole team.</li>
      <li>Only team leaders should fill the form and join the WhatsApp group.</li>
      <li>No restrictions on team formation – members may belong to different departments or academic years.</li>
      <li>All participants should bring their own laptop and chargers.</li>
    </ul>
  </div>
);

export default NoteCard;
