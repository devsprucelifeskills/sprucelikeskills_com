"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    tag: "AAPC Authorized · Central India",
    line1: "Education That",
    line2: "Powers Your",
    circled: "Ambition",
    sub: <>Online degrees &amp; courses from <span style={{ color: "#13523f", fontStyle: "italic" }}>Spruce Lifeskills.</span></>,
    cta: "Explore Courses",
    href: "/courses",
  },
  {
    tag: "13 Years of Proven Results",
    line1: "Careers Built on",
    line2: "Clinical",
    circled: "Excellence",
    sub: <>Train with AAPC-certified faculty and land your dream <span style={{ color: "#13523f", fontStyle: "italic" }}>healthcare career.</span></>,
    cta: "View Courses",
    href: "/courses",
  },
  {
    tag: "First Institute in Central India",
    line1: "Trusted by",
    line2: "3,788+",
    circled: "Students",
    sub: <>Our graduates work at Cognizant, Novartis, GeBBS &amp; <span style={{ color: "#13523f", fontStyle: "italic" }}>32+ top companies.</span></>,
    cta: "View Placements",
    href: "/placement",
  },
];

const courses = [
  { label: "Medical Coding", href: "/courses/medical-coding", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop" },
  { label: "Clinical Research", href: "/courses/clinical-research", img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=400&auto=format&fit=crop" },
  { label: "Medical Billing", href: "/courses/medical-billing", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop" },
  { label: "Campus to Corporate", href: "/courses/campus-corporate", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=400&auto=format&fit=crop" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey(k => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const s = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap');

        .hs { font-family:'Inter',sans-serif; }
        .hs-serif { font-family:'Playfair Display',serif; }

        /* Grid bg */
        .hs-grid {
          background-color:#f0f0ee;
          background-image:
            linear-gradient(rgba(0,0,0,.055) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,0,0,.055) 1px,transparent 1px);
          background-size:34px 34px;
        }

        /* Keyframes */
        @keyframes txUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes txIn  { from{opacity:0} to{opacity:1} }
        @keyframes prog  { from{width:0} to{width:100%} }
        @keyframes spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        .tx-tag { animation:txIn  .35s ease both }
        .tx-h1  { animation:txUp  .45s .05s ease both }
        .tx-sub { animation:txUp  .45s .15s ease both }
        .tx-cta { animation:txUp  .45s .22s ease both }
        .prog-bar { animation:prog 5.5s linear forwards }
        .star-spin{ animation:spin 9s linear infinite }
        .dot-pulse{ animation:pulse 2s ease infinite }

        /* Buttons */
        .btn-o {
          display:inline-flex;align-items:center;gap:8px;
          background:#13523f;color:#fff;border:none;border-radius:50px;
          padding:14px 32px;font-size:15px;font-weight:700;
          font-family:'Inter',sans-serif;text-decoration:none;cursor:pointer;
          transition:background .2s,transform .15s,box-shadow .2s;
          white-space:nowrap;
        }
        .btn-o:hover{background:#1a6e4a;transform:translateY(-2px);box-shadow:0 8px 20px rgba(19,82,63,.32)}
        .btn-g {
          display:inline-flex;align-items:center;gap:6px;
          background:#fff;color:#374151;border:1.5px solid #d1d5db;
          border-radius:50px;padding:13px 26px;font-size:15px;font-weight:600;
          font-family:'Inter',sans-serif;text-decoration:none;cursor:pointer;
          transition:border-color .2s,color .2s;white-space:nowrap;
        }
        .btn-g:hover{border-color:#13523f;color:#13523f}

        /* Nav circle */
        .nav-c {
          width:36px;height:36px;border-radius:50%;
          border:1.5px solid #d1d5db;background:#fff;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;padding:0;
          transition:border-color .2s,background .2s;
        }
        .nav-c:hover{border-color:#13523f;background:#f0faf7}

        /* Course card */
        .cc {
          background:#fff;border-radius:18px;overflow:hidden;
          box-shadow:0 2px 16px rgba(0,0,0,.09);
          flex:0 0 150px;text-decoration:none;
          transition:transform .2s,box-shadow .2s;
        }
        .cc:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(0,0,0,.13)}
        .cc img{display:block;width:100%;height:90px;object-fit:cover}
        .cc-lbl{padding:9px 10px 11px;font-size:12px;font-weight:700;color:#1a1a1a;text-align:center;line-height:1.3}

        /* Pill tag */
        .hs-pill{
          display:inline-flex;align-items:center;gap:7px;
          background:#fff;border:1px solid #e5e5e5;border-radius:50px;
          padding:6px 14px;font-size:12px;font-weight:600;color:#444;
        }

        /* Circled word */
        .cw{position:relative;display:inline-block}
        .cw svg{
          position:absolute;inset:-10px -8px;
          width:calc(100% + 16px);height:calc(100% + 20px);
          pointer-events:none;
        }

        /* ── MOBILE styles ── */
        .hs-wrap{
          display:flex;flex-direction:column;
          min-height:100svh;position:relative;
        }
        .hs-right{ display:none }

        /* Mobile image bg strip */
        .hs-imgbg{
          width:100%;height:220px;position:relative;overflow:hidden;
          flex-shrink:0;
        }
        .hs-imgbg img{
          width:100%;height:100%;object-fit:cover;object-position:top center;
          display:block;
        }
        .hs-imgbg-fade{
          position:absolute;bottom:0;left:0;right:0;height:80px;
          background:linear-gradient(to top,#f0f0ee,transparent);
          pointer-events:none;
        }

        /* Mobile text */
        .hs-left{
          flex:1;display:flex;flex-direction:column;justify-content:flex-start;
          padding:20px 22px 28px;
        }
        .hs-h1-size{ font-size:2.3rem }
        .hs-sub-size{ font-size:15px }
        .hs-minblock{ min-height:0 }

        /* Mobile course cards — 3 visible + peek */
        .hs-cards{
          display:flex;gap:12px;overflow-x:auto;
          scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
          scrollbar-width:none;padding-bottom:4px;
          margin-top:24px;
        }
        .hs-cards::-webkit-scrollbar{display:none}
        .cc{ scroll-snap-align:start }

        /* Mobile badge strip */
        .hs-badges{
          display:flex;gap:10px;flex-wrap:wrap;
          margin-top:20px;
        }
        .hs-badge{
          display:flex;align-items:center;gap:6px;
          background:#fff;border:1px solid #ebebeb;border-radius:12px;
          padding:8px 12px;
        }

        /* ── TABLET 640px+ ── */
        @media(min-width:640px){
          .hs-imgbg{ height:300px }
          .hs-h1-size{ font-size:3rem }
          .cc{ flex:0 0 170px }
          .cc img{ height:100px }
        }

        /* ── DESKTOP 1024px+ ── */
        @media(min-width:1024px){
          .hs-wrap{
            flex-direction:row;
            min-height:calc(100vh - 108px);
            max-height:900px;
          }
          .hs-imgbg{ display:none }
          .hs-left{
            flex:0 0 45%;
            padding:44px 32px 36px 28px;
            justify-content:center;
          }
          .hs-right{
            flex:1;display:flex;
            align-items:flex-end;justify-content:center;
            position:relative;overflow:hidden;
          }
          .hs-h1-size{ font-size:clamp(2rem,3.8vw,3.3rem) }
          .hs-sub-size{ font-size:15px }
          .hs-minblock{ min-height:300px }
          .cc{ flex:0 0 130px }
          .cc img{ height:85px }
        }

        @media(min-width:1280px){
          .hs-h1-size{ font-size:clamp(2.5rem,3.5vw,3.6rem) }
          .hs-left{ padding:44px 36px 36px 28px }
        }
      `}</style>

      <section className="hs hs-grid w-full overflow-hidden">

        {/* Mobile image banner — hidden on desktop */}
        <div className="hs-imgbg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.qph3dRWo0A3UFjJZc-RRngHaGN?w=940&h=788&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Students"
          />
          <div className="hs-imgbg-fade" />
          {/* Rotated badge on mobile */}
          <div style={{
            position: "absolute", top: "16px", right: "16px", zIndex: 5,
            background: "#13523f", borderRadius: "12px",
            padding: "8px 12px", textAlign: "center",
            transform: "rotate(8deg)",
            boxShadow: "0 3px 12px rgba(0,0,0,.15)"
          }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
              Onwards<br />&amp; Upwards
            </div>
          </div>
          {/* AAPC badge on mobile */}
          <div style={{
            position: "absolute", top: "16px", left: "16px", zIndex: 5,
            background: "#fff", borderRadius: "12px",
            padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,.12)"
          }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "8px",
              background: "#13523f", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 800, color: "#111", lineHeight: 1 }}>AAPC Authorized</div>
              <div style={{ fontSize: "9px", color: "#666", marginTop: "1px" }}>Central India</div>
            </div>
          </div>
        </div>

        <div className="hs-wrap" style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>

          {/* ════ LEFT / MAIN TEXT ════ */}
          <div className="hs-left">

            {/* Fixed-height text container */}
            <div className="hs-minblock" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div key={animKey}>

                {/* Tag pill */}
                <div className="tx-tag hs-pill" style={{ marginBottom: "18px" }}>
                  <span className="dot-pulse" style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#13523f", display: "inline-block", flexShrink: 0
                  }} />
                  {s.tag}
                </div>

                {/* Heading */}
                <div className={`tx-h1 hs-serif hs-h1-size`}
                  style={{
                    fontWeight: 900, color: "#111", lineHeight: 1.1,
                    marginBottom: "16px", opacity: 0
                  }}>
                  <div>{s.line1}</div>
                  <div>{s.line2}</div>
                  <div>
                    <span className="cw">
                      {s.circled}
                      <svg viewBox="0 0 200 70" fill="none" preserveAspectRatio="none">
                        <ellipse cx="100" cy="35" rx="93" ry="28"
                          stroke="#13523f" strokeWidth="3" fill="none" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Sub */}
                <p className={`tx-sub hs-sub-size`}
                  style={{
                    color: "#555", lineHeight: 1.65,
                    marginBottom: "24px", opacity: 0
                  }}>
                  {s.sub}
                </p>

                {/* CTAs */}
                <div className="tx-cta" style={{
                  display: "flex", gap: "12px",
                  flexWrap: "wrap", opacity: 0
                }}>
                  <Link href={s.href} className="btn-o">
                    {s.cta}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/contact" className="btn-g">Contact Us</Link>
                </div>
              </div>
            </div>

            {/* Slide controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "22px" }}>
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => goTo(idx)} aria-label={`Slide ${idx + 1}`}
                  style={{
                    background: "none", border: "none", padding: 0, cursor: "pointer",
                    position: "relative", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: "8px"
                  }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: idx === current ? "#13523f" : "#d1d5db",
                    transform: idx === current ? "scale(1.45)" : "scale(1)",
                    transition: "all .3s",
                  }} />
                  {idx === current && (
                    <div style={{
                      position: "absolute", top: "16px", width: "36px",
                      height: "3px", borderRadius: "99px",
                      background: "#e5e7eb", overflow: "hidden"
                    }}>
                      <div key={animKey} className="prog-bar"
                        style={{
                          height: "100%", background: "#13523f",
                          borderRadius: "99px", width: 0
                        }} />
                    </div>
                  )}
                </button>
              ))}

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "12px" }}>
                <button className="nav-c"
                  onClick={() => goTo((current - 1 + slides.length) % slides.length)}
                  aria-label="Previous">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#555" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span style={{
                  fontSize: "12px", fontWeight: 600, color: "#9ca3af",
                  minWidth: "36px", textAlign: "center"
                }}>
                  {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <button className="nav-c" onClick={next} aria-label="Next">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#555" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Trust badges row — mobile only ── */}
            <div className="hs-badges" style={{ display: "flex" }}>
              {[
                { num: "3,788+", lbl: "Students" },
                { num: "32+", lbl: "Partners" },
                { num: "13+", lbl: "Years" },
              ].map((b, i) => (
                <div key={i} className="hs-badge">
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#13523f", lineHeight: 1 }}>{b.num}</span>
                  <span style={{ fontSize: "11px", color: "#666", fontWeight: 500 }}>{b.lbl}</span>
                </div>
              ))}
            </div>

            {/* Course cards */}
            <div className="hs-cards">
              {courses.map((c, i) => (
                <Link key={i} href={c.href} className="cc">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.label} />
                  <div className="cc-lbl">{c.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* ════ RIGHT — desktop only ════ */}
          <div className="hs-right" style={{ position: "relative", overflow: "hidden" }}>

            {/* Badges row — floats above image, never overlaps faces */}
            <div style={{
              position: "absolute", top: "16px", left: 0, right: 0,
              zIndex: 20, display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", padding: "0 18px",
              pointerEvents: "none"
            }}>
              {/* AAPC badge */}
              <div style={{
                background: "#fff", borderRadius: "16px",
                padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px",
                boxShadow: "0 4px 20px rgba(0,0,0,.12)", pointerEvents: "auto"
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  background: "#13523f", display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#111", lineHeight: 1 }}>AAPC Authorized</div>
                  <div style={{ fontSize: "10px", color: "#666", marginTop: "3px" }}>Only in Central India</div>
                </div>
              </div>
              {/* Onwards badge */}
              <div style={{
                background: "#13523f", borderRadius: "14px",
                padding: "10px 14px", textAlign: "center",
                transform: "rotate(8deg)",
                boxShadow: "0 4px 16px rgba(0,0,0,.15)", pointerEvents: "auto"
              }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
                  Onwards<br />&amp; Upwards
                </div>
              </div>
            </div>

            {/* Blue abstract blobs */}
            <svg style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              pointerEvents: "none"
            }}
              viewBox="0 0 500 600" fill="none" preserveAspectRatio="xMidYMid slice">
              <ellipse cx="320" cy="160" rx="240" ry="200" fill="#dbeafe" opacity=".6" />
              <ellipse cx="420" cy="420" rx="180" ry="150" fill="#bfdbfe" opacity=".45" />
              <ellipse cx="100" cy="520" rx="140" ry="100" fill="#dbeafe" opacity=".35" />
            </svg>

            {/* Decorative stars */}
            <div className="star-spin" style={{
              position: "absolute", top: "8%", right: "12%",
              color: "#13523f", fontSize: "16px", opacity: .65, zIndex: 3
            }}>✦</div>
            <div className="star-spin" style={{
              position: "absolute", top: "18%", left: "14%",
              color: "#13523f", fontSize: "9px", opacity: .45, zIndex: 3
            }}>✦</div>
            <div className="star-spin" style={{
              position: "absolute", bottom: "30%", right: "9%",
              color: "#3b82f6", fontSize: "10px", opacity: .4, zIndex: 3
            }}>✦</div>

            {/* Curved arrow */}
            <svg style={{
              position: "absolute", right: "13%", top: "28%",
              width: "80px", height: "60px", opacity: .38, zIndex: 3
            }}
              viewBox="0 0 80 60" fill="none">
              <path d="M10 55 Q30 5 65 18" stroke="#1a1a1a" strokeWidth="1.8"
                fill="none" strokeLinecap="round" />
              <path d="M58 10 L68 20 L55 22" stroke="#1a1a1a" strokeWidth="1.8"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>





            {/* Person image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.qph3dRWo0A3UFjJZc-RRngHaGN?w=940&h=788&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Students"
              style={{
                position: "absolute", inset: 0, zIndex: 2,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "top center"
              }}
            />

            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "60px", zIndex: 3,
              background: "linear-gradient(to top,#f0f0ee,transparent)",
              pointerEvents: "none"
            }} />
          </div>

        </div>
      </section>
    </>
  );
}