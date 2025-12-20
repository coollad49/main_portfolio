"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../theme-provider";

function FloatingShape({
    position,
    geometry,
    color,
    speed = 1,
    distort = 0.3
}: {
    position: [number, number, number];
    geometry: "sphere" | "box" | "torus" | "octahedron";
    color: string;
    speed?: number;
    distort?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
        }
    });

    const geo = useMemo(() => {
        switch (geometry) {
            case "sphere":
                return <sphereGeometry args={[1, 32, 32]} />;
            case "box":
                return <boxGeometry args={[1.2, 1.2, 1.2]} />;
            case "torus":
                return <torusGeometry args={[0.8, 0.3, 16, 32]} />;
            case "octahedron":
                return <octahedronGeometry args={[1]} />;
            default:
                return <sphereGeometry args={[1, 32, 32]} />;
        }
    }, [geometry]);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={0.5}>
                {geo}
                <MeshDistortMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.8}
                    distort={distort}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

function Particles({ count = 100, isDark }: { count?: number; isDark: boolean }) {
    const points = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.x = state.clock.elapsedTime * 0.02;
            points.current.rotation.y = state.clock.elapsedTime * 0.03;

            // Mouse interaction
            points.current.position.x = mouse.x * 0.5;
            points.current.position.y = mouse.y * 0.5;
        }
    });

    return (
        <points ref={points} geometry={geometry}>
            <pointsMaterial
                size={0.02}
                color={isDark ? "#ffffff" : "#000000"}
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function Scene() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const primaryColor = isDark ? "#ffffff" : "#1a1a1a";
    const secondaryColor = isDark ? "#888888" : "#666666";

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color={primaryColor} />

            <Particles count={80} isDark={isDark} />

            <FloatingShape
                position={[-3, 1.5, -2]}
                geometry="sphere"
                color={primaryColor}
                speed={0.8}
                distort={0.4}
            />
            <FloatingShape
                position={[3.5, -1, -3]}
                geometry="octahedron"
                color={secondaryColor}
                speed={1.2}
                distort={0.2}
            />
            <FloatingShape
                position={[-2.5, -2, -1]}
                geometry="torus"
                color={primaryColor}
                speed={0.6}
                distort={0.3}
            />
            <FloatingShape
                position={[2, 2.5, -4]}
                geometry="box"
                color={secondaryColor}
                speed={1}
                distort={0.25}
            />
        </>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
