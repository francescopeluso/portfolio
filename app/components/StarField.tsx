"use client";

import { useEffect, useState } from "react";

const CHARS = ["*", "+", ".", "✦", "✧", "◦", "·", "×"];
const COUNT = 80;

interface Star {
  x: number;
  y: number;
  char: string;
  delay: number;
  speed: number;
  opacity: number;
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: COUNT }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        delay: Math.random() * 8,
        speed: 1.5 + Math.random() * 5,
        opacity: 0.04 + Math.random() * 0.18,
      }))
    );
  }, []);

  if (!stars.length) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden font-mono text-white select-none"
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute text-xs"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationName: "star-twinkle",
            animationDuration: `${s.speed}s`,
            animationDelay: `${s.delay}s`,
            animationTimingFunction: "steps(2)",
            animationIterationCount: "infinite",
            ["--base-opacity" as string]: s.opacity,
          } as React.CSSProperties}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
