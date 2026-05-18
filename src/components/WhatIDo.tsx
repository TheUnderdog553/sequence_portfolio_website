"use client";

import { useEffect, useRef } from "react";

const domains = [
  {
    index: "01",
    title: "Development",
    desc: "Modern web apps, backends, dashboards, and product experiences with a bias for maintainable architecture and clean, type-safe code.",
    skills: ["React", "Next.js", "Node.js", "Python", "Django", "PostgreSQL"],
    accentColor: "var(--accent)",
  },
  {
    index: "02",
    title: "Cybersecurity",
    desc: "Network analysis, vulnerability assessment, reconnaissance, secure workflows, and practical defensive tooling backed by CEH certification.",
    skills: ["CEH", "Scanning", "Forensics", "Cryptography", "Traffic Analysis", "Security Tools"],
    accentColor: "var(--accent-2)",
  },
];

export default function WhatIDo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="whatido-section">
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: 16 }}>
          <span className="section-label">What I Do</span>
        </div>
        <h2 className="section-heading reveal" style={{ marginBottom: 64 }}>
          Engineering with a<br />security mindset.
        </h2>

        <div className="whatido-list">
          {domains.map((domain, index) => (
            <article
              key={domain.title}
              className="whatido-row reveal"
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              {/* Index */}
              <span
                className="whatido-index"
                style={{ color: domain.accentColor }}
              >
                {domain.index}
              </span>

              {/* Title + Desc */}
              <div className="whatido-body">
                <h3 className="whatido-title">{domain.title}</h3>
                <p className="whatido-desc">{domain.desc}</p>
              </div>

              {/* Skills */}
              <div className="whatido-skills">
                {domain.skills.map((skill) => (
                  <span key={skill} className="whatido-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
