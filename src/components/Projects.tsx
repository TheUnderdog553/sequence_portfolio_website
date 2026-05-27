"use client";

import { useEffect, useRef, useCallback } from "react";

const projects = [
  {
    num: "01",
    title: "SentinaGaurd",
    cat: "Cybersecurity Platform",
    desc: "AI-powered PII scanning and anchored provenance console that monitors files, anchors audit logs to Fabric/EVM blockchains, and manages a secure recovery vault.",
    tools: ["Node.js", "Hyperledger", "EVM Blockchain", "Hugging Face", "IPFS"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    link: "https://sentina-gaurd-main.vercel.app/",
  },
  {
    num: "02",
    title: "IndiaRide",
    cat: "Full Stack Platform",
    desc: "End-to-end ride-booking platform with real-time tracking, payments, and driver dashboards.",
    tools: ["Python", "Django", "Firebase", "Razorpay"],
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 50%, #081c15 100%)",
    link: "https://indiaride-ui.vercel.app",
  },
  {
    num: "03",
    title: "BlockTrace",
    cat: "Forensics Dashboard",
    desc: "Forensic evidence management system with role-based access, blockchain audit trails, and ransomware tracking.",
    tools: ["React", "Firebase", "Framer Motion", "Node.js"],
    gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 60%, #1a1a2e 100%)",
    link: "https://frontend-sooty-seven-h7ty5rlj41.vercel.app",
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
        <div className="mini-window" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">indiaride-ui.vercel.app</span>
          </div>
          <div className="window-body" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexGrow: 1 }}>
            <img src="/project-indiaride.png" alt="IndiaRide Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <span className="window-title">BlockTrace Command Center</span>
          </div>
          <div className="window-body blocktrace-dashboard-layout">
            {/* Sidebar */}
            <aside className="mini-sidebar">
              <div className="mini-sidebar-logo">
                <span className="logo-dot"></span>
              </div>
              <nav className="mini-sidebar-nav">
                <span className="nav-icon active"></span>
                <span className="nav-icon"></span>
                <span className="nav-icon"></span>
                <span className="nav-icon"></span>
                <span className="nav-icon"></span>
              </nav>
              <div className="mini-sidebar-stats">
                <span className="stat-line"></span>
                <span className="stat-line"></span>
              </div>
            </aside>

            {/* Dashboard Content */}
            <main className="mini-main">
              <header className="mini-main-header">
                <div>
                  <h4 className="mini-main-title">Evidence Command Center</h4>
                  <p className="mini-main-desc">Channel: evidence-channel</p>
                </div>
                <span className="mini-live-badge">
                  <span className="pulse-dot"></span> Ledger Live
                </span>
              </header>

              <div className="mini-metrics-grid">
                <div className="mini-metric-card border-neon">
                  <span className="metric-label">Entries</span>
                  <span className="metric-val text-neon">28</span>
                  <div className="mini-sparkline spark-neon"></div>
                </div>
                <div className="mini-metric-card border-success">
                  <span className="metric-label">Integrity</span>
                  <span className="metric-val text-success">100%</span>
                  <div className="mini-sparkline spark-success"></div>
                </div>
                <div className="mini-metric-card border-warning">
                  <span className="metric-label">Pending</span>
                  <span className="metric-val text-warning">02</span>
                  <div className="mini-sparkline spark-warning"></div>
                </div>
                <div className="mini-metric-card border-accent">
                  <span className="metric-label">Cases</span>
                  <span className="metric-val text-accent">04</span>
                  <div className="mini-sparkline spark-accent"></div>
                </div>
              </div>

              <div className="mini-dashboard-split">
                <div className="mini-chart-card">
                  <span className="split-card-label">Evidence Intake</span>
                  <div className="mini-chart-visual">
                    <svg viewBox="0 0 100 30" className="chart-svg">
                      <defs>
                        <linearGradient id="chartGlowNeon" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="chartGlowSuccess" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <path d="M0,25 Q15,10 30,18 T60,5 T90,12 T100,8 L100,30 L0,30 Z" className="chart-area-neon" />
                      <path d="M0,25 Q15,10 30,18 T60,5 T90,12 T100,8" className="chart-line-neon" />
                      <path d="M0,28 Q15,18 30,22 T60,12 T90,18 T100,15 L100,30 L0,30 Z" className="chart-area-success" />
                      <path d="M0,28 Q15,18 30,22 T60,12 T90,18 T100,15" className="chart-line-success" />
                    </svg>
                  </div>
                </div>

                <div className="mini-network-card">
                  <span className="split-card-label">Fabric Nodes</span>
                  <div className="mini-nodes-row">
                    <div className="mini-node online">
                      <span className="node-dot-pulse"></span>Forensics
                    </div>
                    <div className="mini-node online">
                      <span className="node-dot-pulse"></span>Police
                    </div>
                    <div className="mini-node online">
                      <span className="node-dot-pulse"></span>Court
                    </div>
                  </div>
                </div>
              </div>
            </main>
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
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-thumb"
                style={{ background: project.gradient, display: "flex" }}
              >
                <div className="mockup-wrapper">
                  {renderMockup(project.num)}
                </div>
                <span className="project-card-cat">{project.cat}</span>
                <span className="project-card-num">{project.num}</span>
                <span className="project-card-live-badge">Live Demo ↗</span>
              </a>
            ) : (
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
            )}

            {/* Card Info */}
            <div className="project-card-info">
              <h3 className="project-card-title">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link-title"
                  >
                    {project.title} <span className="title-arrow">↗</span>
                  </a>
                ) : (
                  project.title
                )}
              </h3>
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
