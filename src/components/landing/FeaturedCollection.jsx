import { landingStills } from "../../data/media";
import PropertyCard from "../listings/PropertyCard";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";

export default function FeaturedCollection({ featured }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-sand lg:aspect-auto lg:min-h-[520px]">
            <CoverImage src={landingStills.collection} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-bright">The collection</p>
              <p className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
                Walk-through homes, not catalogue pages.
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-3xl sm:text-4xl">Featured this week</h2>
              <Button to="/listings" variant="outline" className="w-full sm:w-auto">
                View all
              </Button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {featured.slice(0, 4).map((property, index) => (
                <PropertyCard key={property.id} property={property} priority={index < 2} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
