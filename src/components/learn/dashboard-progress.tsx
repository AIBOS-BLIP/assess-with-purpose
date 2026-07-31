"use client";

import { modules } from "@/lib/modules";
import { useProgress } from "./progress-context";

export default function DashboardProgress() {
  const { overallProgress, hydrated } = useProgress();
  const percent = Math.round(overallProgress(modules.map((m) => m.id)) * 100);

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between text-sm font-semibold text-foreground">
        <span>Your overall progress</span>
        <span className="text-brand-purple">{hydrated ? `${percent}%` : "—"}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-brand-purple transition-all duration-500"
          style={{ width: `${hydrated ? percent : 0}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-brand-grey">
        Saved automatically in this browser as you work through each module.
      </p>
    </div>
  );
}
