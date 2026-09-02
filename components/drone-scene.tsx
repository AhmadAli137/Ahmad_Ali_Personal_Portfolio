"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Grid, OrbitControls } from "@react-three/drei";
import type { Group, Mesh } from "three";

/**
 * Procedural quadcopter — an homage to the IEEE Best Demo indoor drone —
 * built from primitives with a holographic cyan edge treatment.
 */

const BODY = "#101a29";
const DARK = "#0a0e14";
const CYAN = "#00e5ff";
const MINT = "#34f5a2";

function Prop({ x, z, dir }: { x: number; z: number; dir: 1 | -1 }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += dir * delta * 18;
  });
  return (
    <group position={[x, 0.34, z]}>
      {/* motor pod */}
      <mesh>
        <cylinderGeometry args={[0.09, 0.11, 0.16, 12]} />
        <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.35} />
        <Edges color={CYAN} threshold={30} />
      </mesh>
      {/* spinning blades */}
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
      {/* prop disc glow */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.39, 32]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Arm({ angle }: { angle: number }) {
  return (
    <mesh position={[Math.cos(angle) * 0.55, 0.22, Math.sin(angle) * 0.55]} rotation={[0, -angle, Math.PI / 2]}>
      <cylinderGeometry args={[0.045, 0.055, 0.85, 8]} />
      <meshStandardMaterial color={BODY} metalness={0.5} roughness={0.4} />
      <Edges color={CYAN} threshold={30} />
    </mesh>
  );
}

function Drone({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const camDome = useRef<Mesh>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (!reduced) {
      g.position.y = Math.sin(t * 1.5) * 0.11;
      g.rotation.z = state.pointer.x * 0.12 + Math.sin(t * 0.8) * 0.02;
      g.rotation.x = -state.pointer.y * 0.1 + Math.cos(t * 0.7) * 0.02;
    }
  });

  const armAngles = useMemo(() => [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4], []);
  const podPos = 0.55 * Math.SQRT2 * 0.72;

  return (
    <group ref={group}>
      {/* main body */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.72, 0.24, 0.72]} />
        <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.35} />
        <Edges color={CYAN} threshold={15} />
      </mesh>
      {/* top deck (flight controller) */}
      <mesh position={[0, 0.37, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.42]} />
        <meshStandardMaterial color={DARK} emissive={MINT} emissiveIntensity={0.15} />
        <Edges color={MINT} threshold={15} />
      </mesh>
      {/* camera dome */}
      <mesh ref={camDome} position={[0, 0.16, 0.4]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color={DARK} emissive={CYAN} emissiveIntensity={0.7} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* battery */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.46, 0.12, 0.3]} />
        <meshStandardMaterial color={DARK} />
        <Edges color={MINT} threshold={15} />
      </mesh>
      {/* arms + props */}
      {armAngles.map((a) => (
        <Arm key={a} angle={a} />
      ))}
      <Prop x={podPos} z={podPos} dir={1} />
      <Prop x={-podPos} z={podPos} dir={-1} />
      <Prop x={-podPos} z={-podPos} dir={1} />
      <Prop x={podPos} z={-podPos} dir={-1} />
      {/* landing legs */}
      {[[-0.28, -0.28], [0.28, -0.28], [-0.28, 0.28], [0.28, 0.28]].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, -0.06, lz]}>
          <cylinderGeometry args={[0.02, 0.02, 0.28, 6]} />
          <meshStandardMaterial color={BODY} />
        </mesh>
      ))}
      {/* nav lights */}
      <pointLight position={[0.5, 0.25, 0.5]} color={MINT} intensity={0.6} distance={2} />
      <pointLight position={[-0.5, 0.25, -0.5]} color={CYAN} intensity={0.6} distance={2} />
    </group>
  );
}

export default function DroneScene() {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [2.4, 1.5, 2.6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} color="#bfe9ff" />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color={CYAN} />
      <Drone reduced={reduced} />
      <Grid
        position={[0, -0.55, 0]}
        args={[20, 20]}
        cellSize={0.45}
        cellColor="#0e2c3a"
        sectionSize={2.25}
        sectionColor="#134b5f"
        fadeDistance={11}
        fadeStrength={2.5}
        infiniteGrid
      />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
