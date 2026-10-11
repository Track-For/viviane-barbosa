"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { easing } from "maath";
import Image from "next/image";
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uStrength;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 screen, vec2 image) {
    float screenRatio = screen.x / screen.y;
    float imageRatio = image.x / image.y;
    vec2 scale = screenRatio < imageRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImageSize);
    float pointerDistance = distance(vUv, uPointer * 0.12 + 0.5);
    float influence = smoothstep(0.62, 0.0, pointerDistance);
    float wave = sin(uv.y * 16.0 + uTime * 0.65) * 0.006;
    uv.x += wave * uStrength + (uPointer.x * 0.004 * influence * uStrength);
    uv.y += uPointer.y * 0.0025 * influence * uStrength;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

function ImagePlane({ src, reducedMotion }: { src: string; reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const texture = useTexture(src);
  const { size } = useThree();

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  const uniforms = useMemo(() => {
    const image = texture.image as { width?: number; height?: number } | undefined;

    return {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uStrength: { value: reducedMotion ? 0 : 1 },
      uPointer: { value: pointer.current },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageSize: { value: new THREE.Vector2(image?.width ?? 4, image?.height ?? 5) },
    };
  }, [reducedMotion, size.height, size.width, texture]);

  useFrame((state, delta) => {
    if (!material.current) {
      return;
    }

    easing.damp2(pointer.current, [state.pointer.x, state.pointer.y], 0.35, delta);
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uStrength.value = reducedMotion ? 0 : 1;

    if (!reducedMotion) {
      uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // The optimized Next image remains visible as the static fallback.
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function DisplacementImage({
  src,
  alt,
  blurDataURL,
}: {
  src: string;
  alt: string;
  blurDataURL: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="displacement-image">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes="(max-width: 900px) 100vw, 48vw"
      />
      <WebGLBoundary>
        <div className="displacement-image__canvas" aria-hidden="true">
          <Canvas
            orthographic
            camera={{ position: [0, 0, 2], zoom: 1 }}
            dpr={[1, 1.35]}
            frameloop={reducedMotion ? "demand" : "always"}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          >
            <Suspense fallback={null}>
              <ImagePlane src={src} reducedMotion={reducedMotion} />
            </Suspense>
          </Canvas>
        </div>
      </WebGLBoundary>
    </div>
  );
}
