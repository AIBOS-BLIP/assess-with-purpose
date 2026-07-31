"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { modules, accentClasses } from "@/lib/modules";
import clsx from "clsx";

export default function ModuleTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ol className="relative space-y-6 border-l border-black/10 pl-6 sm:pl-8">
      {modules.map((mod, index) => {
        const accent = accentClasses[mod.accent];
        return (
          <motion.li
            key={mod.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className={clsx(
                "absolute -left-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full sm:-left-[calc(2rem+5px)]",
                accent.bg
              )}
            />
            <div className="hover-glow flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
                  Module {mod.order}
                </p>
                <h3 className="mt-0.5 font-heading text-base font-semibold text-foreground">
                  {mod.title}
                </h3>
                <p className="mt-1 text-sm text-brand-grey">{mod.oneLiner}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-brand-grey">
                  Not started
                </span>
                <Link
                  href={`/learn#${mod.slug}`}
                  className="flex items-center gap-1 text-sm font-semibold text-brand-purple hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
                >
                  View module
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
