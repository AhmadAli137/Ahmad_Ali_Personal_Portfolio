"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The 3D drone that escorts the pointer. Orthographic camera mapped 1:1 to
 * CSS pixels; the quad chases the cursor on a spring, yaws toward travel,
 * and banks with body-frame pitch/roll from real acceleration. Viewed from
 * a 3/4 angle so the attitude reads in proper 3D.
 */

const SPRING_K = 180;
const SPRING_C = 24;
const TILT_GAIN = 0.0115;
const TILT_MAX = 0.55; // rad
const YAW_SPEED_MIN = 60;
const VIEW_TILT = -0.62; // camera-relative viewing angle

const SHELL = { color: "#e9eff5", metalness: 0.25, roughness: 0.4 } as const;
const CYAN_ANO = { color: "#19c8de", metalness: 0.85, roughness: 0.22 } as const;
const AMBER_ANO = { color: "#f2a544", metalness: 0.8, roughness: 0.3 } as const;

function Motor({ x, y, dir, refFn, discFn, ringFn }: {
  x: number; y: number; dir: number;
  refFn: (g: THREE.Group) => void;
  discFn: (m: THREE.MeshBasicMaterial) => void;
  ringFn: (m: THREE.MeshBasicMaterial) => void;
}) {
  return (
    <group position={[x, y, 1.1]}>
      {/* motor base + anodized bell */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.3, 2.5, 1.2, 14]} />
        <meshStandardMaterial {...SHELL} />
      </mesh>
      <mesh position={[0, 0, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.05, 2.2, 2.4, 14]} />
        <meshStandardMaterial {...CYAN_ANO} />
      </mesh>
      <mesh position={[0, 0, 3.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.8, 8]} />
        <meshStandardMaterial {...AMBER_ANO} />
      </mesh>
      {/* prop blur: disc + rim ring — brightness follows throttle */}
      <mesh position={[0, 0, 3.5]}>
        <circleGeometry args={[7.4, 28]} />
        <meshBasicMaterial ref={discFn} color="#9fe8f2" transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 3.5]}>
        <ringGeometry args={[6.9, 7.4, 28]} />
        <meshBasicMaterial ref={ringFn} color="#00e5ff" transparent opacity={0.18} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* two twisted blades */}
      <group ref={refFn} userData={{ dir }} position={[0, 0, 3.4]}>
        <mesh position={[3.5, 0, 0]} rotation={[0.45 * dir, 0, 0]}>
          <boxGeometry args={[6.6, 1.5, 0.22]} />
          <meshStandardMaterial color="#f4f8fb" metalness={0.3} roughness={0.45} />
        </mesh>
        <mesh position={[-3.5, 0, 0]} rotation={[-0.45 * dir, 0, 0]}>
          <boxGeometry args={[6.6, 1.5, 0.22]} />
          <meshStandardMaterial color="#f4f8fb" metalness={0.3} roughness={0.45} />
        </mesh>
        {/* cyan blade tips */}
        <mesh position={[6.5, 0, 0]} rotation={[0.45 * dir, 0, 0]}>
          <boxGeometry args={[0.9, 1.5, 0.24]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-6.5, 0, 0]} rotation={[-0.45 * dir, 0, 0]}>
          <boxGeometry args={[0.9, 1.5, 0.24]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function Drone() {
  const rig = useRef<THREE.Group>(null);
  const att = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Group[]>([]);
  const discMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const ringMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const washMat = useRef<THREE.MeshBasicMaterial>(null);
  const noseLed = useRef<THREE.MeshStandardMaterial>(null);
  const tailLed = useRef<THREE.MeshStandardMaterial>(null);

  const s = useRef({
    target: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    yaw: 0,
    pitch: 0,
    roll: 0,
    // vertical channel: throttle with motor lag, altitude spring
    throttle: 1,
    alt: 0,
    altV: 0,
    scrollSm: 0,
    scrollLag: 0,
    lastScrollY: 0,
    seen: false,
    visible: true,
    hover: false,
    scale: 1,
  });

  useEffect(() => {
    const st = s.current;
    const onMove = (e: PointerEvent) => {
      st.target.x = e.clientX;
      st.target.y = e.clientY;
      if (!st.seen) {
        st.pos.x = st.target.x;
        st.pos.y = st.target.y;
        st.seen = true;
      }
      const t = e.target as Element | null;
      st.hover = !!t?.closest?.("a, button, [role='button'], input, textarea, select, label");
    };
    const onLeave = () => { st.visible = false; };
    const onEnter = () => { st.visible = true; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  useFrame((state3, rawDt) => {
    const st = s.current;
    const g = rig.current;
    const a = att.current;
    if (!g || !a) return;
    const dt = Math.min(rawDt, 0.05);

    g.visible = st.seen && st.visible;

    const ax = SPRING_K * (st.target.x - st.pos.x) - SPRING_C * st.vel.x;
    const ay = SPRING_K * (st.target.y - st.pos.y) - SPRING_C * st.vel.y;
    st.vel.x += ax * dt;
    st.vel.y += ay * dt;
    st.pos.x += st.vel.x * dt;
    st.pos.y += st.vel.y * dt;

    const speed = Math.hypot(st.vel.x, st.vel.y);
    if (speed > YAW_SPEED_MIN) {
      const targetYaw = Math.atan2(st.vel.x, -st.vel.y);
      let d = targetYaw - st.yaw;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      st.yaw += d * Math.min(1, dt * 9);
    }

    const fwdX = Math.sin(st.yaw), fwdY = -Math.cos(st.yaw);
    const rightX = Math.cos(st.yaw), rightY = Math.sin(st.yaw);
    const aFwd = (ax * fwdX + ay * fwdY) * TILT_GAIN * (Math.PI / 180);
    const aRight = (ax * rightX + ay * rightY) * TILT_GAIN * (Math.PI / 180);
    const tp = THREE.MathUtils.clamp(aFwd, -TILT_MAX, TILT_MAX);
    const tr = THREE.MathUtils.clamp(aRight, -TILT_MAX, TILT_MAX);
    st.pitch += (tp - st.pitch) * Math.min(1, dt * 12);
    st.roll += (tr - st.roll) * Math.min(1, dt * 12);

    /* ---- vertical dynamics ----
       Throttle chases what flight demands: hover baseline, extra to hold
       altitude while tilted, climb for upward cursor motion — and the page
       scroll feeds in through two smoothing stages, so the drone hesitates
       a beat before dropping into a scroll-down or punching up a scroll-up.
       Motor lag means hard tilts sag, releases balloon: like a real quad. */
    const scrollY = window.scrollY;
    const scrollV = (scrollY - st.lastScrollY) / Math.max(dt, 0.001);
    st.lastScrollY = scrollY;
    st.scrollSm += (scrollV - st.scrollSm) * Math.min(1, dt * 5);
    st.scrollLag += (st.scrollSm - st.scrollLag) * Math.min(1, dt * 7);

    const tiltMag = Math.hypot(st.pitch, st.roll);
    const hoverNeed = 1 + tiltMag * 0.9;
    const climbDemand = -st.vel.y * 0.0012 - st.scrollLag * 0.0009;
    const throttleTarget = THREE.MathUtils.clamp(1 + climbDemand + tiltMag * 0.9, 0.2, 2.3);
    st.throttle += (throttleTarget - st.throttle) * Math.min(1, dt * 5); // motor spool lag

    st.altV += ((st.throttle - hoverNeed) * 700 - st.alt * 8 - st.altV * 4) * dt;
    st.alt = THREE.MathUtils.clamp(st.alt + st.altV * dt, -18, 18);

    const bob = speed < 40 ? Math.sin(state3.clock.elapsedTime * 2.6) * 1.6 : 0;

    g.position.set(
      st.pos.x - window.innerWidth / 2,
      window.innerHeight / 2 - st.pos.y - bob + st.alt,
      0
    );

    a.rotation.order = "ZXY";
    a.rotation.z = -st.yaw;
    a.rotation.x = st.pitch;
    a.rotation.y = st.roll;

    const targetScale = st.hover ? 1.2 : 1;
    st.scale += (targetScale - st.scale) * Math.min(1, dt * 10);
    g.scale.setScalar(st.scale * (1 + st.alt * 0.006)); // higher = nearer the camera

    /* rotors spin with throttle; prop discs brighten under load */
    const spin = 40 + st.throttle * 65;
    for (const r of rotors.current) {
      if (r) r.rotation.z += dt * spin * (r.userData.dir as number);
    }
    for (const m of discMats.current) {
      if (m) m.opacity = 0.035 + st.throttle * 0.04;
    }
    for (const m of ringMats.current) {
      if (m) m.opacity = 0.08 + st.throttle * 0.09;
    }
    if (washMat.current) washMat.current.opacity = 0.03 + st.throttle * 0.055;

    const pulse = (Math.sin(state3.clock.elapsedTime * 5.5) + 1) / 2;
    if (noseLed.current) noseLed.current.emissiveIntensity = 1.5 + pulse * 2.5;
    if (tailLed.current) tailLed.current.emissiveIntensity = 4 - pulse * 2.5;
  });

  return (
    <group ref={rig} visible={false}>
      {/* constant 3/4 viewing angle; attitude applies inside it */}
      <group rotation={[VIEW_TILT, 0, 0]}>
        <group ref={att}>
          {/* faint downwash glow beneath the frame */}
          <mesh position={[0, 0, -4.5]}>
            <circleGeometry args={[11, 24]} />
            <meshBasicMaterial ref={washMat} color="#00e5ff" transparent opacity={0.09} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>

          {/* carbon bottom + top plates with anodized standoffs (racing-quad stack) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[11, 17, 1.2]} />
            <meshStandardMaterial {...SHELL} />
          </mesh>
          <mesh position={[0, -0.6, 4.2]}>
            <boxGeometry args={[9, 13.5, 1]} />
            <meshStandardMaterial {...SHELL} />
          </mesh>
          {[[-3.2, -5], [3.2, -5], [-3.2, 4.2], [3.2, 4.2]].map(([sx, sy], i) => (
            <mesh key={i} position={[sx, sy, 2.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 3.2, 8]} />
              <meshStandardMaterial {...AMBER_ANO} />
            </mesh>
          ))}

          {/* battery on top with amber strap */}
          <mesh position={[0, -1, 6.2]}>
            <boxGeometry args={[6.4, 10.5, 2.8]} />
            <meshStandardMaterial color="#cfe6ef" metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[0, -1, 6.2]}>
            <boxGeometry args={[7.1, 2.4, 3.2]} />
            <meshStandardMaterial color="#ffb454" metalness={0.1} roughness={0.75} />
          </mesh>

          {/* angled FPV camera pod at the nose */}
          <mesh position={[0, 6.8, 5]} rotation={[-0.55, 0, 0]}>
            <boxGeometry args={[4.6, 3, 3]} />
            <meshStandardMaterial color="#dfeaf2" metalness={0.4} roughness={0.35} />
          </mesh>
          <mesh position={[0, 8.1, 5.6]} rotation={[Math.PI / 2 - 0.55, 0, 0]}>
            <cylinderGeometry args={[1.15, 1.3, 1.4, 12]} />
            <meshStandardMaterial color="#123a44" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, 8.6, 5.9]} rotation={[Math.PI / 2 - 0.55, 0, 0]}>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshStandardMaterial ref={noseLed} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
          </mesh>

          {/* carbon arms to the corners */}
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
            <mesh key={i} position={[sx * 7.8, sy * 7.8, 0.9]} rotation={[0, 0, Math.atan2(sy, sx)]}>
              <boxGeometry args={[13, 2.7, 0.9]} />
              <meshStandardMaterial {...SHELL} />
            </mesh>
          ))}

          {/* motors + props */}
          <Motor x={-13} y={-13} dir={1} refFn={(g) => (rotors.current[0] = g)} discFn={(m) => (discMats.current[0] = m)} ringFn={(m) => (ringMats.current[0] = m)} />
          <Motor x={13} y={-13} dir={-1} refFn={(g) => (rotors.current[1] = g)} discFn={(m) => (discMats.current[1] = m)} ringFn={(m) => (ringMats.current[1] = m)} />
          <Motor x={-13} y={13} dir={-1} refFn={(g) => (rotors.current[2] = g)} discFn={(m) => (discMats.current[2] = m)} ringFn={(m) => (ringMats.current[2] = m)} />
          <Motor x={13} y={13} dir={1} refFn={(g) => (rotors.current[3] = g)} discFn={(m) => (discMats.current[3] = m)} ringFn={(m) => (ringMats.current[3] = m)} />

          {/* rear LED bar (amber) + whip antenna with mint tip */}
          <mesh position={[0, -8.9, 1.6]}>
            <boxGeometry args={[6.6, 0.9, 0.9]} />
            <meshStandardMaterial ref={tailLed} color="#ffb454" emissive="#ffb454" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0, -9.6, 6.4]} rotation={[0.9, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.3, 7.5, 6]} />
            <meshStandardMaterial color="#c3d2dd" metalness={0.4} roughness={0.45} />
          </mesh>
          <mesh position={[0, -12.2, 9.2]}>
            <sphereGeometry args={[0.7, 8, 8]} />
            <meshStandardMaterial color="#34f5a2" emissive="#34f5a2" emissiveIntensity={1.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function DroneCursorScene() {
  return (
    <Canvas
      className="!fixed !inset-0 !z-[9999]"
      style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 9999 }}
      orthographic
      camera={{ position: [0, 0, 200], zoom: 1, near: 1, far: 500 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[80, 120, 160]} intensity={1.9} />
      <directionalLight position={[-70, -50, 90]} intensity={0.6} color="#00e5ff" />
      <directionalLight position={[30, -90, 40]} intensity={0.35} color="#ffb454" />
      <Drone />
    </Canvas>
  );
}
