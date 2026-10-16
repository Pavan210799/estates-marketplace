import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import AdvisorsSection from "../../components/landing/AdvisorsSection";
import CityGuidesSection from "../../components/landing/CityGuidesSection";
import FeaturedCollection from "../../components/landing/FeaturedCollection";
import HeroSection from "../../components/landing/HeroSection";
import HowWeWorkSection from "../../components/landing/HowWeWorkSection";
import NeighborhoodMarquee from "../../components/landing/NeighborhoodMarquee";
import OwnerCtaSection from "../../components/landing/OwnerCtaSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import Reveal from "../../components/ui/Reveal";

export default function LandingPage() {
  useDocumentTitle("Indian homes, privately presented");
  const { properties } = useMarketplace();
  const spotlight =
    [...properties].find((property) => property.featured) ?? properties[0];
  const featured = [...properties]
    .filter((property) => property.featured)
    .sort((a, b) => b.listedOn.localeCompare(a.listedOn))
    .slice(0, 6);
  const cityCount = new Set(properties.map((property) => property.city)).size;

  return (
    <div>
      <HeroSection properties={properties} spotlight={spotlight} cityCount={cityCount} />
      <NeighborhoodMarquee />
      <Reveal>
        <FeaturedCollection featured={featured} />
      </Reveal>
      <Reveal>
        <CityGuidesSection properties={properties} />
      </Reveal>
      <Reveal>
        <HowWeWorkSection />
      </Reveal>
      <Reveal>
        <AdvisorsSection />
      </Reveal>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal>
        <OwnerCtaSection />
      </Reveal>
    </div>
  );
}
