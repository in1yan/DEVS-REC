'use client';
import React from 'react';
import { projects } from '@/data/projects';
import Image from 'next/image';

const ProjectsSection = () => {
  return (
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
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card card-${project.id}`}
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
              zIndex: project.id,
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
              {project.number}
            </div>
            <div
              style={{
                width: "100%",
                flex: 1,
                background: "#f9f9f9",
                borderRadius: "8px",
                marginBottom: "25px",
                backgroundImage: `url('${project.img}')`,
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
              {project.description.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < project.description.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
