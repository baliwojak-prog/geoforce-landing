"use client";

import { useRef, useEffect, useCallback } from "react";

/* ============================================================
   1. MAGMA FLOW — Full-screen fragment shader simulating
      flowing volcanic magma with fractal noise distortion
   ============================================================ */
function MagmaFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.5,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const vs = `attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}`;
    const fs = `
      precision highp float;
      uniform float t;
      uniform vec2 r;
      uniform vec3 mouse; // x, y (0-1), z = active

      vec3 hash(vec3 p){
        p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));
        return -1.0+2.0*fract(sin(p)*43758.5453123);
      }
      float noise(vec3 p){
        vec3 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
        return mix(mix(mix(dot(hash(i),f),dot(hash(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
          mix(dot(hash(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
          mix(mix(dot(hash(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
          mix(dot(hash(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
      }
      float fbm(vec3 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}

      void main(){
        vec2 uv=(gl_FragCoord.xy-0.5*r)/min(r.x,r.y);

        // Mouse gravity — gentle warp toward cursor
        if(mouse.z > 0.5){
          vec2 muv=(mouse.xy-0.5)*2.0;
          vec2 diff=muv-uv;
          float d=length(diff);
          float pull=smoothstep(1.5,0.0,d)*0.08;
          uv+=diff*pull;
        }

        float n=fbm(vec3(uv*3.0,t*0.15));
        float n2=fbm(vec3(uv*2.0+n*1.5,t*0.1+10.0));
        vec3 c1=vec3(0.77,0.9,0.19);  // lime
        vec3 c2=vec3(0.66,0.83,0.0);  // green
        vec3 c3=vec3(0.1,0.15,0.0);   // dark green
        vec3 col=mix(c3,c2,smoothstep(-0.3,0.3,n));
        col=mix(col,c1,smoothstep(0.2,0.8,n2));
        col+=c1*pow(max(n2,0.0),3.0)*0.5;
        gl_FragColor=vec4(col,1.0);
      }
    `;

    function compile(src: string, type: number) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const pg = gl.createProgram()!;
    gl.attachShader(pg, compile(vs, gl.VERTEX_SHADER));
    gl.attachShader(pg, compile(fs, gl.FRAGMENT_SHADER));
    gl.linkProgram(pg);
    gl.useProgram(pg);

    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(pg, "p");
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

    const tU = gl.getUniformLocation(pg, "t");
    const rU = gl.getUniformLocation(pg, "r");
    const mU = gl.getUniformLocation(pg, "mouse");
    const start = Date.now();

    function frame() {
      if (!canvas || !gl) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(tU, (Date.now() - start) / 1000);
      gl.uniform2f(rU, canvas.width, canvas.height);
      const m = mouseRef.current;
      gl.uniform3f(mU, m.x, m.y, m.active ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
}

/* ============================================================
   2. PARTICLE VORTEX — 2000 particles spiraling in a tornado
   ============================================================ */
function ParticleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = 3000;
    const particles = Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.45,
      y: Math.random(),
      speed: 0.3 + Math.random() * 1.5,
      size: 0.3 + Math.random() * 1,
      alpha: 0.3 + Math.random() * 0.7,
    }));

    function frame() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth * devicePixelRatio;
      const h = canvas.offsetHeight * devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h);

      for (const p of particles) {
        p.angle += p.speed * 0.015;
        p.y += 0.0015 * p.speed;
        if (p.y > 1.1) p.y = -0.1;

        // Tighter at top, wider at bottom — tighter vortex
        const spread = 0.03 + p.y * p.radius * 0.7;
        const x = cx + Math.cos(p.angle) * spread * scale;
        const y = cy - (p.y - 0.5) * h * 0.8;

        const fade = 1.0 - Math.abs(p.y - 0.5) * 2;
        const a = p.alpha * Math.max(fade, 0);

        ctx.beginPath();
        ctx.arc(x, y, p.size * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,229,49,${a})`;
        ctx.fill();

        // Trail
        const tx = cx + Math.cos(p.angle - 0.15) * spread * scale;
        const ty = y + 3;
        ctx.beginPath();
        ctx.arc(tx, ty, p.size * 0.5 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,212,0,${a * 0.3})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
}

/* ============================================================
   3. NEURAL MESH — Animated interconnected nodes with
      traveling pulses along edges
   ============================================================ */
function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const nodeCount = 90;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      size: 2 + Math.random() * 3,
      pulse: Math.random() * Math.PI * 2,
    }));

    function frame() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth * devicePixelRatio;
      const h = canvas.offsetHeight * devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, w, h);

      const t = Date.now() / 1000;
      const mouse = mouseRef.current;

      // Move nodes
      for (const n of nodes) {
        // Mouse gravity — gentle pull
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.01 && dist < 0.4) {
            const force = 0.00004 / (dist + 0.05);
            n.vx += dx * force;
            n.vy += dy * force;
          }
        }

        // Dampen velocity
        n.vx *= 0.998;
        n.vy *= 0.995;

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.x = Math.max(0, Math.min(1, n.x));
        n.y = Math.max(0, Math.min(1, n.y));
      }

      // Draw connections — doubled range
      const maxDist = 0.4;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.4;

            // Traveling pulse along edge
            const pulsePos = (Math.sin(t * 2 + i * 0.5 + j * 0.3) * 0.5 + 0.5);
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.strokeStyle = `rgba(197,229,49,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Pulse dot
            ctx.beginPath();
            ctx.arc(px * w, py * h, 2 * devicePixelRatio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(197,229,49,${alpha * 2})`;
            ctx.fill();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = Math.sin(t * 3 + n.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.size * devicePixelRatio * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,229,49,${0.8 * glow})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.size * 3 * devicePixelRatio * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,229,49,${0.05 * glow})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
}

/* ============================================================
   4. TERRAIN SCANNER — Wireframe terrain with a sweeping
      scan beam that illuminates the surface
   ============================================================ */
function TerrainScanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    hovering: false,
    scanPass: 0,
    scanProgress: 0, // 0-1 per pass
    totalPasses: 7,
    seed: Math.random() * 1000,
    revealedPasses: 0,
    phase: "idle" as "idle" | "scanning" | "collapse" | "rebuilding",
    collapseProgress: 0,
    layers: [] as { seed: number; alpha: number; color: [number, number, number] }[],
  });

  const noise = useCallback((x: number, y: number, seed: number) => {
    const a = seed * 0.1 + 1.0;
    const b = seed * 0.07 + 0.5;
    const c = seed * 0.13 + 2.0;
    const s = Math.sin(x * a * 1.2 + y * b * 0.8 + seed) * 0.5 +
              Math.sin(x * b * 0.7 - y * c * 1.5 + seed * 2.3) * 0.3 +
              Math.sin(x * c * 2.5 + y * a * 2.1 + seed * 0.7) * 0.2 +
              Math.sin(x * 3.7 * b + y * 1.3 * a + seed * 4.1) * 0.15;
    return s;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function onMouseEnter() {
      const st = stateRef.current;
      if (st.phase === "idle") {
        st.phase = "scanning";
        st.scanPass = 0;
        st.scanProgress = 0;
        st.revealedPasses = 0;
        st.layers = [];
        st.seed = Math.random() * 1000;
      }
      st.hovering = true;
    }
    function onMouseLeave() {
      stateRef.current.hovering = false;
    }
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const cols = 50;
    const rows = 35;

    const passColors: [number, number, number][] = [
      [197, 229, 49],   // lime
      [168, 212, 0],    // green
      [212, 233, 76],   // yellow-lime
      [143, 188, 0],    // darker green
      [197, 229, 49],   // lime
      [180, 220, 30],   // mid
      [210, 240, 60],   // bright
    ];

    function frame() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth * devicePixelRatio;
      const h = canvas.offsetHeight * devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, w, h);

      const st = stateRef.current;
      const cellW = w / cols;
      const cellH = h / rows * 0.55;
      const offsetY = h * 0.2;

      // State machine
      if (st.phase === "scanning" && st.hovering) {
        st.scanProgress += 0.006;
        if (st.scanProgress >= 1) {
          st.layers.push({
            seed: st.seed + st.scanPass * 137.7 + st.scanPass * st.scanPass * 43.1,
            alpha: 0.15 + (st.scanPass / st.totalPasses) * 0.25,
            color: passColors[st.scanPass % passColors.length],
          });
          st.revealedPasses++;
          st.scanPass++;
          st.scanProgress = 0;
          if (st.scanPass >= st.totalPasses) {
            st.phase = "collapse";
            st.collapseProgress = 0;
          }
        }
      } else if (st.phase === "collapse") {
        st.collapseProgress += 0.008;
        if (st.collapseProgress >= 1) {
          st.phase = "rebuilding";
          st.collapseProgress = 0;
        }
      } else if (st.phase === "rebuilding") {
        st.collapseProgress += 0.02;
        if (st.collapseProgress >= 1) {
          // Reset with brand new seed
          st.phase = "idle";
          st.scanPass = 0;
          st.scanProgress = 0;
          st.revealedPasses = 0;
          st.layers = [];
          st.seed = Math.random() * 1000;
          st.collapseProgress = 0;
        }
      }

      // Draw based on phase
      if (st.phase === "collapse") {
        // Collapse animation — terrain falls and fades
        const collapse = st.collapseProgress;
        const eased = collapse * collapse; // accelerating fall
        for (const layer of st.layers) {
          drawTerrain(ctx, cols, rows, cellW, cellH, offsetY + eased * h * 0.8, w, h,
            layer.seed, layer.alpha * (1 - collapse), layer.color, 1.0, noise);
        }
        // Shake effect
        const shake = Math.sin(collapse * 30) * (1 - collapse) * 3 * devicePixelRatio;
        ctx.save();
        ctx.translate(shake, 0);
        ctx.restore();

        ctx.fillStyle = `rgba(197,229,49,${0.6 * (1 - collapse)})`;
        ctx.font = `${11 * devicePixelRatio}px monospace`;
        ctx.fillText(`COLLAPSE`, 10 * devicePixelRatio, 20 * devicePixelRatio);
      } else if (st.phase === "rebuilding") {
        // Brief dark pause before idle
        const fade = st.collapseProgress;
        ctx.fillStyle = `rgba(197,229,49,${0.3 * fade})`;
        ctx.font = `${11 * devicePixelRatio}px monospace`;
        ctx.fillText(`RECALIBRATING...`, 10 * devicePixelRatio, 20 * devicePixelRatio);
      } else {
        // Draw revealed layers
        for (const layer of st.layers) {
          drawTerrain(ctx, cols, rows, cellW, cellH, offsetY, w, h, layer.seed, layer.alpha, layer.color, 1.0, noise);
        }

        // Draw current scanning pass
        if (st.phase === "scanning" && st.scanPass < st.totalPasses) {
          const currentSeed = st.seed + st.scanPass * 137.7 + st.scanPass * st.scanPass * 43.1;
          const currentColor = passColors[st.scanPass % passColors.length];
          const scanX = st.scanProgress;

          drawTerrain(ctx, cols, rows, cellW, cellH, offsetY, w, h, currentSeed, 0.3, currentColor, scanX, noise);

          // Scan beam
          const beamX = scanX * w;
          const grad = ctx.createLinearGradient(beamX - 40, 0, beamX + 40, 0);
          grad.addColorStop(0, "rgba(197,229,49,0)");
          grad.addColorStop(0.5, `rgba(${currentColor[0]},${currentColor[1]},${currentColor[2]},0.25)`);
          grad.addColorStop(1, "rgba(197,229,49,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(beamX - 40, 0, 80, h);

          ctx.beginPath();
          ctx.moveTo(beamX, 0);
          ctx.lineTo(beamX, h);
          ctx.strokeStyle = `rgba(${currentColor[0]},${currentColor[1]},${currentColor[2]},0.5)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = `rgba(197,229,49,0.5)`;
          ctx.font = `${11 * devicePixelRatio}px monospace`;
          ctx.fillText(`PASS ${st.scanPass + 1}/${st.totalPasses}`, 10 * devicePixelRatio, 20 * devicePixelRatio);
        } else if (st.phase === "idle" && st.layers.length === 0) {
          // Show faint base terrain so it's not blank
          drawTerrain(ctx, cols, rows, cellW, cellH, offsetY, w, h, st.seed, 0.06, [197, 229, 49], 1.0, noise);
          ctx.fillStyle = `rgba(197,229,49,0.3)`;
          ctx.font = `${11 * devicePixelRatio}px monospace`;
          ctx.fillText(`HOVER TO SCAN`, 10 * devicePixelRatio, 20 * devicePixelRatio);
        }
      }

      // Pass dots
      for (let i = 0; i < st.totalPasses; i++) {
        const dotX = w - (st.totalPasses - i) * 14 * devicePixelRatio;
        const dotY = 16 * devicePixelRatio;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3 * devicePixelRatio, 0, Math.PI * 2);
        if (i < st.revealedPasses) {
          ctx.fillStyle = `rgba(197,229,49,0.8)`;
        } else if (i === st.scanPass) {
          ctx.fillStyle = `rgba(197,229,49,${0.3 + Math.sin(Date.now() / 200) * 0.2})`;
        } else {
          ctx.fillStyle = `rgba(197,229,49,0.1)`;
        }
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [noise]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
}

function drawTerrain(
  ctx: CanvasRenderingContext2D,
  cols: number,
  rows: number,
  cellW: number,
  cellH: number,
  offsetY: number,
  w: number,
  _h: number,
  seed: number,
  alpha: number,
  color: [number, number, number],
  revealX: number,
  noise: (x: number, y: number, seed: number) => number,
) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col / cols;
      if (x > revealX) continue;

      const y = row / rows;
      const screenX = col * cellW;
      const elevation = noise(x * 4, y * 4, seed) * cellH * 1.5;
      const screenY = offsetY + row * cellH - elevation;

      // Fade at reveal edge
      const edgeFade = revealX < 1 ? Math.max(0, 1 - Math.abs(x - revealX) * 15) : 0;
      const a = alpha + edgeFade * 0.3;

      if (col < cols - 1 && (col + 1) / cols <= revealX) {
        const nextX = (col + 1) * cellW;
        const nextElev = noise((col + 1) / cols * 4, y * 4, seed) * cellH * 1.5;
        const nextY = offsetY + row * cellH - nextElev;

        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${a})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      if (row < rows - 1) {
        const nextElev = noise(x * 4, (row + 1) / rows * 4, seed) * cellH * 1.5;
        const nextY = offsetY + (row + 1) * cellH - nextElev;

        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(screenX, nextY);
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${a})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Vertex dots at reveal edge
      if (edgeFade > 0.3) {
        ctx.beginPath();
        ctx.arc(screenX, screenY, 1.5 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${edgeFade})`;
        ctx.fill();
      }
    }
  }
}

/* ============================================================
   EXPERIMENTAL SECTION — Layout
   ============================================================ */
const experiments = [
  {
    Component: MagmaFlow,
    title: "Magma Flow",
    desc: "Real-time fractal noise shader simulating volcanic magma currents",
  },
  {
    Component: ParticleVortex,
    title: "Particle Vortex",
    desc: "3,000 particles spiraling in a geothermal updraft formation",
  },
  {
    Component: NeuralMesh,
    title: "Neural Mesh",
    desc: "AI inference network with traveling data pulses across nodes",
  },
  {
    Component: TerrainScanner,
    title: "Terrain Scanner",
    desc: "Geophysical survey wireframe with active seismic scan beam",
  },
];

export default function ExperimentalSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-geo-lime/20 text-xs text-geo-lime/60 mb-4">
            EXPERIMENTAL
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Visual Lab</span>
          </h2>
          <p className="text-geo-muted max-w-xl mx-auto">
            Exploring the visual language of volcanic energy, data flow,
            and sovereign compute infrastructure.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {experiments.map(({ Component, title, desc }) => (
            <div
              key={title}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-geo-border group hover:border-geo-lime/30 transition-all duration-500"
            >
              <Component />
              <div className="absolute inset-0 bg-gradient-to-t from-geo-darker via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-xs text-geo-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
