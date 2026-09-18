import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Play, i as RotateCcw, o as Pause, r as Spline, s as ChevronDown, t as Wind } from "../_libs/lucide-react.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D8fL0LO4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-10 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: cn("block size-4 rounded-full bg-fg shadow-thumb", "border border-fg/20 outline-none", "transition-[box-shadow,transform] duration-(--motion-quick) ease-(--ease-out)", "hover:shadow-thumb-hover", "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface", "active:scale-[0.96]") })]
	});
}
var FLOCK_DEFAULTS = {
	separation: 1.55,
	alignment: 1.12,
	cohesion: .92,
	count: 180,
	speed: 155,
	flee: 2.85,
	perception: 58,
	trails: true,
	paused: false,
	epoch: 1
};
var useFlockStore = create((set) => ({
	...FLOCK_DEFAULTS,
	setParam: (key, value) => set({ [key]: value }),
	toggle: (key) => set((s) => ({ [key]: !s[key] })),
	resetAll: () => set({
		...FLOCK_DEFAULTS,
		epoch: Date.now()
	}),
	reseed: () => set({ epoch: Date.now() })
}));
function ParamSlider({ label, hint, value, min, max, step, format, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-fg",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-subtle",
					children: hint
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-sm tabular-nums text-accent",
				children: format(value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			min,
			max,
			step,
			value: [value],
			onValueChange: (v) => {
				const next = v[0];
				if (typeof next === "number") onChange(next);
			},
			"aria-label": label
		})]
	});
}
function ControlPanel() {
	const separation = useFlockStore((s) => s.separation);
	const alignment = useFlockStore((s) => s.alignment);
	const cohesion = useFlockStore((s) => s.cohesion);
	const count = useFlockStore((s) => s.count);
	const speed = useFlockStore((s) => s.speed);
	const flee = useFlockStore((s) => s.flee);
	const perception = useFlockStore((s) => s.perception);
	const trails = useFlockStore((s) => s.trails);
	const paused = useFlockStore((s) => s.paused);
	const setParam = useFlockStore((s) => s.setParam);
	const toggle = useFlockStore((s) => s.toggle);
	const resetAll = useFlockStore((s) => s.resetAll);
	const reseed = useFlockStore((s) => s.reseed);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("pointer-events-auto absolute z-10 flex flex-col touch-auto", "max-md:inset-x-3 max-md:bottom-[max(0.75rem,env(safe-area-inset-bottom))]", "md:top-5 md:left-5 md:w-80", "rounded-xl bg-surface/95 p-3 shadow-panel md:rounded-2xl md:p-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex min-h-11 flex-1 items-start gap-3 rounded-lg text-left md:min-h-0 md:cursor-default",
				onClick: () => {
					if (window.matchMedia("(min-width: 768px)").matches) return;
					setOpen((v) => !v);
				},
				"aria-expanded": open,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 grid size-9 place-items-center rounded-md bg-surface-2 text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, {
						className: "size-4",
						strokeWidth: 1.75
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 pt-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-lg leading-tight font-medium tracking-display text-fg",
						children: "鸟群"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs text-muted",
						children: "分离 · 对齐 · 聚合"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 hidden font-mono text-xs tabular-nums text-subtle md:inline",
						children: count
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md text-muted transition-colors duration-(--motion-quick) hover:bg-surface-2 hover:text-fg md:size-9",
						onClick: () => toggle("paused"),
						"aria-label": paused ? "继续" : "暂停",
						title: paused ? "继续（空格）" : "暂停（空格）",
						children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "size-4 translate-x-px",
							strokeWidth: 1.75
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
							className: "size-4",
							strokeWidth: 1.75
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md text-muted transition-colors duration-(--motion-quick) hover:bg-surface-2 hover:text-fg md:hidden",
						onClick: () => setOpen((v) => !v),
						"aria-label": open ? "收起面板" : "展开面板",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform duration-(--motion-fast) ease-(--ease-out)", open ? "rotate-0" : "rotate-180") })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("overflow-hidden transition-[max-height,opacity,margin] duration-(--motion-fast) ease-(--ease-out)", "md:mt-4 md:max-h-none md:opacity-100", open ? "mt-4 max-h-96 opacity-100 visible" : "invisible max-h-0 opacity-0 md:visible md:mt-4 md:max-h-none md:opacity-100"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 overflow-y-auto pr-1 md:max-h-none max-h-96",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "分离",
						hint: "Separation",
						value: separation,
						min: 0,
						max: 3,
						step: .05,
						format: (n) => n.toFixed(2),
						onChange: (n) => setParam("separation", n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "对齐",
						hint: "Alignment",
						value: alignment,
						min: 0,
						max: 3,
						step: .05,
						format: (n) => n.toFixed(2),
						onChange: (n) => setParam("alignment", n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "聚合",
						hint: "Cohesion",
						value: cohesion,
						min: 0,
						max: 3,
						step: .05,
						format: (n) => n.toFixed(2),
						onChange: (n) => setParam("cohesion", n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "避让",
						hint: "Flee",
						value: flee,
						min: 0,
						max: 5,
						step: .05,
						format: (n) => n.toFixed(2),
						onChange: (n) => setParam("flee", n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "数量",
						hint: "Flock",
						value: count,
						min: 20,
						max: 360,
						step: 5,
						format: (n) => String(Math.round(n)),
						onChange: (n) => setParam("count", Math.round(n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "速度",
						hint: "Speed",
						value: speed,
						min: 40,
						max: 280,
						step: 5,
						format: (n) => String(Math.round(n)),
						onChange: (n) => setParam("speed", n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamSlider, {
						label: "感知",
						hint: "Radius",
						value: perception,
						min: 24,
						max: 120,
						step: 1,
						format: (n) => String(Math.round(n)),
						onChange: (n) => setParam("perception", n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle("trails"),
								className: cn("inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3", "text-sm font-medium transition-colors duration-(--motion-quick)", "active:scale-[0.96]", trails ? "bg-surface-2 text-fg" : "bg-transparent text-muted ring-1 ring-border"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spline, {
									className: "size-3.5",
									strokeWidth: 1.75
								}), "尾迹"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => reseed(),
								className: "inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-transparent px-3 text-sm font-medium text-muted ring-1 ring-border transition-colors duration-(--motion-quick) hover:text-fg active:scale-[0.96]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
									className: "size-3.5",
									strokeWidth: 1.75
								}), "重聚"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => resetAll(),
								className: "inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-md bg-fg px-3 text-sm font-medium text-accent-fg transition-opacity duration-(--motion-quick) hover:opacity-90 active:scale-[0.96]",
								children: "重置"
							})
						]
					})
				]
			})
		})]
	});
}
var SpatialHash = class {
	cellSize = 64;
	cols = 1;
	rows = 1;
	cells = [[]];
	configure(width, height, cellSize) {
		this.cellSize = Math.max(16, cellSize);
		this.cols = Math.max(1, Math.ceil(width / this.cellSize));
		this.rows = Math.max(1, Math.ceil(height / this.cellSize));
		const n = this.cols * this.rows;
		if (this.cells.length !== n) this.cells = Array.from({ length: n }, () => []);
		else for (let i = 0; i < n; i++) this.cells[i].length = 0;
	}
	clear() {
		for (let i = 0; i < this.cells.length; i++) this.cells[i].length = 0;
	}
	insert(index, x, y) {
		const c = Math.min(this.cols - 1, Math.max(0, Math.floor(x / this.cellSize)));
		const r = Math.min(this.rows - 1, Math.max(0, Math.floor(y / this.cellSize)));
		this.cells[r * this.cols + c].push(index);
	}
	query(x, y, radius, dest) {
		dest.length = 0;
		const cs = this.cellSize;
		const minC = Math.floor((x - radius) / cs);
		const maxC = Math.floor((x + radius) / cs);
		const minR = Math.floor((y - radius) / cs);
		const maxR = Math.floor((y + radius) / cs);
		const { cols, rows } = this;
		for (let r = minR; r <= maxR; r++) {
			const rr = (r % rows + rows) % rows;
			for (let c = minC; c <= maxC; c++) {
				const cc = (c % cols + cols) % cols;
				const bucket = this.cells[rr * cols + cc];
				for (let i = 0; i < bucket.length; i++) dest.push(bucket[i]);
			}
		}
	}
};
function wrapDelta(d, size) {
	if (size <= 0) return d;
	const half = size * .5;
	if (d > half) return d - size;
	if (d < -half) return d + size;
	return d;
}
function wrapCoord(v, size) {
	if (size <= 0) return 0;
	v %= size;
	if (v < 0) v += size;
	return v;
}
function limit(x, y, max) {
	const m2 = x * x + y * y;
	if (m2 > max * max && m2 > 0) {
		const s = max / Math.sqrt(m2);
		return [x * s, y * s];
	}
	return [x, y];
}
var FlockSimulation = class {
	boids = [];
	n = 0;
	width = 1;
	height = 1;
	epoch = -1;
	hash = new SpatialHash();
	neighbors = [];
	seen = /* @__PURE__ */ new Uint32Array(400);
	mark = 1;
	constructor() {
		for (let i = 0; i < 400; i++) this.boids.push({
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			ax: 0,
			ay: 0,
			phase: Math.random() * Math.PI * 2,
			shade: Math.random(),
			size: .78 + Math.random() * .45,
			stress: 0
		});
	}
	setSize(width, height) {
		this.width = Math.max(1, width);
		this.height = Math.max(1, height);
		for (let i = 0; i < this.n; i++) {
			const b = this.boids[i];
			b.x = wrapCoord(b.x, this.width);
			b.y = wrapCoord(b.y, this.height);
		}
	}
	reseed(params) {
		this.epoch = params.epoch;
		this.n = 0;
		this.setCount(params.count, params.speed, true);
	}
	setCount(count, speed, force = false) {
		const target = Math.max(1, Math.min(400, Math.round(count)));
		if (!force && target === this.n) return;
		if (target > this.n) {
			const heading = Math.random() * Math.PI * 2;
			for (let i = this.n; i < target; i++) this.spawn(i, speed, heading);
		}
		this.n = target;
	}
	spawn(i, speed, heading) {
		const b = this.boids[i];
		const w = this.width;
		const h = this.height;
		const angle = Math.random() * Math.PI * 2;
		const r = Math.sqrt(Math.random()) * Math.min(w, h) * .2;
		b.x = wrapCoord(w * .5 + Math.cos(angle) * r, w);
		b.y = wrapCoord(h * .5 + Math.sin(angle) * r, h);
		const dir = heading + (Math.random() - .5) * .9;
		const s = speed * (.82 + Math.random() * .28);
		b.vx = Math.cos(dir) * s;
		b.vy = Math.sin(dir) * s;
		b.ax = 0;
		b.ay = 0;
		b.phase = Math.random() * Math.PI * 2;
		b.shade = Math.random();
		b.size = .78 + Math.random() * .45;
		b.stress = 0;
	}
	step(dt, params, mouse) {
		if (params.epoch !== this.epoch) this.reseed(params);
		this.setCount(params.count, params.speed);
		const n = this.n;
		if (n === 0) return;
		for (let i = 0; i < n; i++) this.boids[i].phase += dt * 11;
		if (params.paused) return;
		const w = this.width;
		const h = this.height;
		const maxSpeed = Math.max(20, params.speed);
		const maxForce = maxSpeed * 3.4;
		const perception = Math.max(8, params.perception);
		const sepRadius = Math.max(10, perception * .42);
		const fleeRadius = Math.max(40, 118 + params.flee * 18);
		this.hash.configure(w, h, perception);
		this.hash.clear();
		for (let i = 0; i < n; i++) {
			const b = this.boids[i];
			this.hash.insert(i, b.x, b.y);
		}
		const sepW = params.separation;
		const aliW = params.alignment;
		const cohW = params.cohesion;
		const fleeW = params.flee;
		const neighbors = this.neighbors;
		for (let i = 0; i < n; i++) {
			const b = this.boids[i];
			let sx = 0, sy = 0, sc = 0;
			let ax = 0, ay = 0, ac = 0;
			let cx = 0, cy = 0, cc = 0;
			this.mark = this.mark + 1 || 1;
			this.hash.query(b.x, b.y, perception, neighbors);
			const seen = this.seen;
			const mark = this.mark;
			for (let k = 0; k < neighbors.length; k++) {
				const j = neighbors[k];
				if (j === i) continue;
				if (seen[j] === mark) continue;
				seen[j] = mark;
				const o = this.boids[j];
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
				if (md2 < r * r && md2 > 1e-4) {
					const md = Math.sqrt(md2);
					const t = 1 - md / r;
					const falloff = t * t;
					const boost = mouse.pressed ? 1.7 : 1;
					const mag = falloff * fleeW * maxForce * boost;
					fx += mdx / md * mag;
					fy += mdy / md * mag;
					stress = Math.min(1, falloff * (.55 + fleeW * .18) * boost);
				}
			}
			[b.ax, b.ay] = limit(fx, fy, maxForce * 4.5);
			b.stress += (stress - b.stress) * Math.min(1, dt * 8);
		}
		const noise = 18;
		for (let i = 0; i < n; i++) {
			const b = this.boids[i];
			b.vx += b.ax * dt + (Math.random() - .5) * noise * dt;
			b.vy += b.ay * dt + (Math.random() - .5) * noise * dt;
			const boosted = maxSpeed * (1 + b.stress * .55);
			[b.vx, b.vy] = limit(b.vx, b.vy, boosted);
			const minSpeed = maxSpeed * .28;
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
};
function steer(dirX, dirY, vx, vy, maxSpeed, maxForce) {
	const mag = Math.hypot(dirX, dirY);
	if (mag < 1e-6) return [0, 0];
	return limit(dirX / mag * maxSpeed - vx, dirY / mag * maxSpeed - vy, maxForce);
}
var SKY_TOP = "#070a0d";
var SKY_MID = "#0e1419";
var SKY_BOT = "#162028";
var BIRD_A = {
	r: 198,
	g: 214,
	b: 204
};
var BIRD_B = {
	r: 236,
	g: 242,
	b: 232
};
function mix(a, b, t) {
	return a + (b - a) * t;
}
function FlockCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;
		const sim = new FlockSimulation();
		const mouse = {
			x: 0,
			y: 0,
			active: false,
			pressed: false
		};
		const sky = document.createElement("canvas");
		const skyCtx = sky.getContext("2d");
		if (!skyCtx) return;
		let width = 0;
		let height = 0;
		let dpr = 1;
		let raf = 0;
		let last = performance.now();
		let running = true;
		const stars = [];
		const bakeSky = () => {
			sky.width = Math.max(1, Math.floor(width * dpr));
			sky.height = Math.max(1, Math.floor(height * dpr));
			skyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const g = skyCtx.createLinearGradient(0, 0, 0, height);
			g.addColorStop(0, SKY_TOP);
			g.addColorStop(.55, SKY_MID);
			g.addColorStop(1, SKY_BOT);
			skyCtx.fillStyle = g;
			skyCtx.fillRect(0, 0, width, height);
			const haze = skyCtx.createRadialGradient(width * .5, height * .78, 0, width * .5, height * .78, Math.max(width, height) * .7);
			haze.addColorStop(0, "rgba(36, 52, 58, 0.28)");
			haze.addColorStop(1, "rgba(36, 52, 58, 0)");
			skyCtx.fillStyle = haze;
			skyCtx.fillRect(0, 0, width, height);
			stars.length = 0;
			const count = Math.floor(width * height / 14e3);
			for (let i = 0; i < count; i++) stars.push({
				x: Math.random() * width,
				y: Math.random() * height * .72,
				r: Math.random() * 1.1 + .3,
				a: .12 + Math.random() * .38
			});
			for (const s of stars) {
				skyCtx.fillStyle = `rgba(230, 236, 232, ${s.a})`;
				skyCtx.beginPath();
				skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				skyCtx.fill();
			}
			const vig = skyCtx.createRadialGradient(width * .5, height * .5, Math.min(width, height) * .28, width * .5, height * .5, Math.max(width, height) * .72);
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
		const drawBird = (x, y, vx, vy, boidIndex) => {
			const b = sim.boids[boidIndex];
			const heading = Math.atan2(vy, vx);
			const flap = 1 + .16 * Math.sin(b.phase);
			const stretch = 1 + Math.min(1, Math.hypot(vx, vy) / 180) * .22;
			const t = b.shade;
			const stress = b.stress;
			const r = mix(mix(BIRD_A.r, BIRD_B.r, t), 252, stress * .45);
			const g = mix(mix(BIRD_A.g, BIRD_B.g, t), 252, stress * .35);
			const bl = mix(mix(BIRD_A.b, BIRD_B.b, t), 248, stress * .2);
			const s = 5.4 * b.size;
			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(heading);
			ctx.scale(stretch, flap);
			ctx.beginPath();
			ctx.moveTo(s * 1.55, 0);
			ctx.lineTo(-s * 1.05, s * .72);
			ctx.lineTo(-s * .42, 0);
			ctx.lineTo(-s * 1.05, -s * .72);
			ctx.closePath();
			ctx.fillStyle = `rgb(${r | 0}, ${g | 0}, ${bl | 0})`;
			ctx.fill();
			ctx.restore();
		};
		const drawBirdWrapped = (i) => {
			const b = sim.boids[i];
			drawBird(b.x, b.y, b.vx, b.vy, i);
			const m = 16;
			if (b.x < m) drawBird(b.x + width, b.y, b.vx, b.vy, i);
			else if (b.x > width - m) drawBird(b.x - width, b.y, b.vx, b.vy, i);
			if (b.y < m) drawBird(b.x, b.y + height, b.vx, b.vy, i);
			else if (b.y > height - m) drawBird(b.x, b.y - height, b.vx, b.vy, i);
		};
		const drawMouse = (t, flee) => {
			if (!mouse.active) return;
			const r = Math.max(40, 118 + flee * 18) * (1 + .035 * Math.sin(t * .0032));
			const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r);
			const a0 = mouse.pressed ? .16 : .09;
			g.addColorStop(0, `rgba(143, 173, 152, ${a0})`);
			g.addColorStop(.62, "rgba(143, 173, 152, 0.035)");
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
		const loop = (now) => {
			if (!running) return;
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const params = useFlockStore.getState();
			sim.step(dt, params, mouse);
			if (params.trails) {
				ctx.globalAlpha = .16;
				ctx.drawImage(sky, 0, 0, width, height);
				ctx.globalAlpha = 1;
			} else ctx.drawImage(sky, 0, 0, width, height);
			const n = sim.n;
			for (let i = 0; i < n; i++) drawBirdWrapped(i);
			drawMouse(now, params.flee);
			raf = requestAnimationFrame(loop);
		};
		const onPointerMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
			mouse.active = true;
		};
		const onPointerDown = (e) => {
			onPointerMove(e);
			if (e.target?.closest("aside, button, [role='slider']")) return;
			mouse.pressed = true;
		};
		const onPointerUp = (e) => {
			mouse.pressed = false;
			if (e.pointerType !== "mouse") mouse.active = false;
		};
		const onPointerOut = (e) => {
			const next = e.relatedTarget;
			if (!next || !document.documentElement.contains(next)) {
				mouse.active = false;
				mouse.pressed = false;
			}
		};
		const onBlur = () => {
			mouse.active = false;
			mouse.pressed = false;
		};
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.code === "Space") {
				e.preventDefault();
				useFlockStore.getState().toggle("paused");
			} else if (e.key === "r" || e.key === "R") useFlockStore.getState().reseed();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "absolute inset-0 size-full touch-none",
		"aria-label": "鸟群集群运动画布"
	});
}
function FlockApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "sr-only",
				children: "鸟群 — 集群运动模拟"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlockCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-xs tracking-wide text-subtle md:block",
				children: "移动指针驱散鸟群"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlockApp, {});
}
//#endregion
export { Home as component };
