"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, KeyboardEvent, MouseEvent, useEffect, useState } from "react";

export type CoverFlowItem = {
  id: string;
  href: string;
  image: string | null;
  imageAlt: string;
  title: string;
  subtitle?: string;
  meta?: string;
};

type CoverFlowProps = {
  items: CoverFlowItem[];
  label: string;
  shape: "poster" | "square";
};

export function CoverFlow({ items, label, shape }: CoverFlowProps) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  function select(index: number) {
    if (items.length === 0) return;
    setActive((index + items.length) % items.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    select(active + (event.key === "ArrowRight" ? 1 : -1));
  }

  function onItemClick(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (index === active) return;
    event.preventDefault();
    select(index);
  }

  const current = items[active];
  if (!current) return null;

  return <div className={`cover-flow cover-flow--${shape}`} role="region" aria-label={label} data-reduced-motion={reducedMotion ? "true" : undefined}>
    <div className="cover-flow-controls" aria-label={`${label} controls`}>
      <button type="button" onClick={() => select(active - 1)} disabled={items.length < 2} aria-label="Previous cover">←</button>
      <span aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
      <button type="button" onClick={() => select(active + 1)} disabled={items.length < 2} aria-label="Next cover">→</button>
    </div>
    <div className="cover-flow-track" tabIndex={0} onKeyDown={onKeyDown}>
      {items.map((item, index) => {
        const forwardDistance = (index - active + items.length) % items.length;
        const circularOffset = forwardDistance > items.length / 2
          ? forwardDistance - items.length
          : forwardDistance;
        const offset = Math.max(-4, Math.min(4, circularOffset));
        const depth = Math.abs(offset);
        const angle = offset === 0 ? 0 : Math.sign(offset) * -46;
        const style = {
          "--flow-offset": offset,
          "--flow-depth": depth,
          "--flow-angle": angle,
          zIndex: items.length - depth,
        } as CSSProperties;
        return <Link
          key={item.id}
          className="cover-flow-item"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          style={style}
          data-distance={depth}
          aria-label={`${item.title}${item.subtitle ? ` by ${item.subtitle}` : ""}`}
          aria-current={index === active ? "true" : undefined}
          onClick={(event) => onItemClick(event, index)}
        >
          <span className="cover-flow-image">
            {item.image
              ? <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes={shape === "square" ? "(max-width: 560px) 11rem, 17rem" : "(max-width: 560px) 9rem, 13rem"}
                />
              : <span className="cover-flow-placeholder">{item.title}</span>}
          </span>
        </Link>;
      })}
    </div>
    <div className="cover-flow-caption" aria-live="polite">
      <div><p className="cover-flow-title">{current.title}</p>{current.subtitle && <p>{current.subtitle}</p>}</div>
      {current.meta && <p>{current.meta}</p>}
    </div>
  </div>;
}
