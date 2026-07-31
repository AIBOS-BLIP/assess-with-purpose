"use client";

import { useEffect, useState } from "react";
import { modules } from "@/lib/modules";
import { moduleContent } from "@/lib/module-content";
import { ProgressProvider } from "./progress-context";
import DashboardProgress from "./dashboard-progress";
import ModuleCard from "./module-card";

export default function LearnDashboard() {
  const [initialSlug, setInitialSlug] = useState<string | null>(null);

  useEffect(() => {
    // window.location is unavailable during SSR, so reading the initial
    // hash after mount is an intentional exception to
    // react-hooks/set-state-in-effect, not a cascading update.
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialSlug(hash);
      // Let the accordion finish expanding before scrolling to it.
      setTimeout(() => {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, []);

  return (
    <ProgressProvider>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="font-heading text-3xl font-bold text-brand-purple sm:text-4xl">
          Learn
        </h1>
        <p className="mt-4 max-w-2xl text-brand-grey">
          Five short modules — each with an introduction, a video, a reading,
          an interactive example, a reflection, a mini quiz and resources.
          Work through them in order, or jump to whichever you need.
        </p>

        <div className="mt-8">
          <DashboardProgress />
        </div>

        <div className="mt-8 space-y-4">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              content={moduleContent[mod.id]}
              defaultOpen={initialSlug === mod.slug}
            />
          ))}
        </div>
      </div>
    </ProgressProvider>
  );
}
