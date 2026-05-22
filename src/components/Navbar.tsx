"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* Custom cursor — RAF-throttled so mouse tracking never competes with scroll */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Target position (updated on every mousemove)
    let mx = 0, my = 0;
    // Lerp-smoothed cursor position
    let cx = 0, cy = 0;
    // Flag: has a RAF tick been scheduled?
    let rafScheduled = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Only schedule one RAF at a time
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      rafScheduled = false;
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      // Continue lerping until cursor reaches target
      if (Math.abs(mx - cx) > 0.1 || Math.abs(my - cy) > 0.1) {
        rafScheduled = true;
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Event delegation — single listener instead of attaching to every element
    const SELECTORS = "a, button, .project-row, .skill-pill, .contact-heading";
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest(SELECTORS)) cursor.classList.add("hovering");
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest(SELECTORS)) cursor.classList.remove("hovering");
    };
    document.body.addEventListener("mouseover", onEnter, { passive: true });
    document.body.addEventListener("mouseout", onLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseover", onEnter);
      document.body.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div className="nav-fade" />
      <nav className={`site-nav ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.04em",
          }}
          onClick={() => setMobileMenuOpen(false)}
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

        {/* Desktop Menu */}
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

        {/* Mobile Hamburger Button */}
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>

        {/* Mobile Glassmorphic Drawer Overlay */}
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-menu-links">
            <li>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>
                Work
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary mobile-resume-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
