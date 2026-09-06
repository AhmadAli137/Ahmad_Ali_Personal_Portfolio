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

function Rotor({ x, y, dir, refFn }: { x: number; y: number; dir: number; refFn: (g: THREE.Group) => void }) {
  return (
    <group position={[x, y, 4.2]}>
      {/* blur disc */}
      <mesh rotation={[0, 0, 0]}>
        <circleGeometry args={[7.2, 24]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <group ref={refFn} userData={{ dir }}>
        <mesh>
          <boxGeometry args={[13.5, 1.1, 0.35]} />
          <meshStandardMaterial color="#dfe9f3" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[13.5, 1.1, 0.35]} />
          <meshStandardMaterial color="#dfe9f3" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>
      {/* motor */}
      <mesh position={[0, 0, -1.4]}>
        <cylinderGeometry args={[2.1, 2.4, 3, 12]} />
        <meshStandardMaterial color="#37506b" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Drone() {
  const rig = useRef<THREE.Group>(null);
  const att = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Group[]>([]);
  const noseLed = useRef<THREE.MeshStandardMaterial>(null);
  const tailLed = useRef<THREE.MeshStandardMaterial>(null);

  const s = useRef({
    target: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    yaw: 0,
    pitch: 0,
    roll: 0,
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

    const bob = speed < 40 ? Math.sin(state3.clock.elapsedTime * 2.6) * 1.6 : 0;

    g.position.set(st.pos.x - window.innerWidth / 2, window.innerHeight / 2 - st.pos.y - bob, 0);

    a.rotation.order = "ZXY";
    a.rotation.z = -st.yaw;
    a.rotation.x = st.pitch;
    a.rotation.y = st.roll;

    const targetScale = st.hover ? 1.2 : 1;
    st.scale += (targetScale - st.scale) * Math.min(1, dt * 10);
    g.scale.setScalar(st.scale);

    for (const r of rotors.current) {
      if (r) r.rotation.z += dt * 85 * (r.userData.dir as number);
    }

    const pulse = (Math.sin(state3.clock.elapsedTime * 5.5) + 1) / 2;
    if (noseLed.current) noseLed.current.emissiveIntensity = 1.5 + pulse * 2.5;
    if (tailLed.current) tailLed.current.emissiveIntensity = 4 - pulse * 2.5;
  });

  return (
    <group ref={rig} visible={false}>
      {/* constant 3/4 viewing angle; attitude applies inside it */}
      <group rotation={[VIEW_TILT, 0, 0]}>
        <group ref={att}>
          {/* airframe body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[10, 15, 4.6]} />
            <meshStandardMaterial color="#233850" metalness={0.65} roughness={0.35} />
          </mesh>
          {/* canopy */}
          <mesh position={[0, 2.2, 2.9]}>
            <boxGeometry args={[6, 7.5, 2.2]} />
            <meshStandardMaterial color="#0c1420" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* battery / belly */}
          <mesh position={[0, 0, -2.9]}>
            <boxGeometry args={[6.5, 10, 2]} />
            <meshStandardMaterial color="#31465a" metalness={0.5} roughness={0.5} />
          </mesh>
          {/* arms to the corners */}
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
            <mesh key={i} position={[sx * 7.5, sy * 7.5, 1.4]} rotation={[0, 0, Math.atan2(sy, sx)]}>
              <boxGeometry args={[12, 2.2, 1.6]} />
              <meshStandardMaterial color="#1a2a3d" metalness={0.6} roughness={0.4} />
            </mesh>
          ))}
          {/* rotors */}
          <Rotor x={-12} y={-12} dir={1} refFn={(g) => (rotors.current[0] = g)} />
          <Rotor x={12} y={-12} dir={-1} refFn={(g) => (rotors.current[1] = g)} />
          <Rotor x={-12} y={12} dir={-1} refFn={(g) => (rotors.current[2] = g)} />
          <Rotor x={12} y={12} dir={1} refFn={(g) => (rotors.current[3] = g)} />
          {/* nose + tail LEDs (nose = +Y = heading) */}
          <mesh position={[0, 8.2, 0.8]}>
            <sphereGeometry args={[1.3, 12, 12]} />
            <meshStandardMaterial ref={noseLed} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0, -8, 0.8]}>
            <sphereGeometry args={[1.1, 12, 12]} />
            <meshStandardMaterial ref={tailLed} color="#ffb454" emissive="#ffb454" emissiveIntensity={2.5} />
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
      <ambientLight intensity={0.85} />
      <directionalLight position={[80, 120, 160]} intensity={1.6} />
      <directionalLight position={[-60, -40, 80]} intensity={0.5} color="#00e5ff" />
      <Drone />
    </Canvas>
  );
}
