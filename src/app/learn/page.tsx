import type { Metadata } from "next";
import LearnDashboard from "@/components/learn/learn-dashboard";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Five modules covering the essentials of assessment literacy for undergraduate lecturers.",
};

export default function LearnPage() {
  return <LearnDashboard />;
}
