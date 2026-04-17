"use client";

import { useRef, useEffect, useCallback } from "react";

/* ============================================================
   1. MAGMA FLOW — Full-screen fragment shader simulating
      flowing volcanic magma with fractal noise distortion
   ============================================================ */
function MagmaFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const vs = `attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}`;
    const fs = `
      precision highp float;
      uniform float t;
      uniform vec2 r;

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
        float n=fbm(vec3(uv*3.0,t*0.3));
        float n2=fbm(vec3(uv*2.0+n*1.5,t*0.2+10.0));
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
    const start = Date.now();

    function frame() {
      if (!canvas || !gl) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(tU, (Date.now() - start) / 1000);
      gl.uniform2f(rU, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(rafRef.current);
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
      alpha: 0.15 + Math.random() * 0.4,
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
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
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
        // Mouse gravity — slow pull
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.01 && dist < 0.5) {
            const force = 0.00015 / (dist + 0.05);
            n.vx += dx * force;
            n.vy += dy * force;
          }
        }

        // Dampen velocity
        n.vx *= 0.995;
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

  const noise = useCallback((x: number, y: number) => {
    const s = Math.sin(x * 1.2 + y * 0.8) * 0.5 +
              Math.sin(x * 0.7 - y * 1.5) * 0.3 +
              Math.sin(x * 2.5 + y * 2.1) * 0.2;
    return s;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = 40;
    const rows = 30;

    function frame() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth * devicePixelRatio;
      const h = canvas.offsetHeight * devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, w, h);

      const t = Date.now() / 1000;
      const scanX = (Math.sin(t * 0.5) * 0.5 + 0.5); // 0-1 sweep

      const cellW = w / cols;
      const cellH = h / rows * 0.6;
      const offsetY = h * 0.25;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col / cols;
          const y = row / rows;

          // Isometric-ish projection
          const screenX = col * cellW;
          const elevation = noise(x * 4 + t * 0.2, y * 4) * cellH * 1.5;
          const screenY = offsetY + row * cellH - elevation;

          // Distance from scan line
          const scanDist = Math.abs(x - scanX);
          const scanIntensity = Math.max(0, 1 - scanDist * 8);
          const baseAlpha = 0.08 + scanIntensity * 0.7;

          // Draw grid lines
          if (col < cols - 1) {
            const nextX = (col + 1) * cellW;
            const nextElev = noise((col + 1) / cols * 4 + t * 0.2, y * 4) * cellH * 1.5;
            const nextY = offsetY + row * cellH - nextElev;

            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = `rgba(197,229,49,${baseAlpha})`;
            ctx.lineWidth = scanIntensity > 0.3 ? 1.5 : 0.5;
            ctx.stroke();
          }
          if (row < rows - 1) {
            const nextElev = noise(x * 4 + t * 0.2, (row + 1) / rows * 4) * cellH * 1.5;
            const nextY = offsetY + (row + 1) * cellH - nextElev;

            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(screenX, nextY);
            ctx.strokeStyle = `rgba(197,229,49,${baseAlpha})`;
            ctx.lineWidth = scanIntensity > 0.3 ? 1.5 : 0.5;
            ctx.stroke();
          }

          // Bright dots at scan line
          if (scanIntensity > 0.5) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, 2 * devicePixelRatio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(197,229,49,${scanIntensity})`;
            ctx.fill();
          }
        }
      }

      // Scan line beam
      const beamX = scanX * w;
      const grad = ctx.createLinearGradient(beamX - 30, 0, beamX + 30, 0);
      grad.addColorStop(0, "rgba(197,229,49,0)");
      grad.addColorStop(0.5, "rgba(197,229,49,0.15)");
      grad.addColorStop(1, "rgba(197,229,49,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(beamX - 30, 0, 60, h);

      rafRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(rafRef.current);
  }, [noise]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
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
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
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
