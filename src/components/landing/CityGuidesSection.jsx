import { Link } from "react-router-dom";
import { CITY_GUIDES } from "../../data/content";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";
import { coverFor } from "./helpers";

export default function CityGuidesSection({ properties }) {
  return (
    <section className="bg-parchment py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">Neighbourhoods</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Where the houses are</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {CITY_GUIDES.map((guide) => (
            <Link
              key={guide.city}
              to={`/listings?city=${encodeURIComponent(guide.city)}`}
              className="group/card relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-transparent transition-[transform,box-shadow,ring-color] duration-200 ease-out will-change-transform motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.02] hover:shadow-[0_24px_48px_-20px_rgba(20,18,15,0.35)] hover:ring-gold/45"
            >
              <CoverImage
                src={coverFor(guide.city, properties)}
                alt=""
                fill
                className="transition-transform duration-200 ease-out motion-safe:group-hover/card:scale-[1.05]"
              />
              <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="block font-serif text-2xl leading-none text-ivory transition-[color,transform] duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-gold-bright sm:text-3xl">
                  {guide.city}
                </span>
                <span className="mt-2 block text-xs leading-5 text-ivory/80 transition-colors duration-200 group-hover/card:text-ivory">
                  {guide.line}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
