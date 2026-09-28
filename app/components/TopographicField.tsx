"use client";

import { useEffect, useRef } from "react";
import { createTopographicField } from "../lib/topographic-field.js";

export type FieldVariant = "home" | "work" | "about" | "blog" | "space" | "contact";

export function TopographicField({ variant, className = "" }: { variant: FieldVariant; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const field = createTopographicField(canvasRef.current, variant);
    return () => field.destroy();
  }, [variant]);

  return <div className={`topographic-field topographic-field--${variant} ${className}`.trim()}>
    <canvas ref={canvasRef} aria-hidden="true" />
  </div>;
}
