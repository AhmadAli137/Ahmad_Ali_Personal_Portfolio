"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Autonomous flight demo: the quadcopter patrols waypoints through an
 * obstacle field using steering + repulsion (obstacle avoidance), while
 * visualizing its sensors — sweeping lidar rays that clip on obstacles,
 * a downward optical-flow cone, and a forward camera frustum. Live status
 * is published to `droneStatus` for the HUD chrome.
 */

export const droneStatus = { text: "INITIALIZING" };

const BODY = "#101a29";
const DARK = "#0a0e14";
const CYAN = "#00e5ff";
const MINT = "#34f5a2";
const AMBER = "#ffb454";

const WAYPOINTS: [number, number, number][] = [
  [-1.8, 1.1, -1.4],
  [1.9, 1.5, -1.7],
  [2.0, 0.9, 1.6],
  [-1.6, 1.4, 1.8],
  [0, 1.7, 0.2],
];

/* obstacles as vertical cylinders (x, z, radius, height) */
const OBSTACLES: [number, number, number, number][] = [
  [0.9, -0.6, 0.35, 1.9],
  [-1.1, 0.6, 0.3, 2.3],
  [1.5, 0.5, 0.28, 1.5],
  [-0.3, -1.5, 0.4, 1.2],
];

const LIDAR_RAYS = 28;
const LIDAR_MAX = 2.1;
const TRAIL_LEN = 90;

function lidarHit(ox: number, oz: number, dx: number, dz: number): number {
  let best = LIDAR_MAX;
  for (const [cx, cz, r] of OBSTACLES) {
    const fx = ox - cx;
    const fz = oz - cz;
    const b = fx * dx + fz * dz;
    const c = fx * fx + fz * fz - r * r;
    const disc = b * b - c;
    if (disc > 0) {
      const t = -b - Math.sqrt(disc);
      if (t > 0 && t < best) best = t;
    }
  }
  return best;
}

function Prop({ x, z, dir }: { x: number; z: number; dir: 1 | -1 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += dir * delta * 20;
  });
  return (
    <group position={[x, 0.34, z]}>
      <mesh>
        <cylinderGeometry args={[0.09, 0.11, 0.16, 12]} />
        <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.35} />
        <Edges color={CYAN} threshold={30} />
      </mesh>
      <group ref={ref} position={[0, 0.11, 0]}>
        <mesh>
          <boxGeometry args={[0.78, 0.015, 0.06]} />
          <meshStandardMaterial color={DARK} emissive={CYAN} emissiveIntensity={0.25} transparent opacity={0.85} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.78, 0.015, 0.06]} />
          <meshStandardMaterial color={DARK} emissive={CYAN} emissiveIntensity={0.25} transparent opacity={0.85} />
        </mesh>
      </group>
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.39, 32]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function DroneBody() {
  const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  const podPos = 0.55 * Math.SQRT2 * 0.72;
  return (
    <>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.72, 0.24, 0.72]} />
        <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.35} />
        <Edges color={CYAN} threshold={15} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.42]} />
        <meshStandardMaterial color={DARK} emissive={MINT} emissiveIntensity={0.15} />
        <Edges color={MINT} threshold={15} />
      </mesh>
      <mesh position={[0, 0.16, 0.4]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color={DARK} emissive={CYAN} emissiveIntensity={0.7} metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.46, 0.12, 0.3]} />
        <meshStandardMaterial color={DARK} />
        <Edges color={MINT} threshold={15} />
      </mesh>
      {armAngles.map((a) => (
        <mesh key={a} position={[Math.cos(a) * 0.55, 0.22, Math.sin(a) * 0.55]} rotation={[0, -a, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.055, 0.85, 8]} />
          <meshStandardMaterial color={BODY} metalness={0.5} roughness={0.4} />
          <Edges color={CYAN} threshold={30} />
        </mesh>
      ))}
      <Prop x={podPos} z={podPos} dir={1} />
      <Prop x={-podPos} z={podPos} dir={-1} />
      <Prop x={-podPos} z={-podPos} dir={1} />
      <Prop x={podPos} z={-podPos} dir={-1} />
      {/* forward camera frustum */}
      <group position={[0, 0.16, 0.4]}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                0, 0, 0, -0.45, 0.28, 1.0,
                0, 0, 0, 0.45, 0.28, 1.0,
                0, 0, 0, -0.45, -0.22, 1.0,
                0, 0, 0, 0.45, -0.22, 1.0,
                -0.45, 0.28, 1.0, 0.45, 0.28, 1.0,
                0.45, 0.28, 1.0, 0.45, -0.22, 1.0,
                0.45, -0.22, 1.0, -0.45, -0.22, 1.0,
                -0.45, -0.22, 1.0, -0.45, 0.28, 1.0,
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={CYAN} transparent opacity={0.22} />
        </lineSegments>
      </group>
      <pointLight position={[0.5, 0.25, 0.5]} color={MINT} intensity={0.6} distance={2} />
      <pointLight position={[-0.5, 0.25, -0.5]} color={CYAN} intensity={0.6} distance={2} />
    </>
  );
}

function AutonomousDrone({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const lidarRef = useRef<THREE.LineSegments>(null);
  const trailRef = useRef<THREE.Line>(null);
  const flowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const wpRefs = useRef<(THREE.Mesh | null)[]>([]);

  const state = useRef({
    pos: new THREE.Vector3(...WAYPOINTS[0]),
    vel: new THREE.Vector3(),
    wp: 1,
    yaw: 0,
    sweep: 0,
    avoiding: 0,
    trail: [] as number[],
  });

  const lidarPositions = useMemo(() => new Float32Array(LIDAR_RAYS * 6), []);
  const trailPositions = useMemo(() => new Float32Array(TRAIL_LEN * 3), []);

  useFrame((st, delta) => {
    const s = state.current;
    const dt = Math.min(delta, 0.05);
    const g = group.current;
    if (!g) return;

    if (!reduced) {
      /* --- steering toward waypoint --- */
      const target = new THREE.Vector3(...WAYPOINTS[s.wp]);
      const toTarget = target.clone().sub(s.pos);
      if (toTarget.length() < 0.35) {
        s.wp = (s.wp + 1) % WAYPOINTS.length;
      }
      const desired = toTarget.normalize().multiplyScalar(0.85);

      /* --- obstacle repulsion (the avoidance behaviour) --- */
      let avoiding = false;
      for (const [cx, cz, r] of OBSTACLES) {
        const dx = s.pos.x - cx;
        const dz = s.pos.z - cz;
        const d = Math.hypot(dx, dz) - r;
        if (d < 0.7) {
          const k = Math.min(1.6, 0.35 / Math.max(d, 0.08));
          desired.x += (dx / Math.max(Math.hypot(dx, dz), 0.001)) * k;
          desired.z += (dz / Math.max(Math.hypot(dx, dz), 0.001)) * k;
          if (d < 0.5) avoiding = true;
        }
      }
      s.avoiding = avoiding ? 1 : Math.max(0, s.avoiding - dt * 2);

      s.vel.lerp(desired, 1 - Math.pow(0.02, dt));
      s.pos.addScaledVector(s.vel, dt);
      s.pos.y = THREE.MathUtils.clamp(s.pos.y, 0.5, 2.2);

      /* orientation: face travel, bank into turns */
      const speed = s.vel.length();
      if (speed > 0.05) {
        const targetYaw = Math.atan2(s.vel.x, s.vel.z);
        let dy = targetYaw - s.yaw;
        while (dy > Math.PI) dy -= 2 * Math.PI;
        while (dy < -Math.PI) dy += 2 * Math.PI;
        s.yaw += dy * Math.min(1, dt * 4);
      }
      g.position.copy(s.pos);
      g.position.y += Math.sin(st.clock.elapsedTime * 2.2) * 0.03;
      g.rotation.set(0, s.yaw, 0);
      g.rotateX(THREE.MathUtils.clamp(s.vel.dot(new THREE.Vector3(Math.sin(s.yaw), 0, Math.cos(s.yaw))) * 0.25, -0.3, 0.3));
      g.rotateZ(THREE.MathUtils.clamp(-s.vel.dot(new THREE.Vector3(Math.cos(s.yaw), 0, -Math.sin(s.yaw))) * 0.3, -0.35, 0.35));

      droneStatus.text = avoiding
        ? "⚠ OBSTACLE — REROUTING"
        : `AUTO · EN ROUTE WP-${s.wp + 1} · ${(speed * 10).toFixed(0)} cm/s`;

      /* --- trail --- */
      s.trail.push(s.pos.x, s.pos.y, s.pos.z);
      if (s.trail.length > TRAIL_LEN * 3) s.trail.splice(0, s.trail.length - TRAIL_LEN * 3);
      trailPositions.set(s.trail);
      if (trailRef.current) {
        const geo = trailRef.current.geometry;
        geo.setDrawRange(0, s.trail.length / 3);
        geo.attributes.position.needsUpdate = true;
      }
    } else {
      g.position.set(0, 1.2, 0);
      droneStatus.text = "HOVER · SENSORS NOMINAL";
    }

    /* --- lidar sweep --- */
    s.sweep += dt * 1.6;
    for (let i = 0; i < LIDAR_RAYS; i++) {
      const a = s.sweep + (i / LIDAR_RAYS) * Math.PI * 2;
      const dx = Math.sin(a);
      const dz = Math.cos(a);
      const hit = lidarHit(s.pos.x, s.pos.z, dx, dz);
      const o = i * 6;
      lidarPositions[o] = s.pos.x;
      lidarPositions[o + 1] = s.pos.y;
      lidarPositions[o + 2] = s.pos.z;
      lidarPositions[o + 3] = s.pos.x + dx * hit;
      lidarPositions[o + 4] = s.pos.y * (1 - hit / LIDAR_MAX) * 0.15 + s.pos.y * 0.85;
      lidarPositions[o + 5] = s.pos.z + dz * hit;
    }
    if (lidarRef.current) {
      lidarRef.current.geometry.attributes.position.needsUpdate = true;
    }

    /* --- optical flow cone + ground ring --- */
    if (flowRef.current) {
      flowRef.current.position.set(s.pos.x, s.pos.y / 2, s.pos.z);
      flowRef.current.scale.set(1, s.pos.y, 1);
    }
    if (ringRef.current) {
      ringRef.current.position.set(s.pos.x, 0.02, s.pos.z);
      const pulse = 0.8 + Math.sin(st.clock.elapsedTime * 5) * 0.15;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }

    /* --- waypoint pulse --- */
    wpRefs.current.forEach((m, i) => {
      if (!m) return;
      const isTarget = i === s.wp;
      const sc = isTarget ? 1 + Math.sin(st.clock.elapsedTime * 4) * 0.25 : 0.8;
      m.scale.set(sc, sc, sc);
      (m.material as THREE.MeshBasicMaterial).opacity = isTarget ? 0.95 : 0.35;
    });
  });

  return (
    <>
      <group ref={group} position={WAYPOINTS[0]}>
        <DroneBody />
      </group>

      {/* lidar rays */}
      <lineSegments ref={lidarRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lidarPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={CYAN} transparent opacity={0.16} />
      </lineSegments>

      {/* flight trail */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <line ref={trailRef as never}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={MINT} transparent opacity={0.35} />
      </line>

      {/* optical-flow cone + ground lock ring */}
      <mesh ref={flowRef} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.42, 1, 20, 1, true]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.38, 32]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.4} />
      </mesh>

      {/* waypoints */}
      {WAYPOINTS.map((w, i) => (
        <mesh
          key={i}
          position={w}
          ref={(m) => {
            wpRefs.current[i] = m;
          }}
        >
          <octahedronGeometry args={[0.09]} />
          <meshBasicMaterial color={AMBER} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* obstacles */}
      {OBSTACLES.map(([x, z, r, h], i) => (
        <mesh key={i} position={[x, h / 2, z]}>
          <cylinderGeometry args={[r, r, h, 18]} />
          <meshStandardMaterial color={BODY} transparent opacity={0.75} metalness={0.4} roughness={0.5} />
          <Edges color={CYAN} threshold={40} />
        </mesh>
      ))}
    </>
  );
}

export default function DroneScene() {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [3.6, 2.6, 3.8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} color="#bfe9ff" />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color={CYAN} />
      <AutonomousDrone reduced={reduced} />
      <Grid
        position={[0, 0, 0]}
        args={[20, 20]}
        cellSize={0.45}
        cellColor="#0e2c3a"
        sectionSize={2.25}
        sectionColor="#134b5f"
        fadeDistance={13}
        fadeStrength={2.5}
        infiniteGrid
      />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
