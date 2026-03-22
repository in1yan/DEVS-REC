'use client';
import React from 'react';
import Image from 'next/image';
import { teams } from '@/data/teams';

const TeamSection = () => {
  return (
    <section id="team-section" className="team-section">
      <div className="team-image-panel">
        <div className="team-img-stage">
          {teams.map((t, i) => (
            <Image
              key={i}
              className={`team-img ${i === 0 ? "active" : ""}`}
              data-team={t.team}
              src={t.img}
              alt={`${t.label}`}
              width={800}
              height={600}
              priority
              style={{ objectFit: 'cover' }}
            />
          ))}
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
          {teams.map((t, idx) => (
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
  );
};

export default TeamSection;
