import { useEffect, useRef } from "react";
import { FlockSimulation } from "@/lib/flock/simulation";
import { useFlockStore } from "@/lib/flock/store";
import type { MouseState } from "@/lib/flock/types";

const SKY_TOP = "#070a0d";
const SKY_MID = "#0e1419";
const SKY_BOT = "#162028";
const BIRD_A = { r: 198, g: 214, b: 204 };
const BIRD_B = { r: 236, g: 242, b: 232 };

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function FlockCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const sim = new FlockSimulation();
    const mouse: MouseState = { x: 0, y: 0, active: false, pressed: false };
    const sky = document.createElement("canvas");
    const skyCtx = sky.getContext("2d");
    if (!skyCtx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let running = true;
    const stars: { x: number; y: number; r: number; a: number }[] = [];

    const bakeSky = () => {
      sky.width = Math.max(1, Math.floor(width * dpr));
      sky.height = Math.max(1, Math.floor(height * dpr));
      skyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = skyCtx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, SKY_TOP);
      g.addColorStop(0.55, SKY_MID);
      g.addColorStop(1, SKY_BOT);
      skyCtx.fillStyle = g;
      skyCtx.fillRect(0, 0, width, height);

      const haze = skyCtx.createRadialGradient(
        width * 0.5,
        height * 0.78,
        0,
        width * 0.5,
        height * 0.78,
        Math.max(width, height) * 0.7,
      );
      haze.addColorStop(0, "rgba(36, 52, 58, 0.28)");
      haze.addColorStop(1, "rgba(36, 52, 58, 0)");
      skyCtx.fillStyle = haze;
      skyCtx.fillRect(0, 0, width, height);

      stars.length = 0;
      const count = Math.floor((width * height) / 14000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.72,
          r: Math.random() * 1.1 + 0.3,
          a: 0.12 + Math.random() * 0.38,
        });
      }
      for (const s of stars) {
        skyCtx.fillStyle = `rgba(230, 236, 232, ${s.a})`;
        skyCtx.beginPath();
        skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        skyCtx.fill();
      }

      const vig = skyCtx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.28,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.42)");
      skyCtx.fillStyle = vig;
      skyCtx.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sim.setSize(width, height);
      bakeSky();
      ctx.drawImage(sky, 0, 0, width, height);
    };

    const drawBird = (x: number, y: number, vx: number, vy: number, boidIndex: number) => {
      const b = sim.boids[boidIndex]!;
      const heading = Math.atan2(vy, vx);
      const flap = 1 + 0.16 * Math.sin(b.phase);
      const speed = Math.hypot(vx, vy);
      const stretch = 1 + Math.min(1, speed / 180) * 0.22;
      const t = b.shade;
      const stress = b.stress;
      const r = mix(mix(BIRD_A.r, BIRD_B.r, t), 252, stress * 0.45);
      const g = mix(mix(BIRD_A.g, BIRD_B.g, t), 252, stress * 0.35);
      const bl = mix(mix(BIRD_A.b, BIRD_B.b, t), 248, stress * 0.2);
      const s = 5.4 * b.size;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(heading);
      ctx.scale(stretch, flap);
      ctx.beginPath();
      ctx.moveTo(s * 1.55, 0);
      ctx.lineTo(-s * 1.05, s * 0.72);
      ctx.lineTo(-s * 0.42, 0);
      ctx.lineTo(-s * 1.05, -s * 0.72);
      ctx.closePath();
      ctx.fillStyle = `rgb(${r | 0}, ${g | 0}, ${bl | 0})`;
      ctx.fill();
      ctx.restore();
    };

    const drawBirdWrapped = (i: number) => {
      const b = sim.boids[i]!;
      drawBird(b.x, b.y, b.vx, b.vy, i);
      const m = 16;
      if (b.x < m) drawBird(b.x + width, b.y, b.vx, b.vy, i);
      else if (b.x > width - m) drawBird(b.x - width, b.y, b.vx, b.vy, i);
      if (b.y < m) drawBird(b.x, b.y + height, b.vx, b.vy, i);
      else if (b.y > height - m) drawBird(b.x, b.y - height, b.vx, b.vy, i);
    };

    const drawMouse = (t: number, flee: number) => {
      if (!mouse.active) return;
      const fleeR = Math.max(40, 118 + flee * 18);
      const pulse = 1 + 0.035 * Math.sin(t * 0.0032);
      const r = fleeR * pulse;
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r);
      const a0 = mouse.pressed ? 0.16 : 0.09;
      g.addColorStop(0, `rgba(143, 173, 152, ${a0})`);
      g.addColorStop(0.62, "rgba(143, 173, 152, 0.035)");
      g.addColorStop(1, "rgba(143, 173, 152, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = mouse.pressed ? "rgba(143, 173, 152, 0.5)" : "rgba(143, 173, 152, 0.28)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(231, 236, 232, 0.55)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const params = useFlockStore.getState();
      sim.step(dt, params, mouse);

      if (params.trails) {
        ctx.globalAlpha = 0.16;
        ctx.drawImage(sky, 0, 0, width, height);
        ctx.globalAlpha = 1;
      } else {
        ctx.drawImage(sky, 0, 0, width, height);
      }

      const n = sim.n;
      for (let i = 0; i < n; i++) drawBirdWrapped(i);
      drawMouse(now, params.flee);
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onPointerDown = (e: PointerEvent) => {
      onPointerMove(e);
      const el = e.target as HTMLElement | null;
      if (el?.closest("aside, button, [role='slider']")) return;
      mouse.pressed = true;
    };
    const onPointerUp = (e: PointerEvent) => {
      mouse.pressed = false;
      if (e.pointerType !== "mouse") mouse.active = false;
    };
    const onPointerOut = (e: PointerEvent) => {
      const next = e.relatedTarget as Node | null;
      if (!next || !document.documentElement.contains(next)) {
        mouse.active = false;
        mouse.pressed = false;
      }
    };
    const onBlur = () => {
      mouse.active = false;
      mouse.pressed = false;
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        useFlockStore.getState().toggle("paused");
      } else if (e.key === "r" || e.key === "R") {
        useFlockStore.getState().reseed();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onBlur);
    window.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full touch-none"
      aria-label="鸟群集群运动画布"
    />
  );
}
