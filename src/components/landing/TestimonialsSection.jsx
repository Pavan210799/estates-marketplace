import { TESTIMONIALS } from "../../data/content";
import { familyPhotos } from "../../data/media";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";

export default function TestimonialsSection() {
  return (
    <section className="bg-parchment py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">From families</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Homes they settled into</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-sand sm:flex-row"
            >
              <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-t-[1.75rem] sm:aspect-auto sm:w-2/5 sm:rounded-none sm:rounded-l-[1.75rem]">
                <CoverImage src={familyPhotos[item.name]} alt="" fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <blockquote className="font-serif text-xl leading-snug text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="border-t border-sand pt-4">
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone">{item.place}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
