import { landingStills } from "../../data/media";
import { STEPS } from "../../data/content";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";

export default function HowWeWorkSection() {
  return (
    <Container as="section" className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-sand">
          <CoverImage src={landingStills.steps} alt="" fill className="object-cover" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">The way we work</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Three calm steps</h2>
          <ol className="mt-8 space-y-5">
            {STEPS.map((step) => (
              <li key={step.number} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand">
                <span className="font-serif text-3xl text-gold">{step.number}</span>
                <div>
                  <h3 className="font-serif text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Container>
  );
}
