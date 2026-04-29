/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../theme-provider";

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 2.2;
const MOUSE_INFLUENCE_RADIUS = 3.5;
const MOUSE_REPEL_STRENGTH = 0.8;

function NetworkScene() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const { viewport } = useThree();

    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const mousePos = useRef(new THREE.Vector3(999, 999, 0));
    const frameCount = useRef(0);

    const particleColor = isDark ? new THREE.Color("#e5e5e5") : new THREE.Color("#262626");
    const lineColor = isDark ? new THREE.Color("#404040") : new THREE.Color("#d4d4d4");
    const lineOpacity = isDark ? 0.25 : 0.35;

    const { positions, velocities, originalPositions } = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const vel = new Float32Array(PARTICLE_COUNT * 3);
        const orig = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 14;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 6;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            orig[i * 3] = x;
            orig[i * 3 + 1] = y;
            orig[i * 3 + 2] = z;

            vel[i * 3] = (Math.random() - 0.5) * 0.002;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
        }

        return { positions: pos, velocities: vel, originalPositions: orig };
    }, []);

    const lineGeometry = useMemo(() => {
        const maxLines = PARTICLE_COUNT * 4;
        const linePos = new Float32Array(maxLines * 6);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
        return geo;
    }, []);

    const pointGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mousePos.current.set(x * viewport.width * 0.5, y * viewport.height * 0.5, 0);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [viewport]);

    useFrame((state) => {
        frameCount.current++;

        // Update particles
        const posArray = pointGeometry.attributes.position.array as Float32Array;
        const linePosArray = lineGeometry.attributes.position.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Gentle drift
            positions[ix] += velocities[ix];
            positions[iy] += velocities[iy];
            positions[iz] += velocities[iz];

            // Soft boundary: gently pull back to original area
            const dx = positions[ix] - originalPositions[ix];
            const dy = positions[iy] - originalPositions[iy];
            const dz = positions[iz] - originalPositions[iz];
            positions[ix] -= dx * 0.002;
            positions[iy] -= dy * 0.002;
            positions[iz] -= dz * 0.002;

            // Mouse repulsion
            const mx = mousePos.current.x;
            const my = mousePos.current.y;
            const mdx = positions[ix] - mx;
            const mdy = positions[iy] - my;
            const mdz = positions[iz];
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy + mdz * mdz);

            if (mDist < MOUSE_INFLUENCE_RADIUS && mDist > 0.1) {
                const force = (1 - mDist / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPEL_STRENGTH * 0.02;
                positions[ix] += (mdx / mDist) * force;
                positions[iy] += (mdy / mDist) * force;
            }

            posArray[ix] = positions[ix];
            posArray[iy] = positions[iy];
            posArray[iz] = positions[iz];
        }

        pointGeometry.attributes.position.needsUpdate = true;

        // Build connections (every other frame for performance)
        let lineIndex = 0;
        if (frameCount.current % 2 === 0) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < CONNECTION_DISTANCE && lineIndex < PARTICLE_COUNT * 4 * 6 - 6) {
                        linePosArray[lineIndex++] = positions[i * 3];
                        linePosArray[lineIndex++] = positions[i * 3 + 1];
                        linePosArray[lineIndex++] = positions[i * 3 + 2];
                        linePosArray[lineIndex++] = positions[j * 3];
                        linePosArray[lineIndex++] = positions[j * 3 + 1];
                        linePosArray[lineIndex++] = positions[j * 3 + 2];
                    }
                }
            }

            // Clear remaining line positions
            for (let i = lineIndex; i < PARTICLE_COUNT * 4 * 6; i++) {
                linePosArray[i] = 0;
            }

            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.setDrawRange(0, lineIndex / 3);
        }

        // Gentle scene rotation
        if (pointsRef.current) {
            pointsRef.current.rotation.z = state.clock.elapsedTime * 0.008;
        }
        if (linesRef.current) {
            linesRef.current.rotation.z = state.clock.elapsedTime * 0.008;
        }
    });

    return (
        <>
            <points ref={pointsRef} geometry={pointGeometry}>
                <pointsMaterial
                    size={0.06}
                    color={particleColor}
                    transparent
                    opacity={isDark ? 0.6 : 0.5}
                    sizeAttenuation
                />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    color={lineColor}
                    transparent
                    opacity={lineOpacity}
                />
            </lineSegments>
        </>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <NetworkScene />
            </Canvas>
        </div>
    );
}
