import type { Metadata } from "next";
import ResourcesDashboard from "@/components/resources/resources-dashboard";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Contact details, infographics, videos, references and frequently asked questions.",
};

export default function ResourcesPage() {
  return <ResourcesDashboard />;
}
