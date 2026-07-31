"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const SECTION_KEYS = [
  "intro",
  "watch",
  "read",
  "interactive",
  "reflection",
  "quiz",
  "resources",
  "references",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

type ProgressState = Record<string, Partial<Record<SectionKey, boolean>>>;

const STORAGE_KEY = "awp:progress:v1";

interface ProgressContextValue {
  isComplete: (moduleId: string, section: SectionKey) => boolean;
  setComplete: (moduleId: string, section: SectionKey, value: boolean) => void;
  moduleProgress: (moduleId: string) => number; // 0–1
  overallProgress: (moduleIds: string[]) => number; // 0–1
  hydrated: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage, unavailable during SSR — an
    // intentional exception to react-hooks/set-state-in-effect.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState(JSON.parse(raw));
    } catch {
      // Ignore malformed/unavailable localStorage — progress just won't persist.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (e.g. private browsing) — fail silently.
    }
  }, [state, hydrated]);

  const isComplete = useCallback(
    (moduleId: string, section: SectionKey) =>
      Boolean(state[moduleId]?.[section]),
    [state]
  );

  const setComplete = useCallback(
    (moduleId: string, section: SectionKey, value: boolean) => {
      setState((prev) => ({
        ...prev,
        [moduleId]: { ...prev[moduleId], [section]: value },
      }));
    },
    []
  );

  const moduleProgress = useCallback(
    (moduleId: string) => {
      const sections = state[moduleId];
      if (!sections) return 0;
      const done = SECTION_KEYS.filter((key) => sections[key]).length;
      return done / SECTION_KEYS.length;
    },
    [state]
  );

  const overallProgress = useCallback(
    (moduleIds: string[]) => {
      if (moduleIds.length === 0) return 0;
      const total = moduleIds.reduce((sum, id) => sum + moduleProgress(id), 0);
      return total / moduleIds.length;
    },
    [moduleProgress]
  );

  const value = useMemo(
    () => ({ isComplete, setComplete, moduleProgress, overallProgress, hydrated }),
    [isComplete, setComplete, moduleProgress, overallProgress, hydrated]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
