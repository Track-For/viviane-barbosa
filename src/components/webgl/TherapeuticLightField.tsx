"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  precision highp float;

  uniform float uTime;
  uniform float uMotion;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 345.45));
    point += dot(point, point + 34.345);
    return fract(point.x * point.y);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    return mix(
      mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), local.x),
      mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + vec2(1.0)), local.x),
      local.y
    );
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.52;

    for (int octave = 0; octave < 4; octave++) {
      value += noise(point) * amplitude;
      point = point * 2.03 + vec2(2.1, -1.7);
      amplitude *= 0.48;
    }

    return value;
  }

  void main() {
    vec2 centered = vUv * 2.0 - 1.0;
    centered.x *= uResolution.x / max(uResolution.y, 1.0);
    float motionTime = uTime * 0.07 * uMotion;
    vec2 pointerShift = uPointer * vec2(0.1, 0.07) * uMotion;
    float flow = fbm(centered * 1.15 + pointerShift + vec2(motionTime, -motionTime * 0.7));
    float secondaryFlow = fbm(centered * 2.1 - pointerShift + vec2(-motionTime * 0.6, motionTime));
    float clarity = smoothstep(-0.85, 0.8, centered.x + (uScroll - 0.5) * 0.5 + flow * 0.34);
    float veil = exp(-abs(centered.x * 0.72 + centered.y * 0.28 - 0.12 + flow * 0.38) * 3.2);
    float caustic = pow(max(sin((centered.y + secondaryFlow * 0.34) * 9.0 - uTime * 0.13) * 0.5 + 0.5, 0.0), 7.0);

    vec3 cream = vec3(0.961, 0.945, 0.922);
    vec3 sage = vec3(0.659, 0.698, 0.631);
    vec3 terracotta = vec3(0.651, 0.427, 0.337);
    vec3 color = mix(sage, cream, clarity * 0.82);
    color = mix(color, terracotta, caustic * 0.28 + (1.0 - clarity) * 0.06);
    color += cream * caustic * 0.22;

    float vignette = 1.0 - smoothstep(0.2, 1.35, length(centered * vec2(0.72, 1.0)));
    float grain = hash21(gl_FragCoord.xy + fract(uTime) * 71.0) - 0.5;
    color += grain * 0.008 * uMotion;
    float alpha = (0.025 + veil * 0.16 + caustic * 0.075 + clarity * 0.045) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

function LightPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2());
  const scrollTarget = useRef(0);
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMotion: { value: reducedMotion ? 0 : 1 },
      uScroll: { value: 0 },
      uPointer: { value: pointer.current },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [reducedMotion, size.height, size.width],
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const updateScroll = () => {
      const section = document.querySelector<HTMLElement>(".shader-story");
      const sectionTop = section?.offsetTop ?? window.scrollY;
      const distance = Math.max(window.innerHeight * 1.35, 1);
      scrollTarget.current = THREE.MathUtils.clamp((window.scrollY - sectionTop) / distance, 0, 1);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [reducedMotion]);

  useFrame((state, delta) => {
    if (!material.current) {
      return;
    }

    easing.damp2(pointer.current, [state.pointer.x, state.pointer.y], 0.4, delta);
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uMotion.value = reducedMotion ? 0 : 1;
    uniforms.uScroll.value = THREE.MathUtils.damp(
      uniforms.uScroll.value,
      scrollTarget.current,
      3.5,
      Math.min(delta, 0.05),
    );

    if (!reducedMotion) {
      uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // The CSS light field remains as a visual fallback.
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function TherapeuticLightField() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = root.current;

    if (!element || reducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "35% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={root} className="therapeutic-light">
      <span className="therapeutic-light__fallback" aria-hidden="true" />
      <ShaderBoundary>
        <div className="therapeutic-light__canvas" aria-hidden="true">
          <Canvas
            orthographic
            camera={{ position: [0, 0, 2], zoom: 1 }}
            dpr={[1, 1.25]}
            frameloop={reducedMotion || !active ? "demand" : "always"}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          >
            <LightPlane reducedMotion={reducedMotion} />
          </Canvas>
        </div>
      </ShaderBoundary>
    </div>
  );
}
