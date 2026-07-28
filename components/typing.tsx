"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Software Engineer",
  "Electrical Engineer",
  "Entrepreneur",
  "Robotics Educator",
];

export function TypingRoles() {
  const [text, setText] = useState("");

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const current = ROLES[roleIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer = setTimeout(step, 1600);
          return;
        }
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
        }
      }
      timer = setTimeout(step, deleting ? 40 : 75);
    };

    timer = setTimeout(step, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="font-mono text-sm text-amber">
      {text}
      <span className="cursor-blink ml-0.5 inline-block h-[1.1em] w-[9px] translate-y-[3px] bg-cyan" />
    </span>
  );
}
