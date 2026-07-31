"use client";

import { Check } from "lucide-react";
import clsx from "clsx";

interface CompletionToggleProps {
  complete: boolean;
  onToggle: () => void;
  label?: string;
}

export default function CompletionToggle({
  complete,
  onToggle,
  label = "Mark as complete",
}: CompletionToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={complete}
      className={clsx(
        "flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple",
        complete
          ? "border-brand-teal bg-brand-teal/10 text-brand-teal"
          : "border-black/15 text-brand-grey hover:border-brand-purple hover:text-brand-purple"
      )}
    >
      <Check aria-hidden="true" className="size-3.5" />
      {complete ? "Completed" : label}
    </button>
  );
}
