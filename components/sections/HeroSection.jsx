'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const HeroSection = () => {
  useEffect(() => {
    // Entrance Animations for Title
    const titleChars = gsap.utils.toArray(".main-title .char");
    gsap.set(titleChars, {
      transformOrigin: "bottom center",
      display: "inline-block",
    });
    gsap.from(titleChars, {
      y: 200,
      opacity: 0,
      rotation: 15,
      duration: 1.2,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.2,
    });
    gsap.from(".subtitle", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.8,
    });
  }, []);

  return (
    <section className="hero">
      <div className="image-wrapper">
        <Image
          src="/upscalemedia-transformed.png"
          className="hero-img"
          alt="DEVS Club"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="bg-title-container">
        <div className="title-row">
          <h1 className="main-title">
            {"DEVS".split("").map((char, i) => (
              <span key={i} className="char">
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="subtitle-row">
          <p className="subtitle">Code-coffe-repeat.</p>
        </div>
      </div>
      <div className="cursive-title-container">
        <p className="cursive-text">Student led technical club</p>
      </div>
    </section>
  );
};

export default HeroSection;
