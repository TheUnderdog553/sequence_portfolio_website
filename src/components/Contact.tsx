"use client";

import { useEffect, useRef, useState } from "react";

const socials = [
  { name: "GitHub", url: "https://github.com/TheUnderdog553" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/priyanshu-singh-a50a22265" },
];

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const email = "spriyanshu553@gmail.com";

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

    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scramble = () => {
    const el = headingRef.current;
    if (!el) return;

    const original = "Let's Work Together";
    const chars = "!<>-_\\/[]{}=+*^?#";
    let iteration = 0;

    const interval = window.setInterval(() => {
      el.textContent = original
        .split("")
        .map((_, index) => (index < iteration ? original[index] : chars[Math.floor(Math.random() * chars.length)]))
        .join("");
      iteration += 0.5;
      if (iteration >= original.length) {
        window.clearInterval(interval);
        el.textContent = original;
      }
    }, 30);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: 18 }}>
          <span className="section-label">Contact</span>
        </div>

        <h2
          ref={headingRef}
          className="contact-heading reveal"
          onMouseEnter={scramble}
          style={{ marginBottom: 38 }}
        >
          Let&apos;s Work Together
        </h2>

        <div className="contact-actions reveal" style={{ transitionDelay: "0.12s" }}>
          <button onClick={copyEmail} type="button" className="email-button">
            <span>{email}</span>
            <small style={{ 
              borderColor: copied ? "var(--accent)" : "var(--border)",
              color: copied ? "var(--accent)" : "var(--text)",
              backgroundColor: copied ? "rgba(215, 181, 109, 0.08)" : "transparent",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
              {copied ? "✓ Copied" : "Copy"}
            </small>
          </button>
        </div>

        <div className="contact-socials reveal" style={{ transitionDelay: "0.2s" }}>
          {socials.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
              {social.name}
            </a>
          ))}
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>

        <footer className="site-footer">
          <span>Designed and developed by Priyanshu Singh</span>
          <span>2026</span>
        </footer>
      </div>
    </section>
  );
}
