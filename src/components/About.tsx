"use client";

import { useEffect, useRef } from "react";

const skillCategories = [
  {
    title: "Development",
    subtitle: "Building highly interactive frontend interfaces and solid, scalable backends.",
    skills: ["React", "Next.js", "Django", "TypeScript", "PostgreSQL", "C++"],
    bgClass: "bento-bg-code",
  },
  {
    title: "Security & Infra",
    subtitle: "Designing secure network environments and automating defense mechanisms.",
    skills: ["AWS", "Git", "Wazuh", "Pentesting Tools"],
    bgClass: "bento-bg-sec",
  },
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

        <div className="reveal" style={{ marginTop: 80, transitionDelay: "0.2s" }}>
          <h3 className="subheading" style={{ marginBottom: 28 }}>Skillset & Domains</h3>
          <div className="skills-bento">
            {skillCategories.map((cat, index) => (
              <div
                key={cat.title}
                className="bento-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`bento-bg-decoration ${cat.bgClass}`} />
                <div className="bento-header">
                  <h4 className="bento-title">{cat.title}</h4>
                  <p className="bento-subtitle">{cat.subtitle}</p>
                </div>
                <div className="bento-skills">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="bento-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
