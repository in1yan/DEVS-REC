"use client";

import { useRef, useEffect } from "react";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Masonry from '../components/Masonry'

export default function Home() {

  const items = [
    {
      id: "1",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/latte-art-night",
      height: 400,
    },
    {
      id: "2",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/brew-workshop",
      height: 250,
    },
    {
      id: "3",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/cupping-session",
      height: 600,
    },
    {
      id: "4",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/roast-toast",
      height: 350,
    },
    {
      id: "5",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/bean-origins",
      height: 450,
    },
    {
      id: "6",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-cocktails",
      height: 500,
    },
    {
      id: "7",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-expo",
      height: 300,
    },
    {
      id: "8",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-cocktails-2",
      height: 550,
    },
    {
      id: "9",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-cocktails-2",
      height: 350,
    },
    {
      id: "10",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-cocktails-2",
      height: 550,
    },
    {
      id: "11",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-cocktails-2",
      height: 250,
    },
    {
      id: "12",
      img: "/upscalemedia-transformed.png",
      url: "https://example.com/coffee-cocktails-2",
      height: 550,
    },
  ];
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, Flip);
      ScrollTrigger.clearScrollMemory("manual");

      // Initialize Lenis inside useGSAP so it cleans up with GSAP
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // 1. Hero Scroll Animation
      let mm = gsap.matchMedia();
      mm.add("(min-width: 800px)", () => {
        gsap.to(".image-wrapper", {
          width: "40%",
          height: "60%",
          x: "15vw",
          borderRadius: "24px",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
          },
        });
        gsap.fromTo(
          ".bg-title-container",
          { opacity: 1, scale: 1, y: 0, x: "10vw" },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: "-20vw",
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "-=1000 top",
              end: "+=2000",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          ".cursive-title-container",
          { opacity: 1, y: 0, x: "50vw" },
          {
            opacity: 1,
            y: 0,
            x: "0vw",
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "-=1000 top",
              end: "+=2000",
              scrub: true,
            },
          },
        );
      });
      mm.add("(max-width: 799px)", () => {
        gsap.to(".image-wrapper", {
          width: "80%",
          height: "60%",
          x: "0w",
          borderRadius: "20px",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=800",
            scrub: true,
            pin: true,
          },
        });
        gsap.fromTo(
          ".bg-title-container",
          { opacity: 1, scale: 1, y: 0, x: 0 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "+=800",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          ".cursive-title-container",
          { opacity: 1, y: 0, x: "50vw" },
          {
            opacity: 1,
            y: 0,
            x: "0vw",
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "+=800",
              scrub: true,
            },
          },
        );
      });

      // 2. Entrance Animations for Top Title
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

      // 3. Typography Scroll Animation & Deep Portal Zoom
      const codeLine = document.querySelector(".stagger-line.line-2");
      if (codeLine) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".next-section",
            start: "top top",
            end: "+=2500",
            scrub: 5,
            pin: true,
          },
        });
        const lineRect = codeLine.getBoundingClientRect();
        const firstChar = document.querySelector(".code-char-0");
        const lastChar = document.querySelector(".code-char-3");
        if (firstChar && lastChar && lineRect.width > 0) {
          // Calculate the center of the entire "CODE" word
          const firstRect = firstChar.getBoundingClientRect();
          const lastRect = lastChar.getBoundingClientRect();
          const wordCenterX = (firstRect.left + lastRect.right) / 2;
          const wordCenterInLine = wordCenterX - lineRect.left;
          const wordOriginPct =
            ((wordCenterInLine / lineRect.width) * 100).toFixed(2) + "%";
          const wordPhase1XPx =
            window.innerWidth / 2 - (lineRect.left + wordCenterInLine);

          tl.set(
            ".stagger-line.line-2",
            { transformOrigin: wordOriginPct + " center" },
            0,
          );
          tl.to(
            ".stagger-line.line-2",
            {
              scale: 5,
              x: wordPhase1XPx,
              ease: "power1.inOut",
              duration: 1,
            },
            0,
          );
          tl.to(
            ".stagger-line.line-1",
            { y: -300, opacity: 0, scale: 0.4, ease: "power2.in", duration: 1 },
            0,
          );
          tl.to(
            [".stagger-line.line-3", ".stagger-line.line-4"],
            { y: 300, opacity: 0, scale: 0.4, ease: "power2.in", duration: 1 },
            0,
          );
          tl.to(
            "#particles-js",
            { opacity: 0.08, scale: 0.7, ease: "power1.inOut", duration: 1 },
            0,
          );

          tl.to(
            ".stagger-line.line-2",
            { scale: 100, ease: "power3.in", duration: 1.5 },
            1,
          );
          tl.to(
            ".stagger-container",
            { filter: "blur(16px)", ease: "power2.in", duration: 1.2 },
            1.3,
          );

          tl.set("#stroke-panel", { display: "block" }, 2.5);
          tl.fromTo(
            "#stroke-panel",
            { width: "8px", opacity: 1 },
            { width: "100vw", ease: "power3.inOut", duration: 0.5 },
            2.5,
          );

          tl.set("#portal-overlay", { display: "block" }, 3);
          tl.set("#portal-next-screen", { display: "flex" }, 3);
          tl.set("#stroke-panel", { display: "none" }, 3);
          tl.set(".stagger-container", { opacity: 0 }, 3);
          tl.addLabel("split", 3.5);
          tl.to(
            ".panel-left",
            { xPercent: -100, ease: "power2.inOut", duration: 2 },
            "split",
          );
          tl.to(
            ".panel-right",
            { xPercent: 100, ease: "power2.inOut", duration: 2 },
            "split",
          );
          tl.fromTo(
            "#portal-next-screen",
            { clipPath: "inset(0 50% 0 50%)", opacity: 1 },
            { clipPath: "inset(0 0% 0 0%)", ease: "power2.out", duration: 2 },
            "split",
          );
          tl.to(
            ["#ns-title-1", "#ns-title-2", "#ns-sub"],
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              stagger: 0.2,
              duration: 1.5,
            },
            "split+=1.5",
          );
        }
      }

      // 4. OUR PROJECTS Stacked-Card Scroll Sequence
      gsap.set(".project-card", {
        x: -400,
        y: 300,
        opacity: 0,
        scale: 0.85,
        rotation: -10,
        transformOrigin: "bottom left",
      });
      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top top",
          end: "+=6000",
          scrub: 1,
          pin: true,
        },
      });
      projectsTl.to(
        [".projects-title-1", ".projects-title-2"],
        {
          opacity: 1,
          x: 0,
          y: 0,
          ease: "power2.out",
          stagger: 0.2,
          duration: 1,
        },
        0,
      );
      const projCards = gsap.utils.toArray(".project-card");
      projCards.forEach((card, i) => {
        projectsTl.to(
          card,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: "power2.out",
            duration: 2,
          },
          i,
        );
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          projectsTl.to(
            projCards[j],
            {
              x: -depth * 70,
              y: depth * 15,
              scale: 1 - depth * 0.05,
              opacity: 1 - depth * 0.05,
              rotation: 0,
              ease: "power2.inOut",
              duration: 1,
            },
            i,
          );
        }
      });

      // 5. Testimonials Typing effect
      const testCards = gsap.utils.toArray(".terminal-card");
      gsap.from(testCards, {
        scrollTrigger: {
          trigger: "#testimonials-section",
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => {
          testCards.forEach(triggerTyping);
        },
      });

      function triggerTyping(card) {
        const el = card.querySelector(".typewriter-trigger");
        if (!el) return;
        if (!el.getAttribute("data-fulltext")) {
          el.setAttribute("data-fulltext", el.textContent.trim());
        }
        const fullText = el.getAttribute("data-fulltext");
        const proxy = { charCount: 0 };
        el.textContent = "";
        gsap.to(proxy, {
          charCount: fullText.length,
          duration: 2.2,
          ease: "none",
          onUpdate: () => {
            el.textContent = fullText.substring(0, Math.ceil(proxy.charCount));
          },
        });
      }

      const testCardHandlers = new Map();
      testCards.forEach((card) => {
        const mouseenterHandler = () => triggerTyping(card);
        card.addEventListener("mouseenter", mouseenterHandler);
        testCardHandlers.set(card, mouseenterHandler);
      });

      // 6. Coffee Gallery Entrance and Tilt
      gsap.from(".coffee-card", {
        scrollTrigger: {
          trigger: ".coffee-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      const coffeeCards = gsap.utils.toArray(".coffee-card");
      const cardHandlers = new Map();

      coffeeCards.forEach((card) => {
        const mousemoveHandler = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          gsap.to(card, {
            rotateX: (y - centerY) / 20,
            rotateY: (centerX - x) / 20,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        };

        const mouseleaveHandler = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", mousemoveHandler);
        card.addEventListener("mouseleave", mouseleaveHandler);

        cardHandlers.set(card, { mousemoveHandler, mouseleaveHandler });
      });

      // GSAP Flip Expansion
      const overlay = document.querySelector(".coffee-detail-overlay");
      const detailImg = document.querySelector("#detail-active-img");
      const detailTitle = document.querySelector("#detail-active-title");
      const detailDesc = document.querySelector("#detail-active-desc");
      const cardClickHandlers = new Map();

      coffeeCards.forEach((card) => {
        const clickHandler = () => {
          const cardImg = card.querySelector(".card-img");
          const cardTitle = card.querySelector(".card-title");
          const cardContent = card.querySelector(".hidden-content");

          detailImg.src = cardImg.src;
          detailTitle.textContent = cardTitle.textContent;
          detailDesc.textContent = cardContent.textContent;

          const state = Flip.getState([cardImg, cardTitle], {
            props: "borderRadius,opacity",
          });
          overlay.classList.add("active");
          document.body.style.overflow = "hidden";

          Flip.from(state, {
            duration: 0.8,
            ease: "power3.inOut",
            targets: [detailImg, detailTitle],
            scale: true,
            onComplete: () => {
              gsap.from(".detail-tagline, .detail-desc, .gal-thumb", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              });
            },
          });
        };

        card.addEventListener("click", clickHandler);
        cardClickHandlers.set(card, clickHandler);
      });

      const detailCloseHandler = () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      };

      document.querySelector(".detail-close")?.addEventListener("click", detailCloseHandler);

      // 7. Team Interaction Focus Effect
      const teamRows = gsap.utils.toArray(".team-row");
      const teamImgs = gsap.utils.toArray(".team-img");
      let currentTeam = "tech";
      let isAnimating = false;
      const teamRowHandlers = new Map();

      teamRows.forEach((row) => {
        const clickHandler = function () {
          const target = this.dataset.team;
          if (target === currentTeam || isAnimating) return;
          isAnimating = true;

          const outImg = document.querySelector(
            `.team-img[data-team="${currentTeam}"]`,
          );
          const inImg = document.querySelector(
            `.team-img[data-team="${target}"]`,
          );

          document
            .querySelector(".team-row.active")
            ?.classList.remove("active");
          this.classList.add("active");

          const tl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
              currentTeam = target;
              teamImgs.forEach((img) => img.classList.remove("active"));
              if (inImg) inImg.classList.add("active");
              if (inImg)
                gsap.set(inImg, { clearProps: "clipPath,transform,opacity" });
            },
          });

          if (outImg)
            tl.to(outImg, {
              clipPath: "inset(0 0 0 100%)",
              x: 30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.inOut",
            });
          if (inImg)
            tl.set(
              inImg,
              {
                clipPath: "inset(0 100% 0 0%)",
                x: -30,
                opacity: 1,
                scale: 1.05,
              },
              0,
            );
          if (inImg)
            tl.to(
              inImg,
              {
                clipPath: "inset(0 0% 0 0%)",
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.3",
            );
        };

        row.addEventListener("click", clickHandler);
        teamRowHandlers.set(row, clickHandler);
      });

      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
        lenis.off("scroll", ScrollTrigger.update);

        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach((t) => t.kill());

        // Revert matchMedia listeners
        mm.revert();

        // Remove test card event listeners
        testCardHandlers.forEach((handler, card) => {
          card.removeEventListener("mouseenter", handler);
        });

        // Remove coffee card event listeners
        cardHandlers.forEach((handlers, card) => {
          card.removeEventListener("mousemove", handlers.mousemoveHandler);
          card.removeEventListener("mouseleave", handlers.mouseleaveHandler);
        });

        cardClickHandlers.forEach((handler, card) => {
          card.removeEventListener("click", handler);
        });

        document.querySelector(".detail-close")?.removeEventListener("click", detailCloseHandler);

        // Remove team row event listeners
        teamRowHandlers.forEach((handler, row) => {
          row.removeEventListener("click", handler);
        });
      };
    },
    { scope: containerRef },
  );

  const getProjectDesc = (i) => {
    return i === 1 ? (
      <>
        RUN
        <br />
        THE
        <br />
        THRESHOLDS
      </>
    ) : i === 2 ? (
      <>
        LIGHTWEIGHT
        <br />
        (UNDER 4KB)
      </>
    ) : i === 3 ? (
      <>
        MADE WITH
        <br />
        LOVE
      </>
    ) : i === 4 ? (
      <>
        BRING
        <br />
        ANIMATION
        <br />
        LIBRARIES
      </>
    ) : i === 5 ? (
      <>
        CONTROL
        <br />
        SCROLL
        <br />
        DURATION
      </>
    ) : i === 6 ? (
      <>
        USE ANY
        <br />
        ELEMENT TO
        <br />
        SCROLL
      </>
    ) : i === 7 ? (
      <>
        ENJOY
        <br />
        HORIZONTAL
        <br />
        VERTCIAL
        <br />
        SUPPORT
      </>
    ) : i === 8 ? (
      <>
        FEEL FREE TO
        <br />
        USE
        <br />
        STICKY
      </>
    ) : (
      <>
        TOUCH SUPPORT
        <br />
        INCLUDED
      </>
    );
  };

  const codeWord = "CODE".split("");

  return (
    <div ref={containerRef}>
      <div id="particles-js"></div>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.particlesJS) {
            window.particlesJS("particles-js", {
              particles: {
                number: {
                  value: 100,
                  density: { enable: true, value_area: 800 },
                },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: {
                  value: 0.7,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.3,
                    sync: false,
                  },
                },
                size: { value: 3, random: true, anim: { enable: false } },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.6,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1.5,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                },
              },
              interactivity: {
                detect_on: "window",
                events: {
                  onhover: { enable: true, mode: "grab" },
                  onclick: { enable: true, mode: "push" },
                  resize: true,
                },
                modes: {
                  grab: { distance: 140, line_linked: { opacity: 0.5 } },
                  push: { particles_nb: 4 },
                },
              },
              retina_detect: true,
            });
          }
        }}
      />

      <section className="hero">
        <div className="image-wrapper">
          <img
            src="/upscalemedia-transformed.png"
            className="hero-img"
            alt="DEVS Club"
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
      </section>

      <section
        className="projects-section"
        id="portal-next-screen"
        style={{
          position: "relative",
          width: "100vw",
          minHeight: "100vh",
          background: "#f5f3f2",
          color: "#050505",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "2vh 5vw",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8vh",
            right: "5vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            zIndex: 20,
            textAlign: "right",
          }}
        >
          <h2
            className="projects-title-1"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(50px, 8vw, 120px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              margin: 0,
              color: "#111",
              opacity: 0,
              transform: "translateX(50px)",
              border: "2px solid transparent",
              padding: 0,
            }}
          >
            OUR PROJECTS
          </h2>
          <h2
            className="projects-title-2"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(50px, 8vw, 120px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              margin: 0,
              color: "#ddd",
              opacity: 0,
              transform: "translateX(-50px)",
              padding: 0,
            }}
          >
            IN MOTION
          </h2>
        </div>
        <div
          className="cards-container"
          style={{
            flex: 1,
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
            minHeight: "80vh",
            marginTop: "-15vh",
          }}
        >
          {Array.from({ length: 9 }).map((_, index) => {
            const i = index + 1;
            return (
              <div
                key={i}
                className={`project-card card-${i}`}
                style={{
                  position: "absolute",
                  width: "clamp(350px, 35vw, 550px)",
                  height: "clamp(450px, 75vh, 800px)",
                  background: "#fff",
                  border: "1px solid #eee",
                  padding: "30px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "-8px 10px 25px rgba(0,0,0,0.1)",
                  willChange: "transform, opacity",
                  zIndex: i,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "100px",
                    color: "#ff9d9d",
                    marginBottom: "20px",
                    lineHeight: 0.8,
                    letterSpacing: "-0.05em",
                  }}
                >
                  0{i}
                </div>
                <div
                  style={{
                    width: "100%",
                    flex: 1,
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    marginBottom: "25px",
                    backgroundImage: "url('/upscalemedia-transformed.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 1,
                    filter: "grayscale(30%)",
                    transition: "filter 0.3s ease",
                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
                  }}
                ></div>
                <div
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(24px, 2.5vw, 40px)",
                    color: "#111",
                    lineHeight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {getProjectDesc(i)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="coffee-section" className="coffee-gallery-section">
        <div className="coffee-header">
          <span className="section-label">01</span>
          <h2 className="section-title">OUR EVENTS</h2>
        </div>

        <div style={{ minHeight: '800px', width: '100%' }}>
          <Masonry
            items={items}
            ease="elastic.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            triggerStart="top 180%"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover
          />
        </div>
      </section>

      <section id="testimonials-section" className="testimonials-section">
        <div className="testimonials-header">
          <span className="section-label">03</span>
          <h2 className="section-title">WHAT OTHERS SAY</h2>
        </div>
        <div className="testimonials-grid">
          {[
            {
              file: "akash.txt",
              name: "Akash",
              role: "Developer",
              feedback:
                "This club is exactly what our campus needed. The workshops and coding sessions are top-tier. Highly recommend joining!",
            },
            {
              file: "priya.txt",
              name: "Priya",
              role: "UI UX Designer",
              feedback:
                "A great community to learn and collaborate. Managed to pick up some solid full-stack skills while helping on projects. Love the vibe!",
            },
            {
              file: "rahul.txt",
              name: "Rahul",
              role: "Student",
              feedback:
                "Simplified complex concepts for me into practical coding projects. The members are incredibly helpful and welcoming to beginners.",
            },
          ].map((t, idx) => (
            <div key={idx} className="terminal-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
              </div>
              <div className="terminal-body">
                <p className="prompt">user@devs:~$ cat testimonials/{t.file}</p>
                <div className="content">
                  <p className="field">
                    Name: <span className="val">{t.name}</span>
                  </p>
                  <p className="field">
                    Role: <span className="val">{t.role}</span>
                  </p>
                  <p className="field">
                    Feedback:{" "}
                    <span className="val typewriter-trigger">{t.feedback}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="team-section" className="team-section">
        <div className="team-image-panel">
          <div className="team-img-stage">
            {["tech", "event", "design", "media", "outreach", "core"].map(
              (t, i) => (
                <img
                  key={i}
                  className={`team-img ${i === 0 ? "active" : ""}`}
                  data-team={t}
                  src="/upscalemedia-transformed.png"
                  alt={`${t} Team`}
                />
              ),
            )}
          </div>
        </div>
        <div className="team-list-panel">
          <div className="team-panel-header">
            <p className="team-panel-eyebrow">THE PEOPLE</p>
            <h2 className="team-panel-title">
              MEET OUR
              <br />
              TEAM
            </h2>
          </div>
          <div className="team-list">
            {[
              { team: "tech", label: "TECH TEAM", id: "01" },
              { team: "event", label: "EVENT TEAM", id: "02" },
              { team: "design", label: "DESIGN TEAM", id: "03" },
              { team: "media", label: "MEDIA TEAM", id: "04" },
              { team: "outreach", label: "OUTREACH TEAM", id: "05" },
              { team: "core", label: "CORE TEAM", id: "06" },
            ].map((t, idx) => (
              <div
                key={idx}
                className={`team-row ${idx === 0 ? "active" : ""}`}
                data-team={t.team}
                data-index={t.id}
                data-label={t.label}
              >
                <span className="tr-num">{t.id}</span>
                <span className="tr-name">{t.label}</span>
                <span className="tr-dot"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="site-footer" className="placeholder-footer">
        <h2 className="section-title">DEVS</h2>
        <p className="footer-tagline">Code · Coffee · Repeat.</p>
      </footer>
    </div>
  );
}
