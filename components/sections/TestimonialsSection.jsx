'use client';
import React from 'react';
import { testimonials } from '@/data/testimonials';

const TestimonialsSection = () => {
  return (
    <section id="testimonials-section" className="testimonials-section">
      <div className="testimonials-header">
        <span className="section-label">03</span>
        <h2 className="section-title">WHAT OTHERS SAY</h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, idx) => (
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
  );
};

export default TestimonialsSection;
