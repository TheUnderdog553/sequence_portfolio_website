"use client";

import { useEffect, useRef } from "react";

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Django",
  "TypeScript",
  "PostgreSQL",
  "C++",
  "Firebase",
  "Tailwind CSS",
  "AWS",
  "Figma",
];

const techTicker = [
  "React",
  "Node.js",
  "Python",
  "Django",
  "Cybersecurity",
  "PostgreSQL",
  "TypeScript",
  "Firebase",
  "AWS",
  "Framer Motion",
  "Next.js",
  "Git",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "132px 0 84px" }}>
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: 18 }}>
          <span className="section-label">About</span>
        </div>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 72,
            alignItems: "start",
          }}
        >
          <div className="reveal">
            <h2 className="section-heading">
              Secure systems,
              <br />
              polished interfaces.
            </h2>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.12s" }}>
            <p className="body-large">
              I&apos;m a B.Tech Cyber Security student at SRM IST with a strong
              full-stack development foundation. My work sits between secure
              engineering, useful automation, and interfaces that feel precise.
            </p>

            <dl className="detail-grid">
              <div>
                <dt>Location</dt>
                <dd>Tamil Nadu, India</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>SRM IST</dd>
              </div>
              <div>
                <dt>CGPA</dt>
                <dd>9.76</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 64, transitionDelay: "0.2s" }}>
          <h3 className="subheading">Skillset and tools</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="tech-ticker-wrap reveal" style={{ transitionDelay: "0.28s" }}>
          <div className="tech-ticker-track">
            {[...techTicker, ...techTicker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
