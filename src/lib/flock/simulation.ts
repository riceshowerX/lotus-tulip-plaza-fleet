import { SpatialHash, wrapCoord, wrapDelta } from "./hash";
import { MAX_BOIDS, type Boid, type FlockParams, type MouseState } from "./types";

function limit(x: number, y: number, max: number): [number, number] {
  const m2 = x * x + y * y;
  if (m2 > max * max && m2 > 0) {
    const s = max / Math.sqrt(m2);
    return [x * s, y * s];
  }
  return [x, y];
}

export class FlockSimulation {
  readonly boids: Boid[] = [];
  n = 0;
  width = 1;
  height = 1;
  epoch = -1;

  private hash = new SpatialHash();
  private neighbors: number[] = [];
  private seen = new Uint32Array(MAX_BOIDS);
  private mark = 1;

  constructor() {
    for (let i = 0; i < MAX_BOIDS; i++) {
      this.boids.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        phase: Math.random() * Math.PI * 2,
        shade: Math.random(),
        size: 0.78 + Math.random() * 0.45,
        stress: 0,
      });
    }
  }

  setSize(width: number, height: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    for (let i = 0; i < this.n; i++) {
      const b = this.boids[i]!;
      b.x = wrapCoord(b.x, this.width);
      b.y = wrapCoord(b.y, this.height);
    }
  }

  reseed(params: FlockParams) {
    this.epoch = params.epoch;
    this.n = 0;
    this.setCount(params.count, params.speed, true);
  }

  setCount(count: number, speed: number, force = false) {
    const target = Math.max(1, Math.min(MAX_BOIDS, Math.round(count)));
    if (!force && target === this.n) return;
    if (target > this.n) {
      const heading = Math.random() * Math.PI * 2;
      for (let i = this.n; i < target; i++) this.spawn(i, speed, heading);
    }
    this.n = target;
  }

  private spawn(i: number, speed: number, heading: number) {
    const b = this.boids[i]!;
    const w = this.width;
    const h = this.height;
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * Math.min(w, h) * 0.2;
    b.x = wrapCoord(w * 0.5 + Math.cos(angle) * r, w);
    b.y = wrapCoord(h * 0.5 + Math.sin(angle) * r, h);
    const dir = heading + (Math.random() - 0.5) * 0.9;
    const s = speed * (0.82 + Math.random() * 0.28);
    b.vx = Math.cos(dir) * s;
    b.vy = Math.sin(dir) * s;
    b.ax = 0;
    b.ay = 0;
    b.phase = Math.random() * Math.PI * 2;
    b.shade = Math.random();
    b.size = 0.78 + Math.random() * 0.45;
    b.stress = 0;
  }

  step(dt: number, params: FlockParams, mouse: MouseState) {
    if (params.epoch !== this.epoch) this.reseed(params);
    this.setCount(params.count, params.speed);

    const n = this.n;
    if (n === 0) return;

    for (let i = 0; i < n; i++) {
      this.boids[i]!.phase += dt * 11;
    }

    if (params.paused) return;

    const w = this.width;
    const h = this.height;
    const maxSpeed = Math.max(20, params.speed);
    const maxForce = maxSpeed * 3.4;
    const perception = Math.max(8, params.perception);
    const sepRadius = Math.max(10, perception * 0.42);
    const fleeRadius = Math.max(40, 118 + params.flee * 18);

    this.hash.configure(w, h, perception);
    this.hash.clear();
    for (let i = 0; i < n; i++) {
      const b = this.boids[i]!;
      this.hash.insert(i, b.x, b.y);
    }

    const sepW = params.separation;
    const aliW = params.alignment;
    const cohW = params.cohesion;
    const fleeW = params.flee;
    const neighbors = this.neighbors;

    for (let i = 0; i < n; i++) {
      const b = this.boids[i]!;
      let sx = 0,
        sy = 0,
        sc = 0;
      let ax = 0,
        ay = 0,
        ac = 0;
      let cx = 0,
        cy = 0,
        cc = 0;

      this.mark = this.mark + 1 || 1;
      this.hash.query(b.x, b.y, perception, neighbors);
      const seen = this.seen;
      const mark = this.mark;

      for (let k = 0; k < neighbors.length; k++) {
        const j = neighbors[k]!;
        if (j === i) continue;
        if (seen[j] === mark) continue;
        seen[j] = mark;

        const o = this.boids[j]!;
        const dx = wrapDelta(o.x - b.x, w);
        const dy = wrapDelta(o.y - b.y, h);
        const d2 = dx * dx + dy * dy;
        if (d2 > perception * perception || d2 === 0) continue;
        const dist = Math.sqrt(d2);

        if (dist < sepRadius) {
          const inv = 1 / dist;
          sx -= dx * inv * inv;
          sy -= dy * inv * inv;
          sc++;
        }

        ax += o.vx;
        ay += o.vy;
        ac++;
        cx += dx;
        cy += dy;
        cc++;
      }

      let fx = 0;
      let fy = 0;

      if (sc > 0) {
        let [stx, sty] = steer(sx / sc, sy / sc, b.vx, b.vy, maxSpeed, maxForce);
        fx += stx * sepW;
        fy += sty * sepW;
      }
      if (ac > 0) {
        let [stx, sty] = steer(ax / ac, ay / ac, b.vx, b.vy, maxSpeed, maxForce);
        fx += stx * aliW;
        fy += sty * aliW;
      }
      if (cc > 0) {
        let [stx, sty] = steer(cx / cc, cy / cc, b.vx, b.vy, maxSpeed, maxForce);
        fx += stx * cohW;
        fy += sty * cohW;
      }

      let stress = 0;
      if (mouse.active) {
        const mdx = wrapDelta(b.x - mouse.x, w);
        const mdy = wrapDelta(b.y - mouse.y, h);
        const md2 = mdx * mdx + mdy * mdy;
        const r = fleeRadius;
        if (md2 < r * r && md2 > 0.0001) {
          const md = Math.sqrt(md2);
          const t = 1 - md / r;
          const falloff = t * t;
          const boost = mouse.pressed ? 1.7 : 1;
          const mag = falloff * fleeW * maxForce * boost;
          fx += (mdx / md) * mag;
          fy += (mdy / md) * mag;
          stress = Math.min(1, falloff * (0.55 + fleeW * 0.18) * boost);
        }
      }

      [b.ax, b.ay] = limit(fx, fy, maxForce * 4.5);
      b.stress += (stress - b.stress) * Math.min(1, dt * 8);
    }

    const noise = 18;
    for (let i = 0; i < n; i++) {
      const b = this.boids[i]!;
      b.vx += b.ax * dt + (Math.random() - 0.5) * noise * dt;
      b.vy += b.ay * dt + (Math.random() - 0.5) * noise * dt;
      const boosted = maxSpeed * (1 + b.stress * 0.55);
      [b.vx, b.vy] = limit(b.vx, b.vy, boosted);
      const minSpeed = maxSpeed * 0.28;
      const sp2 = b.vx * b.vx + b.vy * b.vy;
      if (sp2 < minSpeed * minSpeed && sp2 > 0) {
        const s = minSpeed / Math.sqrt(sp2);
        b.vx *= s;
        b.vy *= s;
      }
      b.x = wrapCoord(b.x + b.vx * dt, w);
      b.y = wrapCoord(b.y + b.vy * dt, h);
      b.ax = 0;
      b.ay = 0;
    }
  }
}

function steer(
  dirX: number,
  dirY: number,
  vx: number,
  vy: number,
  maxSpeed: number,
  maxForce: number,
): [number, number] {
  const mag = Math.hypot(dirX, dirY);
  if (mag < 1e-6) return [0, 0];
  const dx = (dirX / mag) * maxSpeed - vx;
  const dy = (dirY / mag) * maxSpeed - vy;
  return limit(dx, dy, maxForce);
}
