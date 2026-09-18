import { create } from "zustand";
import { FLOCK_DEFAULTS, type FlockParams } from "./types";

type FlockStore = FlockParams & {
  setParam: <K extends keyof FlockParams>(key: K, value: FlockParams[K]) => void;
  toggle: (key: "trails" | "paused") => void;
  resetAll: () => void;
  reseed: () => void;
};

export const useFlockStore = create<FlockStore>((set) => ({
  ...FLOCK_DEFAULTS,
  setParam: (key, value) => set({ [key]: value } as Partial<FlockStore>),
  toggle: (key) => set((s) => ({ [key]: !s[key] })),
  resetAll: () => set({ ...FLOCK_DEFAULTS, epoch: Date.now() }),
  reseed: () => set({ epoch: Date.now() }),
}));
