"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The cursor is a quadcopter. It chases the pointer on a critically-damped
 * spring (drones don't teleport), yaws to face its direction of travel, and
 * banks with genuine flight dynamics — pitch from longitudinal acceleration,
 * roll from lateral acceleration, both about the body frame. Idle, it hovers
 * with a gentle bob. Desktop fine-pointer devices only; disabled for
 * reduced-motion users; purely decorative (pointer-events: none).
 */

const SPRING_K = 180; // stiffness — tight enough to feel like the cursor
const SPRING_C = 24; // damping — just under critical for a hint of float
const TILT_GAIN = 0.010; // deg per px/s² of body-frame acceleration
const TILT_MAX = 30;
const YAW_SPEED_MIN = 60; // px/s before the nose commits to a heading

export function DroneCursor() {
  const [enabled, setEnabled] = useState(false);
  const droneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("drone-cursor");
    return () => document.documentElement.classList.remove("drone-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = droneRef.current;
    if (!el) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const vel = { x: 0, y: 0 };
    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    let seen = false;
    let hoveringLink = false;
    let raf = 0;
    let last = performance.now();

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        pos.x = target.x;
        pos.y = target.y;
        seen = true;
        el.style.opacity = "1";
      }
      const t = e.target as Element | null;
      hoveringLink = !!t?.closest?.("a, button, [role='button'], input, textarea, select, label");
    };
    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { if (seen) el.style.opacity = "1"; };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // spring toward the pointer; the resulting acceleration is what tilts us
      const ax = SPRING_K * (target.x - pos.x) - SPRING_C * vel.x;
      const ay = SPRING_K * (target.y - pos.y) - SPRING_C * vel.y;
      vel.x += ax * dt;
      vel.y += ay * dt;
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      // yaw: nose follows the velocity vector (shortest way around)
      const speed = Math.hypot(vel.x, vel.y);
      if (speed > YAW_SPEED_MIN) {
        const targetYaw = Math.atan2(vel.x, -vel.y);
        let d = targetYaw - yaw;
        while (d > Math.PI) d -= 2 * Math.PI;
        while (d < -Math.PI) d += 2 * Math.PI;
        yaw += d * Math.min(1, dt * 9);
      }

      // body-frame tilt from acceleration: pitch into forward accel, roll into lateral
      const fwdX = Math.sin(yaw), fwdY = -Math.cos(yaw);
      const rightX = Math.cos(yaw), rightY = Math.sin(yaw);
      const aFwd = ax * fwdX + ay * fwdY;
      const aRight = ax * rightX + ay * rightY;
      const targetPitch = Math.max(-TILT_MAX, Math.min(TILT_MAX, aFwd * TILT_GAIN));
      const targetRoll = Math.max(-TILT_MAX, Math.min(TILT_MAX, aRight * TILT_GAIN));
      pitch += (targetPitch - pitch) * Math.min(1, dt * 12);
      roll += (targetRoll - roll) * Math.min(1, dt * 12);

      // idle hover bob
      const bob = speed < 40 ? Math.sin(now / 380) * 1.6 : 0;

      const scale = hoveringLink ? 1.18 : 1;
      el.style.transform =
        `translate3d(${pos.x}px, ${pos.y + bob}px, 0) translate(-50%, -50%) ` +
        `perspective(320px) rotateZ(${(yaw * 180) / Math.PI}deg) rotateX(${pitch}deg) rotateY(${roll}deg) scale(${scale})`;

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={droneRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-200 will-change-transform"
    >
      <style>{`
        @keyframes rotorSpin { to { transform: rotate(360deg); } }
      `}</style>
      <svg width="38" height="38" viewBox="-19 -19 38 38">
        {/* arms */}
        <g stroke="#31465a" strokeWidth="2" strokeLinecap="round">
          <line x1="-4" y1="-4" x2="-11" y2="-11" />
          <line x1="4" y1="-4" x2="11" y2="-11" />
          <line x1="-4" y1="4" x2="-11" y2="11" />
          <line x1="4" y1="4" x2="11" y2="11" />
        </g>
        {/* rotors: blurred spinning discs */}
        {[[-11, -11], [11, -11], [-11, 11], [11, 11]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="6.5" fill="rgba(0,229,255,0.10)" stroke="rgba(0,229,255,0.35)" strokeWidth="0.7" />
            <g style={{ animation: `rotorSpin ${0.11 + i * 0.008}s linear infinite`, transformOrigin: "0px 0px" }}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="rgba(223,233,243,0.85)" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            <circle r="1.2" fill="#8aa0b6" />
          </g>
        ))}
        {/* body */}
        <rect x="-5.5" y="-7" width="11" height="14" rx="4" fill="#1a2a3d" stroke="#3d5a75" strokeWidth="1" />
        <rect x="-2.5" y="-3" width="5" height="6" rx="1.5" fill="#0c1420" stroke="#31465a" strokeWidth="0.7" />
        {/* nose LED (cyan) + tail LED (amber) */}
        <circle cx="0" cy="-7.5" r="1.6" fill="#00e5ff">
          <animate attributeName="opacity" values="1;0.45;1" dur="1.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="7.5" r="1.3" fill="#ffb454">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
