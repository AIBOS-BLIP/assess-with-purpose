"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after mount (it's unavailable during
    // SSR/prerender), so this one-time hydration read is an intentional
    // exception to react-hooks/set-state-in-effect, not a cascading update.
    try {
      const stored = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setValue(JSON.parse(stored));
    } catch {
      // Ignore malformed/unavailable localStorage — falls back to initialValue.
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable (e.g. private browsing) — fail silently.
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
