export type FlockParams = {
  separation: number;
  alignment: number;
  cohesion: number;
  count: number;
  speed: number;
  flee: number;
  perception: number;
  trails: boolean;
  paused: boolean;
  epoch: number;
};

export type MouseState = {
  x: number;
  y: number;
  active: boolean;
  pressed: boolean;
};

export type Boid = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  phase: number;
  shade: number;
  size: number;
  stress: number;
};

export const MAX_BOIDS = 400;

export const FLOCK_DEFAULTS: FlockParams = {
  separation: 1.55,
  alignment: 1.12,
  cohesion: 0.92,
  count: 180,
  speed: 155,
  flee: 2.85,
  perception: 58,
  trails: true,
  paused: false,
  epoch: 1,
};
