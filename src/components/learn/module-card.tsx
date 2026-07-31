"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Brain,
  ChevronDown,
  Download,
  FileText,
  PenLine,
  PlayCircle,
  Quote,
  SquareCheck,
} from "lucide-react";
import clsx from "clsx";
import type { ModuleSummary } from "@/lib/modules";
import { accentClasses } from "@/lib/modules";
import type { ModuleContent } from "@/lib/module-content";
import { useProgress, type SectionKey } from "./progress-context";
import CompletionToggle from "./completion-toggle";
import ReflectionBlock from "./reflection-block";
import QuizBlock from "./quiz-block";
import ClassifyActivity from "./classify-activity";

interface ModuleCardProps {
  module: ModuleSummary;
  content: ModuleContent;
  defaultOpen?: boolean;
}

const sectionMeta: {
  key: SectionKey;
  label: string;
  icon: typeof BookOpen;
}[] = [
  { key: "intro", label: "Introduction", icon: BookOpen },
  { key: "watch", label: "Watch", icon: PlayCircle },
  { key: "read", label: "Read", icon: FileText },
  { key: "interactive", label: "Interactive Example", icon: Brain },
  { key: "reflection", label: "Reflection", icon: PenLine },
  { key: "quiz", label: "Mini Quiz", icon: SquareCheck },
  { key: "resources", label: "Resources", icon: Download },
  { key: "references", label: "References Used", icon: Quote },
];

export default function ModuleCard({
  module,
  content,
  defaultOpen = false,
}: ModuleCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    // Force-opens when a hash deep-link resolves after mount (see
    // LearnDashboard); the user's own toggle still works freely afterwards,
    // so this one-directional sync is an intentional exception to
    // react-hooks/set-state-in-effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);
  const shouldReduceMotion = useReducedMotion();
  const { isComplete, setComplete, moduleProgress } = useProgress();
  const accent = accentClasses[module.accent];
  const progress = Math.round(moduleProgress(module.id) * 100);

  return (
    <div
      id={module.slug}
      className="hover-glow scroll-mt-24 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${module.slug}-panel`}
        className="flex w-full items-center gap-4 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-purple sm:p-5"
      >
        <span
          className={clsx(
            "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
            accent.bg
          )}
        >
          {module.order}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-base font-semibold text-foreground sm:text-lg">
            {module.title}
          </span>
          <span className="mt-1 block text-xs text-brand-grey sm:text-sm">
            {module.oneLiner}
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-2 sm:flex">
          <span className="h-1.5 w-24 overflow-hidden rounded-full bg-black/10">
            <span
              className={clsx("block h-full rounded-full", accent.bg)}
              style={{ width: `${progress}%` }}
            />
          </span>
          <span className="text-xs font-medium text-brand-grey">
            {progress}%
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={clsx(
            "size-5 shrink-0 text-brand-grey transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${module.slug}-panel`}
            initial={shouldReduceMotion ? { height: "auto" } : { height: 0 }}
            animate={{ height: "auto" }}
            exit={shouldReduceMotion ? { height: "auto" } : { height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-black/10"
          >
            <div className="space-y-8 p-4 sm:p-6">
              {sectionMeta.map(({ key, label, icon: Icon }) => (
                <section key={key} aria-labelledby={`${module.slug}-${key}`}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3
                      id={`${module.slug}-${key}`}
                      className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-brand-purple"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {label}
                    </h3>
                    {key !== "reflection" &&
                      key !== "quiz" &&
                      key !== "interactive" && (
                      <CompletionToggle
                        complete={isComplete(module.id, key)}
                        onToggle={() =>
                          setComplete(module.id, key, !isComplete(module.id, key))
                        }
                      />
                    )}
                  </div>

                  {key === "intro" && (
                    <div className="space-y-3 text-sm leading-relaxed text-foreground">
                      {content.introParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}

                  {key === "watch" &&
                    (content.video ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          {content.video.title}
                        </p>
                        <p className="text-xs font-medium text-brand-grey">
                          Watch — {content.video.durationLabel}
                        </p>
                        <div className="aspect-video overflow-hidden rounded-lg border border-black/10">
                          <iframe
                            className="size-full"
                            src={`https://www.youtube.com/embed/${content.video.youtubeId}`}
                            title={content.video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-xs text-brand-grey">
                          Captions are available via YouTube&apos;s CC control.
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-brand-grey">
                        [VIDEO LINK REQUIRED]
                      </p>
                    ))}

                  {key === "read" &&
                    (content.keyConcepts.length > 0 ? (
                      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
                        {content.keyConcepts.map((concept, i) => (
                          <li key={i}>{concept}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-brand-grey">
                        [CONTENT TO BE PROVIDED]
                      </p>
                    ))}

                  {key === "interactive" &&
                    (content.interactive ? (
                      <ClassifyActivity
                        activity={content.interactive}
                        onComplete={() =>
                          setComplete(module.id, "interactive", true)
                        }
                      />
                    ) : (
                      <p className="text-sm text-brand-grey">
                        [INTERACTIVE EXAMPLE IN DEVELOPMENT — a practical
                        activity for this module is coming soon.]
                      </p>
                    ))}

                  {key === "reflection" && (
                    <ReflectionBlock
                      moduleId={module.id}
                      prompt={content.reflectionPrompt}
                      onSave={(hasContent) =>
                        setComplete(module.id, "reflection", hasContent)
                      }
                    />
                  )}

                  {key === "quiz" && (
                    <QuizBlock
                      questions={content.quiz}
                      onComplete={() =>
                        setComplete(module.id, "quiz", true)
                      }
                    />
                  )}

                  {key === "resources" &&
                    (content.resources.length > 0 ? (
                      <ul className="space-y-3 text-sm text-foreground">
                        {content.resources.map((r, i) => (
                          <li key={i}>
                            <p className="font-medium">
                              {r.url ? (
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-purple underline underline-offset-2 hover:no-underline"
                                >
                                  {r.title}
                                </a>
                              ) : (
                                r.title
                              )}
                            </p>
                            <p className="text-brand-grey">{r.description}</p>
                            {r.licenceNote && (
                              <p className="mt-0.5 text-xs italic text-brand-grey/80">
                                {r.licenceNote}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-brand-grey">
                        [RESOURCES TO BE PROVIDED]
                      </p>
                    ))}

                  {key === "references" &&
                    (content.references.length > 0 ? (
                      <ul className="space-y-2 text-xs leading-relaxed text-brand-grey">
                        {content.references.map((ref, i) => (
                          <li key={i}>{ref}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-brand-grey">
                        [REFERENCE LIST TO BE PROVIDED]
                      </p>
                    ))}
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
