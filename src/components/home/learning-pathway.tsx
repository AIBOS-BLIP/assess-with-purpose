"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { modules, accentClasses } from "@/lib/modules";
import clsx from "clsx";

export default function LearningPathway() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Connecting line (desktop only) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-6 hidden h-0.5 bg-black/10 md:block"
      />

      <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
        {modules.map((mod, index) => {
          const accent = accentClasses[mod.accent];
          return (
            <motion.li
              key={mod.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/learn#${mod.slug}`}
                className="hover-glow group flex h-full flex-col items-center rounded-xl p-3 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple md:items-center"
              >
                <span
                  className={clsx(
                    "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-md",
                    accent.bg
                  )}
                >
                  {mod.order}
                </span>
                <span className="mt-3 font-heading text-sm font-semibold text-foreground group-hover:text-brand-purple">
                  {mod.title}
                </span>
                <span className="mt-1 text-xs text-brand-grey">
                  {mod.oneLiner}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
