"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface BatchDetailsProps {
  onCtaClick: () => void;
}

export default function BatchDetails({ onCtaClick }: BatchDetailsProps) {
  // Simulate live seat countdown — 1 June batch starts at 7 seats
  const [juneSeats, setJuneSeats] = useState(7);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.82) {
        setJuneSeats((prev) => (prev > 2 ? prev - 1 : 2));
      }
    }, 18000);
    return () => clearInterval(t);
  }, []);

  // Progress bar: seats filled out of 25
  const juneFilled = 25 - juneSeats;
  const junePercent = Math.round((juneFilled / 25) * 100);

  return (
    <section
      className="w-full py-12 sm:py-16 border-b border-[#1e3a30]"
      style={{ background: "#0e1f1a" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* ── Left: heading + body copy ── */}
          <div className="lg:col-span-6 space-y-5">

            {/* Badge pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
              style={{
                background: "rgba(212,146,28,0.15)",
                border: "1px solid rgba(212,146,28,0.4)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#D4921C" }}
              />
              <div
                className="text-[11px] font-mono font-black uppercase tracking-[0.18em]"
                style={{ color: "#D4921C" }}
              >
                Batch Reservations Almost Closed
              </div>
            </div>

            {/* Headline */}
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-white leading-tight">
              Admissions Open –{" "}
              <span style={{ color: "#D4921C" }}>Reserve Your Seat</span>
            </h2>

            {/* Body */}
            <p
              className="text-xs sm:text-sm leading-relaxed font-medium"
              style={{ color: "#9bbfae" }}
            >
              Limited seats available. Secure your admission before seats fill.
              Batch size is capped at 20–25 students to ensure focused mentoring
              and personalised training.
            </p>

            {/* Check list */}
            <ul className="space-y-2.5">
              {[
                "Batch: 15 June 2026",
                "Mode: Online & Offline (Nagpur Campus)",
                "Batch Size: 20–25 Students Only",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "#01F182" }}
                  />
                  <div
                    className="text-[15px] font-mono font-bold"
                    style={{ color: "#b2f5d8" }}
                  >
                    {item}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: seat allocator card ── */}
          <div className="lg:col-span-6">
            <div
              className="rounded-2xl p-6 space-y-6"
              style={{
                background: "#111f1a",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >

              {/* Card label */}
              <p
                className="text-[10px] font-mono font-black uppercase tracking-[0.18em]"
                style={{ color: "#9bbfae" }}
              >
                Active Seats Allocator Status:
              </p>

              {/* Seat rows */}
              <div className="space-y-5">

                {/* 1 June 2026 — dynamic */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div
                      className="text-[15px] font-mono font-bold"
                      style={{ color: "#e2f5ec" }}
                    >
                      15 June 2026 Cohort:
                    </div>
                    <div
                      className="text-[15px] font-mono font-black"
                      style={{
                        color: juneSeats <= 3 ? "#E8372F" : "#D4921C",
                      }}
                    >
                      {juneSeats} seats left
                      {juneSeats <= 3 ? "!" : ""}
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{
                      height: "6px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${junePercent}%`,
                        background:
                          juneSeats <= 3
                            ? "#E8372F"
                            : "linear-gradient(90deg,#D4921C,#f5b942)",
                      }}
                    />
                  </div>
                  <p
                    className="text-[12px] font-mono"
                    style={{ color: "rgba(155,191,174,0.6)" }}
                  >
                    {juneFilled} of 25 seats reserved
                  </p>
                </div>

              </div>

              {/* Divider */}
              <div
                className="w-full"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.07)",
                }}
              />

              {/* CTA Button */}
              <button
                onClick={onCtaClick}
                className="w-full font-sans font-black text-[12px] uppercase tracking-[0.18em] py-4 rounded-xl transition-all duration-200 cursor-pointer"
                style={{
                  background: "#D4921C",
                  color: "#fff",
                  letterSpacing: "0.18em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b87d15";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#D4921C";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Reserve My Seat
              </button>

              {/* Micro note */}
              <p
                className="text-center text-[10px] font-mono"
                style={{ color: "rgba(155,191,174,0.55)" }}
              >
                Free counseling call included with every reservation
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}