"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

/**
 * HOLO-ARCHIVE: Ahmad's hardware as dotted holograms. Each project is a
 * 9k-point cloud with per-point color (sensors/LEDs/screens accented),
 * sampled from 25-35 part geometries, over a faint wireframe ghost.
 * Switching projects morphs every point (and color) to the new shape.
 */

const N = 9000;

const C_CYAN = new THREE.Color("#00e5ff");
const C_MINT = new THREE.Color("#5fffc0");
const C_AMBER = new THREE.Color("#ffc069");
const C_DIM = new THREE.Color("#0e5f70");

interface Part {
  geo: THREE.BufferGeometry;
  matrix: THREE.Matrix4;
  w: number; // sampling weight
  color?: THREE.Color;
  noEdge?: boolean;
}

const M = (x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, s = 1) =>
  new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
    new THREE.Vector3(s, s, s)
  );

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
const cyl = (rt: number, rb: number, h: number, seg = 14) => new THREE.CylinderGeometry(rt, rb, h, seg);
const sph = (r: number) => new THREE.SphereGeometry(r, 14, 10);
const circle = (r: number) => new THREE.CircleGeometry(r, 26);
const torus = (r: number, t: number) => new THREE.TorusGeometry(r, t, 9, 26);

interface BuiltModel {
  positions: Float32Array;
  colors: Float32Array;
  edges: Float32Array;
}

function sampleModel(parts: Part[]): BuiltModel {
  const totalW = parts.reduce((a, p) => a + p.w, 0);
  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  let o = 0;
  const v = new THREE.Vector3();
  const edgeArrays: Float32Array[] = [];

  for (const part of parts) {
    const n = Math.max(1, Math.floor((N * part.w) / totalW));
    const mesh = new THREE.Mesh(part.geo);
    const sampler = new MeshSurfaceSampler(mesh).build();
    const col = part.color ?? C_CYAN;
    for (let i = 0; i < n && o < N; i++) {
      sampler.sample(v);
      v.applyMatrix4(part.matrix);
      positions.set([v.x, v.y, v.z], o * 3);
      colors.set([col.r, col.g, col.b], o * 3);
      o++;
    }
    if (!part.noEdge) {
      const eg = new THREE.EdgesGeometry(part.geo, 24);
      eg.applyMatrix4(part.matrix);
      edgeArrays.push(new Float32Array(eg.attributes.position.array as Float32Array));
      eg.dispose();
    }
  }
  while (o < N) {
    const src = Math.floor(Math.random() * o) * 3;
    positions.set(positions.slice(src, src + 3), o * 3);
    colors.set(colors.slice(src, src + 3), o * 3);
    o++;
  }
  const edgeLen = edgeArrays.reduce((a, e) => a + e.length, 0);
  const edges = new Float32Array(edgeLen);
  let eo = 0;
  for (const e of edgeArrays) {
    edges.set(e, eo);
    eo += e.length;
  }
  return { positions, colors, edges };
}

/* ================= detailed models ================= */

function droneParts(): Part[] {
  const armA = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  const pod = 0.55 * Math.SQRT2 * 0.72;
  const pods: [number, number][] = [[pod, pod], [-pod, pod], [-pod, -pod], [pod, -pod]];
  const parts: Part[] = [
    { geo: box(0.72, 0.2, 0.72), matrix: M(0, 0.62, 0), w: 700 },
    { geo: box(0.5, 0.07, 0.5), matrix: M(0, 0.75, 0), w: 180 },
    { geo: box(0.42, 0.12, 0.28), matrix: M(0, 0.48, 0), w: 200 },
    { geo: box(0.46, 0.14, 0.05), matrix: M(0, 0.48, 0), w: 50, color: C_AMBER },
    // GPS mast + puck
    { geo: cyl(0.015, 0.015, 0.3, 8), matrix: M(0.2, 0.92, -0.2), w: 40, noEdge: true },
    { geo: cyl(0.09, 0.09, 0.035), matrix: M(0.2, 1.08, -0.2), w: 90, color: C_AMBER },
    // camera gimbal
    { geo: box(0.12, 0.1, 0.09), matrix: M(0, 0.46, 0.42), w: 70 },
    { geo: cyl(0.05, 0.05, 0.07, 12), matrix: M(0, 0.46, 0.49, Math.PI / 2), w: 60, color: C_MINT },
    { geo: sph(0.1), matrix: M(0, 0.56, 0.38), w: 110, color: C_MINT },
    // nav LEDs
    { geo: sph(0.032), matrix: M(0.22, 0.6, 0.4), w: 25, color: C_AMBER, noEdge: true },
    { geo: sph(0.032), matrix: M(-0.22, 0.6, 0.4), w: 25, color: C_AMBER, noEdge: true },
  ];
  for (const a of armA) {
    parts.push({ geo: cyl(0.042, 0.052, 0.85, 10), matrix: M(Math.cos(a) * 0.55, 0.62, Math.sin(a) * 0.55, 0, -a, Math.PI / 2), w: 170 });
  }
  for (const [x, z] of pods) {
    parts.push({ geo: cyl(0.085, 0.1, 0.13, 12), matrix: M(x, 0.72, z), w: 110 });
    parts.push({ geo: cyl(0.014, 0.014, 0.09, 6), matrix: M(x, 0.83, z), w: 15, noEdge: true });
    parts.push({ geo: box(0.37, 0.012, 0.05), matrix: M(x, 0.87, z, 0, 0.7, 0), w: 55 });
    parts.push({ geo: box(0.37, 0.012, 0.05), matrix: M(x, 0.87, z, 0, 0.7 + Math.PI / 2, 0), w: 55 });
    parts.push({ geo: circle(0.38), matrix: M(x, 0.88, z, -Math.PI / 2), w: 60, color: C_DIM, noEdge: true });
  }
  // landing legs + skids
  for (const [x, z] of [[0.3, 0.28], [-0.3, 0.28], [0.3, -0.28], [-0.3, -0.28]] as [number, number][]) {
    parts.push({ geo: cyl(0.018, 0.018, 0.3, 8), matrix: M(x, 0.34, z, 0.25 * Math.sign(z), 0, -0.25 * Math.sign(x)), w: 35, noEdge: true });
  }
  parts.push({ geo: cyl(0.02, 0.02, 0.62, 8), matrix: M(0.34, 0.18, 0, Math.PI / 2), w: 55 });
  parts.push({ geo: cyl(0.02, 0.02, 0.62, 8), matrix: M(-0.34, 0.18, 0, Math.PI / 2), w: 55 });
  return parts;
}

function gloveParts(): Part[] {
  const parts: Part[] = [
    { geo: box(0.64, 0.15, 0.55), matrix: M(0, 0.62, 0.12), w: 620 },
    { geo: box(0.58, 0.15, 0.26), matrix: M(0, 0.62, -0.2), w: 230 },
  ];
  const fingers = [
    { x: -0.24, s: 0.9 },
    { x: -0.08, s: 1.0 },
    { x: 0.08, s: 0.96 },
    { x: 0.24, s: 0.84 },
  ];
  for (const f of fingers) {
    const segs = [
      { len: 0.2, r: 0.06, z: 0.5 },
      { len: 0.16, r: 0.054, z: 0.69 },
      { len: 0.12, r: 0.048, z: 0.84 },
    ];
    let zAcc = 0.42;
    segs.forEach((sg, i) => {
      const z = zAcc + (sg.len * f.s) / 2;
      parts.push({ geo: cyl(sg.r, sg.r * 1.06, sg.len * f.s, 10), matrix: M(f.x, 0.62, z, Math.PI / 2), w: 95 - i * 18 });
      zAcc += sg.len * f.s;
      if (i < 2) {
        parts.push({ geo: sph(sg.r * 1.02), matrix: M(f.x, 0.62, zAcc), w: 30, noEdge: true });
        zAcc += 0.015;
      }
    });
    parts.push({ geo: sph(0.05), matrix: M(f.x, 0.62, zAcc + 0.02), w: 35, noEdge: true });
    // flex sensor strip on top
    parts.push({ geo: box(0.045, 0.014, 0.42 * f.s), matrix: M(f.x, 0.695, 0.62), w: 55, color: C_MINT });
  }
  // thumb: two segments angled out
  parts.push({ geo: cyl(0.058, 0.062, 0.22, 10), matrix: M(-0.42, 0.62, 0.18, Math.PI / 2, 0, -0.85), w: 90 });
  parts.push({ geo: sph(0.058), matrix: M(-0.51, 0.62, 0.28), w: 28, noEdge: true });
  parts.push({ geo: cyl(0.05, 0.055, 0.18, 10), matrix: M(-0.58, 0.62, 0.36, Math.PI / 2, 0, -0.5), w: 70 });
  parts.push({ geo: sph(0.048), matrix: M(-0.62, 0.62, 0.45), w: 30, noEdge: true });
  parts.push({ geo: box(0.04, 0.014, 0.3), matrix: M(-0.5, 0.685, 0.28, 0, -0.7, 0), w: 40, color: C_MINT });
  // IMU + wiring + cuff
  parts.push({ geo: box(0.24, 0.05, 0.3), matrix: M(0, 0.72, -0.08), w: 150, color: C_MINT });
  parts.push({ geo: cyl(0.014, 0.014, 0.3, 6), matrix: M(0, 0.72, -0.32, Math.PI / 2), w: 30, color: C_AMBER, noEdge: true });
  parts.push({ geo: cyl(0.3, 0.35, 0.4, 18), matrix: M(0, 0.62, -0.62, Math.PI / 2), w: 520 });
  parts.push({ geo: torus(0.325, 0.02), matrix: M(0, 0.62, -0.44), w: 90, noEdge: true });
  parts.push({ geo: box(0.14, 0.09, 0.12), matrix: M(0, 0.79, -0.62), w: 90, color: C_AMBER });
  return parts;
}

function sparkParts(): Part[] {
  const parts: Part[] = [
    { geo: box(0.85, 0.46, 1.02), matrix: M(0, 0.5, 0), w: 850 },
    // rounded vertical edges
    ...([[-0.42, 0.5], [0.42, 0.5], [-0.42, -0.5], [0.42, -0.5]] as [number, number][]).map(([x, z]) => ({
      geo: cyl(0.09, 0.09, 0.46, 10),
      matrix: M(x, 0.5, z),
      w: 55,
      noEdge: true,
    })),
    // face screen + glowing eyes + smile
    { geo: box(0.6, 0.32, 0.03), matrix: M(0, 0.56, 0.53), w: 210, color: C_DIM },
    { geo: box(0.1, 0.16, 0.02), matrix: M(-0.14, 0.58, 0.555), w: 85, color: C_MINT },
    { geo: box(0.1, 0.16, 0.02), matrix: M(0.14, 0.58, 0.555), w: 85, color: C_MINT },
    { geo: box(0.16, 0.03, 0.02), matrix: M(0, 0.46, 0.555), w: 40, color: C_MINT },
    // head cap + antenna
    { geo: box(0.62, 0.1, 0.7), matrix: M(0, 0.78, 0.1), w: 240 },
    { geo: cyl(0.02, 0.02, 0.3, 8), matrix: M(0, 0.95, 0.1), w: 35, noEdge: true },
    { geo: sph(0.06), matrix: M(0, 1.12, 0.1), w: 60, color: C_AMBER },
    // top button + speaker grille
    { geo: cyl(0.07, 0.07, 0.03, 14), matrix: M(0.22, 0.84, 0.28), w: 50, color: C_AMBER },
    { geo: box(0.3, 0.02, 0.2), matrix: M(-0.18, 0.835, -0.2), w: 60, color: C_DIM },
    // sensor pods
    { geo: cyl(0.05, 0.05, 0.06, 12), matrix: M(0.45, 0.6, 0.32, 0, 0, Math.PI / 2), w: 45, color: C_MINT },
    { geo: cyl(0.05, 0.05, 0.06, 12), matrix: M(-0.45, 0.6, 0.32, 0, 0, Math.PI / 2), w: 45, color: C_MINT },
    // rear port
    { geo: box(0.16, 0.1, 0.04), matrix: M(0, 0.45, -0.53), w: 55, color: C_AMBER },
  ];
  // wheels: tire + hub + hubcap
  for (const [x, z] of [[0.5, 0.36], [-0.5, 0.36], [0.5, -0.36], [-0.5, -0.36]] as [number, number][]) {
    parts.push({ geo: torus(0.17, 0.055), matrix: M(x, 0.22, z, 0, Math.PI / 2), w: 170 });
    parts.push({ geo: cyl(0.07, 0.07, 0.16, 12), matrix: M(x, 0.22, z, 0, 0, Math.PI / 2), w: 45 });
    parts.push({ geo: circle(0.06), matrix: M(x > 0 ? x + 0.081 : x - 0.081, 0.22, z, 0, (Math.PI / 2) * Math.sign(x)), w: 25, color: C_AMBER, noEdge: true });
  }
  return parts;
}

function paddleParts(): Part[] {
  const parts: Part[] = [
    { geo: circle(0.52), matrix: M(0, 0.95, 0.035), w: 520, color: C_DIM, noEdge: true },
    { geo: circle(0.52), matrix: M(0, 0.95, -0.035, 0, Math.PI), w: 520, color: C_DIM, noEdge: true },
    { geo: torus(0.53, 0.045), matrix: M(0, 0.95, 0), w: 380 },
    // handle + grip rings + pommel
    { geo: cyl(0.085, 0.1, 0.55, 14), matrix: M(0, 0.28, 0), w: 320 },
    { geo: torus(0.102, 0.014), matrix: M(0, 0.4, 0, Math.PI / 2), w: 40, noEdge: true },
    { geo: torus(0.106, 0.014), matrix: M(0, 0.28, 0, Math.PI / 2), w: 40, noEdge: true },
    { geo: torus(0.11, 0.014), matrix: M(0, 0.16, 0, Math.PI / 2), w: 40, noEdge: true },
    { geo: sph(0.11), matrix: M(0, 0.0, 0), w: 90 },
    // ESP32 board with pin rows
    { geo: box(0.28, 0.18, 0.05), matrix: M(0, 0.95, -0.075), w: 240, color: C_MINT },
    { geo: box(0.26, 0.02, 0.03), matrix: M(0, 1.05, -0.075), w: 40, color: C_AMBER, noEdge: true },
    { geo: box(0.26, 0.02, 0.03), matrix: M(0, 0.85, -0.075), w: 40, color: C_AMBER, noEdge: true },
  ];
  // 4 haptic motor pods + wires to board
  for (const [x, y] of [[0.27, 0.27], [-0.27, 0.27], [0.27, -0.27], [-0.27, -0.27]] as [number, number][]) {
    parts.push({ geo: box(0.13, 0.13, 0.08), matrix: M(x, 0.95 + y, -0.07), w: 95, color: C_AMBER });
    const len = Math.hypot(x, y) - 0.15;
    const ang = Math.atan2(y, x);
    parts.push({
      geo: cyl(0.012, 0.012, len, 6),
      matrix: M(x / 2, 0.95 + y / 2, -0.095, 0, 0, ang + Math.PI / 2),
      w: 30,
      color: C_MINT,
      noEdge: true,
    });
  }
  // wrist strap loop
  parts.push({ geo: torus(0.07, 0.014), matrix: M(0, -0.09, 0), w: 40, color: C_AMBER, noEdge: true });
  return parts;
}

function batteryParts(): Part[] {
  const parts: Part[] = [];
  for (const x of [-0.3, -0.1, 0.1, 0.3]) {
    for (const z of [-0.2, 0, 0.2]) {
      parts.push({ geo: cyl(0.088, 0.088, 0.5, 14), matrix: M(x, 0.47, z), w: 150 });
      parts.push({ geo: circle(0.086), matrix: M(x, 0.725, z, -Math.PI / 2), w: 25, color: C_AMBER, noEdge: true });
      parts.push({ geo: cyl(0.03, 0.03, 0.02, 8), matrix: M(x, 0.735, z), w: 10, color: C_AMBER, noEdge: true });
    }
  }
  // nickel strips across rows
  for (const z of [-0.2, 0, 0.2]) {
    parts.push({ geo: box(0.78, 0.015, 0.06), matrix: M(0, 0.735, z), w: 55, color: C_MINT, noEdge: true });
  }
  // busbars
  parts.push({ geo: box(0.85, 0.05, 0.16), matrix: M(0, 0.78, 0.12), w: 190, color: C_AMBER });
  parts.push({ geo: box(0.85, 0.05, 0.16), matrix: M(0, 0.78, -0.12), w: 190, color: C_AMBER });
  // BMS board + components + balance connector
  parts.push({ geo: box(0.75, 0.05, 0.55), matrix: M(0, 0.17, 0), w: 330, color: C_MINT });
  parts.push({ geo: box(0.12, 0.05, 0.12), matrix: M(-0.2, 0.22, 0.1), w: 35 });
  parts.push({ geo: box(0.09, 0.04, 0.14), matrix: M(0.05, 0.215, -0.12), w: 30 });
  parts.push({ geo: box(0.14, 0.03, 0.08), matrix: M(0.24, 0.21, 0.14), w: 30 });
  parts.push({ geo: box(0.2, 0.04, 0.06), matrix: M(-0.15, 0.215, -0.2), w: 30, color: C_AMBER });
  // XT60 connector + leads
  parts.push({ geo: box(0.09, 0.1, 0.13), matrix: M(0.5, 0.32, 0.05), w: 65, color: C_AMBER });
  parts.push({ geo: box(0.09, 0.1, 0.13), matrix: M(0.5, 0.32, -0.08), w: 65, color: C_AMBER });
  parts.push({ geo: cyl(0.02, 0.02, 0.26, 6), matrix: M(0.45, 0.5, 0.06, 0, 0, 0.9), w: 30, color: C_AMBER, noEdge: true });
  parts.push({ geo: cyl(0.02, 0.02, 0.26, 6), matrix: M(0.45, 0.5, -0.07, 0, 0, 0.9), w: 30, noEdge: true });
  return parts;
}

/* ================= scene ================= */

function HoloCloud({ model }: { model: number }) {
  const points = useRef<THREE.Points>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);
  const scan = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  const models = useMemo(
    () => [droneParts(), gloveParts(), sparkParts(), paddleParts(), batteryParts()].map(sampleModel),
    []
  );

  const seed = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 1.6 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(ph) * Math.cos(th), 0.9 + r * Math.cos(ph) * 0.6, r * Math.sin(ph) * Math.sin(th)], i * 3);
      col.set([C_CYAN.r, C_CYAN.g, C_CYAN.b], i * 3);
    }
    return { pos, col };
  }, []);

  const fromPos = useMemo(() => new Float32Array(seed.pos), [seed]);
  const fromCol = useMemo(() => new Float32Array(seed.col), [seed]);
  const progress = useRef(0);
  const targetRef = useRef(model);
  const edgeSwapped = useRef(true);

  useEffect(() => {
    if (!points.current) return;
    fromPos.set(points.current.geometry.attributes.position.array as Float32Array);
    fromCol.set(points.current.geometry.attributes.color.array as Float32Array);
    targetRef.current = model;
    progress.current = 0;
    edgeSwapped.current = false;
  }, [model, fromPos, fromCol]);

  useFrame((st, delta) => {
    const p = points.current;
    if (p) {
      const posAttr = p.geometry.attributes.position;
      const colAttr = p.geometry.attributes.color;
      if (progress.current < 1) {
        progress.current = Math.min(1, progress.current + delta / 1.1);
        const t = progress.current;
        const e = t * t * (3 - 2 * t);
        const target = models[targetRef.current];
        const pa = posAttr.array as Float32Array;
        const ca = colAttr.array as Float32Array;
        for (let i = 0; i < N * 3; i++) {
          pa[i] = fromPos[i] + (target.positions[i] - fromPos[i]) * e;
          ca[i] = fromCol[i] + (target.colors[i] - fromCol[i]) * e;
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        /* swap the wireframe ghost at the midpoint, faded out */
        if (!edgeSwapped.current && t >= 0.5 && edgeRef.current) {
          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.BufferAttribute(models[targetRef.current].edges, 3));
          edgeRef.current.geometry.dispose();
          edgeRef.current.geometry = g;
          edgeSwapped.current = true;
        }
      }
      const mat = p.material as THREE.PointsMaterial;
      mat.opacity = 0.78 + Math.sin(st.clock.elapsedTime * 9) * 0.05 + (Math.random() > 0.985 ? -0.22 : 0);
    }
    if (edgeRef.current) {
      const t = progress.current;
      (edgeRef.current.material as THREE.LineBasicMaterial).opacity = 0.14 * Math.min(1, Math.abs(2 * t - 1) + 0.15);
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.32;
      group.current.position.y = Math.sin(st.clock.elapsedTime * 1.1) * 0.04;
    }
    if (scan.current) {
      const phase = (st.clock.elapsedTime * 0.45) % 1.7;
      scan.current.position.y = 0.12 + phase;
      (scan.current.material as THREE.MeshBasicMaterial).opacity = 0.15 * (1 - Math.abs(phase / 1.7 - 0.5) * 1.2);
    }
  });

  return (
    <>
      <group ref={group}>
        <lineSegments ref={edgeRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[models[0].edges, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#0f7a90" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[seed.pos, 3]} />
            <bufferAttribute attach="attributes-color" args={[seed.col, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.017}
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
        <mesh ref={scan}>
          <boxGeometry args={[2.3, 0.012, 2.3]} />
          <meshBasicMaterial color="#34f5a2" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.75, 48]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 48]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.07} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <coneGeometry args={[1.35, 1.7, 32, 1, true]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.028} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function HoloScene({ model }: { model: number }) {
  return (
    <Canvas
      camera={{ position: [2.5, 1.6, 2.7], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <HoloCloud model={model} />
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
