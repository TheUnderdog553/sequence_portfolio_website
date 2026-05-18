"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Custom cursor */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let mx = 0, my = 0, cx = 0, cy = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move);

    let raf: number;
    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const hoverables = () => document.querySelectorAll("a, button, .project-row, .skill-pill, .contact-heading");
    const addHover = () => {
      hoverables().forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
      });
    };
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div className="nav-fade" />
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.04em",
          }}
        >
          Priyanshu Singh
        </Link>

        <a
          href="mailto:spriyanshu553@gmail.com"
          className="nav-email"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "13px",
            letterSpacing: "0.1em",
            fontWeight: 400,
            color: "var(--text-dim)",
          }}
        >
          spriyanshu553@gmail.com
        </a>

        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "clamp(20px, 4vw, 48px)",
            alignItems: "center",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
              style={{ padding: "10px 22px", fontSize: "12px" }}
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
