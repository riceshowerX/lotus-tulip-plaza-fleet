import { useState } from "react";
import { ChevronDown, Pause, Play, RotateCcw, Spline, Wind } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useFlockStore } from "@/lib/flock/store";
import { cn } from "@/lib/utils";

function ParamSlider({
  label,
  hint,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-fg">{label}</span>
          <span className="text-xs text-subtle">{hint}</span>
        </span>
        <span className="font-mono text-sm tabular-nums text-accent">{format(value)}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => {
          const next = v[0];
          if (typeof next === "number") onChange(next);
        }}
        aria-label={label}
      />
    </label>
  );
}

export function ControlPanel() {
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

  const [open, setOpen] = useState(false);

  return (
    <aside
      className={cn(
        "pointer-events-auto absolute z-10 flex flex-col touch-auto",
        "max-md:inset-x-3 max-md:bottom-[max(0.75rem,env(safe-area-inset-bottom))]",
        "md:top-5 md:left-5 md:w-80",
        "rounded-xl bg-surface/95 p-3 shadow-panel md:rounded-2xl md:p-4",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          className="flex min-h-11 flex-1 items-start gap-3 rounded-lg text-left md:min-h-0 md:cursor-default"
          onClick={() => {
            if (window.matchMedia("(min-width: 768px)").matches) return;
            setOpen((v) => !v);
          }}
          aria-expanded={open}
        >
          <span className="mt-0.5 grid size-9 place-items-center rounded-md bg-surface-2 text-accent">
            <Wind className="size-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 pt-0.5">
            <span className="block font-display text-lg leading-tight font-medium tracking-display text-fg">
              鸟群
            </span>
            <span className="mt-0.5 block text-xs text-muted">
              分离 · 对齐 · 聚合
            </span>
          </span>
        </button>
        <div className="flex items-center gap-1">
          <span className="mr-1 hidden font-mono text-xs tabular-nums text-subtle md:inline">
            {count}
          </span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-muted transition-colors duration-(--motion-quick) hover:bg-surface-2 hover:text-fg md:size-9"
            onClick={() => toggle("paused")}
            aria-label={paused ? "继续" : "暂停"}
            title={paused ? "继续（空格）" : "暂停（空格）"}
          >
            {paused ? (
              <Play className="size-4 translate-x-px" strokeWidth={1.75} />
            ) : (
              <Pause className="size-4" strokeWidth={1.75} />
            )}
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-muted transition-colors duration-(--motion-quick) hover:bg-surface-2 hover:text-fg md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "收起面板" : "展开面板"}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-(--motion-fast) ease-(--ease-out)",
                open ? "rotate-0" : "rotate-180",
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity,margin] duration-(--motion-fast) ease-(--ease-out)",
          "md:mt-4 md:max-h-none md:opacity-100",
          open
            ? "mt-4 max-h-96 opacity-100 visible"
            : "invisible max-h-0 opacity-0 md:visible md:mt-4 md:max-h-none md:opacity-100",
        )}
      >
        <div className="flex flex-col gap-3 overflow-y-auto pr-1 md:max-h-none max-h-96">
            <ParamSlider
              label="分离"
              hint="Separation"
              value={separation}
              min={0}
              max={3}
              step={0.05}
              format={(n) => n.toFixed(2)}
              onChange={(n) => setParam("separation", n)}
            />
            <ParamSlider
              label="对齐"
              hint="Alignment"
              value={alignment}
              min={0}
              max={3}
              step={0.05}
              format={(n) => n.toFixed(2)}
              onChange={(n) => setParam("alignment", n)}
            />
            <ParamSlider
              label="聚合"
              hint="Cohesion"
              value={cohesion}
              min={0}
              max={3}
              step={0.05}
              format={(n) => n.toFixed(2)}
              onChange={(n) => setParam("cohesion", n)}
            />
            <ParamSlider
              label="避让"
              hint="Flee"
              value={flee}
              min={0}
              max={5}
              step={0.05}
              format={(n) => n.toFixed(2)}
              onChange={(n) => setParam("flee", n)}
            />
            <ParamSlider
              label="数量"
              hint="Flock"
              value={count}
              min={20}
              max={360}
              step={5}
              format={(n) => String(Math.round(n))}
              onChange={(n) => setParam("count", Math.round(n))}
            />
            <ParamSlider
              label="速度"
              hint="Speed"
              value={speed}
              min={40}
              max={280}
              step={5}
              format={(n) => String(Math.round(n))}
              onChange={(n) => setParam("speed", n)}
            />
            <ParamSlider
              label="感知"
              hint="Radius"
              value={perception}
              min={24}
              max={120}
              step={1}
              format={(n) => String(Math.round(n))}
              onChange={(n) => setParam("perception", n)}
            />

            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => toggle("trails")}
                className={cn(
                  "inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3",
                  "text-sm font-medium transition-colors duration-(--motion-quick)",
                  "active:scale-[0.96]",
                  trails
                    ? "bg-surface-2 text-fg"
                    : "bg-transparent text-muted ring-1 ring-border",
                )}
              >
                <Spline className="size-3.5" strokeWidth={1.75} />
                尾迹
              </button>
              <button
                type="button"
                onClick={() => reseed()}
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-transparent px-3 text-sm font-medium text-muted ring-1 ring-border transition-colors duration-(--motion-quick) hover:text-fg active:scale-[0.96]"
              >
                <RotateCcw className="size-3.5" strokeWidth={1.75} />
                重聚
              </button>
              <button
                type="button"
                onClick={() => resetAll()}
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-md bg-fg px-3 text-sm font-medium text-accent-fg transition-opacity duration-(--motion-quick) hover:opacity-90 active:scale-[0.96]"
              >
                重置
              </button>
            </div>
          </div>
        </div>
    </aside>
  );
}
