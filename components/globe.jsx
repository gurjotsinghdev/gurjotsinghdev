"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Globe.

   A dot-matrix Earth: points spread evenly over a sphere, kept dense and warm
   where there is land and sparse and cold over ocean, wrapped in an atmosphere
   rim. It sits in its own column to the right of the copy so it never competes
   with the headline for the same pixels.

   The landmass is generated from a handful of lat/lon ellipses rather than a
   texture — no image to download, no licence to worry about, and it stays
   crisp at any size. It is a recognisable Earth, not a survey map.

   Decoration, so it is allowed to not exist:
     - prefers-reduced-motion      -> never starts
     - no WebGL                    -> never starts
     - tab hidden / scrolled past  -> stops rendering
   ========================================================================== */

/** Rough continent blobs: [latitude, longitude, latRadius, lonRadius]. */
const LAND = [
  [55, -105, 26, 34], // North America
  [40, -100, 16, 24],
  [30, -100, 11, 15],
  [15, -88, 8, 9],    // Central America
  [72, -42, 12, 20],  // Greenland
  [-8, -58, 24, 16],  // South America
  [-30, -63, 12, 8],
  [52, 18, 14, 26],   // Europe
  [60, 30, 10, 22],
  [8, 20, 22, 20],    // Africa
  [-18, 25, 16, 14],
  [30, 45, 12, 14],   // Middle East
  [52, 90, 22, 45],   // Asia
  [40, 105, 16, 30],
  [22, 79, 12, 11],   // India
  [8, 108, 9, 14],    // South-east Asia
  [-25, 134, 12, 20], // Australia
  [-42, 172, 6, 6],   // New Zealand
];

/** Is this lat/lon over land? */
function isLand(lat, lon) {
  if (lat < -62) return true; // Antarctica, as a band
  for (const [cLat, cLon, rLat, rLon] of LAND) {
    let dLon = lon - cLon;
    // Shortest way round the sphere.
    while (dLon > 180) dLon -= 360;
    while (dLon < -180) dLon += 360;
    const a = (lat - cLat) / rLat;
    const b = dLon / rLon;
    if (a * a + b * b <= 1) return true;
  }
  return false;
}

const DOT_VERT = /* glsl */ `
  uniform float uSize;
  attribute float aLand;
  varying float vLand;
  varying float vDepth;

  void main() {
    vLand = aLand;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Points on the far side fade, which is what makes it read as a sphere
    // rather than a disc.
    vDepth = smoothstep(-2.2, 1.6, mv.z);
    gl_PointSize = uSize * (aLand > 0.5 ? 1.0 : 0.62) * (0.45 + vDepth * 0.85);
    gl_Position = projectionMatrix * mv;
  }
`;

const DOT_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uAccent;
  uniform vec3 uSea;
  uniform float uOpacity;
  varying float vLand;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    float edge = smoothstep(0.25, 0.03, dot(c, c));
    vec3 col = mix(uSea, uAccent, vLand);
    float a = edge * uOpacity * (vLand > 0.5 ? 0.16 + vDepth * 0.84 : 0.06 + vDepth * 0.34);
    gl_FragColor = vec4(col, a);
  }
`;

const ATMO_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const ATMO_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    // Rim only: bright where the surface turns away from the camera.
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), 3.0);
    gl_FragColor = vec4(uAccent, f * 0.55 * uOpacity);
  }
`;

export default function Globe() {
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
          return;
        }
        if (!renderer.getContext()) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.z = 6.4;

        const wide = window.innerWidth > 900;
        const R = 2.0;

        // ---- dots ------------------------------------------------------
        const COUNT = wide ? 14000 : 5200;
        const pos = new Float32Array(COUNT * 3);
        const land = new Float32Array(COUNT);

        // Fibonacci sphere: even coverage, no clumping at the poles.
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < COUNT; i += 1) {
          const y = 1 - (i / (COUNT - 1)) * 2;
          const r = Math.sqrt(Math.max(0, 1 - y * y));
          const th = golden * i;
          const x = Math.cos(th) * r;
          const z = Math.sin(th) * r;

          pos[i * 3] = x * R;
          pos[i * 3 + 1] = y * R;
          pos[i * 3 + 2] = z * R;

          const lat = Math.asin(y) * (180 / Math.PI);
          const lon = Math.atan2(z, x) * (180 / Math.PI);
          land[i] = isLand(lat, lon) ? 1 : 0;
        }

        const dotGeo = new THREE.BufferGeometry();
        dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        dotGeo.setAttribute("aLand", new THREE.BufferAttribute(land, 1));

        const dotMat = new THREE.ShaderMaterial({
          uniforms: {
            uSize: { value: wide ? 7.5 : 5.5 },
            uOpacity: { value: 0 },
            uAccent: { value: new THREE.Color("#ff4a00") },
            uSea: { value: new THREE.Color("#5b6873") },
          },
          vertexShader: DOT_VERT,
          fragmentShader: DOT_FRAG,
          transparent: true,
          depthWrite: false,
        });

        const dots = new THREE.Points(dotGeo, dotMat);

        // ---- atmosphere -------------------------------------------------
        const atmoGeo = new THREE.SphereGeometry(R * 1.11, 48, 48);
        const atmoMat = new THREE.ShaderMaterial({
          uniforms: { uAccent: { value: new THREE.Color("#ff6b2d") }, uOpacity: { value: 0 } },
          vertexShader: ATMO_VERT,
          fragmentShader: ATMO_FRAG,
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
        });
        const atmo = new THREE.Mesh(atmoGeo, atmoMat);

        // Axial tilt, so it sits like a planet and not a beach ball.
        const world = new THREE.Group();
        world.rotation.z = (-23.4 * Math.PI) / 180;
        world.add(dots);
        scene.add(world);
        scene.add(atmo);

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

        // Pointer nudges the tilt; it never takes control.
        const target = { x: 0, y: 0 };
        const cur = { x: 0, y: 0 };
        const onMove = (e) => {
          target.x = (e.clientX / window.innerWidth) * 2 - 1;
          target.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

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
          cur.x += (target.x - cur.x) * 0.045;
          cur.y += (target.y - cur.y) * 0.045;

          // Steady west-to-east spin, plus a gentle lean toward the pointer.
          dots.rotation.y = t * 0.11;
          world.rotation.x = cur.y * 0.22;
          world.rotation.y = cur.x * 0.20;
          atmo.rotation.set(world.rotation.x, world.rotation.y, 0);

          const o = Math.min(dotMat.uniforms.uOpacity.value + 0.012, 1);
          dotMat.uniforms.uOpacity.value = o;
          atmoMat.uniforms.uOpacity.value = o;

          renderer.render(scene, camera);
        };
        frame();

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          window.removeEventListener("pointermove", onMove);
          dotGeo.dispose(); atmoGeo.dispose();
          dotMat.dispose(); atmoMat.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className={`globe${on ? " is-on" : ""}`} aria-hidden="true" />;
}
