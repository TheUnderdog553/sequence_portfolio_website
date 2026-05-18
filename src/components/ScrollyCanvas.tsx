"use client";

import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 86; // frame_000 to frame_085
const LAST_FRAME_INDEX = TOTAL_FRAMES - 1;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.066s.png`;
}

type ScrollyCanvasProps = {
  targetRef: React.RefObject<HTMLElement | null>;
};

export default function ScrollyCanvas({ targetRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.2,
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit: scale image to cover the full canvas
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const compositionOffset =
      window.innerWidth >= 900
        ? cw * 0.02
        : window.innerWidth >= 560
          ? cw * 0.08
          : cw * 0.2;
    const dx = (cw - dw) / 2 + compositionOffset;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    canvas.style.width = `${vw}px`;
    canvas.style.height = `${vh}px`;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Hide the canvas once we scroll past the landing section.
  useEffect(() => {
    const section = targetRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [targetRef]);

  useMotionValueEvent(easedProgress, "change", (value) => {
    const frameIdx = Math.min(
      Math.max(Math.round(value * LAST_FRAME_INDEX), 0),
      LAST_FRAME_INDEX
    );

    if (frameIdx === currentFrameRef.current) return;

    currentFrameRef.current = frameIdx;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(frameIdx);
    });
  });

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFramePath(i);
      img.onload = () => {
        if (i === 0) {
          handleResize();
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
    handleResize();

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="sequence-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        willChange: "transform",
        transform: "translate3d(0,0,0)",
      }}
    />
  );
}
