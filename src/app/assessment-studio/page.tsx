import type { Metadata } from "next";
import StudioDashboard from "@/components/studio/studio-dashboard";

export const metadata: Metadata = {
  title: "Assessment Studio",
  description:
    "Practical tools for designing assessments: rubric builder, planner, feedback generator, checklist and reflection journal.",
};

export default function AssessmentStudioPage() {
  return <StudioDashboard />;
}
