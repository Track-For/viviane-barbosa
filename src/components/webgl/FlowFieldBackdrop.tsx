"use client";

import { Canvas } from "@react-three/fiber";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LiquidPlane } from "./LiquidPlane";

export default function FlowFieldBackdrop() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flow-field" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 2], zoom: 1 }}
        dpr={[1, 1.25]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <LiquidPlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
