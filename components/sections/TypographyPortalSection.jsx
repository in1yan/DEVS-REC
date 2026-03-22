'use client';
import React from 'react';

const TypographyPortalSection = () => {
  const codeWord = "CODE".split("");

  return (
    <section className="next-section" style={{ position: "relative" }}>
      <div className="stagger-container">
        <h2 className="stagger-line line-1">SO WHAT WE DO</h2>
        <h2 className="stagger-line line-2">
          {codeWord.map((ch, idx) => (
            <span
              key={idx}
              className={`code-char code-char-${idx}`}
              style={{
                display: "inline-block",
                willChange: "transform,opacity",
              }}
            >
              {ch}
            </span>
          ))}
        </h2>
        <h2 className="stagger-line line-3">COFFEE</h2>
        <h2 className="stagger-line line-4">
          REPEAT <span className="dot">.</span>
        </h2>
      </div>

      {/* Portal overlay elements for animation */}
      <div
        id="stroke-panel"
        style={{
          display: "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "100vh",
          width: "8px",
          background: "#fff",
          zIndex: 100,
        }}
      />

      <div
        id="portal-overlay"
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "#000",
          pointerEvents: "none",
        }}
      >
        <div
          className="panel-left"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: "#fff",
          }}
        />
        <div
          className="panel-right"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background: "#fff",
          }}
        />
      </div>
    </section>
  );
};

export default TypographyPortalSection;
