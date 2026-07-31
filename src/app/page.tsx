import Hero from "@/components/home/hero";
import LearningPathway from "@/components/home/learning-pathway";
import ModuleTimeline from "@/components/home/module-timeline";
import ScrollReveal from "@/components/scroll-reveal";

const statements = [
  {
    text: "Assessment is more than grading.",
    citation: null,
  },
  {
    text: "How assessment is conducted has consequences for student engagement and learning.",
    citation: "Hay et al., 2015",
  },
  {
    text: "Assessment is rooted in a verb — ‘to sit down beside’ — implying students’ active involvement in the process.",
    citation: "Lubbe, 2020",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <ScrollReveal>
          <p className="text-lg leading-relaxed text-foreground">
            Assessment shapes how students learn — yet many lecturers receive
            little formal preparation in designing it well. Assess with
            Purpose is a practical, openly licensed guide to help you design
            fair, aligned, and meaningful assessments across your
            undergraduate teaching.
          </p>
        </ScrollReveal>
      </section>

      <section className="bg-black/[0.02] px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {statements.map((statement, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <blockquote className="flex h-full flex-col justify-center rounded-xl bg-brand-purple px-6 py-8 text-center shadow-md">
                <p className="font-heading text-xl font-semibold text-white">
                  {statement.text}
                </p>
                {statement.citation && (
                  <cite className="mt-3 block text-xs font-normal not-italic text-white/70">
                    — {statement.citation}
                  </cite>
                )}
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <h2 className="text-center font-heading text-3xl font-bold text-brand-purple">
            Your learning pathway
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-brand-grey">
            Assessment literacy builds progressively. Select any stage to
            jump straight into that module.
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <LearningPathway />
        </div>
      </section>

      <section id="watch-intro" className="scroll-mt-24 bg-black/[0.02] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-brand-purple">
              Watch the introduction
            </h2>
            <p className="mt-2 text-sm text-brand-grey">
              &ldquo;Assessment Animation&rdquo; — Education Scotland,
              approximately 3 minutes
            </p>
            <div className="hover-glow mx-auto mt-8 aspect-video max-w-2xl overflow-hidden rounded-xl border border-black/10 shadow-sm">
              <iframe
                className="size-full"
                src="https://www.youtube.com/embed/JVHyGPYiuos"
                title="Assessment Animation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <h2 className="text-center font-heading text-3xl font-bold text-brand-purple">
            Module timeline
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-brand-grey">
            Track what&apos;s ahead across all five modules.
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <ModuleTimeline />
        </div>
      </section>
    </>
  );
}
