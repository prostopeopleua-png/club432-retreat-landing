"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles, Icosahedron, Torus } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const GOLD = "#FDD16F";
const ORANGE = "#EF8018";
const VIOLET = "#6D5AE6";

function prefersReduced() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Resonator() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const reduced = useMemo(prefersReduced, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // gentle pointer parallax
      const px = state.pointer.x * 0.3;
      const py = state.pointer.y * 0.3;
      group.current.rotation.y += (px - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-py - group.current.rotation.x) * 0.04;
    }
    if (reduced) return;
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.z += delta * 0.05;
      const pulse = 1 + Math.sin(t * 1.6) * 0.03; // 432-resonance breathing
      shell.current.scale.setScalar(pulse);
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.22;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.16;
  });

  return (
    <group ref={group}>
      {/* Resonating core — organic breathing blob */}
      <mesh>
        <sphereGeometry args={[0.92, 64, 64]} />
        <MeshDistortMaterial
          color={ORANGE}
          emissive={GOLD}
          emissiveIntensity={0.22}
          roughness={0.3}
          metalness={0.6}
          distort={0.3}
          speed={reduced ? 0 : 1.5}
        />
      </mesh>

      {/* Sacred-geometry wireframe shell */}
      <Icosahedron ref={shell} args={[1.85, 1]}>
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.28} />
      </Icosahedron>

      {/* Orbital rings */}
      <Torus ref={ring1} args={[2.55, 0.008, 16, 120]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshBasicMaterial color={GOLD} transparent opacity={0.35} />
      </Torus>
      <Torus ref={ring2} args={[2.95, 0.006, 16, 120]} rotation={[Math.PI / 1.8, 0.4, 0]}>
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} />
      </Torus>

      <Sparkles count={70} scale={9} size={2.2} speed={reduced ? 0 : 0.3} color={GOLD} opacity={0.7} />
      <Sparkles count={40} scale={12} size={3} speed={reduced ? 0 : 0.2} color={VIOLET} opacity={0.5} />
    </group>
  );
}

export default function ResonanceCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 5]} intensity={2.4} color={GOLD} />
      <pointLight position={[-6, -2, 2]} intensity={2.2} color={VIOLET} />
      <pointLight position={[0, -4, -4]} intensity={1.4} color={ORANGE} />
      <Suspense fallback={null}>
        <Resonator />
      </Suspense>
    </Canvas>
  );
}
