"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate random points on a sphere
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);
    
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function ParticleSphere({ status }: { status: "idle" | "thinking" }) {
  const ref = useRef<THREE.Points>(null);
  
  // Create 3000 particles
  const spherePoints = useMemo(() => generateSpherePoints(3000, 1.5), []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Rotation Logic
    if (status === "thinking") {
      ref.current.rotation.x -= delta * 0.5;
      ref.current.rotation.y -= delta * 2; // Fast spin
    } else {
      ref.current.rotation.x -= delta * 0.1;
      ref.current.rotation.y -= delta * 0.15; // Slow idle
    }

    // Breathing Effect (Scale)
    const time = state.clock.getElapsedTime();
    const breathingScale = status === "thinking" 
      ? 1 + Math.sin(time * 10) * 0.1 // Fast jitter
      : 1 + Math.sin(time * 1.5) * 0.05; // Slow breath
      
    ref.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={status === "thinking" ? "#a855f7" : "#22d3ee"} // Purple vs Cyan
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Update the props type to include "listening"
export default function ThinkingCore({ status }: { status: "idle" | "thinking" | "speaking" | "listening" }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.5} />
        {/* We treat "listening" the same as "thinking" or "idle" visually. 
            Let's make it "thinking" so it spins when you talk. */}
        <ParticleSphere status={status === "thinking" || status === "listening" ? "thinking" : "idle"} />
      </Canvas>
    </div>
  );
}