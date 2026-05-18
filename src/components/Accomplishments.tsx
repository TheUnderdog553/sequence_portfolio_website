"use client";

import { useEffect, useRef } from "react";

const items = [
  {
    label: "Certification",
    title: "Certified Ethical Hacker",
    meta: "EC-Council / Dec 2024",
    desc: "Credential ID: ECC8321456970",
  },
  {
    label: "Certification",
    title: "OCI AI Foundations Associate",
    meta: "Oracle / Aug 2025",
    desc: "Credential ID: 321832787OCI25AICFA",
  },
  {
    label: "Competition",
    title: "Blockchain IoT Auth for Smart Homes",
    meta: "First Place / Jan 2025",
    desc: "Authentication approach for smarter connected-home security.",
  },
  {
    label: "Conference",
    title: "ICSCNA",
    meta: "Nov 2023",
    desc: "Presented Intelliwatch, a lightweight SIEM concept for zero-day malware monitoring.",
  },
];

export default function Accomplishments() {
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
    <section ref={ref} className="section-container" style={{ padding: "112px 0 96px" }}>
      <div className="reveal" style={{ marginBottom: 18 }}>
        <span className="section-label">Credentials</span>
      </div>

      <h2 className="section-heading reveal" style={{ marginBottom: 54 }}>
        Certifications and recognition.
      </h2>

      <div className="credential-grid">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="credential-item reveal"
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.meta}</p>
            <small>{item.desc}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
