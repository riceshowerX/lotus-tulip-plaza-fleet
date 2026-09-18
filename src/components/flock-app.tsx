import { ControlPanel } from "@/components/control-panel";
import { FlockCanvas } from "@/components/flock-canvas";

export function FlockApp() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <h1 className="sr-only">鸟群 — 集群运动模拟</h1>
      <FlockCanvas />
      <ControlPanel />
      <p className="pointer-events-none absolute bottom-16 left-1/2 hidden -translate-x-1/2 text-xs tracking-wide text-subtle md:block">
        移动指针驱散鸟群
      </p>
    </main>
  );
}
