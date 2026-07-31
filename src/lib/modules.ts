export type ModuleAccent =
  | "blue"
  | "pink"
  | "lavender"
  | "orange"
  | "green";

export interface ModuleSummary {
  id: string;
  order: number;
  slug: string;
  title: string;
  oneLiner: string;
  accent: ModuleAccent;
  hasFullContent: boolean;
}

// Order and titles confirmed against the source OER proposal deck
// ("Assess with Purpose.pdf"). See project memory / conversation for
// the confirmation trail.
export const modules: ModuleSummary[] = [
  {
    id: "assessment-literacy",
    order: 1,
    slug: "assessment-literacy",
    title: "What is assessment literacy?",
    oneLiner:
      "Understand what assessment literacy means and why it matters for your teaching.",
    accent: "blue",
    hasFullContent: true,
  },
  {
    id: "role-of-assessment",
    order: 2,
    slug: "role-of-assessment",
    title: "What is the role of assessment in the learning process?",
    oneLiner:
      "Explore how assessment shapes — and is shaped by — the way students learn.",
    accent: "pink",
    hasFullContent: true,
  },
  {
    id: "basics-of-assessment",
    order: 3,
    slug: "basics-of-assessment",
    title: "What are the basics of assessment?",
    oneLiner:
      "Get to grips with core terminology: forms, types, approaches, methods, instruments and tools.",
    accent: "lavender",
    hasFullContent: true,
  },
  {
    id: "feedback",
    order: 4,
    slug: "feedback",
    title: "Is feedback really so important?",
    oneLiner: "Examine why feedback is central to learning, not just a formality.",
    accent: "orange",
    hasFullContent: false,
  },
  {
    id: "large-classes",
    order: 5,
    slug: "large-classes",
    title: "What about assessment in large classes?",
    oneLiner:
      "Practical approaches to assessing effectively when class sizes are large.",
    accent: "green",
    hasFullContent: false,
  },
];

export const accentClasses: Record<
  ModuleAccent,
  { bg: string; text: string; border: string; softBg: string }
> = {
  blue: {
    bg: "bg-accent-blue",
    text: "text-accent-blue",
    border: "border-accent-blue",
    softBg: "bg-accent-blue/10",
  },
  pink: {
    bg: "bg-accent-pink",
    text: "text-accent-pink",
    border: "border-accent-pink",
    softBg: "bg-accent-pink/10",
  },
  lavender: {
    bg: "bg-accent-lavender",
    text: "text-accent-lavender",
    border: "border-accent-lavender",
    softBg: "bg-accent-lavender/10",
  },
  orange: {
    bg: "bg-accent-orange",
    text: "text-accent-orange",
    border: "border-accent-orange",
    softBg: "bg-accent-orange/10",
  },
  green: {
    bg: "bg-accent-green",
    text: "text-accent-green",
    border: "border-accent-green",
    softBg: "bg-accent-green/10",
  },
};
