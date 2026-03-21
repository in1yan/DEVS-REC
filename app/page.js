'use client';

import { useRef, useEffect } from 'react';
import Script from 'next/script';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import SocialGallery from './components/SocialGallery';

export default function Home() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);
    ScrollTrigger.clearScrollMemory("manual");

    // Initialize Lenis inside useGSAP so it cleans up with GSAP
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // 1. Hero Scroll Animation
    let mm = gsap.matchMedia();
    mm.add("(min-width: 800px)", () => {
        gsap.to(".image-wrapper", {
            width: "40%", height: "60%", x: "15vw", borderRadius: "24px", ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "+=1000", scrub: true, pin: true }
        });
        gsap.fromTo(".bg-title-container", { opacity: 1, scale: 1, y: 0, x: "10vw" }, {
            opacity: 1, scale: 1, y: 0, x: "-20vw", ease: "none",
            scrollTrigger: { trigger: ".hero", start: "-=1000 top", end: "+=2000", scrub: true }
        });
        gsap.fromTo(".cursive-title-container", { opacity: 1, y: 0, x: "50vw" }, {
            opacity: 1, y: 0, x: "0vw", ease: "none",
            scrollTrigger: { trigger: ".hero", start: "-=1000 top", end: "+=2000", scrub: true }
        });
    });
    mm.add("(max-width: 799px)", () => {
        gsap.to(".image-wrapper", {
            width: "80%", height: "60%", x: "0w", borderRadius: "20px", ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "+=800", scrub: true, pin: true }
        });
        gsap.fromTo(".bg-title-container", { opacity: 1, scale: 1, y: 0, x: 0 }, { opacity: 1, scale: 1, y: 0, x: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "+=800", scrub: true } });
        gsap.fromTo(".cursive-title-container", { opacity: 1, y: 0, x: "50vw" }, { opacity: 1, y: 0, x: "0vw", ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "+=800", scrub: true } });
    });

    // 2. Entrance Animations for Top Title
    const titleChars = gsap.utils.toArray(".main-title .char");
    gsap.set(titleChars, { transformOrigin: "bottom center", display: "inline-block" });
    gsap.from(titleChars, { y: 200, opacity: 0, rotation: 15, duration: 1.2, stagger: 0.05, ease: "power4.out", delay: 0.2 });
    gsap.from(".subtitle", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8 });

    // 3. Typography Scroll Animation & Deep Portal Zoom
    const codeLine = document.querySelector('.stagger-line.line-2');
    if (codeLine) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.next-section', start: 'top top', end: '+=7000', scrub: 1.5, pin: true } });
        const lineRect = codeLine.getBoundingClientRect();
        const dSpan = document.querySelector('.code-char-2');
        if (dSpan && lineRect.width > 0) {
            const dRect = dSpan.getBoundingClientRect();
            const dCenterInLine = (dRect.left + dRect.width / 2) - lineRect.left;
            const dOriginPct = (dCenterInLine / lineRect.width * 100).toFixed(2) + '%';
            const dPhase1XPx = window.innerWidth / 2 - (lineRect.left + dCenterInLine);

            tl.set('.stagger-line.line-2', { transformOrigin: dOriginPct + ' center' }, 0);
            tl.to('.stagger-line.line-2', { scale: 5, x: dPhase1XPx, ease: 'power1.inOut', duration: 1 }, 0);
            tl.to('.stagger-line.line-1', { y: -300, opacity: 0, scale: 0.4, ease: 'power2.in', duration: 1 }, 0);
            tl.to(['.stagger-line.line-3', '.stagger-line.line-4'], { y: 300, opacity: 0, scale: 0.4, ease: 'power2.in', duration: 1 }, 0);
            tl.to('#particles-js', { opacity: 0.08, scale: 0.7, ease: 'power1.inOut', duration: 1 }, 0);

            tl.to(['.code-char-0', '.code-char-1', '.code-char-3'], { opacity: 0, ease: 'power2.in', duration: 1 }, 1);
            tl.to('.stagger-line.line-2', { scale: 100, ease: 'power3.in', duration: 1.5 }, 1);
            tl.to('.stagger-container', { filter: 'blur(16px)', ease: 'power2.in', duration: 1.2 }, 1.3);

            tl.set('#stroke-panel', { display: 'block' }, 2.5);
            tl.fromTo('#stroke-panel', { width: '8px', opacity: 1 }, { width: '100vw', ease: 'power3.inOut', duration: 0.5 }, 2.5);

            tl.set('#portal-overlay', { display: 'block' }, 3);
            tl.set('#portal-next-screen', { display: 'flex' }, 3);
            tl.set('#stroke-panel', { display: 'none' }, 3);
            tl.set('.stagger-container', { opacity: 0 }, 3);
            tl.to('.portal-glow', { opacity: 1, duration: 0.3, ease: 'power2.in' }, 3);

            tl.addLabel('split', 3.5);
            tl.to('.panel-left', { xPercent: -100, ease: 'power2.inOut', duration: 2 }, 'split');
            tl.to('.panel-right', { xPercent: 100, ease: 'power2.inOut', duration: 2 }, 'split');
            tl.to('.portal-glow', { width: '100vw', opacity: 0, ease: 'power1.out', duration: 2 }, 'split');

            const burstParticles = gsap.utils.toArray('.burst-particle');
            tl.to(burstParticles, {
                opacity: (i) => Math.random() * 0.7 + 0.3,
                x: () => (Math.random() - 0.5) * window.innerWidth * 1.8,
                y: () => (Math.random() - 0.5) * window.innerHeight * 1.4,
                scale: () => Math.random() * 4 + 1,
                ease: 'power3.out', duration: 2.5
            }, 'split');
            tl.to(burstParticles, { opacity: 0, duration: 0.6 }, 'split+=2');

            tl.fromTo('#portal-next-screen', { clipPath: 'inset(0 50% 0 50%)', opacity: 1 }, { clipPath: 'inset(0 0% 0 0%)', ease: 'power2.out', duration: 2 }, 'split');
            tl.to(['#ns-title-1', '#ns-title-2', '#ns-sub'], { opacity: 1, y: 0, ease: 'power3.out', stagger: 0.2, duration: 1.5 }, 'split+=1.5');
        }
    }

    // 4. OUR PROJECTS Stacked-Card Scroll Sequence
    gsap.set(".project-card", { x: -400, y: 300, opacity: 0, scale: 0.85, rotation: -10, transformOrigin: "bottom left" });
    const projectsTl = gsap.timeline({ scrollTrigger: { trigger: ".projects-section", start: "top top", end: "+=6000", scrub: 1, pin: true } });
    projectsTl.to([".projects-title-1", ".projects-title-2"], { opacity: 1, x: 0, y: 0, ease: "power2.out", stagger: 0.2, duration: 1 }, 0);
    const projCards = gsap.utils.toArray(".project-card");
    projCards.forEach((card, i) => {
        projectsTl.to(card, { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0, ease: "power2.out", duration: 2 }, i);
        for (let j = 0; j < i; j++) {
            const depth = i - j;
            projectsTl.to(projCards[j], {
                x: -depth * 70, y: depth * 15, scale: 1 - (depth * 0.05), opacity: 1 - (depth * 0.05), rotation: 0, ease: "power2.inOut", duration: 1
            }, i);
        }
    });

    // 5. Testimonials Typing effect
    const testCards = gsap.utils.toArray('.terminal-card');
    gsap.from(testCards, {
        scrollTrigger: { trigger: '#testimonials-section', start: "top 70%", toggleActions: "play none none none" },
        y: 60, opacity: 0, scale: 0.95, duration: 1, stagger: 0.2, ease: "power3.out",
        onComplete: () => { testCards.forEach(triggerTyping) }
    });

    function triggerTyping(card) {
        const el = card.querySelector('.typewriter-trigger');
        if (!el) return;
        if (!el.getAttribute('data-fulltext')) {
            el.setAttribute('data-fulltext', el.textContent.trim());
        }
        const fullText = el.getAttribute('data-fulltext');
        const proxy = { charCount: 0 };
        el.textContent = '';
        gsap.to(proxy, {
            charCount: fullText.length, duration: 2.2, ease: "none",
            onUpdate: () => { el.textContent = fullText.substring(0, Math.ceil(proxy.charCount)); }
        });
    }

    testCards.forEach(card => card.addEventListener('mouseenter', () => triggerTyping(card)));

    // 6. Coffee Gallery Entrance and Tilt
    gsap.from('.coffee-card', {
        scrollTrigger: { trigger: '.coffee-grid', start: "top 80%", toggleActions: "play none none none" },
        y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out"
    });

    const coffeeCards = gsap.utils.toArray('.coffee-card');
    coffeeCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            gsap.to(card, { rotateX: (y - centerY) / 20, rotateY: (centerX - x) / 20, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
        });
    });

    // GSAP Flip Expansion
    const overlay = document.querySelector('.coffee-detail-overlay');
    const detailImg = document.querySelector('#detail-active-img');
    const detailTitle = document.querySelector('#detail-active-title');
    const detailDesc = document.querySelector('#detail-active-desc');
    coffeeCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardImg = card.querySelector('.card-img');
            const cardTitle = card.querySelector('.card-title');
            const cardContent = card.querySelector('.hidden-content');
            
            detailImg.src = cardImg.src;
            detailTitle.textContent = cardTitle.textContent;
            detailDesc.textContent = cardContent.textContent;
            
            const state = Flip.getState([cardImg, cardTitle], { props: "borderRadius,opacity" });
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            Flip.from(state, {
                duration: 0.8, ease: "power3.inOut", targets: [detailImg, detailTitle], scale: true,
                onComplete: () => { gsap.from(".detail-tagline, .detail-desc, .gal-thumb", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }); }
            });
        });
    });

    document.querySelector('.detail-close')?.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 7. Team Interaction Focus Effect
    const teamRows = gsap.utils.toArray('.team-row');
    const teamImgs = gsap.utils.toArray('.team-img');
    let currentTeam = 'tech';
    let isAnimating = false;

    teamRows.forEach(row => {
        row.addEventListener('click', function() {
            const target = this.dataset.team;
            if (target === currentTeam || isAnimating) return;
            isAnimating = true;

            const outImg = document.querySelector(`.team-img[data-team="${currentTeam}"]`);
            const inImg = document.querySelector(`.team-img[data-team="${target}"]`);

            document.querySelector('.team-row.active')?.classList.remove('active');
            this.classList.add('active');

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    currentTeam = target;
                    teamImgs.forEach(img => img.classList.remove('active'));
                    if(inImg) inImg.classList.add('active');
                    if(inImg) gsap.set(inImg, { clearProps: "clipPath,transform,opacity" });
                }
            });

            if(outImg) tl.to(outImg, { clipPath: 'inset(0 0 0 100%)', x: 30, opacity: 0, duration: 0.6, ease: 'power3.inOut' });
            if(inImg) tl.set(inImg, { clipPath: 'inset(0 100% 0 0%)', x: -30, opacity: 1, scale: 1.05 }, 0);
            if(inImg) tl.to(inImg, { clipPath: 'inset(0 0% 0 0%)', x: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
        });
    });

    return () => {
       lenis.destroy();
       gsap.ticker.remove(lenis.raf);
    };
  }, { scope: containerRef });

  const getProjectDesc = (i) => {
    return i === 1 ? <>RUN<br/>THE<br/>THRESHOLDS</> :
           i === 2 ? <>LIGHTWEIGHT<br/>(UNDER 4KB)</> :
           i === 3 ? <>MADE WITH<br/>LOVE</> :
           i === 4 ? <>BRING<br/>ANIMATION<br/>LIBRARIES</> :
           i === 5 ? <>CONTROL<br/>SCROLL<br/>DURATION</> :
           i === 6 ? <>USE ANY<br/>ELEMENT TO<br/>SCROLL</> :
           i === 7 ? <>ENJOY<br/>HORIZONTAL<br/>VERTCIAL<br/>SUPPORT</> :
           i === 8 ? <>FEEL FREE TO<br/>USE<br/>STICKY</> :
                     <>TOUCH SUPPORT<br/>INCLUDED</>;
  };

  const codeWord = "CODE".split('');
  
  return (
    <div ref={containerRef}>
        <div id="particles-js"></div>
        <Script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" strategy="afterInteractive" onLoad={() => {
            if (window.particlesJS) {
                window.particlesJS("particles-js", {
                    "particles": { "number": { "value": 100, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.7, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.6, "width": 1 }, "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "window", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } } }, "retina_detect": true
                });
            }
        }} />

        <section className="hero">
            <div className="image-wrapper">
                <img src="/upscalemedia-transformed.png" className="hero-img" alt="DEVS Club" />
            </div>
            <div className="bg-title-container">
                <div className="title-row">
                    <h1 className="main-title">
                        {"DEVS".split('').map((char, i) => (
                            <span key={i} className="char">{char}</span>
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

        <section className="next-section" style={{ position: 'relative' }}>
            <div className="stagger-container">
                <h2 className="stagger-line line-1">SO WHAT WE DO</h2>
                <h2 className="stagger-line line-2">
                    {codeWord.map((ch, idx) => (
                        <span key={idx} className={`code-char code-char-${idx}`} style={{ display: 'inline-block', willChange: 'transform,opacity' }}>{ch}</span>
                    ))}
                </h2>
                <h2 className="stagger-line line-3">COFFEE</h2>
                <h2 className="stagger-line line-4">REPEAT <span className="dot">.</span></h2>
            </div>

            <div id="stroke-panel" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '8px', height: '100vh', background: '#050505', zIndex: 98, pointerEvents: 'none', display: 'none' }}></div>
            <div id="portal-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100, display: 'none', pointerEvents: 'none', overflow: 'hidden' }}>
                <div className="panel-left" style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: '#050505' }}></div>
                <div className="panel-right" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: '#050505' }}></div>
                <div className="portal-glow" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '6px', height: '100vh', background: '#fff', boxShadow: '0 0 80px 40px #fff, 0 0 200px 80px #d6ff00', opacity: 0 }}></div>
                {Array.from({ length: 50 }).map((_, i) => {
                    const sz = Math.random() * 10 + 3;
                    return <div key={i} className="burst-particle" style={{ position: 'absolute', top: '50%', left: '50%', width: `${sz}px`, height: `${sz}px`, background: Math.random() > 0.5 ? '#d6ff00' : '#ffffff', borderRadius: '50%', opacity: 0, transform: 'translate(-50%,-50%)', boxShadow: '0 0 12px #d6ff00' }}></div>
                })}
            </div>
            <div id="portal-next-screen" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 90, display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: '#050505' }}>
                <h2 id="ns-title-1" style={{ fontFamily: "'Anton',sans-serif", fontSize: 'clamp(48px,10vw,160px)', color: '#f0f0f0', lineHeight: 0.9, margin: 0, opacity: 0, transform: 'translateY(60px)' }}>OUR</h2>
                <h2 id="ns-title-2" style={{ fontFamily: "'Anton',sans-serif", fontSize: 'clamp(48px,10vw,160px)', color: '#ff9d9d', lineHeight: 0.9, margin: 0, opacity: 0, transform: 'translateY(60px)' }}>PROJECTS</h2>
                <p id="ns-sub" style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(14px,2vw,22px)', color: '#d6ff00', letterSpacing: '0.3em', marginTop: '2vh', opacity: 0 }}>SCROLL TO EXPLORE</p>
            </div>
        </section>

        <section className="projects-section" style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: '#f5f3f2', color: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10vh 5vw', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '8vh', right: '5vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', zIndex: 20, textAlign: 'right' }}>
                <h2 className="projects-title-1" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(50px, 8vw, 120px)', letterSpacing: '-0.02em', lineHeight: 0.85, margin: 0, color: '#111', opacity: 0, transform: 'translateX(50px)', border: '2px solid transparent', padding: 0 }}>OUR PROJECTS</h2>
                <h2 className="projects-title-2" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(50px, 8vw, 120px)', letterSpacing: '-0.02em', lineHeight: 0.85, margin: 0, color: '#ddd', opacity: 0, transform: 'translateX(-50px)', padding: 0 }}>IN MOTION</h2>
            </div>
            <div className="cards-container" style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', minHeight: '80vh', marginTop: '10vh' }}>
                {Array.from({ length: 9 }).map((_, index) => {
                    const i = index + 1;
                    return (
                        <div key={i} className={`project-card card-${i}`} style={{ position: 'absolute', width: 'clamp(350px, 35vw, 550px)', height: 'clamp(450px, 75vh, 800px)', background: '#fff', border: '1px solid #eee', padding: '30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', boxShadow: '-8px 10px 25px rgba(0,0,0,0.1)', willChange: 'transform, opacity', zIndex: i }}>
                            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: '100px', color: '#ff9d9d', marginBottom: '20px', lineHeight: 0.8, letterSpacing: '-0.05em' }}>
                                0{i}
                            </div>
                            <div style={{ width: '100%', flex: 1, background: '#f9f9f9', borderRadius: '8px', marginBottom: '25px', backgroundImage: "url('/upscalemedia-transformed.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1, filter: 'grayscale(30%)', transition: 'filter 0.3s ease', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }}></div>
                            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(24px, 2.5vw, 40px)', color: '#111', lineHeight: 1, textTransform: 'uppercase' }}>
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

            <div className="coffee-container">
                <div className="coffee-grid">
                    {[
                        { id: 1, cls: "v-tall", date: "24 MAR 2026", title: "LATTE ART NIGHT", desc: "Join us for an exclusive evening where the foam is the canvas and the espresso is the ink." },
                        { id: 2, cls: "v-wide", date: "28 MAR 2026", title: "BREW WORKSHOP", desc: "From V60 to Chemex, discover the science behind the perfect extraction." },
                        { id: 3, cls: "v-small", date: "02 APR 2026", title: "CUPPING SESSION", desc: "A sensory journey through the coffee belt." },
                        { id: 4, cls: "v-medium", date: "05 APR 2026", title: "ROAST & TOAST", desc: "Ever wondered how green beans become brown?" },
                        { id: 5, cls: "v-wide", date: "10 APR 2026", title: "BEAN ORIGINS", desc: "A deep dive into the ethics and agriculture of specialty coffee." },
                        { id: 6, cls: "v-tall", date: "15 APR 2026", title: "COFFEE COCKTAILS", desc: "Exquisite espresso martinis, cold-brew negronis, and more." },
                        { id: 7, cls: "v-featured", date: "20 APR 2026", title: "SPECIALTY COFFEE EXPO", desc: "Explore the latest innovations in coffee technology and bean sourcing." },
                        { id: 8, cls: "v-tall", date: "15 APR 2026", title: "COFFEE COCKTAILS", desc: "Exquisite espresso martinis, cold-brew negronis, and more." }
                    ].map(card => (
                        <div key={card.id} className={`coffee-card ${card.cls}`} data-flip-id={`coffee-${card.id}`}>
                            <div className="card-inner">
                                <img src="/upscalemedia-transformed.png" alt={card.title} className="card-img" data-flip-id={`img-${card.id}`} />
                                <div className="card-overlay">
                                    <h3 className="card-title" data-flip-id={`title-${card.id}`}>{card.title}</h3>
                                    <p className="card-date">{card.date}</p>
                                </div>
                            </div>
                            <div className="hidden-content">{card.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="coffee-detail-overlay">
                <div className="detail-container">
                    <button className="detail-close">CLOSE [×]</button>
                    <div className="detail-hero" data-flip-id="detail-hero">
                        <img src="" alt="" className="detail-img" id="detail-active-img" />
                    </div>
                    <div className="detail-content">
                        <h2 className="detail-title" id="detail-active-title">TITLE</h2>
                        <p className="detail-tagline">Code • Coffee • Repeat.</p>
                        <div className="detail-desc" id="detail-active-desc">Lorem ipsum dolor sit amet...</div>
                        <div className="detail-gallery">
                            {Array.from({length: 3}).map((_, i) => (
                                <img key={i} src="/upscalemedia-transformed.png" alt={`gallery-${i}`} className="gal-thumb" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <SocialGallery />

        <section id="testimonials-section" className="testimonials-section">
            <div className="testimonials-header">
                <span className="section-label">03</span>
                <h2 className="section-title">WHAT OTHERS SAY</h2>
            </div>
            <div className="testimonials-grid">
                {[
                    { file: "akash.txt", name: "Akash", role: "Developer", feedback: "This club is exactly what our campus needed. The workshops and coding sessions are top-tier. Highly recommend joining!" },
                    { file: "priya.txt", name: "Priya", role: "UI UX Designer", feedback: "A great community to learn and collaborate. Managed to pick up some solid full-stack skills while helping on projects. Love the vibe!" },
                    { file: "rahul.txt", name: "Rahul", role: "Student", feedback: "Simplified complex concepts for me into practical coding projects. The members are incredibly helpful and welcoming to beginners." }
                ].map((t, idx) => (
                    <div key={idx} className="terminal-card">
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                            </div>
                        </div>
                        <div className="terminal-body">
                            <p className="prompt">user@devs:~$ cat testimonials/{t.file}</p>
                            <div className="content">
                                <p className="field">Name: <span className="val">{t.name}</span></p>
                                <p className="field">Role: <span className="val">{t.role}</span></p>
                                <p className="field">Feedback: <span className="val typewriter-trigger">{t.feedback}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section id="team-section" className="team-section">
            <div className="team-image-panel">
                <div className="team-img-stage">
                    {["tech", "event", "design", "media", "outreach", "core"].map((t, i) => (
                        <img key={i} className={`team-img ${i === 0 ? 'active' : ''}`} data-team={t} src="/upscalemedia-transformed.png" alt={`${t} Team`} />
                    ))}
                </div>
            </div>
            <div className="team-list-panel">
                <div className="team-panel-header">
                    <p className="team-panel-eyebrow">THE PEOPLE</p>
                    <h2 className="team-panel-title">MEET OUR<br/>TEAM</h2>
                </div>
                <div className="team-list">
                    {[
                        { team: "tech", label: "TECH TEAM", id: "01" },
                        { team: "event", label: "EVENT TEAM", id: "02" },
                        { team: "design", label: "DESIGN TEAM", id: "03" },
                        { team: "media", label: "MEDIA TEAM", id: "04" },
                        { team: "outreach", label: "OUTREACH TEAM", id: "05" },
                        { team: "core", label: "CORE TEAM", id: "06" }
                    ].map((t, idx) => (
                        <div key={idx} className={`team-row ${idx === 0 ? 'active' : ''}`} data-team={t.team} data-index={t.id} data-label={t.label}>
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
