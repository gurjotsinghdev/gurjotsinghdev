"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Hero field.

   A GPU particle flow: a grid of points pushed around by layered noise and
   shoved aside by the pointer. All the movement happens in the vertex shader,
   so ~14k points cost almost nothing on the main thread.

   It is decoration, so it is allowed to not exist:
     - prefers-reduced-motion      -> never starts
     - no WebGL                    -> never starts
     - tab hidden / scrolled past  -> stops rendering
   In each case the CSS gradient behind it is what you see, and nothing on the
   page depends on this file having run.
   ========================================================================== */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerStrength;
  uniform float uSize;

  varying float vGlow;

  // Cheap hash noise. Not gradient-perfect, but layered three deep it reads as
  // organic drift at a fraction of the cost of a full simplex implementation.
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    return noise(p) * 0.55 + noise(p * 2.03) * 0.28 + noise(p * 4.11) * 0.17;
  }

  void main() {
    vec3 pos = position;

    // Drift: two offset noise samples give an x/y flow that never repeats.
    float t = uTime * 0.12;
    float nx = fbm(vec3(pos.xy * 0.55, t)) - 0.5;
    float ny = fbm(vec3(pos.yx * 0.55 + 41.7, t)) - 0.5;

    pos.x += nx * 1.5;
    pos.y += ny * 1.5;
    pos.z += (fbm(vec3(pos.xy * 0.3, t * 1.4)) - 0.5) * 1.2;

    // Pointer shove, with a soft falloff so the edge of the effect is invisible.
    vec2 toPointer = pos.xy - uPointer;
    float d = length(toPointer);
    float push = smoothstep(2.6, 0.0, d) * uPointerStrength;
    pos.xy += normalize(toPointer + 0.0001) * push * 1.4;

    // Points near the pointer, and high in the flow, burn brighter.
    vGlow = clamp(push * 1.6 + (nx + ny) * 0.9 + 0.25, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (1.0 / -mv.z) * (0.6 + vGlow * 0.9);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform float uOpacity;

  varying float vGlow;

  void main() {
    // Round off the square point sprite and bin the corners.
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    if (r > 0.25) discard;

    float edge = smoothstep(0.25, 0.02, r);
    vec3 col = mix(uInk, uAccent, vGlow);

    gl_FragColor = vec4(col, edge * uOpacity * (0.35 + vGlow * 0.65));
  }
`;

export default function Field() {
  const hostRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    // Three is heavy; load it only once we know it will be used, never on the
    // server, and never before the rest of the page is interactive.
    import("three")
      .then((THREE) => {
        if (disposed) return;

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          });
        } catch {
          return; // No WebGL. The CSS backdrop stands in.
        }
        if (!renderer.getContext()) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
        camera.position.z = 7;

        // Fewer points on small screens — this is a backdrop, not a benchmark.
        const dense = window.innerWidth > 900;
        const COLS = dense ? 150 : 84;
        const ROWS = dense ? 94 : 56;
        const count = COLS * ROWS;

        const positions = new Float32Array(count * 3);
        let i = 0;
        for (let y = 0; y < ROWS; y += 1) {
          for (let x = 0; x < COLS; x += 1) {
            positions[i++] = (x / (COLS - 1) - 0.5) * 15;
            positions[i++] = (y / (ROWS - 1) - 0.5) * 9.4;
            positions[i++] = 0;
          }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const uniforms = {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(99, 99) },
          uPointerStrength: { value: 0 },
          uSize: { value: dense ? 13 : 9 },
          uInk: { value: new THREE.Color("#1d2a33") },
          uAccent: { value: new THREE.Color("#ff4a00") },
          uOpacity: { value: 0 },
        };

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        const resize = () => {
          const w = host.clientWidth;
          const h = host.clientHeight;
          if (!w || !h) return;
          // Past DPR 2 it costs a lot and shows nothing.
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(host);

        // Pointer in world units, smoothed so the shove feels weighted.
        const target = { x: 99, y: 99, s: 0 };
        const current = { x: 99, y: 99, s: 0 };

        const onMove = (e) => {
          const r = host.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
          const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
          target.x = nx * 7.5;
          target.y = ny * 4.7;
          target.s = 1;
        };
        const onLeave = () => {
          target.s = 0;
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave);

        // Stop drawing when it cannot be seen.
        let visible = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0 }
        );
        io.observe(host);

        const onVis = () => {
          visible = !document.hidden;
        };
        document.addEventListener("visibilitychange", onVis);

        setOn(true);

        let raf;
        const clock = new THREE.Clock();

        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!visible) return;

          uniforms.uTime.value = clock.getElapsedTime();

          current.x += (target.x - current.x) * 0.08;
          current.y += (target.y - current.y) * 0.08;
          current.s += (target.s - current.s) * 0.06;
          uniforms.uPointer.value.set(current.x, current.y);
          uniforms.uPointerStrength.value = current.s;

          // Fade up rather than pop in.
          uniforms.uOpacity.value = Math.min(uniforms.uOpacity.value + 0.012, 1);

          renderer.render(scene, camera);
        };
        frame();

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          window.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* Chunk failed to load. The gradient backdrop is the fallback. */
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className={`field${on ? " is-on" : ""}`} aria-hidden="true" />;
}
