"use client";

import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Medal } from "lucide-react";
import clsx from "clsx";
import { useChallenges } from "./challenge-context";
import { badgeForScore, BADGE_LABEL } from "@/lib/badges";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}

const badgeColor: Record<string, string> = {
  gold: "text-[#B8860B] bg-[#FFD525]/20 border-[#B8860B]/40",
  silver: "text-brand-grey bg-black/5 border-black/20",
  bronze: "text-accent-orange bg-accent-orange/10 border-accent-orange/40",
};

export default function ChallengeCard({
  id,
  title,
  description,
  icon: Icon,
  children,
}: ChallengeCardProps) {
  const [open, setOpen] = useState(false);
  const { results } = useChallenges();
  const result = results[id];
  const badge = result ? badgeForScore(result.correct, result.total) : null;

  return (
    <div className="hover-glow overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-base font-semibold text-foreground">
            {title}
          </span>
          <span className="mt-1 block text-sm text-brand-grey">{description}</span>
          {result && (
            <span className="mt-2 flex items-center gap-2">
              {badge ? (
                <span
                  className={clsx(
                    "flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    badgeColor[badge]
                  )}
                >
                  <Medal className="size-3.5" /> {BADGE_LABEL[badge]} badge
                </span>
              ) : (
                <span className="rounded-full border border-black/15 px-2.5 py-0.5 text-xs font-medium text-brand-grey">
                  Completed — {result.correct}/{result.total}
                </span>
              )}
            </span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={clsx(
            "size-5 shrink-0 text-brand-grey transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-t border-black/10 p-4 sm:p-6">{children}</div>
      )}
    </div>
  );
}
