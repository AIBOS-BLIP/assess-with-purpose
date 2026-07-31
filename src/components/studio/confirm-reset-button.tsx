"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";

interface ConfirmResetButtonProps {
  onConfirm: () => void;
  label?: string;
}

export default function ConfirmResetButton({
  onConfirm,
  label = "Reset",
}: ConfirmResetButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (!confirming) {
      setConfirming(true);
      timeoutRef.current = setTimeout(() => setConfirming(false), 3000);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setConfirming(false);
    onConfirm();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple",
        confirming
          ? "border-accent-red bg-accent-red/10 text-accent-red"
          : "border-black/15 text-brand-grey hover:border-accent-red hover:text-accent-red"
      )}
    >
      <RotateCcw aria-hidden="true" className="size-3.5" />
      {confirming ? "Click again to confirm" : label}
    </button>
  );
}
