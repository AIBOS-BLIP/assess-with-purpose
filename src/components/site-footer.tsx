import Link from "next/link";
import { navItems } from "@/lib/nav-items";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-brand-purple text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">Assess with Purpose</p>
          <p className="mt-2 text-sm text-white/80">
            A guide and resources to becoming more assessment literate.
          </p>
          <p className="mt-4 text-xs text-white/60">
            An Open Educational Resource by the NWU Research Unit
            Self-Directed Learning.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Navigate
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/90 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Contact
          </p>
          <p className="mt-3 text-sm text-white/90">
            Prof Anitia Lubbe
            <br />
            <a
              href="mailto:Anitia.Lubbe@nwu.ac.za"
              className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Anitia.Lubbe@nwu.ac.za
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 sm:px-6">
        &copy; {new Date().getFullYear()} North-West University. Content
        licensed for open reuse where indicated — see the Resources page for
        licence details.
      </div>
    </footer>
  );
}
