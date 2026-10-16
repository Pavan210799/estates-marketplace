import { landingStills } from "../../data/media";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";

export default function OwnerCtaSection() {
  return (
    <Container as="section" className="py-16 sm:py-20">
      <div className="grid overflow-hidden rounded-[2rem] ring-1 ring-sand lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2rem] lg:aspect-auto lg:min-h-[420px] lg:rounded-none lg:rounded-l-[2rem]">
          <CoverImage src={landingStills.owners} alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-forest px-6 py-10 text-ivory sm:px-10 sm:py-12 lg:px-14">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-bright">For owners</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">List your home with us</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-ivory/80">
            A short form, a call from our desk, and your home in front of the right buyers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/submit" variant="gold" className="w-full sm:w-auto sm:px-8">
              Submit a home
            </Button>
            <Button to="/listings" variant="light" className="w-full sm:w-auto sm:px-8">
              Browse collection
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
