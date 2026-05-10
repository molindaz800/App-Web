"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralSphere({ mode }: { mode: "login" | "core" }) {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    return Array.from({ length: 96 }, (_, index) => {
      const phi = Math.acos(1 - 2 * (index + 0.5) / 96);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = mode === "login" ? 2.1 : 2.75;
      return new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius
      );
    });
  }, [mode]);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.y = clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[mode === "login" ? 1.55 : 2.15, 64, 64]} />
        <meshStandardMaterial color="#06202d" emissive="#00d8ff" emissiveIntensity={0.22} transparent opacity={0.22} wireframe />
      </mesh>
      {points.map((point, index) => (
        <mesh position={point} key={index}>
          <sphereGeometry args={[index % 9 === 0 ? 0.045 : 0.022, 16, 16]} />
          <meshStandardMaterial color={index % 7 === 0 ? "#ff8a3d" : "#7df9ff"} emissive={index % 7 === 0 ? "#ff8a3d" : "#00d8ff"} emissiveIntensity={1.4} />
        </mesh>
      ))}
      {points.slice(0, 44).map((point, index) => {
        const next = points[(index * 7 + 13) % points.length];
        const curve = new THREE.CatmullRomCurve3([point, new THREE.Vector3(0, 0, 0), next]);
        const tube = new THREE.TubeGeometry(curve, 18, 0.006, 8, false);
        return (
          <mesh geometry={tube} key={`line-${index}`}>
            <meshBasicMaterial color={index % 5 === 0 ? "#ff8a3d" : "#00d8ff"} transparent opacity={0.25} />
          </mesh>
        );
      })}
    </group>
  );
}

export function HolographicBackdrop({ mode }: { mode: "login" | "core" }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: mode === "login" ? [0, 0, 7] : [0, 0.2, 8], fov: 48 }}>
        <color attach="background" args={["#03060a"]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[4, 4, 5]} intensity={2.6} color="#00d8ff" />
        <pointLight position={[-5, -2, 4]} intensity={2.1} color="#ff8a3d" />
        <Stars radius={80} depth={32} count={1300} factor={4} saturation={0} fade speed={0.45} />
        <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.45}>
          <NeuralSphere mode={mode} />
        </Float>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,6,10,0.08)_34%,rgba(3,6,10,0.88)_78%)]" />
    </div>
  );
}
