"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const FAQS = [
  {
    question: "Do I need to create an account to use this site?",
    answer:
      "No. Nothing on this site requires an account, login, or payment. All tools and modules are open to use directly.",
  },
  {
    question: "Where is my progress, reflection journal, or rubric saved?",
    answer:
      "Everything you save — module progress, reflections, rubrics, checklists — is stored only in your own browser's local storage. It is never sent to a server, and it will be lost if you clear your browser data or switch devices.",
  },
  {
    question: "Can I reuse the templates and tools in my own teaching?",
    answer:
      "Yes — the tools in the Assessment Studio (rubric builder, planner, checklist, etc.) are designed for you to fill in and export as your own working documents. Reuse of specific readings, videos or references depends on their individual licence, shown alongside each item where available.",
  },
  {
    question: "Does the Feedback Generator write feedback for me automatically?",
    answer:
      "No. It only assembles a structured draft from information you type in yourself — it does not analyse or invent anything about a student's actual work, and every draft must be reviewed by you before use.",
  },
  {
    question: "Why do some modules or resources say '[TO BE PROVIDED]'?",
    answer:
      "This OER is being built out module by module. Where content hasn't been finalised yet, we label it clearly rather than filling the gap with placeholder text that looks finished.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="hover-glow-sm overflow-hidden rounded-lg border border-black/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-purple"
            >
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className={clsx("size-4 shrink-0 text-brand-grey transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && (
              <p className="border-t border-black/10 p-4 text-sm text-brand-grey">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
