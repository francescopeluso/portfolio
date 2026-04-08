"use client";

import { useEffect, useState } from "react";

const STATUSES = [
  "caffeine_level: critically_low",
  "sleep_debt: 47h",
  "stackoverflow_tabs: 23",
  "git status: 2 untracked files",
  "bugs_introduced: 3  bugs_fixed: 1",
  "deadline: yesterday",
  "impostor_syndrome: active",
  "npm install: still running...",
  "todo_list: 99+ items",
  "last_commit: 'fix stuff'",
  "uptime: 3d 7h 42m",
  "vim: :wq not working",
];

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
      setDate(now.toISOString().slice(0, 10));
    };
    tick();
    const clock = setInterval(tick, 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const rotator = setInterval(() => setIdx(i => (i + 1) % STATUSES.length), 4000);
    return () => clearInterval(rotator);
  }, []);

  return (
    <div className="border-t border-white px-4 py-1 flex items-center justify-between text-xs select-none opacity-40">
      <span>{STATUSES[idx]}</span>
      <span className="tabular-nums">{date} {time}</span>
    </div>
  );
}
