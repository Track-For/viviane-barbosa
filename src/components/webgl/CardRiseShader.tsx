"use client";

import { useEffect, useRef, type RefObject } from "react";

export type CardRiseMotion = {
  cards: Array<{ y: number; angle: number; scale: number; alpha: number; progress: number }>;
  draw?: () => void;
};

const vertexSource = `
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
    float grain = fract(sin(dot(vUv * size, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.012;
    gl_FragColor = vec4(color, mask * uMotion.w);
  }
`;

// One context for all three cards. Rendering is driven by scroll, never an idle RAF loop.
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
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
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
      ["uViewport", "uRect", "uMotion", "uProgress", "uIndex"].map((key) => [key, gl.getUniformLocation(program, key)]),
    );
    const cards = Array.from(host.querySelectorAll<HTMLElement>(".story-card"));
    const deck = host.querySelector<HTMLElement>(".story-deck");
    let rects: number[][] = [];
    let width = 1;
    let height = 1;
    let lost = false;
    const draw = () => {
      if (lost || document.hidden) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.uViewport, width, height);
      rects.forEach((rect, index) => {
        const card = motion.current.cards[index];
        if (!card || card.alpha <= 0) return;
        gl.uniform4f(uniforms.uRect, rect[0], rect[1], rect[2], rect[3]);
        gl.uniform4f(uniforms.uMotion, card.y, card.angle * Math.PI / 180, card.scale, card.alpha);
        gl.uniform1f(uniforms.uProgress, card.progress);
        gl.uniform1f(uniforms.uIndex, index);
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
      delete host.dataset.cardShader;
    };
    surface.addEventListener("webglcontextlost", handleLoss);
    document.addEventListener("visibilitychange", draw);
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    cards.forEach((card) => observer.observe(card));
    motion.current.draw = draw;
    resize();
    const state = motion.current;
    return () => {
      observer.disconnect();
      surface.removeEventListener("webglcontextlost", handleLoss);
      document.removeEventListener("visibilitychange", draw);
      if (state.draw === draw) delete state.draw;
      delete host.dataset.cardShader;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
  }, [motion, stage]);

  return <canvas ref={canvas} className="story-card-shader" aria-hidden="true" />;
}
