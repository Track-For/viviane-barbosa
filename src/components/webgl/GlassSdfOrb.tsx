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

  mat2 rotate2d(float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return mat2(cosine, -sine, sine, cosine);
  }

  float glassShell(vec3 point) {
    vec3 warped = point;
    float pointerEnergy = length(uPointer) * 0.6;
    warped.xz *= rotate2d(uTime * 0.12 + uScroll * 0.08);
    warped.xy *= rotate2d(-uTime * 0.07 + uPointer.x * 0.18);

    float displacement =
      sin(warped.x * 5.4 + uTime * 0.72) *
      sin(warped.y * 6.2 - uTime * 0.48) *
      sin(warped.z * 4.8 + uScroll * 0.34) *
      (0.055 + pointerEnergy * 0.035) * uMotion;
    float outer = length(warped) - 0.76 + displacement;
    float inner = length(warped) - 0.64 + displacement * 0.82;

    return max(outer, -inner);
  }

  vec3 calculateNormal(vec3 point) {
    const vec2 epsilon = vec2(0.004, 0.0);
    return normalize(vec3(
      glassShell(point + epsilon.xyy) - glassShell(point - epsilon.xyy),
      glassShell(point + epsilon.yxy) - glassShell(point - epsilon.yxy),
      glassShell(point + epsilon.yyx) - glassShell(point - epsilon.yyx)
    ));
  }

  float rayMarch(vec3 origin, vec3 direction, out vec3 hitPoint) {
    float distanceTraveled = 0.0;

    for (int step = 0; step < 48; step++) {
      hitPoint = origin + direction * distanceTraveled;
      float distanceToSurface = glassShell(hitPoint);

      if (abs(distanceToSurface) < 0.0035) {
        return distanceTraveled;
      }

      distanceTraveled += max(abs(distanceToSurface) * 0.72, 0.008);

      if (distanceTraveled > 6.0) {
        break;
      }
    }

    return -1.0;
  }

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 345.45));
    point += dot(point, point + 34.345);
    return fract(point.x * point.y);
  }

  void main() {
    vec2 centered = vUv * 2.0 - 1.0;
    centered.x *= uResolution.x / max(uResolution.y, 1.0);

    vec3 rayOrigin = vec3(0.0, 0.0, 2.55);
    rayOrigin.xy += uPointer * 0.055 * uMotion;
    vec3 rayDirection = normalize(vec3(centered, -1.72));
    vec3 hitPoint = vec3(0.0);
    float distanceToHit = rayMarch(rayOrigin, rayDirection, hitPoint);

    if (distanceToHit < 0.0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 normal = calculateNormal(hitPoint);
    vec3 viewDirection = normalize(rayOrigin - hitPoint);
    vec3 lightDirection = normalize(vec3(-0.35 + uPointer.x * 0.2, 0.72, 0.58));
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.2);
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float specular = pow(max(dot(reflect(-lightDirection, normal), -viewDirection), 0.0), 42.0);
    float refractionBand = sin((hitPoint.x + hitPoint.y - hitPoint.z) * 8.0 + uTime * 0.34) * 0.5 + 0.5;

    vec3 cream = vec3(0.961, 0.945, 0.922);
    vec3 sage = vec3(0.659, 0.698, 0.631);
    vec3 terracotta = vec3(0.651, 0.427, 0.337);
    vec3 graphite = vec3(0.161, 0.173, 0.153);
    vec3 color = mix(cream, sage, 0.28 + refractionBand * 0.4);
    color = mix(color, terracotta, fresnel * 0.42);
    color += cream * specular * 1.4;
    color = mix(color, graphite, (1.0 - diffuse) * 0.12);

    float edge = smoothstep(0.02, 0.74, fresnel);
    float grain = hash21(gl_FragCoord.xy + fract(uTime) * 71.0) - 0.5;
    color += grain * 0.014 * uMotion;
    float alpha = clamp(0.24 + edge * 0.72 + diffuse * 0.14, 0.18, 0.94);

    gl_FragColor = vec4(color, alpha);
  }
`;

function SdfPlane({ reducedMotion }: { reducedMotion: boolean }) {
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
      scrollTarget.current = window.scrollY / Math.max(window.innerHeight, 1);
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
    // The CSS glass form remains as a visual fallback.
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function GlassSdfOrb() {
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
    <div ref={root} className="sdf-orb">
      <span className="sdf-orb__fallback" aria-hidden="true" />
      <ShaderBoundary>
        <div className="sdf-orb__canvas" aria-hidden="true">
          <Canvas
            orthographic
            camera={{ position: [0, 0, 2], zoom: 1 }}
            dpr={[1, 1.25]}
            frameloop={reducedMotion || !active ? "demand" : "always"}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          >
            <SdfPlane reducedMotion={reducedMotion} />
          </Canvas>
        </div>
      </ShaderBoundary>
    </div>
  );
}
