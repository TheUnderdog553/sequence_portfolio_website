"use client";

import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import Career from "@/components/Career";
import Projects from "@/components/Projects";
import Accomplishments from "@/components/Accomplishments";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ position: "relative", overflowX: "hidden" }}>
      <Navbar />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Landing />
        <div style={{ position: "relative", backgroundColor: "var(--bg)" }}>
          <About />
          <WhatIDo />
          <Career />
          <Projects />
          <div style={{ position: "relative", zIndex: 10, backgroundColor: "var(--bg)" }}>
            <Accomplishments />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
