"use client";

import { useEffect, useRef, type RefObject } from "react";

export type CardRiseMotion = {
  cards: Array<{ y: number; angle: number; scale: number; alpha: number; progress: number }>;
  draw?: () => void;
};

const vertexSource = `
  precision mediump float;
  attribute vec2 aPosition;
  uniform vec2 uViewport;
  uniform vec4 uRect;
  uniform vec4 uMotion;
  varying vec2 vUv;
  void main() {
    vUv = aPosition + 0.5;
    vec2 local = aPosition * uRect.zw * uMotion.z;
    float c = cos(uMotion.y);
    float s = sin(uMotion.y);
    vec2 pixel = vec2(c * local.x - s * local.y, s * local.x + c * local.y);
    pixel += uRect.xy + vec2(0.0, uMotion.x * uViewport.y);
    gl_Position = vec4(pixel.x / uViewport.x * 2.0 - 1.0, 1.0 - pixel.y / uViewport.y * 2.0, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform vec4 uRect;
  uniform vec4 uMotion;
  uniform float uProgress;
  uniform float uIndex;
  uniform vec2 uPointer;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 size = uRect.zw;
    float radius = 22.0;
    vec2 q = abs((vUv - 0.5) * size) - size * 0.5 + radius;
    float edge = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    float mask = 1.0 - smoothstep(-1.0, 0.8, edge);
    float energy = sin(uProgress * 3.14159);
    float phase = uProgress * 5.0 + uIndex * 1.7;
    vec2 uv = vUv;
    uv.x += sin(uv.y * 7.0 + phase) * 0.09 * energy;
    float wave = sin(uv.x * 5.0 + uv.y * 3.0 - phase);
    float glow = exp(-abs(uv.x - uv.y * 0.6 - uProgress * 1.5 + 0.5) * 9.0);
    vec3 cream = vec3(0.965, 0.949, 0.919);
    vec3 sage = vec3(0.66, 0.72, 0.63);
    vec3 clay = vec3(0.73, 0.48, 0.37);
    vec3 color = mix(cream, sage, (wave * 0.5 + 0.5) * (0.13 + energy * 0.22));
    color = mix(color, clay, glow * (0.06 + energy * 0.24));
    color += glow * energy * 0.12;
    // A curved coated surface reflecting a broad studio light and a narrow strip light.
    vec2 aspect = vec2(size.x / size.y, 1.0);
    vec2 delta = (vUv - uPointer) * aspect;
    vec3 normal = normalize(vec3((vUv - 0.5) * 0.55, 1.0));
    vec3 light = normalize(vec3((uPointer - 0.5) * 1.8, 1.2));
    vec3 halfVector = normalize(light + vec3(0.0, 0.0, 1.0));
    float specular = pow(max(dot(normal, halfVector), 0.0), 48.0);
    float strip = exp(-pow((delta.x + delta.y * 0.48) * 9.0, 2.0));
    float bloom = exp(-dot(delta, delta) * 5.0);
    float rim = smoothstep(-7.0, -1.0, edge);
    float sweepPosition = 0.5 + sin(uTime * 0.65 + uIndex * 0.8) * 0.85;
    float sweepDistance = vUv.x + vUv.y * 0.35 - sweepPosition;
    float sweep = exp(-pow(sweepDistance * 8.0, 2.0));
    float shoulder = exp(-pow((sweepDistance - 0.16) * 6.0, 2.0));
    color *= 1.0 - shoulder * 0.14;
    float reflection = clamp(sweep * 0.65 + (specular * 0.24 + strip * 0.45 + bloom * 0.15) * (0.4 + uHover * 0.6), 0.0, 0.9);
    color = mix(color, vec3(1.0, 0.99, 0.96), reflection);
    color += rim * (0.05 + bloom * 0.12);
    float grain = fract(sin(dot(vUv * size, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.012;
    gl_FragColor = vec4(color, mask * uMotion.w);
  }
`;

// One context for all cards. The light sweep runs only while the stage is visible.
export default function CardRiseShader({ stage, motion }: {
  stage: RefObject<HTMLDivElement | null>;
  motion: RefObject<CardRiseMotion>;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = canvas.current;
    const host = stage.current;
    if (!surface || !host) return;
    const gl = surface.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
      console.warn("Card shader compilation failed:", gl.getShaderInfoLog(shader));
      return null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      shaders.forEach((shader) => gl.deleteShader(shader));
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Card shader linking failed:", gl.getProgramInfoLog(program));
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      return;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-.5, -.5, .5, -.5, -.5, .5, -.5, .5, .5, -.5, .5, .5]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(
      ["uViewport", "uRect", "uMotion", "uProgress", "uIndex", "uPointer", "uHover", "uTime"].map((key) => [key, gl.getUniformLocation(program, key)]),
    );
    const cards = Array.from(host.querySelectorAll<HTMLElement>(".story-card"));
    const deck = host.querySelector<HTMLElement>(".story-deck");
    let rects: number[][] = [];
    let width = 1;
    let height = 1;
    let lost = false;
    let pointer: { x: number; y: number } | null = null;
    const draw = () => {
      if (lost || document.hidden) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.uViewport, width, height);
      gl.uniform1f(uniforms.uTime, performance.now() / 1000 % 1000);
      rects.forEach((rect, index) => {
        const card = motion.current.cards[index];
        if (!card || card.alpha <= 0) return;
        gl.uniform4f(uniforms.uRect, rect[0], rect[1], rect[2], rect[3]);
        gl.uniform4f(uniforms.uMotion, card.y, card.angle * Math.PI / 180, card.scale, card.alpha);
        gl.uniform1f(uniforms.uProgress, card.progress);
        gl.uniform1f(uniforms.uIndex, index);
        const angle = card.angle * Math.PI / 180;
        const dx = pointer ? pointer.x - rect[0] : 0;
        const dy = pointer ? pointer.y - rect[1] - card.y * height : 0;
        const px = (Math.cos(angle) * dx + Math.sin(angle) * dy) / (rect[2] * card.scale) + 0.5;
        const py = (-Math.sin(angle) * dx + Math.cos(angle) * dy) / (rect[3] * card.scale) + 0.5;
        gl.uniform2f(uniforms.uPointer, pointer ? px : 0.25 + card.progress * 0.5, pointer ? py : 0.25);
        gl.uniform1f(uniforms.uHover, pointer && px >= 0 && px <= 1 && py >= 0 && py <= 1 ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      });
      host.dataset.cardShader = "ready";
    };
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      gl.viewport(0, 0, surface.width, surface.height);
      rects = cards.map((card) => [
        (deck?.offsetLeft ?? 0) + card.offsetLeft + card.offsetWidth / 2,
        (deck?.offsetTop ?? 0) + card.offsetTop + card.offsetHeight / 2,
        card.offsetWidth, card.offsetHeight,
      ]);
      draw();
    };
    const handleLoss = () => {
      lost = true;
      cancelAnimationFrame(frame);
      delete host.dataset.cardShader;
    };
    surface.addEventListener("webglcontextlost", handleLoss);
    const handlePointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      draw();
    };
    const leavePointer = () => { pointer = null; draw(); };
    host.addEventListener("pointermove", handlePointer, { passive: true });
    host.addEventListener("pointerleave", leavePointer);
    let frame = 0;
    let visible = false;
    let lastFrame = 0;
    const tick = (time: number) => {
      if (!visible || lost || document.hidden) { frame = 0; return; }
      if (time - lastFrame >= 1000 / 30) { draw(); lastFrame = time; }
      frame = requestAnimationFrame(tick);
    };
    const syncVisibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !lost && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncVisibility();
    });
    visibilityObserver.observe(host);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    cards.forEach((card) => observer.observe(card));
    motion.current.draw = draw;
    resize();
    const state = motion.current;
    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", handlePointer);
      host.removeEventListener("pointerleave", leavePointer);
      surface.removeEventListener("webglcontextlost", handleLoss);
      document.removeEventListener("visibilitychange", syncVisibility);
      if (state.draw === draw) delete state.draw;
      delete host.dataset.cardShader;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
  }, [motion, stage]);

  return <canvas ref={canvas} className="story-card-shader" aria-hidden="true" />;
}
