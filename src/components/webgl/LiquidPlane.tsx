"use client";

import { easing } from "maath";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMotion;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 positionCopy = position;
    float waveA = sin(positionCopy.x * 3.8 + uTime * 0.28) * 0.055;
    float waveB = cos(positionCopy.y * 4.4 - uTime * 0.22) * 0.04;
    positionCopy.z += (waveA + waveB) * uMotion;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(positionCopy, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    float distanceToPointer = distance(vUv, uPointer * 0.16 + 0.5);
    float haze = smoothstep(0.72, 0.06, distanceToPointer);
    float band = sin((vUv.x + vUv.y) * 5.0 + uTime * 0.08) * 0.5 + 0.5;
    vec3 deep = vec3(0.10, 0.23, 0.20);
    vec3 soft = vec3(0.50, 0.66, 0.60);
    vec3 color = mix(deep, soft, haze * 0.72 + band * 0.08);
    gl_FragColor = vec4(color, 0.34);
  }
`;

export function LiquidPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const uniforms = useRef({
    uTime: { value: 0 },
    uMotion: { value: reducedMotion ? 0 : 1 },
    uPointer: { value: pointer.current },
  });

  useFrame((state, delta) => {
    const shader = material.current;

    if (!shader) {
      return;
    }

    easing.damp2(pointer.current, [state.pointer.x, state.pointer.y], 0.45, delta);
    uniforms.current.uMotion.value = reducedMotion ? 0 : 1;

    if (!reducedMotion) {
      uniforms.current.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    <mesh scale={[2.25, 2.25, 1]}>
      <planeGeometry args={[1, 1, 48, 48]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
