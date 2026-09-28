"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; phase: number };

export function DotField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const element: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let pointer = { x: -1000, y: -1000 };
    let dots: Dot[] = [];

    function draw(time: number) {
      const width = element.clientWidth;
      const height = element.clientHeight;
      ctx.clearRect(0, 0, width, height);
      const color = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim() || "#171717";

      for (const dot of dots) {
        const distance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
        const influence = Math.max(0, 1 - distance / 150);
        const pulse = reduced ? 0 : Math.sin(time * 0.001 + dot.phase) * 0.7;
        const radius = 1.1 + influence * 3.5 + pulse * 0.35;
        ctx.globalAlpha = 0.18 + influence * 0.35;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      if (!reduced) frame = requestAnimationFrame(draw);
    }

    function resize() {
      const ratio = Math.min(devicePixelRatio, 2);
      const width = element.clientWidth;
      const height = element.clientHeight;
      const gap = width < 600 ? 18 : 24;
      element.width = width * ratio;
      element.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
      }
      draw(0);
    }

    function move(event: PointerEvent) {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : { x: -1000, y: -1000 };
      if (reduced) draw(0);
    }

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className={`dot-field ${className}`} aria-hidden="true" />;
}
