"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Globe.

   A real-looking Earth: blue oceans that catch a specular highlight, painted
   continents, a drifting cloud layer, and an atmospheric rim. It spins on its
   own and you can grab it and throw it.

   Every texture is painted into a canvas at runtime from a lat/lon landmass
   description — there is no image to download, nothing to licence, and the
   whole thing weighs nothing. It is a believable Earth rather than a survey-
   accurate one.

   Decoration, so it is allowed to not exist:
     - prefers-reduced-motion      -> renders one static frame, no spin
     - no WebGL                    -> never starts, CSS gradient stands in
     - tab hidden / scrolled past  -> stops rendering
   ========================================================================== */

/** Rough continent blobs: [lat, lon, latRadius, lonRadius]. */
const LAND = [
  [58, -100, 20, 33], [46, -100, 15, 26], [34, -96, 11, 17], // North America
  [66, -140, 9, 20],                                          // Alaska
  [17, -90, 7, 9], [9, -80, 5, 6],                            // Central America
  [72, -42, 13, 21],                                          // Greenland
  [2, -60, 14, 15], [-14, -55, 14, 14], [-32, -63, 12, 9],    // South America
  [-45, -70, 9, 5],
  [52, 16, 12, 24], [61, 30, 10, 24], [44, 10, 7, 14],        // Europe
  [28, 12, 16, 22], [10, 15, 14, 20], [-8, 22, 14, 16],       // Africa
  [-26, 25, 10, 13], [8, 40, 10, 10],
  [28, 45, 11, 15], [38, 58, 12, 22],                         // Middle East / Central Asia
  [55, 85, 18, 42], [45, 105, 14, 30], [62, 130, 12, 30],     // Asia
  [24, 79, 12, 11], [15, 100, 10, 10],                        // India / SE Asia
  [-2, 115, 5, 14], [-6, 140, 6, 12],                         // Indonesia / New Guinea
  [-25, 134, 12, 20],                                          // Australia
  [-42, 172, 6, 5],                                            // New Zealand
];

/* --- tiny value noise, used to rough up coastlines and paint clouds ------ */
function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return (
    hash2(xi, yi) * (1 - u) * (1 - v) +
    hash2(xi + 1, yi) * u * (1 - v) +
    hash2(xi, yi + 1) * (1 - u) * v +
    hash2(xi + 1, yi + 1) * u * v
  );
}
function fbm(x, y) {
  return vnoise(x, y) * 0.5 + vnoise(x * 2.1, y * 2.1) * 0.28 + vnoise(x * 4.3, y * 4.3) * 0.22;
}

/**
 * How far inside land this coordinate is: >0 land, <=0 ocean.
 * Noise is added to the test so coastlines are ragged, not elliptical.
 */
function landField(lat, lon) {
  let best = -1;
  for (let i = 0; i < LAND.length; i += 1) {
    const [cLat, cLon, rLat, rLon] = LAND[i];
    let dLon = lon - cLon;
    while (dLon > 180) dLon -= 360;
    while (dLon < -180) dLon += 360;
    const a = (lat - cLat) / rLat;
    const b = dLon / rLon;
    const v = 1 - Math.sqrt(a * a + b * b);
    if (v > best) best = v;
  }
  const wobble = (fbm(lon * 0.08, lat * 0.08) - 0.5) * 0.55;
  return best + wobble;
}

/** Equirectangular Earth: colour map plus a specular mask in one pass. */
function paintEarth(W = 1024, H = 512) {
  const map = document.createElement("canvas");
  map.width = W; map.height = H;
  const mctx = map.getContext("2d");
  const mimg = mctx.createImageData(W, H);

  const spec = document.createElement("canvas");
  spec.width = W; spec.height = H;
  const sctx = spec.getContext("2d");
  const simg = sctx.createImageData(W, H);

  for (let y = 0; y < H; y += 1) {
    const lat = 90 - (y / H) * 180;
    for (let x = 0; x < W; x += 1) {
      const lon = (x / W) * 360 - 180;
      const i = (y * W + x) * 4;

      const f = landField(lat, lon);
      const absLat = Math.abs(lat);
      let r, g, b, s;

      if (f > 0) {
        // Land. Colour by latitude band, then break it up with noise.
        const n = fbm(lon * 0.35, lat * 0.35);
        if (absLat > 68) {
          r = 232; g = 236; b = 240;                    // ice
        } else if (absLat > 55) {
          r = 108 + n * 34; g = 122 + n * 30; b = 92;   // taiga
        } else if (absLat > 33) {
          r = 118 + n * 40; g = 128 + n * 34; b = 76;   // temperate
        } else if (absLat > 20) {
          r = 176 + n * 44; g = 152 + n * 34; b = 96;   // arid
        } else {
          r = 78 + n * 44; g = 122 + n * 40; b = 62;    // tropical
        }
        // Darken just inside the coast so edges read as shoreline.
        const edge = Math.min(1, f * 7);
        r *= 0.72 + edge * 0.28; g *= 0.72 + edge * 0.28; b *= 0.72 + edge * 0.28;
        s = 12; // land barely reflects
      } else {
        // Ocean. Shallower and lighter near the coast, deep navy far out.
        const depth = Math.min(1, -f * 2.2);
        r = 18 + (1 - depth) * 32;
        g = 62 + (1 - depth) * 70;
        b = 122 + (1 - depth) * 78;
        if (absLat > 74) { r += 90; g += 90; b += 70; } // pack ice
        s = 230; // water is the shiny part
      }

      mimg.data[i] = r; mimg.data[i + 1] = g; mimg.data[i + 2] = b; mimg.data[i + 3] = 255;
      simg.data[i] = s; simg.data[i + 1] = s; simg.data[i + 2] = s; simg.data[i + 3] = 255;
    }
  }

  mctx.putImageData(mimg, 0, 0);
  sctx.putImageData(simg, 0, 0);
  return { map, spec };
}

/** Cloud layer: white wisps on transparent, stretched toward the equator. */
function paintClouds(W = 1024, H = 512) {
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(W, H);

  for (let y = 0; y < H; y += 1) {
    const lat = 90 - (y / H) * 180;
    // Bands: thin at the poles and over the horse latitudes.
    const band = 0.5 + 0.5 * Math.cos((lat / 90) * Math.PI * 2.2);
    for (let x = 0; x < W; x += 1) {
      const i = (y * W + x) * 4;
      const n = fbm(x * 0.016, y * 0.03) * 0.6 + fbm(x * 0.05, y * 0.09) * 0.4;
      const a = Math.max(0, n * band - 0.34) * 3.1;
      img.data[i] = 255; img.data[i + 1] = 255; img.data[i + 2] = 255;
      img.data[i + 3] = Math.min(215, a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

const ATMO_VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vV;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - w.xyz);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const ATMO_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor; uniform float uOpacity; uniform float uBoost;
  varying vec3 vN; varying vec3 vV;
  void main() {
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), 3.2);
    gl_FragColor = vec4(uColor, f * (0.62 + uBoost * 0.5) * uOpacity);
  }
`;

export default function Globe() {
  const hostRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
        camera.position.z = 6.6;

        const wide = window.innerWidth > 900;
        const R = 2.0;
        const RES = wide ? 1024 : 512;

        const { map, spec } = paintEarth(RES, RES / 2);
        const clouds = paintClouds(RES, RES / 2);

        const mapTex = new THREE.CanvasTexture(map);
        const specTex = new THREE.CanvasTexture(spec);
        const cloudTex = new THREE.CanvasTexture(clouds);
        for (const t of [mapTex, specTex, cloudTex]) {
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          t.wrapS = THREE.RepeatWrapping;
        }

        // ---- the planet -------------------------------------------------
        const earthGeo = new THREE.SphereGeometry(R, 96, 96);
        const earthMat = new THREE.MeshPhongMaterial({
          map: mapTex,
          specularMap: specTex,
          specular: new THREE.Color(0x6f9fd8),
          shininess: 22,
        });
        const earth = new THREE.Mesh(earthGeo, earthMat);

        // ---- clouds -----------------------------------------------------
        const cloudGeo = new THREE.SphereGeometry(R * 1.012, 64, 64);
        const cloudMat = new THREE.MeshPhongMaterial({
          map: cloudTex,
          transparent: true,
          opacity: 0.42,
          depthWrite: false,
        });
        const cloud = new THREE.Mesh(cloudGeo, cloudMat);

        // ---- atmosphere -------------------------------------------------
        const atmoUniforms = {
          uColor: { value: new THREE.Color("#5aa9ff") },
          uOpacity: { value: 0 },
          uBoost: { value: 0 },
        };
        const atmo = new THREE.Mesh(
          new THREE.SphereGeometry(R * 1.16, 48, 48),
          new THREE.ShaderMaterial({
            uniforms: atmoUniforms,
            vertexShader: ATMO_VERT,
            fragmentShader: ATMO_FRAG,
            transparent: true,
            side: THREE.BackSide,
            depthWrite: false,
          })
        );

        // Axial tilt lives on a parent so drag can spin the planet inside it.
        const tilt = new THREE.Group();
        tilt.rotation.z = (-23.4 * Math.PI) / 180;
        tilt.add(earth, cloud);
        scene.add(tilt, atmo);

        // ---- light ------------------------------------------------------
        const sun = new THREE.DirectionalLight(0xfff2e0, 2.6);
        sun.position.set(-4, 2.2, 3.4);
        scene.add(sun, new THREE.AmbientLight(0x4b6478, 0.85));

        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);

        const resize = () => {
          const w = host.clientWidth, h = host.clientHeight;
          if (!w || !h) return;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        // ---- drag to spin, with throw ------------------------------------
        const AUTO = 0.055;                 // idle spin, radians/sec
        let spinY = 0, spinX = 0;           // current rotation
        let velY = AUTO, velX = 0;          // radians/sec
        let dragging = false, lastX = 0, lastY = 0, moved = false;
        let hover = 0, hoverTarget = 0;

        const el = renderer.domElement;
        el.style.touchAction = "pan-y"; // let the page still scroll vertically

        const down = (e) => {
          dragging = true;
          moved = false;
          lastX = e.clientX;
          lastY = e.clientY;
          el.setPointerCapture?.(e.pointerId);
          el.style.cursor = "grabbing";
        };

        const move = (e) => {
          hoverTarget = 1;
          if (!dragging) return;
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
          if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;

          spinY += dx * 0.006;
          // Clamp the pitch so it can never tumble past the poles.
          spinX = Math.max(-0.9, Math.min(0.9, spinX + dy * 0.005));

          // Momentum for the throw, in radians/sec.
          velY = dx * 0.35;
          velX = dy * 0.28;
        };

        const up = (e) => {
          dragging = false;
          el.releasePointerCapture?.(e.pointerId);
          el.style.cursor = "grab";
        };

        const leave = () => { hoverTarget = 0; };

        el.style.cursor = "grab";
        el.addEventListener("pointerdown", down);
        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerup", up);
        el.addEventListener("pointerleave", leave);

        let visible = true;
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
        io.observe(host);
        const onVis = () => { visible = !document.hidden; };
        document.addEventListener("visibilitychange", onVis);

        setOn(true);

        // Reduced motion: paint one frame, then stop. Still draggable.
        if (reduce) {
          atmoUniforms.uOpacity.value = 1;
          earth.rotation.y = 0.6;
          cloud.rotation.y = 0.6;
          renderer.render(scene, camera);
        }

        let raf;
        let prev = performance.now();

        const frame = (now) => {
          raf = requestAnimationFrame(frame);
          if (!visible) { prev = now; return; }

          const dt = Math.min((now - prev) / 1000, 0.05);
          prev = now;

          if (!dragging) {
            // Decay the throw, then settle back to the idle spin.
            velY += (AUTO - velY) * (1 - Math.pow(0.06, dt));
            velX += (0 - velX) * (1 - Math.pow(0.02, dt));
            spinY += velY * dt;
            spinX = Math.max(-0.9, Math.min(0.9, spinX + velX * dt));
            spinX += (0 - spinX) * (1 - Math.pow(0.55, dt)); // drift level again
          }

          earth.rotation.y = spinY;
          // Clouds run slightly ahead, which is what makes them read as separate.
          cloud.rotation.y = spinY * 1.06 + 0.15;
          tilt.rotation.x = spinX;
          atmo.rotation.x = spinX;

          hover += (hoverTarget - hover) * (1 - Math.pow(0.02, dt));
          atmoUniforms.uBoost.value = hover;
          atmoUniforms.uOpacity.value = Math.min(atmoUniforms.uOpacity.value + dt * 0.9, 1);

          renderer.render(scene, camera);
        };

        if (!reduce) frame(performance.now());

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          el.removeEventListener("pointerdown", down);
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          el.removeEventListener("pointerleave", leave);
          earthGeo.dispose(); cloudGeo.dispose(); atmo.geometry.dispose();
          earthMat.dispose(); cloudMat.dispose(); atmo.material.dispose();
          mapTex.dispose(); specTex.dispose(); cloudTex.dispose();
          renderer.dispose();
          el.remove();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`globe${on ? " is-on" : ""}`}
      role="img"
      aria-label="An interactive globe. Decorative — drag to spin it."
    />
  );
}
