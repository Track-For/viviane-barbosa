"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { easing } from "maath";
import Image from "next/image";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uStrength;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 displaced = position;
    float drift = sin((uv.y * 3.14159) + uTime * 0.22) * 0.008;
    displaced.x += drift * uStrength;
    displaced.y += sin(uv.x * 4.4 - uTime * 0.16) * 0.005 * uStrength;
    displaced.x += (uv.y - 0.5) * uScroll * 0.035 * uStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uStrength;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  varying vec2 vUv;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float noise21(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);
    float a = hash21(cell);
    float b = hash21(cell + vec2(1.0, 0.0));
    float c = hash21(cell + vec2(0.0, 1.0));
    float d = hash21(cell + vec2(1.0, 1.0));
    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

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
    vec2 pointerUv = uPointer * 0.5 + 0.5;
    vec2 pointerDelta = vUv - pointerUv;
    float pointerDistance = length(pointerDelta);
    float influence = smoothstep(0.5, 0.02, pointerDistance);
    vec2 direction = pointerDelta / max(pointerDistance, 0.001);

    float organicNoise = noise21(uv * 4.2 + vec2(uTime * 0.07, -uTime * 0.05)) - 0.5;
    float wave = sin(uv.y * 17.0 + uTime * 0.58 + organicNoise * 2.2) * 0.0045;
    vec2 liquidOffset = vec2(
      wave + organicNoise * 0.006,
      cos(uv.x * 13.0 - uTime * 0.42) * 0.0028
    );
    liquidOffset += direction * influence * (0.009 + uScroll * 0.004);
    liquidOffset *= uStrength;

    float chroma = (0.0012 + influence * 0.0045 + uScroll * 0.0018) * uStrength;
    vec2 chromaOffset = direction * chroma;
    vec2 sampleUv = clamp(uv + liquidOffset, vec2(0.002), vec2(0.998));

    float red = texture2D(uTexture, clamp(sampleUv + chromaOffset, vec2(0.002), vec2(0.998))).r;
    float green = texture2D(uTexture, sampleUv).g;
    float blue = texture2D(uTexture, clamp(sampleUv - chromaOffset, vec2(0.002), vec2(0.998))).b;
    vec3 color = vec3(red, green, blue);

    float vignette = smoothstep(0.86, 0.24, length(vUv - 0.5));
    float filmGrain = hash21(gl_FragCoord.xy + fract(uTime) * 91.7) - 0.5;
    color *= mix(0.86, 1.03, vignette);
    color += filmGrain * 0.018 * uStrength;
    color = mix(color, vec3(dot(color, vec3(0.299, 0.587, 0.114))), 0.035);
    color *= vec3(1.018, 1.0, 0.982);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ImagePlane({ src, reducedMotion }: { src: string; reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const scrollTarget = useRef(0);
  const texture = useTexture(src);
  const { size } = useThree();

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const updateScroll = () => {
      scrollTarget.current = THREE.MathUtils.clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, [reducedMotion]);

  const uniforms = useMemo(() => {
    const image = texture.image as { width?: number; height?: number } | undefined;

    return {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uStrength: { value: reducedMotion ? 0 : 1 },
      uScroll: { value: 0 },
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
    uniforms.uScroll.value = THREE.MathUtils.damp(
      uniforms.uScroll.value,
      scrollTarget.current,
      4.5,
      Math.min(delta, 0.05),
    );

    if (!reducedMotion) {
      uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1, 32, 40]} />
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
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = root.current;

    if (!element || reducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "20% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={root} className="displacement-image">
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
            frameloop={reducedMotion || !active ? "demand" : "always"}
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
