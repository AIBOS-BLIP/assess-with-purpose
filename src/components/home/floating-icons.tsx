"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  Lightbulb,
  ListChecks,
  MessageCircle,
  PenLine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FloatingIcon {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const icons: FloatingIcon[] = [
  { Icon: ClipboardCheck, top: "12%", left: "8%", size: 28, duration: 6, delay: 0 },
  { Icon: ListChecks, top: "68%", left: "14%", size: 24, duration: 7, delay: 0.6 },
  { Icon: MessageCircle, top: "20%", left: "85%", size: 26, duration: 6.5, delay: 0.3 },
  { Icon: BookOpen, top: "78%", left: "80%", size: 30, duration: 8, delay: 0.9 },
  { Icon: PenLine, top: "45%", left: "92%", size: 20, duration: 5.5, delay: 1.2 },
  { Icon: Lightbulb, top: "85%", left: "45%", size: 24, duration: 7.5, delay: 0.4 },
];

export default function FloatingIcons() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {icons.map(({ Icon, top, left, size, duration, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-white/20"
          style={{ top, left }}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -14, 0] }
          }
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
}
