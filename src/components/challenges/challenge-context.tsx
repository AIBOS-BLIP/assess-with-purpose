"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface ChallengeResult {
  correct: number;
  total: number;
  completed: boolean;
}

export interface PlayerInfo {
  name: string;
  surname: string;
}

interface ChallengeContextValue {
  player: PlayerInfo | null;
  setPlayer: (player: PlayerInfo) => void;
  results: Record<string, ChallengeResult>;
  recordResult: (challengeId: string, correct: number, total: number) => void;
  resetAll: () => void;
  hydrated: boolean;
}

const PLAYER_KEY = "awp:challenges:player";
const RESULTS_KEY = "awp:challenges:results";

const ChallengeContext = createContext<ChallengeContextValue | null>(null);

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayerState] = useState<PlayerInfo | null>(null);
  const [results, setResults] = useState<Record<string, ChallengeResult>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage, unavailable during SSR — an
    // intentional exception to react-hooks/set-state-in-effect.
    try {
      const p = window.localStorage.getItem(PLAYER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (p) setPlayerState(JSON.parse(p));
      const r = window.localStorage.getItem(RESULTS_KEY);
      if (r) setResults(JSON.parse(r));
    } catch {
      // Ignore — falls back to empty state.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (player) window.localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
      window.localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    } catch {
      // Storage unavailable — fail silently.
    }
  }, [player, results, hydrated]);

  const setPlayer = useCallback((p: PlayerInfo) => setPlayerState(p), []);

  const recordResult = useCallback(
    (challengeId: string, correct: number, total: number) => {
      setResults((prev) => ({
        ...prev,
        [challengeId]: { correct, total, completed: true },
      }));
    },
    []
  );

  const resetAll = useCallback(() => {
    setPlayerState(null);
    setResults({});
    try {
      window.localStorage.removeItem(PLAYER_KEY);
      window.localStorage.removeItem(RESULTS_KEY);
    } catch {
      // Ignore.
    }
  }, []);

  const value = useMemo(
    () => ({ player, setPlayer, results, recordResult, resetAll, hydrated }),
    [player, setPlayer, results, recordResult, resetAll, hydrated]
  );

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges() {
  const ctx = useContext(ChallengeContext);
  if (!ctx) throw new Error("useChallenges must be used within a ChallengeProvider");
  return ctx;
}
