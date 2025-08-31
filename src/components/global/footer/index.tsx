"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { Great_Vibes } from "next/font/google";

// Load cursive font
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Timeline", href: "/timeline" },
  { name: "Team", href: "/team" },
  { name: "Register", href: "https://forms.gle/FiBkTbkz63U89HDWA" },
];

// Hover background colors for nav links
const hoverBgColors = [
  "hover:bg-[#c5ffc9]",
  "hover:bg-[#f9ffa5]",
  "hover:bg-[#feaac0]",
  "hover:bg-[#dcd0fe]",
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#fcf2e8] text-black px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Side: Sankalp + College Name */}
        <div className="flex flex-col space-y-2">
          <h2
            className={`text-5xl md:text-6xl font-bold ${greatVibes.className}`}
          >
            Sankalp 2025
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gray-800">
            Maharaj Vijayaram Gajapathi Raj College of Engineering
          </p>
        </div>

        {/* Right Side: Navigation - Horizontal */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-4">
            Navigation
          </h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-black font-semibold text-lg px-4 py-2 rounded-md border-2 border-transparent transition-all duration-300 ${
                  hoverBgColors[i % hoverBgColors.length]
                } hover:border-black`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider ONLY between navigation and social links */}
      <div className="border-t border-gray-400 mt-8 pt-6">
        {/* Social Links */}
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <a
            href="https://www.instagram.com/mvgr_sankalp/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:sankalpmvgrce@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Sankalp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
