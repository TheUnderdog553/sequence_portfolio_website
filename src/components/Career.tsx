"use client";

import { useEffect, useRef } from "react";

const history = [
  {
    role: "Cybersecurity Intern",
    company: "Teachnook",
    year: "Aug 2024 - Sep 2024",
    desc: "Built a network traffic analysis tool with geolocation maps and protocol-based packet filtering.",
  },
  {
    role: "Frontend Web Dev Intern",
    company: "Raise Digital",
    year: "Aug 2023 - Sep 2023",
    desc: "Collaborated with mentors to build three web projects and strengthen frontend delivery fundamentals.",
  },
  {
    role: "B.Tech CSE, Cyber Security",
    company: "SRM IST, Kattankulathur",
    year: "2022 - 2026",
    desc: "CGPA 9.76/10 with focus on network security, digital forensics, system exploitation, and cryptography.",
  },
  {
    role: "Class XII, CBSE",
    company: "Loyola International School, Lucknow",
    year: "2021",
    desc: "Completed senior secondary education with 87.2%.",
  },
  {
    role: "Class X, CBSE",
    company: "Stella Maris Convent School, Sultanpur",
    year: "2019",
    desc: "Completed secondary education with 96.6%.",
  },
];

export default function Career() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="career-section" style={{ padding: "116px 0" }}>
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: 18 }}>
          <span className="section-label">Experience and Education</span>
        </div>

        <h2 className="section-heading reveal" style={{ marginBottom: 54 }}>
          A focused path through code and security.
        </h2>

        <div style={{ maxWidth: 820 }}>
          {history.map((item, index) => (
            <div
              key={`${item.role}-${item.year}`}
              className="timeline-entry reveal"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div>
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-desc">{item.desc}</p>
              </div>
              <span className="timeline-date">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
