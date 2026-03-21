'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import './SocialGallery.css';

gsap.registerPlugin(ScrollTrigger, Flip);

// Added 10 elements with explicitly asymmetrical variations matching F1 layout goals
const socialData = [
  {
    id: 1, type: "youtube", size: "xl", offset: "up",
    title: "How to Build a Custom Hook in React",
    thumbnail: "/upscalemedia-transformed.png",
    duration: "12:45", link: "https://youtube.com", views: "125K"
  },
  {
    id: 2, type: "instagram", size: "md", offset: "down",
    caption: "Day 45 of 100 Days of Code! Building a Next.js App with GSAP animated features.",
    thumbnail: "/upscalemedia-transformed.png",
    likes: "4,502", link: "https://instagram.com"
  },
  {
    id: 3, type: "linkedin", size: "sm", offset: "center",
    content: "Thrilled to announce that I've joined DEVS as a Core Member! Looking forward to building amazing things. #career #devs",
    author: "Sakthivel R", role: "Full Stack Engineer", link: "https://linkedin.com"
  },
  {
    id: 4, type: "youtube", size: "lg", offset: "up",
    title: "Mastering GSAP ScrollTrigger Animations",
    thumbnail: "/upscalemedia-transformed.png",
    duration: "08:20", views: "89K", link: "https://youtube.com"
  },
  {
    id: 5, type: "instagram", size: "md", offset: "down",
    caption: "Behind the scenes at the latest club hackathon 🚀 Unbelievable energy from everyone!",
    thumbnail: "/upscalemedia-transformed.png",
    likes: "8,920", link: "https://instagram.com"
  },
  {
    id: 6, type: "linkedin", size: "sm", offset: "center",
    content: "Just published a new article on optimizing React performance. Check it out and let me know your thoughts!",
    author: "Alex Developer", role: "Senior UX Engineer", link: "https://linkedin.com"
  },
  {
    id: 7, type: "youtube", size: "xl", offset: "down",
    title: "Deploying Next.js to Vercel - Best Practices",
    thumbnail: "/upscalemedia-transformed.png",
    duration: "15:30", views: "201K", link: "https://youtube.com"
  },
  {
    id: 8, type: "instagram", size: "md", offset: "up",
    caption: "New dual-monitor desk setup! What do you all think? #workspace #developer #cozy",
    thumbnail: "/upscalemedia-transformed.png",
    likes: "12K", link: "https://instagram.com"
  },
  {
    id: 9, type: "linkedin", size: "sm", offset: "center",
    content: "We are hiring! Looking for passionate frontend engineers with deep Next.js and React experience to join our team in London.",
    author: "Sarah Harding", role: "Talent Acquisition", link: "https://linkedin.com"
  },
  {
    id: 10, type: "youtube", size: "lg", offset: "up",
    title: "Tailwind CSS vs Vanilla CSS in 2026",
    thumbnail: "/upscalemedia-transformed.png",
    duration: "10:15", views: "45K", link: "https://youtube.com"
  }
];

export default function SocialGallery({ sectionRef: externalSectionRef, containerRef: externalContainerRef }) {
  const internalSectionRef = useRef(null);
  const internalContainerRef = useRef(null);
  const modalRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Use external refs if provided, otherwise use internal refs
  const sectionRef = externalSectionRef || internalSectionRef;
  const containerRef = externalContainerRef || internalContainerRef;

  useGSAP(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    // Perfect horizontal synchronization 
    const distanceToScroll = container.scrollWidth - window.innerWidth;

    const cards = gsap.utils.toArray('.sg-card');
    gsap.set(cards, { clearProps: "y,opacity,scale,transform" });

    // Ensure the scroll stops smoothly without snapping
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distanceToScroll}`,
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    // Horizontal sliding behavior
    tl.fromTo(container,
      { x: -distanceToScroll },
      { x: 0, ease: "none" }
    );

    return () => {
      // Only kill ScrollTriggers associated with this section
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) {
          t.kill();
        }
      });
    };
  }, { scope: sectionRef, dependencies: [] });

  const openModal = (card, e) => {
    setActiveCard(card);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!modalRef.current) return;
        const sourceEl = e.currentTarget;
        const targetEl = modalRef.current.querySelector('.sg-modal-inner');

        if (!targetEl) return;
        const state = Flip.getState([sourceEl, targetEl], { props: "borderRadius,boxShadow" });

        gsap.set(modalRef.current, { display: 'flex' });
        gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

        Flip.from(state, {
          targets: [targetEl],
          duration: 0.7,
          ease: "power3.inOut",
          scale: true,
          clearProps: "all",
          onComplete: () => {
            gsap.fromTo(".sg-modal-info, .sg-modal-media",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
          }
        });
      });
    });
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(modalRef.current, { display: 'none' });
        setActiveCard(null);
        document.body.style.overflow = '';
      }
    });
  };

  return (
    <>
      <div ref={containerRef} className="sg-cards-container">
        {socialData.map((data) => (
          <div
            key={data.id}
            // DYNAMIC LAYOUT: Mapped class names apply specific width/height dimensions and offsets
            className={`sg-card sg-${data.type} sg-size-${data.size} sg-offset-${data.offset}`}
            onClick={(e) => openModal(data, e)}
          >
            <div className="sg-brand-icon">
              {data.type === 'youtube' ? 'YT' : data.type === 'instagram' ? 'IG' : 'IN'}
            </div>

            {data.type === 'youtube' && (
              <>
                <div className="sg-img-wrap">
                  <img className="sg-parallax-img" src={data.thumbnail} alt={data.title} />
                  <span className="sg-badge">{data.duration}</span>
                  <div className="sg-play-overlay">▶</div>
                </div>
                <div className="sg-info">
                  <h3>{data.title}</h3>
                  <p className="sg-stats">{data.views} views</p>
                </div>
              </>
            )}

            {data.type === 'instagram' && (
              <>
                <div className="sg-img-wrap">
                  <img className="sg-parallax-img" src={data.thumbnail} alt="Instagram Reel" />
                  <div className="sg-play-overlay">▶</div>
                </div>
                <div className="sg-info">
                  <p className="sg-caption">{data.caption}</p>
                  <p className="sg-stats">♥ {data.likes}</p>
                </div>
              </>
            )}

            {data.type === 'linkedin' && (
              <>
                <div className="sg-author-wrap">
                  <div className="sg-avatar"></div>
                  <div>
                    <h4>{data.author}</h4>
                    <p>{data.role}</p>
                  </div>
                </div>
                <div className="sg-info" style={{ marginTop: 0 }}>
                  <p className="sg-post-content">{data.content}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* GSAP Flip Modal */}
      <div ref={modalRef} className="sg-modal">
        <div className="sg-modal-backdrop" onClick={closeModal}></div>
        <button className="sg-modal-close" onClick={closeModal}>CLOSE [×]</button>

        <div className="sg-modal-content">
          {activeCard && (
            <div className={`sg-modal-inner sg-modal-${activeCard.type}`}>
              {activeCard.type === 'youtube' && (
                <>
                  <div className="sg-modal-media">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                  </div>
                  <div className="sg-modal-info">
                    <h2>{activeCard.title}</h2>
                    <p style={{ marginTop: '12px' }}>{activeCard.views} views • {activeCard.duration}</p>
                    <a href={activeCard.link} target="_blank" rel="noreferrer" className="sg-link-btn">Watch on YouTube</a>
                  </div>
                </>
              )}
              {activeCard.type === 'instagram' && (
                <>
                  <div className="sg-modal-media">
                    <img src={activeCard.thumbnail} alt="Instagram Post" />
                  </div>
                  <div className="sg-modal-info">
                    <h2 style={{ fontSize: '24px', letterSpacing: '0.02em', margin: 0 }}>Instagram Reel</h2>
                    <p style={{ marginTop: '20px' }}>{activeCard.caption}</p>
                    <p style={{ marginTop: '20px', color: '#fff', fontWeight: 700 }}>♥ {activeCard.likes} likes</p>
                    <a href={activeCard.link} target="_blank" rel="noreferrer" className="sg-link-btn">View on Instagram</a>
                  </div>
                </>
              )}
              {activeCard.type === 'linkedin' && (
                <>
                  <div className="sg-modal-info sg-linkedin-full">
                    <div className="sg-author-wrap" style={{ marginBottom: '30px' }}>
                      <div className="sg-avatar" style={{ width: '80px', height: '80px' }}></div>
                      <div>
                        <h4 style={{ fontSize: '24px' }}>{activeCard.author}</h4>
                        <p style={{ fontSize: '16px' }}>{activeCard.role}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: '20px', color: '#fff', lineHeight: 1.8 }}>{activeCard.content}</p>
                    <a href={activeCard.link} target="_blank" rel="noreferrer" className="sg-link-btn" style={{ marginTop: '40px' }}>View on LinkedIn</a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
