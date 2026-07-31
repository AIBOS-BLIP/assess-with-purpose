"use client";

import { useState } from "react";
import {
  ClipboardList,
  ListChecks,
  MapPinned,
  MessageSquareText,
  Move,
  NotebookPen,
} from "lucide-react";
import clsx from "clsx";
import RubricBuilder from "./rubric-builder";
import AssessmentChecklist from "./assessment-checklist";
import ReflectionJournal from "./reflection-journal";
import AssessmentPlanner from "./assessment-planner";
import FeedbackGenerator from "./feedback-generator";
import DragDropActivity from "./drag-drop-activity";

const tools = [
  { id: "rubric", label: "Rubric Builder", icon: ClipboardList, Component: RubricBuilder },
  { id: "planner", label: "Assessment Planner", icon: MapPinned, Component: AssessmentPlanner },
  { id: "feedback", label: "Feedback Generator", icon: MessageSquareText, Component: FeedbackGenerator },
  { id: "checklist", label: "Assessment Checklist", icon: ListChecks, Component: AssessmentChecklist },
  { id: "journal", label: "Reflection Journal", icon: NotebookPen, Component: ReflectionJournal },
  { id: "dragdrop", label: "Design Activity", icon: Move, Component: DragDropActivity },
] as const;

export default function StudioDashboard() {
  const [activeId, setActiveId] = useState<(typeof tools)[number]["id"]>("rubric");
  const active = tools.find((t) => t.id === activeId) ?? tools[0];
  const ActiveComponent = active.Component;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-purple sm:text-4xl print:hidden">
        Assessment Studio
      </h1>
      <p className="mt-4 max-w-2xl text-brand-grey print:hidden">
        Practical tools to help you design fair, aligned assessments. Your
        work is saved automatically in this browser as you go.
      </p>

      <div
        role="tablist"
        aria-label="Assessment Studio tools"
        className="mt-8 flex flex-wrap gap-2 print:hidden"
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.id === activeId;
          return (
            <button
              key={tool.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tool.id)}
              className={clsx(
                "hover-glow-sm flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple",
                isActive
                  ? "bg-brand-purple text-white"
                  : "border border-black/10 text-foreground hover:border-brand-purple hover:text-brand-purple"
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
              {tool.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="mt-8 rounded-xl border border-black/10 bg-white p-4 shadow-sm sm:p-6 print:border-none print:p-0 print:shadow-none"
      >
        <h2 className="mb-4 font-heading text-xl font-semibold text-brand-purple print:hidden">
          {active.label}
        </h2>
        <ActiveComponent />
      </div>
    </div>
  );
}
