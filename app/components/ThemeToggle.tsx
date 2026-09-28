"use client";
import { useSyncExternalStore } from "react";

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerThemeSnapshot() {
  return null;
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  function toggle() {
    const theme = dark === true ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }

  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={dark === null ? "Toggle color theme" : `Switch to ${dark ? "light" : "dark"} mode`} aria-pressed={dark === true}><span aria-hidden="true">{dark === null ? "◐" : dark ? "○" : "●"}</span> {dark === null ? "theme" : dark ? "light" : "dark"}</button>;
}
