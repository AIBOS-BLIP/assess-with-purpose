import Image from "next/image";
import ContactForm from "./contact-form";
import InfographicsSection from "./infographics-section";
import VideoLibrary from "./video-library";
import ReferencesList from "./references-list";
import FaqSection from "./faq-section";

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-heading text-2xl font-bold text-brand-purple">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-brand-grey">{subtitle}</p>}
    </div>
  );
}

export default function ResourcesDashboard() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-purple sm:text-4xl">
        Resources
      </h1>
      <p className="mt-4 max-w-2xl text-brand-grey">
        Contact details, videos, references and answers to common questions
        about using this site.
      </p>

      <section className="mt-12">
        <SectionHeading title="Contact" />
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
          <div className="flex items-center gap-4 rounded-lg border border-black/10 p-4 sm:flex-col sm:items-start">
            <Image
              src="/images/anitia-lubbe.jpg"
              alt="Photo of Prof Anitia Lubbe"
              width={96}
              height={96}
              className="size-20 shrink-0 rounded-full object-cover sm:size-24"
            />
            <div>
              <p className="font-heading text-base font-semibold text-foreground">
                Prof Anitia Lubbe
              </p>
              <a
                href="mailto:Anitia.Lubbe@nwu.ac.za"
                className="text-sm text-brand-purple underline underline-offset-2"
              >
                Anitia.Lubbe@nwu.ac.za
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-black/10 p-4 sm:p-5">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          title="Infographics"
          subtitle="Visual summaries you can download and reuse."
        />
        <InfographicsSection />
      </section>

      <section className="mt-14">
        <SectionHeading
          title="Videos"
          subtitle="Every video used across the five learning modules, in one place."
        />
        <VideoLibrary />
      </section>

      <section className="mt-14">
        <SectionHeading
          title="References"
          subtitle="Every reference cited across the modules, searchable in one place."
        />
        <ReferencesList />
      </section>

      <section className="mt-14">
        <SectionHeading title="Frequently asked questions" />
        <FaqSection />
      </section>
    </div>
  );
}
