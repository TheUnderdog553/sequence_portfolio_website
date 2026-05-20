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

  // Inertial drag physics hooks
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);
  const velX = useRef(0);
  const momentumID = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (momentumID.current) cancelAnimationFrame(momentumID.current);
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = showcaseRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftState.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    velX.current = 0;
    if (momentumID.current) cancelAnimationFrame(momentumID.current);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = showcaseRef.current;
    if (!el) return;
    el.style.cursor = "grab";

    const momentum = () => {
      if (!showcaseRef.current) return;
      showcaseRef.current.scrollLeft += velX.current;
      velX.current *= 0.95; // decay factor (friction)
      if (Math.abs(velX.current) > 0.5) {
        momentumID.current = requestAnimationFrame(momentum);
      }
    };
    momentumID.current = requestAnimationFrame(momentum);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = showcaseRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    const oldScroll = el.scrollLeft;
    el.scrollLeft = scrollLeftState.current - walk;
    velX.current = el.scrollLeft - oldScroll;
  }, []);

  // Arrow controls
  const scrollLeftBtn = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  // Mockup Renderer matching Project details
  const renderMockup = (num: string) => {
    if (num === "01") {
      return (
        <div className="mini-window">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">scanner_daemon.sh</span>
          </div>
          <div className="window-body terminal-theme">
            <div className="scan-status-row">
              <span className="status-label">SYS_WATCH ACTIVE</span>
              <span className="status-pulse"></span>
            </div>
            <div className="scan-feed">
              <div className="feed-item warning">
                <span>[!]</span>
                <span className="feed-file">config.json</span>
                <span className="feed-desc">AWS KEY</span>
              </div>
              <div className="feed-item danger">
                <span>[CRIT]</span>
                <span className="feed-file">id_rsa</span>
                <span className="feed-desc">SSH KEY</span>
              </div>
              <div className="feed-item success">
                <span>[OK]</span>
                <span className="feed-file">main.py</span>
                <span className="feed-desc">CLEAN</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (num === "02") {
      return (
        <div className="mini-window">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">dispatch_map_live</span>
          </div>
          <div className="window-body map-theme">
            <div className="map-grid"></div>
            <div className="map-route-line">
              <span className="car-marker"></span>
            </div>
            <div className="pin pin-start"></div>
            <div className="pin pin-end"></div>
            <div className="map-overlay-card">
              <div className="driver-info">
                <span className="avatar-placeholder">🚗</span>
                <div>
                  <span className="driver-name">Rajesh K.</span>
                  <span className="driver-rating">★ 4.9</span>
                </div>
              </div>
              <span className="trip-status pulsing">On Route</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mini-window">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">ledger_audit_v2</span>
          </div>
          <div className="window-body dashboard-theme">
            <div className="dashboard-grid">
              <div className="db-card">
                <span className="db-label">Integrity</span>
                <span className="db-value">100%</span>
              </div>
              <div className="db-card">
                <span className="db-label">Alerts</span>
                <span className="db-value danger-text">02</span>
              </div>
            </div>
            <div className="blockchain-visual">
              <div className="block active">
                <span className="block-hash">#a7f1</span>
                <span className="block-status">Ok</span>
              </div>
              <span className="block-connector"></span>
              <div className="block alert">
                <span className="block-hash">#9b2c</span>
                <span className="block-status">Crit</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

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
          <div className="projects-nav-controls">
            <span className="projects-drag-hint" aria-hidden="true">— drag to explore —</span>
            <div className="projects-arrows">
              <button className="project-arrow-btn" onClick={scrollLeftBtn} aria-label="Previous Project">
                ←
              </button>
              <button className="project-arrow-btn" onClick={scrollRightBtn} aria-label="Next Project">
                →
              </button>
            </div>
          </div>
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
            {/* Gradient Thumbnail with UI Mockup */}
            <div
              className="project-card-thumb"
              style={{ background: project.gradient }}
            >
              <div className="mockup-wrapper">
                {renderMockup(project.num)}
              </div>
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
