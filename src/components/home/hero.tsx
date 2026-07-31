"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import FloatingIcons from "./floating-icons";

const titleWords = ["Assess", "with", "Purpose"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand-purple to-brand-purple-dark px-4 py-24 text-center text-white sm:px-6">
      <FloatingIcons />

      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="glow-text font-heading text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="mr-4 inline-block last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
        >
          A guide and resources to becoming more assessment literate
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link
            href="/learn"
            className="hover-glow rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-purple shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Start Your Learning Journey
          </Link>

          <span className="flex cursor-not-allowed items-center gap-2 text-sm text-white/60">
            <PlayCircle aria-hidden="true" className="size-5" />
            Introductory video coming soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
