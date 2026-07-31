import Image from "next/image";
import { ExternalLink } from "lucide-react";

const PUBLICATIONS = [
  {
    citation:
      "Kamanga, Lubbe & De Beer (2026). Exploring self-directed learning behaviour among Grade 9 natural sciences learners.",
    url: "https://www.sajournalofeducation.co.za/index.php/saje/article/view/2572/1569",
  },
  {
    citation:
      "Kamanga, Annandale, Lubbe & Reyneke (2025). Liberté, égalité, fraternité: changing erroneous conceptions of continuous assessment.",
    url: "https://www.scielo.org.za/scielo.php?pid=S1753-59132025000500010&script=sci_arttext",
  },
  {
    citation:
      "Annandale, Reyneke & Lubbe (2025). Embedding feedback in self-directed learning: Distance students' active engagement during academic writing.",
    url: "https://www.scielo.org.za/scielo.php?pid=S2221-40702025000100011&script=sci_arttext",
  },
  {
    citation:
      "Lubbe, Marais & Kruger (2025). Cultivating independent thinkers: The triad of artificial intelligence, Bloom's taxonomy and critical thinking in assessment pedagogy.",
    url: "https://link.springer.com/article/10.1007/s10639-025-13476-x",
  },
];

export default function AuthorCard() {
  return (
    <div className="hover-glow overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
      <div className="relative aspect-[4/5] w-full bg-black/[0.02]">
        <Image
          src="/images/anitia-lubbe.jpg"
          alt="Portrait of Prof Anitia Lubbe"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="p-4">
        <p className="font-heading text-base font-semibold text-foreground">
          Prof Anitia Lubbe
        </p>
        <p className="mt-1 text-xs leading-relaxed text-brand-grey">
          Award-winning university teacher, Associate Professor, Research
          Unit Self-Directed Learning, Centre for Health Professions
          Education, Faculty of Health Sciences, North-West University.
        </p>
        <a
          href="mailto:Anitia.Lubbe@nwu.ac.za"
          className="mt-2 inline-block text-sm text-brand-purple underline underline-offset-2"
        >
          Anitia.Lubbe@nwu.ac.za
        </a>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-grey">
          Recent publications
        </p>
        <ul className="mt-2 space-y-2.5">
          {PUBLICATIONS.map((pub) => (
            <li key={pub.url}>
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-1.5 text-xs leading-relaxed text-foreground hover:text-brand-purple"
              >
                <ExternalLink
                  aria-hidden="true"
                  className="mt-0.5 size-3 shrink-0 text-brand-grey group-hover:text-brand-purple"
                />
                <span className="underline-offset-2 group-hover:underline">
                  {pub.citation}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
