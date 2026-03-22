"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import SocialGallery from "./components/SocialGallery";

// Import section components
import HeroSection from "@/components/sections/HeroSection";
import TypographyPortalSection from "@/components/sections/TypographyPortalSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import FooterSection from "@/components/sections/FooterSection";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  const containerRef = useRef(null);
  const socialGallerySectionRef = useRef(null);
  const socialGalleryContainerRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, Flip);

      // Initialize Lenis Smooth Scroll
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.clearScrollMemory();
      window.history.scrollRestoration = "manual";

      // 1. Hero Scroll Animation
      let mm = gsap.matchMedia();
      mm.add("(min-width: 800px)", () => {
        gsap.to(".image-wrapper", {
          width: "40%",
          height: "60%",
          x: "25vw",
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
          x: "0vw",
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

      // 2. Typography Scroll Animation & Deep Portal Zoom
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
            [".projects-title-1", ".projects-title-2"],
            {
              opacity: 1,
              x: 0,
              y: 0,
              ease: "power3.out",
              stagger: 0.2,
              duration: 1.5,
            },
            "split+=1.5",
          );
        }
      }

      // 3. Projects Section - Stacked Cards Animation
      gsap.set(".project-card", {
        x: 400,
        y: 300,
        opacity: 0,
        scale: 0.85,
        rotation: 10,
        transformOrigin: "bottom right",
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
              x: -depth * 40,
              y: -depth * 25,
              scale: 1 - depth * 0.04,
              opacity: Math.max(0.4, 1 - depth * 0.12),
              ease: "power2.out",
              duration: 2,
            },
            i,
          );
        }
      });

      // 4. Testimonials Section - Typewriter Effect
      const triggerTyping = (card) => {
        const typewriterElement = card.querySelector(".typewriter-trigger");
        if (!typewriterElement) return;

        const text = typewriterElement.textContent;
        typewriterElement.textContent = "";

        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: text.length,
          duration: text.length * 0.05,
          ease: "none",
          onUpdate: () => {
            const currentLength = Math.floor(proxy.val);
            typewriterElement.textContent = text.substring(0, currentLength);
          },
        });
      };

      const testimonialCards = gsap.utils.toArray(".terminal-card");
      if (testimonialCards.length > 0) {
        gsap.set(testimonialCards, { opacity: 0, y: 80 });

        testimonialCards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              });
              triggerTyping(card);
            },
          });

          card.addEventListener("mouseenter", () => {
            triggerTyping(card);
          });
        });
      }

      // 5. Team Section - Interactive Image Switching
      let currentTeam = "tech";
      let isAnimating = false;

      const teamRows = document.querySelectorAll(".team-row");
      teamRows.forEach((row) => {
        row.addEventListener("click", function () {
          if (isAnimating) return;

          const targetTeam = this.getAttribute("data-team");
          if (targetTeam === currentTeam) return;

          isAnimating = true;

          document
            .querySelectorAll(".team-row")
            .forEach((r) => r.classList.remove("active"));
          this.classList.add("active");

          const currentImg = document.querySelector(
            `.team-img[data-team="${currentTeam}"]`,
          );
          const nextImg = document.querySelector(
            `.team-img[data-team="${targetTeam}"]`,
          );

          if (currentImg && nextImg) {
            const tl = gsap.timeline({
              onComplete: () => {
                currentImg.classList.remove("active");
                nextImg.classList.add("active");
                currentTeam = targetTeam;
                isAnimating = false;
              },
            });

            tl.to(currentImg, {
              clipPath: "inset(0% 100% 0% 0%)",
              duration: 0.6,
              ease: "power2.inOut",
            }).fromTo(
              nextImg,
              { clipPath: "inset(0% 0% 0% 100%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.6,
                ease: "power2.inOut",
              },
              "-=0.4",
            );
          }
        });
      });

      // Cleanup
      return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <ParticlesBackground />
      
      <HeroSection />
      <TypographyPortalSection />
      <ProjectsSection />
      
      <section ref={socialGallerySectionRef} className="sg-section" id="repeat-section">
        <SocialGallery containerRef={socialGalleryContainerRef} />
      </section>
      
      <EventsSection />
      <TestimonialsSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
}
