"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";

const marqueeText =
  "Available for work / Cybersecurity / Full stack development / CEH certified / ";

function StaggeredText({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <span className="hero-title-line">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="hero-title-char"
          style={{ animationDelay: `${baseDelay + index * 0.028}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Landing() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="landing-section">
      <ScrollyCanvas targetRef={sectionRef} />
      <div className="hero-vignette" />

      <div className="landing-sticky">
        <div className="hero-copy">
          <p className="hero-kicker">Cybersecurity / Full Stack Engineering</p>

          <h1 className="hero-title" aria-label="Priyanshu Singh">
            <StaggeredText text="Priyanshu" baseDelay={0.28} />
            <StaggeredText text="Singh" baseDelay={0.58} />
          </h1>

          <p className="hero-summary">
            I build clean, secure, and reliable digital products with a focus on
            practical engineering, strong interfaces, and thoughtful motion.
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="cta-primary">
              Let&apos;s Connect
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Resume
            </a>
          </div>
        </div>



        <div className="hero-highlights">
          <div className="highlight-card">
            <div className="highlight-tag">Cybersecurity</div>
            <h3 className="highlight-val">CEH Certified</h3>
            <p className="highlight-desc">
              EC-Council Certified Ethical Hacker specializing in secure architecture & pentesting.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-tag">Academics</div>
            <h3 className="highlight-val">9.76 CGPA</h3>
            <p className="highlight-desc">
              Pursuing B.Tech CSE (Cyber Security) at SRM IST, building secure systems.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-tag">Engineering</div>
            <h3 className="highlight-val">Full-Stack</h3>
            <p className="highlight-desc">
              Developing performant backends and interactive web apps with robust design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
