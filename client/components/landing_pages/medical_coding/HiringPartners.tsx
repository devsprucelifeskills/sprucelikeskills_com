"use client";

import React from "react";

// Logo sources via logo.dev CDN (reliable, no API key needed for basic use)
// Fallback to text initials if image fails
const partners = [
  {
    name: "TCS",
    domain: "tcs.com",
    logo: "https://tse4.mm.bing.net/th/id/OIP.iz0l2PLYQDTZgy32ELt1UAHaEa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Cognizant",
    domain: "cognizant.com",
    logo: "https://contentstatic.techgig.com/photo/90461551/cognizant-announces-new-logo-tagline-aims-at-accelerating-digital-business.jpg",
  },
  {
    name: "IQVIA",
    domain: "iqvia.com",
    logo: "https://images.seeklogo.com/logo-png/32/1/iqvia-logo-png_seeklogo-322001.png",
  },
  {
    name: "Access Healthcare",
    domain: "accesshealthcare.com",
    logo: "https://accesshealthcare.ie/wp-content/uploads/2022/12/Access-Healthcare-Logo.png",
  },
  {
    name: "GeBBS",
    domain: "gebbs.com",
    logo: "https://www.healthevolution.com/wp-content/uploads/2022/08/gebbs-logo-tagline-vector-1.png",
  },
  {
    name: "Avontix",
    domain: "avontix.com",
    logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWGimswf5vJVb9dPNC_T7OFXd1XIqkDsXIPzTBdF2t8kAxwaXbZJ2hCNi7Gz9fDUso_NhgVvdRtVrh8FY3yzwujVgm6t5XUA23yCbwhSyE0fNNUi4cptBppMqBOTwOEtfzxXQ6uYOSb7U/s1600/avontix.jpg",
  },
  {
    name: "Meditrina",
    domain: "meditrina.com",
    logo: "https://www.pharmaindustrial-india.com/images/noticias/2087-capture-45-8634.JPG",
  },
];

function LogoCard({ partner }: { partner: { name: string; domain: string; logo: string }; key?: any }) {
  const [imgError, setImgError] = React.useState(false);

  const initials = partner.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-8 py-5 rounded-2xl shrink-0 transition-all duration-300 hover:-translate-y-1 select-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        minWidth: "160px",
        maxWidth: "180px",
      }}
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: "#fff" }}
      >
        {!imgError ? (
          <img
            src={partner.logo}
            alt={partner.name + " logo"}
            className="w-12 h-12 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className="text-lg font-black"
            style={{ color: "#0A7A3F" }}
          >
            {initials}
          </span>
        )}
      </div>
      <span
        className="text-xs font-bold text-center leading-tight"
        style={{ color: "#e2f5ec" }}
      >
        {partner.name}
      </span>
    </div>
  );
}

export default function HiringPartners() {
  // Duplicate array for seamless infinite loop
  const track = [...partners, ...partners];

  return (
    <section
      className="w-full py-14 sm:py-20 border-b border-[#1e3a30] overflow-hidden"
      style={{ background: "#0e1f1a" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div
            className="w-1 rounded-full shrink-0 mt-1"
            style={{
              background: "#01F182",
              height: "52px",
              minWidth: "4px",
            }}
          />
          <div>
            <span
              className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-1"
              style={{ color: "rgba(1,241,130,0.65)" }}
            >
              Recruitment Network
            </span>
            <h2 className="font-sans font-black text-xl sm:text-2xl leading-tight text-white">
              Our Students Have Opportunities With Leading Companies
            </h2>
          </div>
        </div>

      </div>

      {/* Marquee Track — full bleed, no inner padding */}
      <div className="relative mt-8">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0e1f1a 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #0e1f1a 0%, transparent 100%)",
          }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-4 w-max"
          style={{
            animation: "marquee 32s linear infinite",
            paddingLeft: "16px",
          }}
        >
          {track.map((partner, i) => (
            <LogoCard key={i} partner={partner} />
          ))}
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}