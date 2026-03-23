'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SolarPanel3D() {
  const groupRef = useRef<THREE.Group>(null);

  // Create an "orange floating grid" representing a stylized solar panel
  const gridSize = 4;
  const gridDivisions = 8;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i <= gridDivisions; i++) {
      const coord = (i / gridDivisions) * gridSize - gridSize / 2;
      pos.push(coord, -gridSize/2, 0, coord, gridSize/2, 0); // vertical lines
      pos.push(-gridSize/2, coord, 0, gridSize/2, coord, 0); // horizontal lines
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Floating Grid */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#F59E0B" linewidth={2} transparent opacity={0.6} />
      </lineSegments>

      {/* Subtle Glow/Backing for the grid */}
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>

      {/* Points at intersections for extra techy feel */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#F59E0B" size={0.05} />
      </points>
    </group>
  );
}
