"use client";

import { useEffect, useRef } from "react";

const professionalExp = [
  {
    role: "Cybersecurity Intern",
    company: "Teachnook",
    year: "Aug 2024 - Sep 2024",
    desc: "Built a network traffic analysis tool with geolocation mapping and protocol-based packet filtering.",
  },
  {
    role: "Frontend Web Dev Intern",
    company: "Raise Digital",
    year: "Aug 2023 - Sep 2023",
    desc: "Collaborated with mentors to build responsive frontend interfaces and strengthen web delivery workflows.",
  },
];

const educationAndCredentials = [
  {
    role: "B.Tech CSE (Cyber Security)",
    company: "SRM Institute of Science and Technology",
    year: "2022 - 2026",
    desc: "Pursuing engineering degree with a current CGPA of 9.76/10. Focus areas: network protocols, systems security, and cryptography.",
  },
  {
    role: "Certified Ethical Hacker (CEH)",
    company: "EC-Council",
    year: "Issued Sep 2024",
    desc: "Credential ID: ECC8296435012. Validated expertise in threat vectors, scanning, web app vulnerabilities, and penetration testing.",
  },
  {
    role: "AWS Academy Graduate",
    company: "AWS Academy Cloud Foundations",
    year: "Issued Nov 2023",
    desc: "Earned cloud foundations certification covering cloud architecture, compute services, and infrastructure security.",
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

        <div className="career-grid reveal" style={{ transitionDelay: "0.15s" }}>
          <div className="career-col">
            <h3 className="career-col-title">Professional</h3>
            <div className="timeline-list">
              {professionalExp.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className="timeline-entry"
                >
                  <h4 className="timeline-role">{item.role}</h4>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-desc">{item.desc}</p>
                  <span className="timeline-date">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="career-col">
            <h3 className="career-col-title">Education & Credentials</h3>
            <div className="timeline-list">
              {educationAndCredentials.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className="timeline-entry"
                >
                  <h4 className="timeline-role">{item.role}</h4>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-desc">{item.desc}</p>
                  <span className="timeline-date">{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
