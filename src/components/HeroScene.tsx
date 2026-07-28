"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Rig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { mouse } = useThree();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const targetX = mouse.y * 0.15;
    const targetY = mouse.x * 0.25;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.03;
    group.current.rotation.z = scrollRef.current * 0.0006;
    group.current.position.y = -scrollRef.current * 0.0015;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.4}>
        <mesh position={[1.6, 0.4, 0]}>
          <icosahedronGeometry args={[1.1, 0]} />
          <MeshDistortMaterial
            color="#ff5f1f"
            emissive="#ff5f1f"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.6}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.8}>
        <mesh position={[-1.8, -0.6, -1]}>
          <torusGeometry args={[0.85, 0.28, 32, 100]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.5}
            distort={0.25}
            speed={1.2}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh position={[0.2, -1.3, -0.5]}>
          <octahedronGeometry args={[0.55, 0]} />
          <MeshDistortMaterial
            color="#fdba74"
            emissive="#fdba74"
            emissiveIntensity={0.25}
            roughness={0.25}
            metalness={0.4}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      <Sparkles count={80} scale={7} size={2.5} speed={0.3} color="#ff8a4c" />
      <Sparkles count={60} scale={9} size={1.8} speed={0.2} color="#a78bfa" />
    </group>
  );
}

export default function HeroScene() {
  const scrollRef = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 bg-flare-radial" aria-hidden />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff5f1f" />
        <pointLight position={[-5, -3, -5]} intensity={1} color="#8b5cf6" />
        <Rig scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
