"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import clsx from "clsx";

interface Infographic {
  id: string;
  title: string;
  description: string;
  accessibilityDescription: string;
  file: string;
  fileType: string;
  topic: string;
}

const INFOGRAPHICS: Infographic[] = [
  {
    id: "principles",
    title: "Principles of Assessment",
    description:
      "Why assessment matters, what makes assessment effective, and practical tips for everyday practice.",
    accessibilityDescription:
      "A vertical infographic listing why assessment is important, the qualities effective assessment must have (embedded in learning, participative, purposeful, student-centred, learning-focused, timely, authentic, valid, reliable, trustworthy and transparent), and a bulleted list of practical tips including avoiding over-assessment, encouraging cooperation, and using multimodal assessment.",
    file: "/images/infographics/principles-of-assessment.png",
    fileType: "PNG image",
    topic: "Assessment literacy",
  },
  {
    id: "forms",
    title: "Forms of Assessment: Ask Yourself",
    description:
      "A side-by-side comparison of formative and summative assessment — purpose, characteristics, benefits and examples.",
    accessibilityDescription:
      "A two-column infographic comparing Formative and Summative assessment across four rows: Characteristics, Benefits, and Examples, followed by reflective questions such as why you assess your students and whether your practices are learning-centred.",
    file: "/images/infographics/forms-of-assessment.png",
    fileType: "PNG image",
    topic: "Basics of assessment",
  },
  {
    id: "feedback",
    title: "Feedback for Learning",
    description:
      "Key feedback principles, Henderson et al.'s (2019) conditions for effective feedback, the feedback loop, and practical examples.",
    accessibilityDescription:
      "An infographic titled 'Feedback for Learning' with a 'Do not forget' box of five feedback principles attributed to Wiggins, Wiliam, Johnston, Chappuis and Brookhart; a summary of Henderson et al.'s (2019) three conditions for effective feedback (capacity, designs, culture); a circular feedback loop diagram (seeking, understanding, using feedback); and a list of practical feedback examples.",
    file: "/images/infographics/feedback-for-learning.png",
    fileType: "PNG image",
    topic: "Feedback",
  },
];

export default function InfographicsSection() {
  const [filter, setFilter] = useState<string>("All");
  const topics = ["All", ...Array.from(new Set(INFOGRAPHICS.map((i) => i.topic)))];
  const visible =
    filter === "All" ? INFOGRAPHICS : INFOGRAPHICS.filter((i) => i.topic === filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setFilter(topic)}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === topic
                ? "border-brand-purple bg-brand-purple text-white"
                : "border-black/15 text-brand-grey hover:border-brand-purple hover:text-brand-purple"
            )}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {visible.map((info) => (
          <div key={info.id} className="hover-glow overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
            <div className="relative aspect-[2/5] w-full bg-black/[0.02]">
              <Image
                src={info.file}
                alt={info.accessibilityDescription}
                fill
                className="object-contain object-top"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-foreground">{info.title}</p>
              <p className="mt-1 text-xs text-brand-grey">{info.description}</p>
              <p className="mt-2 text-xs text-brand-grey">
                {info.fileType} · Source: Assessment Hub, via the project proposal
                deck
              </p>
              <p className="mt-1 text-xs italic text-brand-grey/80">
                Licence not independently verified — confirm before public
                redistribution.
              </p>
              <a
                href={info.file}
                download
                className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-brand-purple px-3 py-1.5 text-xs font-semibold text-brand-purple hover:bg-brand-purple/10"
              >
                <Download className="size-3.5" /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
