'use client';
import React from 'react';
import Masonry from '../Masonry';
import { events } from '@/data/events';

const EventsSection = () => {
  return (
    <section id="coffee-section" className="coffee-gallery-section">
      <div className="coffee-header">
        <span className="section-label">01</span>
        <h2 className="section-title">OUR EVENTS</h2>
      </div>

      <div style={{ minHeight: '800px', width: '100%' }}>
        <Masonry
          items={events}
          ease="elastic.out"
          duration={1.2}
          stagger={0}
          animateFrom="bottom"
          triggerStart="top 85%"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover
        />
      </div>
    </section>
  );
};

export default EventsSection;
