"use client";

import { useEffect, useRef, useCallback } from "react";

const projects = [
  {
    num: "01",
    title: "Sensitive Info Scanner",
    cat: "Cybersecurity Tool",
    desc: "AI-powered desktop tool that monitors files in real-time and flags sensitive data leakage.",
    tools: ["PySide6", "Gemini AI", "Watchdog", "FPDF"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
  },
  {
    num: "02",
    title: "IndiaRide",
    cat: "Full Stack Platform",
    desc: "End-to-end ride-booking platform with real-time tracking, payments, and driver dashboards.",
    tools: ["Python", "Django", "Firebase", "Razorpay"],
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 50%, #081c15 100%)",
  },
  {
    num: "03",
    title: "BlockTrace",
    cat: "Forensics Dashboard",
    desc: "Forensic evidence management system with role-based access, blockchain audit trails, and ransomware tracking.",
    tools: ["React", "Firebase", "Framer Motion", "Node.js"],
    gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 60%, #1a1a2e 100%)",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = showcaseRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (showcaseRef.current) showcaseRef.current.style.cursor = "grab";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = showcaseRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.6;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  return (
    <section id="work" ref={ref} className="projects-section">
      {/* Section Header */}
      <div className="section-container projects-header">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="section-label">Selected Work</span>
        </div>
        <div className="projects-title-row reveal">
          <h2 className="projects-display-heading">
            Things I&apos;m&nbsp;<span className="projects-accent-word">proud of.</span>
          </h2>
          <p className="projects-drag-hint" aria-hidden="true">— drag to explore —</p>
        </div>
      </div>

      {/* Horizontal Card Showcase */}
      <div
        ref={showcaseRef}
        className="projects-track"
        style={{ cursor: "grab" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="project-card reveal"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {/* Gradient Thumbnail */}
            <div
              className="project-card-thumb"
              style={{ background: project.gradient }}
            >
              <span className="project-card-cat">{project.cat}</span>
              <span className="project-card-num">{project.num}</span>
            </div>

            {/* Card Info */}
            <div className="project-card-info">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.desc}</p>
              <div className="project-card-tools">
                {project.tools.map((tool) => (
                  <span key={tool} className="project-card-tool">{tool}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
