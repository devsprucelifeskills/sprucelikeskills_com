"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Briefcase, Users, Shield, FileCheck, ShieldAlert } from "lucide-react";

interface AuthorityCard {
  id: string;
  badge: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string; // Tailwind text color
  iconBg: string; // Tailwind background color for inactive
  activeBg: string; // Vibrant background color for active card's icon (like the purple-vibe from image)
}

export default function AuthorityShufflingCards() {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Center by default
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const cards: AuthorityCard[] = [
    {
      id: "aapc",
      badge: "AAPC LICENSED",
      title: "CPC® Licensed Curriculum",
      icon: Award,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200/50",
      activeBg: "bg-amber-500 text-white"
    },
    {
      id: "rtmnu",
      badge: "NEP ALIGNED",
      title: "RTMNU Credit Transfer Hub",
      icon: GraduationCap,
      iconColor: "text-emerald-700",
      iconBg: "bg-emerald-50 border-emerald-200/50",
      activeBg: "bg-emerald-650 text-white"
    },
    {
      id: "placements",
      badge: "MNC LEADER",
      title: "50+ Partner MNC Placements",
      icon: Briefcase,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-200/50",
      activeBg: "bg-blue-600 text-white"
    },
    {
      id: "brand",
      badge: "ALUMNI PIONEER",
      title: "3,500+ Qualified Alumni",
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50 border-purple-200/50",
      activeBg: "bg-purple-600 text-white"
    },
    {
      id: "iso",
      badge: "ISO AUDITED",
      title: "ISO 9001:2015 Compliance Code",
      icon: Shield,
      iconColor: "text-teal-650",
      iconBg: "bg-teal-50 border-teal-200/50",
      activeBg: "bg-teal-600 text-white"
    },
    {
      id: "simulators",
      badge: "PREMIUM SIMS",
      title: "1,250+ Interactive CPC® Solvers",
      icon: FileCheck,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 border-rose-200/50",
      activeBg: "bg-rose-600 text-white"
    },
    {
      id: "pioneer",
      badge: "NAGPUR TRUST",
      title: "Central India Pioneer Since 2013",
      icon: ShieldAlert,
      iconColor: "text-indigo-650",
      iconBg: "bg-indigo-50 border-indigo-200/50",
      activeBg: "bg-indigo-600 text-white"
    }
  ];

  // Smooth circular auto-shuffling interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isHovered, cards.length]);

  // Wrap index arithmetic to display cards around active center
  const getCardOffsetState = (index: number) => {
    let diff = index - activeIndex;
    const n = cards.length;
    // Circular bounds
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  return (
    <div className="w-full relative py-0 my-0 font-sans" id="authority-conveyor-belt">
      {/* Tight fluid wrapper with decreased height matching exactly to hero style constraints */}
      <div
        className="relative h-[155px] w-full max-w-[390px] sm:max-w-[430px] mx-auto md:mx-0 overflow-hidden flex items-center justify-center transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-[135px]">
          {cards.map((card, idx) => {
            const offset = getCardOffsetState(idx);
            const isActive = offset === 0;

            // Geometry metrics matching a compact, professional overlapping ribbon deck. 
            // Total height inside bounds is 135px. Cards are 44px tall.
            let yVal = 45;
            let scaleVal = 1;
            let opacityVal = 1;
            let zIdx = 30;
            let xOffset = 0;
            let filterVal = "blur(0px)";

            if (offset === 0) {
              yVal = 45;
              scaleVal = 1.0;
              opacityVal = 1.0;
              zIdx = 45;
              filterVal = "blur(0px)";
              xOffset = 0;
            } else if (offset === -1) {
              yVal = 5;
              scaleVal = 0.93;
              opacityVal = 0.55;
              zIdx = 35;
              filterVal = "blur(0.5px)";
              xOffset = -4; // subtle stagger
            } else if (offset === 1) {
              yVal = 85;
              scaleVal = 0.93;
              opacityVal = 0.55;
              zIdx = 35;
              filterVal = "blur(0.5px)";
              xOffset = 4; // subtle stagger
            } else {
              // Hide completely to keep exactly 3 cards visible at any time
              yVal = offset < 0 ? -40 : 140;
              scaleVal = 0.80;
              opacityVal = 0;
              zIdx = 0;
              filterVal = "blur(2.8px)";
            }

            const CardIcon = card.icon;

            return (
              <motion.div
                key={card.id}
                style={{
                  zIndex: zIdx,
                  transformOrigin: "center center",
                }}
                animate={{
                  y: yVal,
                  x: xOffset,
                  scale: scaleVal,
                  opacity: opacityVal,
                  filter: filterVal,
                  width: isActive ? "100%" : "93%"
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 19,
                  mass: 0.8
                }}
                onClick={() => setActiveIndex(idx)}
                className={`absolute left-0 right-0 mx-auto h-[44px] flex items-center gap-3.5 px-3 py-2.5 rounded-xl border cursor-pointer select-none transition-shadow duration-300 ${isActive
                  ? "bg-white border-emerald-100 shadow-[0_10px_22px_rgba(10,122,63,0.05),0_1.5px_4px_rgba(10,122,63,0.01)]"
                  : "bg-white/85 border-zinc-200/40 hover:bg-white/95"
                  }`}
              >
                {/* Left Side: Dynamic Colored Icon Badge */}
                <div
                  className={`w-7.5 h-7.5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-350 ${isActive ? `${card.activeBg} border-transparent shadow shadow-emerald-950/5` : `${card.iconBg} ${card.iconColor} border-[#E0DDD8]/30`
                    }`}
                >
                  <CardIcon className="w-4 h-4" />
                </div>

                {/* Title Text Inline */}
                <span
                  className={`text-[12px] sm:text-[13px] tracking-tight font-sans transition-colors duration-300 ${isActive ? "text-zinc-950 font-extrabold" : "text-zinc-500 font-semibold"
                    }`}
                >
                  {card.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
