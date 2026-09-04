"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

/**
 * HOLO-ARCHIVE: Ahmad's hardware as dotted holograms. Each project is a
 * ~3.5k point cloud sampled from primitive geometry; switching projects
 * morphs every point to its new position. Projector base + scan line +
 * flicker sell the hologram.
 */

const N = 3500;
const CYAN = new THREE.Color("#00e5ff");
const MINT = new THREE.Color("#34f5a2");

interface Part {
  geo: THREE.BufferGeometry;
  matrix: THREE.Matrix4;
  count: number;
}

const M = (
  x: number, y: number, z: number,
  rx = 0, ry = 0, rz = 0,
  s = 1
) =>
  new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
    new THREE.Vector3(s, s, s)
  );

function sampleModel(parts: Part[]): Float32Array {
  const out = new Float32Array(N * 3);
  let o = 0;
  const pos = new THREE.Vector3();
  for (const part of parts) {
    const mesh = new THREE.Mesh(part.geo);
    const sampler = new MeshSurfaceSampler(mesh).build();
    for (let i = 0; i < part.count && o < N; i++) {
      sampler.sample(pos);
      pos.applyMatrix4(part.matrix);
      out[o * 3] = pos.x;
      out[o * 3 + 1] = pos.y;
      out[o * 3 + 2] = pos.z;
      o++;
    }
  }
  /* fill any remainder with copies so every model has exactly N points */
  while (o < N) {
    const src = Math.floor(Math.random() * o) * 3;
    out[o * 3] = out[src];
    out[o * 3 + 1] = out[src + 1];
    out[o * 3 + 2] = out[src + 2];
    o++;
  }
  return out;
}

function buildModels(): Float32Array[] {
  const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
  const cyl = (rt: number, rb: number, h: number) => new THREE.CylinderGeometry(rt, rb, h, 16);
  const sph = (r: number) => new THREE.SphereGeometry(r, 16, 12);
  const circle = (r: number) => new THREE.CircleGeometry(r, 28);
  const torus = (r: number, t: number) => new THREE.TorusGeometry(r, t, 10, 32);

  /* --- 1. the IEEE drone --- */
  const armA = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  const pod = 0.55 * Math.SQRT2 * 0.72;
  const drone: Part[] = [
    { geo: box(0.72, 0.24, 0.72), matrix: M(0, 0.62, 0), count: 1000 },
    { geo: box(0.42, 0.08, 0.42), matrix: M(0, 0.77, 0), count: 200 },
    { geo: sph(0.11), matrix: M(0, 0.56, 0.4), count: 150 },
    { geo: box(0.46, 0.12, 0.3), matrix: M(0, 0.46, 0), count: 150 },
    ...armA.map((a) => ({ geo: cyl(0.05, 0.05, 0.85), matrix: M(Math.cos(a) * 0.55, 0.62, Math.sin(a) * 0.55, 0, -a, Math.PI / 2), count: 150 })),
    ...[[pod, pod], [-pod, pod], [-pod, -pod], [pod, -pod]].map(([x, z]) => ({ geo: cyl(0.09, 0.11, 0.16), matrix: M(x, 0.74, z), count: 100 })),
    ...[[pod, pod], [-pod, pod], [-pod, -pod], [pod, -pod]].map(([x, z]) => ({ geo: circle(0.39), matrix: M(x, 0.86, z, -Math.PI / 2), count: 250 })),
  ];

  /* --- 2. ASL translation glove --- */
  const fingerX = [-0.24, -0.08, 0.08, 0.24];
  const glove: Part[] = [
    { geo: box(0.7, 0.18, 0.8), matrix: M(0, 0.6, 0), count: 900 },
    ...fingerX.map((x) => ({ geo: cyl(0.07, 0.07, 0.55), matrix: M(x, 0.6, 0.72, Math.PI / 2), count: 250 })),
    { geo: cyl(0.065, 0.065, 0.45), matrix: M(-0.48, 0.6, 0.12, Math.PI / 2, 0, -0.9), count: 250 },
    { geo: cyl(0.3, 0.34, 0.4), matrix: M(0, 0.6, -0.62, Math.PI / 2), count: 600 },
    { geo: box(0.2, 0.08, 0.26), matrix: M(0, 0.73, -0.15), count: 250 },
    ...fingerX.map((x) => ({ geo: sph(0.075), matrix: M(x, 0.6, 0.44), count: 125 })),
  ];

  /* --- 3. SaySpark Spark Mini rover --- */
  const spark: Part[] = [
    { geo: box(0.9, 0.35, 1.2), matrix: M(0, 0.45, 0), count: 1100 },
    { geo: box(0.55, 0.4, 0.45), matrix: M(0, 0.85, 0.25), count: 700 },
    { geo: box(0.4, 0.22, 0.05), matrix: M(0, 0.87, 0.5), count: 200 },
    ...[[0.52, 0.4], [-0.52, 0.4], [0.52, -0.4], [-0.52, -0.4]].map(([x, z]) => ({ geo: cyl(0.22, 0.22, 0.12), matrix: M(x, 0.22, z, 0, 0, Math.PI / 2), count: 250 })),
    { geo: cyl(0.02, 0.02, 0.35), matrix: M(0, 1.22, 0.1), count: 100 },
    { geo: sph(0.06), matrix: M(0, 1.42, 0.1), count: 100 },
    { geo: box(0.3, 0.08, 0.15), matrix: M(0, 0.65, -0.55), count: 300 },
  ];

  /* --- 4. Edge Pong smart paddle --- */
  const paddle: Part[] = [
    { geo: cyl(0.55, 0.55, 0.06), matrix: M(0, 0.95, 0, Math.PI / 2), count: 1600 },
    { geo: torus(0.55, 0.045), matrix: M(0, 0.95, 0), count: 400 },
    { geo: cyl(0.09, 0.11, 0.6), matrix: M(0, 0.28, 0), count: 500 },
    ...[[0.28, 0.28], [-0.28, 0.28], [0.28, -0.28], [-0.28, -0.28]].map(([x, y]) => ({ geo: box(0.13, 0.13, 0.09), matrix: M(x, 0.95 + y, 0.06), count: 150 })),
    { geo: box(0.3, 0.2, 0.07), matrix: M(0, 0.95, -0.07), count: 400 },
  ];

  /* --- 5. CHARGE Lab battery pack --- */
  const cells: Part[] = [];
  for (const x of [-0.3, -0.1, 0.1, 0.3]) {
    for (const z of [-0.2, 0, 0.2]) {
      cells.push({ geo: cyl(0.09, 0.09, 0.5), matrix: M(x, 0.47, z), count: 200 });
    }
  }
  const battery: Part[] = [
    ...cells,
    { geo: box(0.85, 0.05, 0.18), matrix: M(0, 0.75, 0.12), count: 250 },
    { geo: box(0.85, 0.05, 0.18), matrix: M(0, 0.75, -0.12), count: 250 },
    { geo: box(0.75, 0.06, 0.55), matrix: M(0, 0.19, 0), count: 400 },
    { geo: box(0.15, 0.12, 0.12), matrix: M(0.48, 0.3, 0), count: 200 },
  ];

  return [drone, glove, spark, paddle, battery].map(sampleModel);
}

function HoloCloud({ model }: { model: number }) {
  const points = useRef<THREE.Points>(null);
  const scan = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  const models = useMemo(buildModels, []);
  const current = useMemo(() => {
    /* materialize from a scattered sphere on first paint */
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 1.6 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = 0.9 + r * Math.cos(ph) * 0.6;
      arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    return arr;
  }, []);
  const from = useMemo(() => new Float32Array(current), [current]);
  const progress = useRef(0);
  const targetRef = useRef(model);

  useEffect(() => {
    if (!points.current) return;
    const posAttr = points.current.geometry.attributes.position;
    from.set(posAttr.array as Float32Array);
    targetRef.current = model;
    progress.current = 0;
  }, [model, from]);

  useFrame((st, delta) => {
    const posAttr = points.current?.geometry.attributes.position;
    if (posAttr) {
      if (progress.current < 1) {
        progress.current = Math.min(1, progress.current + delta / 0.9);
        const t = progress.current;
        const e = t * t * (3 - 2 * t);
        const target = models[targetRef.current];
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < N * 3; i++) {
          arr[i] = from[i] + (target[i] - from[i]) * e;
        }
        posAttr.needsUpdate = true;
      }
      const mat = points.current!.material as THREE.PointsMaterial;
      mat.opacity = 0.75 + Math.sin(st.clock.elapsedTime * 9) * 0.06 + (Math.random() > 0.985 ? -0.25 : 0);
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
      group.current.position.y = Math.sin(st.clock.elapsedTime * 1.1) * 0.04;
    }
    if (scan.current) {
      scan.current.position.y = 0.15 + ((st.clock.elapsedTime * 0.45) % 1.7);
      (scan.current.material as THREE.MeshBasicMaterial).opacity =
        0.16 * (1 - Math.abs(((st.clock.elapsedTime * 0.45) % 1.7) / 1.7 - 0.5) * 1.2);
    }
  });

  return (
    <>
      <group ref={group}>
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[current, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.022}
            color={CYAN}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
        {/* scan line */}
        <mesh ref={scan}>
          <boxGeometry args={[2.3, 0.012, 2.3]} />
          <meshBasicMaterial color={MINT} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* projector base */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.75, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.07} />
      </mesh>
      {/* faint light volume */}
      <mesh position={[0, 0.85, 0]}>
        <coneGeometry args={[1.35, 1.7, 32, 1, true]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.028} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function HoloScene({ model }: { model: number }) {
  return (
    <Canvas
      camera={{ position: [2.6, 1.7, 2.8], fov: 42 }}
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
