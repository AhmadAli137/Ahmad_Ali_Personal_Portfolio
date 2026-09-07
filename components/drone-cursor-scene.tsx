"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The 3D drone that escorts the pointer. Orthographic camera mapped 1:1 to
 * CSS pixels; the quad chases the cursor on a spring, yaws toward travel,
 * and banks with body-frame pitch/roll from real acceleration. Viewed from
 * a 3/4 angle so the attitude reads in proper 3D.
 */

/* ---- proper quadrotor model ----
   Two-loop control, like a real flight stack:
   outer loop:  position error -> DESIRED acceleration (PD)
   conversion:  desired accel -> desired tilt, theta = atan(a/g)
   inner loop:  attitude chases desired tilt, slew-rate limited
   dynamics:    ACTUAL acceleration comes only from current tilt: a = g*tan(theta)
   So the drone can never out-accelerate its bank angle, tilt genuinely
   precedes motion, and far targets produce the classic accelerate, flip,
   brake profile of a real quad. */
const G = 4500; // px/s^2 "gravity" at page scale (sets the whole energy scale)
const KP = 14; // position loop stiffness (1/s^2)
const KD = 6.6; // position loop damping (1/s)
const K_ATT = 14; // attitude loop gain (1/s)
const ATT_RATE = 11; // max attitude slew (rad/s, ~630 deg/s - racing-quad body rates)
const TILT_MAX = 0.6; // rad (~34 deg bank limit)
const AERO_DRAG = 0.0004; // v^2 drag
const YAW_SPEED_MIN = 60;
const YAW_RATE = 10; // rad/s max yaw slew (~570 deg/s)
const VIEW_TILT = -0.62; // camera-relative viewing angle

const SHELL = { color: "#e9eff5", metalness: 0.25, roughness: 0.4 } as const;
const CYAN_ANO = { color: "#19c8de", metalness: 0.85, roughness: 0.22 } as const;
const AMBER_ANO = { color: "#f2a544", metalness: 0.8, roughness: 0.3 } as const;

function Motor({ x, y, dir, refFn, discFn, ringFn, bladeMat }: {
  x: number; y: number; dir: number;
  refFn: (g: THREE.Group) => void;
  discFn: (m: THREE.MeshBasicMaterial) => void;
  ringFn: (m: THREE.MeshBasicMaterial) => void;
  bladeMat: THREE.MeshStandardMaterial;
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
      {/* prop blur: disc + rim ring - brightness follows throttle */}
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
        <mesh position={[3.5, 0, 0]} rotation={[0.45 * dir, 0, 0]} material={bladeMat}>
          <boxGeometry args={[6.6, 1.5, 0.22]} />
        </mesh>
        <mesh position={[-3.5, 0, 0]} rotation={[-0.45 * dir, 0, 0]} material={bladeMat}>
          <boxGeometry args={[6.6, 1.5, 0.22]} />
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
  const shadowRig = useRef<THREE.Group>(null);
  const shadowMat = useRef<THREE.MeshBasicMaterial>(null);

  /* on a dark page a cast shadow has nothing to darken — instead the drone's
     downwash and underglow light the surface beneath it (soft cyan pool) */
  const shadowTex = useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 256;
    const ctx = cv.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 6, 128, 128, 126);
    grad.addColorStop(0, "rgba(170,248,255,0.8)");
    grad.addColorStop(0.22, "rgba(40,235,255,0.38)");
    grad.addColorStop(0.55, "rgba(0,229,255,0.13)");
    grad.addColorStop(1, "rgba(0,229,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(cv);
  }, []);
  const noseLed = useRef<THREE.MeshStandardMaterial>(null);
  const tailLed = useRef<THREE.MeshStandardMaterial>(null);

  /* true perspective: the page is the ground plane at z=0; the camera sits
     far enough back that one world unit equals one CSS pixel at that plane */
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = 35;
    cam.position.set(0, 0, size.height / (2 * Math.tan(THREE.MathUtils.degToRad(17.5))));
    cam.near = 50;
    cam.far = cam.position.z * 3;
    cam.updateProjectionMatrix();
  }, [camera, size]);

  const bladeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f4f8fb", metalness: 0.3, roughness: 0.45, transparent: true }),
    []
  );

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
    poolA: 0.4,
    poolS: 1,
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

    /* outer loop: the acceleration the position controller WANTS */
    const aDesX = KP * (st.target.x - st.pos.x) - KD * st.vel.x;
    const aDesY = KP * (st.target.y - st.pos.y) - KD * st.vel.y;

    /* yaw: nose slews toward the velocity vector at a bounded rate */
    const speed = Math.hypot(st.vel.x, st.vel.y);
    if (speed > YAW_SPEED_MIN) {
      const targetYaw = Math.atan2(st.vel.x, -st.vel.y);
      let d = targetYaw - st.yaw;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      st.yaw += THREE.MathUtils.clamp(d * Math.min(1, dt * 11), -YAW_RATE * dt, YAW_RATE * dt);
    }
    const fwdX = Math.sin(st.yaw), fwdY = -Math.cos(st.yaw);
    const rightX = Math.cos(st.yaw), rightY = Math.sin(st.yaw);

    /* desired accel -> commanded attitude: theta = atan(a/g), bank-limited */
    const tiltFdes = THREE.MathUtils.clamp(Math.atan((aDesX * fwdX + aDesY * fwdY) / G), -TILT_MAX, TILT_MAX);
    const tiltRdes = THREE.MathUtils.clamp(Math.atan((aDesX * rightX + aDesY * rightY) / G), -TILT_MAX, TILT_MAX);

    /* inner loop: attitude chases the command, slew-rate limited */
    st.pitch += THREE.MathUtils.clamp((tiltFdes - st.pitch) * Math.min(1, K_ATT * dt), -ATT_RATE * dt, ATT_RATE * dt);
    st.roll += THREE.MathUtils.clamp((tiltRdes - st.roll) * Math.min(1, K_ATT * dt), -ATT_RATE * dt, ATT_RATE * dt);

    /* dynamics: the ONLY lateral force is the tilted thrust vector, plus drag.
       Acceleration is a consequence of attitude, never the other way round. */
    const aF = G * Math.tan(st.pitch);
    const aR = G * Math.tan(st.roll);
    const ax = aF * fwdX + aR * rightX - AERO_DRAG * st.vel.x * speed;
    const ay = aF * fwdY + aR * rightY - AERO_DRAG * st.vel.y * speed;
    st.vel.x += ax * dt;
    st.vel.y += ay * dt;
    st.pos.x += st.vel.x * dt;
    st.pos.y += st.vel.y * dt;

    /* hover turbulence: a quad is never perfectly still - layered sines give
       small non-repeating attitude and position flutter, growing with speed */
    const t = state3.clock.elapsedTime;
    const wob = 0.014 + speed * 0.000035;
    const nPitch = (Math.sin(t * 7.3) * 0.5 + Math.sin(t * 13.7 + 1.7) * 0.3 + Math.sin(t * 23.1 + 4.1) * 0.2) * wob;
    const nRoll = (Math.sin(t * 8.1 + 2.3) * 0.5 + Math.sin(t * 15.3 + 0.6) * 0.3 + Math.sin(t * 21.7 + 3.2) * 0.2) * wob;
    const nX = (Math.sin(t * 5.7 + 1.1) + Math.sin(t * 11.3 + 3.7) * 0.5) * 0.55;
    const nY = (Math.sin(t * 6.3 + 2.9) + Math.sin(t * 12.7 + 0.4) * 0.5) * 0.55;

    /* ---- vertical dynamics ----
       Throttle chases what flight demands: hover baseline, extra to hold
       altitude while tilted, climb for upward cursor motion - and the page
       scroll feeds in through two smoothing stages, so the drone hesitates
       a beat before dropping into a scroll-down or punching up a scroll-up.
       Motor lag means hard tilts sag, releases balloon: like a real quad. */
    const scrollY = window.scrollY;
    const scrollV = (scrollY - st.lastScrollY) / Math.max(dt, 0.001);
    st.lastScrollY = scrollY;
    st.scrollSm += (scrollV - st.scrollSm) * Math.min(1, dt * 5);
    st.scrollLag += (st.scrollSm - st.scrollLag) * Math.min(1, dt * 7);

    const tiltMag = Math.hypot(st.pitch, st.roll);
    /* holding altitude while tilted requires thrust/cos(theta) — the real relation */
    const hoverNeed = 1 / Math.max(Math.cos(tiltMag), 0.55);
    const climbDemand = -st.vel.y * 0.0012 - st.scrollLag * 0.0009;
    const throttleTarget = THREE.MathUtils.clamp(hoverNeed + climbDemand, 0.2, 2.3);
    st.throttle += (throttleTarget - st.throttle) * Math.min(1, dt * 5); // motor spool lag

    st.altV += ((st.throttle - hoverNeed) * 700 - st.alt * 8 - st.altV * 4) * dt;
    st.alt = THREE.MathUtils.clamp(st.alt + st.altV * dt, -18, 18);

    const bob = speed < 40 ? Math.sin(state3.clock.elapsedTime * 2.6) * 1.6 : 0;

    /* the drone flies ABOVE the page: altitude is true Z toward the viewer.
       Perspective handles size and parallax honestly - no scale tricks. */
    const wx = st.pos.x - window.innerWidth / 2 + nX;
    const wy = window.innerHeight / 2 - st.pos.y - bob + nY;
    const height = Math.max(14, 55 + st.alt * 4.5);
    g.position.set(wx, wy, height);

    a.rotation.order = "ZXY";
    a.rotation.z = -st.yaw;
    a.rotation.x = st.pitch + nPitch;
    a.rotation.y = st.roll + nRoll;

    const targetScale = st.hover ? 1.2 : 1;
    st.scale += (targetScale - st.scale) * Math.min(1, dt * 10);
    g.scale.setScalar(st.scale);

    /* soft shadow on the page plane - the height cue. It marks the cursor's
       ground point; the drone separates from it as it climbs. */
    const sh = shadowRig.current;
    if (sh) {
      sh.visible = g.visible;
      /* the light pool sits directly beneath the drone: brighter and tighter
         when it drops low or spools up, wider and fainter as it climbs.
         Its visuals chase their targets through a low-pass so the glow
         breathes smoothly instead of tracking every physics jitter. */
      sh.position.set(wx, wy, 1);
      const spreadT = (0.55 + height * 0.009) * (0.85 + st.throttle * 0.15);
      const heightFade = THREE.MathUtils.clamp(1.0 - height * 0.008, 0.15, 1);
      const alphaT = heightFade * (0.45 + st.throttle * 0.5);
      st.poolS += (spreadT - st.poolS) * Math.min(1, dt * 6);
      st.poolA += (alphaT - st.poolA) * Math.min(1, dt * 6);
      sh.scale.set(st.poolS, st.poolS * 0.85, 1);
      if (shadowMat.current) shadowMat.current.opacity = st.poolA;
    }

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
    /* blades dissolve into the blur disc as the motors load up */
    bladeMat.opacity = THREE.MathUtils.clamp(1.55 - st.throttle * 0.75, 0.1, 1);

    const pulse = (Math.sin(state3.clock.elapsedTime * 5.5) + 1) / 2;
    if (noseLed.current) noseLed.current.emissiveIntensity = 1.5 + pulse * 2.5;
    if (tailLed.current) tailLed.current.emissiveIntensity = 4 - pulse * 2.5;
  });

  return (
    <>
    {/* ground shadow on the page plane */}
    <group ref={shadowRig} visible={false}>
      <mesh>
        <planeGeometry args={[52, 52]} />
        <meshBasicMaterial ref={shadowMat} map={shadowTex} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
    <group ref={rig} visible={false}>
      {/* constant 3/4 viewing angle; attitude applies inside it */}
      <group rotation={[VIEW_TILT, 0, 0]}>
        <group ref={att}>
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
          <Motor x={-13} y={-13} dir={1} bladeMat={bladeMat} refFn={(g) => (rotors.current[0] = g)} discFn={(m) => (discMats.current[0] = m)} ringFn={(m) => (ringMats.current[0] = m)} />
          <Motor x={13} y={-13} dir={-1} bladeMat={bladeMat} refFn={(g) => (rotors.current[1] = g)} discFn={(m) => (discMats.current[1] = m)} ringFn={(m) => (ringMats.current[1] = m)} />
          <Motor x={-13} y={13} dir={-1} bladeMat={bladeMat} refFn={(g) => (rotors.current[2] = g)} discFn={(m) => (discMats.current[2] = m)} ringFn={(m) => (ringMats.current[2] = m)} />
          <Motor x={13} y={13} dir={1} bladeMat={bladeMat} refFn={(g) => (rotors.current[3] = g)} discFn={(m) => (discMats.current[3] = m)} ringFn={(m) => (ringMats.current[3] = m)} />

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
    </>
  );
}

export default function DroneCursorScene() {
  return (
    <Canvas
      className="!fixed !inset-0 !z-[9999]"
      style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 9999 }}
      camera={{ fov: 35, position: [0, 0, 1400], near: 50, far: 5000 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[80, 120, 160]} intensity={2.4} />
      <directionalLight position={[-70, -50, 90]} intensity={0.6} color="#00e5ff" />
      <directionalLight position={[30, -90, 40]} intensity={0.35} color="#ffb454" />
      <Drone />
    </Canvas>
  );
}
