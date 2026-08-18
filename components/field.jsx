"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Hero object.

   A displaced icosphere with a fresnel rim, a wireframe shell around it, and a
   depth-sorted particle cloud behind — all driven in shaders, all reacting to
   the pointer. The rotation plus the parallax of the cloud is what sells the
   depth; a flat sheet of points never reads as 3D no matter how it moves.

   It is decoration, so it is allowed to not exist:
     - prefers-reduced-motion      -> never starts
     - no WebGL                    -> never starts
     - tab hidden / scrolled past  -> stops rendering
   In each case the CSS gradient behind it is what you see, and nothing on the
   page depends on this file having run.
   ========================================================================== */

/* Shared noise. Cheap hash-based value noise, layered — a full simplex costs
   more than this look is worth. */
const NOISE = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z);
  }

  float fbm(vec3 p) {
    return vnoise(p) * 0.55 + vnoise(p * 2.03) * 0.28 + vnoise(p * 4.11) * 0.17;
  }
`;

const CORE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPointer;
  uniform float uAmp;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vRidge;

  ${NOISE}

  void main() {
    // Two noise fields at different speeds keep the silhouette from ever
    // settling into a shape you can predict.
    float t = uTime * 0.22;
    float n1 = fbm(normal * 1.35 + vec3(0.0, 0.0, t));
    float n2 = fbm(normal * 3.10 - vec3(t * 0.7, 0.0, 0.0));

    float disp = (n1 - 0.5) * 0.62 + (n2 - 0.5) * 0.22;
    disp *= uAmp * (1.0 + uPointer * 0.55);

    vec3 pos = position + normal * disp;

    // Re-derive a usable normal from the displacement gradient so the lighting
    // follows the bumps instead of the original sphere.
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0) + 0.001));
    vec3 bitan = normalize(cross(normal, tangent));
    float e = 0.06;
    float dT = fbm((normal + tangent * e) * 1.35 + vec3(0.0, 0.0, t)) - n1;
    float dB = fbm((normal + bitan * e) * 1.35 + vec3(0.0, 0.0, t)) - n1;
    vec3 bumped = normalize(normal - (tangent * dT + bitan * dB) * 2.4);

    vRidge = smoothstep(0.42, 0.62, n1);

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * bumped);
    vViewDir = normalize(cameraPosition - world.xyz);

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const CORE_FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform vec3 uPaper;
  uniform float uOpacity;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vRidge;

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(vViewDir);

    // Fresnel: the edge facing away from the camera catches the accent.
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4);

    // One key light, warm, from the upper left.
    float key = clamp(dot(N, normalize(vec3(-0.5, 0.75, 0.55))), 0.0, 1.0);

    vec3 col = mix(uInk, uInk * 2.1, key);
    col = mix(col, uAccent, fres * 0.95);
    col += uPaper * pow(key, 7.0) * 0.28;          // specular pop
    col = mix(col, uAccent * 1.15, vRidge * 0.16); // ridges catch colour

    gl_FragColor = vec4(col, uOpacity);
  }
`;

const SHELL_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  ${NOISE}
  void main() {
    float t = uTime * 0.22;
    float n1 = fbm(normal * 1.35 + vec3(0.0, 0.0, t));
    // Sits just outside the core so it reads as a cage, never as z-fighting.
    vec3 pos = position + normal * ((n1 - 0.5) * 0.62 * uAmp + 0.085);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SHELL_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uAccent;
  uniform float uOpacity;
  void main() { gl_FragColor = vec4(uAccent, 0.14 * uOpacity); }
`;

const DUST_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSeed;
  varying float vFade;

  void main() {
    vec3 p = position;
    // Slow vertical drift, wrapped, so the cloud never empties out.
    p.y = mod(p.y + uTime * 0.28 * (0.4 + aSeed * 0.8) + 9.0, 18.0) - 9.0;
    p.x += sin(uTime * 0.3 + aSeed * 30.0) * 0.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // Nearer motes are bigger and brighter — that gradient is the depth cue.
    float depth = clamp((mv.z + 16.0) / 16.0, 0.0, 1.0);
    vFade = depth * (0.35 + aSeed * 0.65);
    gl_PointSize = uSize * depth * (0.5 + aSeed);
    gl_Position = projectionMatrix * mv;
  }
`;

const DUST_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uAccent;
  uniform vec3 uInk;
  uniform float uOpacity;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    if (r > 0.25) discard;
    float edge = smoothstep(0.25, 0.0, r);
    vec3 col = mix(uInk, uAccent, vFade);
    gl_FragColor = vec4(col, edge * vFade * 0.5 * uOpacity);
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

    import("three")
      .then((THREE) => {
        if (disposed) return;

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        } catch {
          return; // No WebGL. The CSS backdrop stands in.
        }
        if (!renderer.getContext()) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
        camera.position.z = 6.2;

        const wide = window.innerWidth > 900;

        const shared = {
          uTime: { value: 0 },
          uAmp: { value: 1 },
          uOpacity: { value: 0 },
          uAccent: { value: new THREE.Color("#ff4a00") },
          uInk: { value: new THREE.Color("#141b21") },
          uPaper: { value: new THREE.Color("#f8f5f0") },
        };

        // ---- core -------------------------------------------------------
        const coreGeo = new THREE.IcosahedronGeometry(1.72, wide ? 64 : 32);
        const coreMat = new THREE.ShaderMaterial({
          uniforms: { ...shared, uPointer: { value: 0 } },
          vertexShader: CORE_VERT,
          fragmentShader: CORE_FRAG,
          transparent: true,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // ---- wireframe shell --------------------------------------------
        const shellGeo = new THREE.IcosahedronGeometry(1.72, wide ? 12 : 8);
        const shellMat = new THREE.ShaderMaterial({
          uniforms: shared,
          vertexShader: SHELL_VERT,
          fragmentShader: SHELL_FRAG,
          transparent: true,
          wireframe: true,
          depthWrite: false,
        });
        const shell = new THREE.Mesh(shellGeo, shellMat);
        scene.add(shell);

        // ---- dust -------------------------------------------------------
        const COUNT = wide ? 900 : 380;
        const dustPos = new Float32Array(COUNT * 3);
        const dustSeed = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i += 1) {
          dustPos[i * 3] = (Math.random() - 0.5) * 16;
          dustPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
          dustPos[i * 3 + 2] = -Math.random() * 14 - 1;
          dustSeed[i] = Math.random();
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
        dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
        const dustMat = new THREE.ShaderMaterial({
          uniforms: { ...shared, uSize: { value: wide ? 26 : 18 } },
          vertexShader: DUST_VERT,
          fragmentShader: DUST_FRAG,
          transparent: true,
          depthWrite: false,
        });
        scene.add(new THREE.Points(dustGeo, dustMat));

        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        const resize = () => {
          const w = host.clientWidth;
          const h = host.clientHeight;
          if (!w || !h) return;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        // Pointer drives tilt and how violently the surface churns.
        const target = { x: 0, y: 0, s: 0 };
        const cur = { x: 0, y: 0, s: 0 };

        const onMove = (e) => {
          const r = host.getBoundingClientRect();
          target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
          target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
          target.s = 1;
        };
        const onLeave = () => { target.s = 0; };

        window.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave);

        let visible = true;
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
        io.observe(host);
        const onVis = () => { visible = !document.hidden; };
        document.addEventListener("visibilitychange", onVis);

        setOn(true);

        let raf;
        const clock = new THREE.Clock();

        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!visible) return;

          const t = clock.getElapsedTime();
          shared.uTime.value = t;

          cur.x += (target.x - cur.x) * 0.06;
          cur.y += (target.y - cur.y) * 0.06;
          cur.s += (target.s - cur.s) * 0.05;
          coreMat.uniforms.uPointer.value = cur.s;

          // Constant slow spin, plus a tilt that follows the cursor.
          const rx = -cur.y * 0.42;
          const ry = t * 0.13 + cur.x * 0.55;
          core.rotation.set(rx, ry, 0);
          shell.rotation.set(rx, ry * 0.94, 0);

          shared.uOpacity.value = Math.min(shared.uOpacity.value + 0.014, 1);

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
          coreGeo.dispose(); shellGeo.dispose(); dustGeo.dispose();
          coreMat.dispose(); shellMat.dispose(); dustMat.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* Chunk failed. The gradient backdrop is the fallback. */
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className={`field${on ? " is-on" : ""}`} aria-hidden="true" />;
}
